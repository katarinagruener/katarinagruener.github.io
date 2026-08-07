import { getEntry, type CollectionEntry } from "astro:content";

export type ResolvedPerson = CollectionEntry<"people">["data"] & {
  slug: string;
};

// CMS "relation" fields (chairman/members/mayor) store a person's slug as a
// plain string, so nothing stops that reference from going stale if the
// person entry is later renamed or deleted. Returning null here (instead of
// throwing on a missing entry) lets pages degrade — skip the person, keep
// building — rather than taking the whole site down at build time.
export async function resolvePerson(
  id: string,
): Promise<ResolvedPerson | null> {
  const person = await getEntry("people", id);

  if (!person) {
    console.warn(
      `[people] referenced person id "${id}" was not found in the "people" collection — check for a stale relation set via the CMS.`,
    );
    return null;
  }

  return { ...person.data, slug: person.id };
}
