import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pageHero = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/page-hero" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    images: z.array(z.object({ src: z.string(), alt: z.string() })).optional()
  })
});

const people = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/people",
    generateId: ({ entry }) => entry.replace(/\.json$/, "")
  }),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    badge: z.string().optional(),
    group: z.string().optional(),
    organization: z.string().optional(),
    photo: z.string().optional(),
    address: z.string().optional(),
    phone: z.array(z.string()).optional(),
    mobile: z.array(z.string()).optional(),
    email: z.array(z.string()).optional()
  })
});

const ortsbeiraete = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/ortsbeiraete" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    images: z.array(z.object({ src: z.string(), alt: z.string() })),
    members: z.array(z.string()),
    history: z.array(z.string()).optional()
  })
});

// Singleton content blocks (one file each) previously hardcoded in src/data/*.ts —
// edited via the "Weitere Inhalte" files-collection in Decap CMS.

const siteKontakt = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/site-kontakt" }),
  schema: z.object({
    organization: z.string(),
    address: z.object({
      street: z.string(),
      zip: z.string(),
      city: z.string(),
      district: z.string().optional()
    }),
    phone: z.string(),
    fax: z.string().optional(),
    email: z.string(),
    datenschutzEmail: z.string().optional()
  })
});

const verwaltungInfo = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/verwaltung-info" }),
  schema: z.object({
    openingHours: z.array(z.object({ day: z.string(), time: z.string() })),
    bauhof: z.object({
      title: z.string(),
      address: z.string(),
      phone: z.string(),
      fax: z.string()
    })
  })
});

const gesundheitsdienste = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/gesundheitsdienste" }),
  schema: z.object({
    blutspende: z.object({ title: z.string(), note: z.string() }),
    notdienste: z.array(z.object({ label: z.string(), phone: z.string() }))
  })
});

const feuerwehrFuehrung = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/feuerwehr-fuehrung" }),
  schema: z.object({
    mitglieder: z.array(z.object({ label: z.string(), name: z.string() }))
  })
});

const pflegestuetzpunkt = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/pflegestuetzpunkt" }),
  schema: z.object({
    title: z.string(),
    paragraphs: z.array(z.string()),
    address: z.string(),
    note: z.string()
  })
});

const ueberUns = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/ueber-uns" }),
  schema: z.object({
    welcome: z.object({
      title: z.string(),
      paragraphs: z.array(z.string()),
      mayor: z.string()
    }),
    ortsteile: z.array(z.object({ name: z.string(), size: z.string(), population: z.string() })),
    namensgeber: z.string(),
    wappen: z.object({
      blazon: z.string(),
      intro: z.string(),
      symbole: z.array(z.object({ symbol: z.string(), bedeutung: z.string() }))
    }),
    ehrenbuerger: z.array(z.object({ name: z.string(), note: z.string() })),
    gemeindeInZahlen: z.array(z.object({ label: z.string(), value: z.string() })),
    geschichteTimeline: z.array(z.object({ year: z.string(), text: z.string() })),
    wlanHotspots: z.array(z.object({ ortsteil: z.string(), location: z.string() }))
  })
});

const ladesaeulen = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/ladesaeulen" }),
  schema: z.object({
    intro: z.string(),
    standorte: z.array(z.object({ ortsteil: z.string(), location: z.string() })),
    note: z.string(),
    pedelecNote: z.string(),
    map: z.object({ label: z.string(), url: z.string() })
  })
});

const links = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/links" }),
  schema: z.object({
    groups: z.array(
      z.object({
        title: z.string(),
        items: z.array(z.object({ label: z.string(), url: z.string() }))
      })
    )
  })
});

const fraktionen = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/fraktionen" }),
  schema: z.object({
    title: z.string(),
    chairman: z.string().optional(),
    members: z.array(z.string())
  })
});

const ausschuesse = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/ausschuesse" }),
  schema: z.object({
    title: z.string(),
    chairman: z.string().optional(),
    members: z.array(z.string()),
    sachkundigeEinwohner: z.array(z.string()).optional()
  })
});

const meldungen = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/meldungen" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.array(z.string()).optional(),
    href: z.string().optional(),
    file: z.string().optional(),
    cover: z.string().optional(),
    category: z.enum(["kinder", "senioren", "umwelt", "verkehr", "verwaltung", "gesundheit"]).optional()
  })
});

const dokumentenportal = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/dokumentenportal" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    file: z.string().optional(),
    category: z.enum([
      "satzungen",
      "bekanntmachungen",
      "ausschreibungen",
      "bauleitplanung",
      "formulare",
      "informationen",
      "einladungen",
      "umwelt"
    ]).optional()
  })
});

const seeKurier = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/see-kurier" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    file: z.string(),
    cover: z.string().optional()
  })
});

const verwaltungMitarbeiter = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/verwaltung" }),
  schema: z.object({
    name: z.string(),
    position: z.string(),
    department: z.string(),
    phone: z.array(z.string()).optional(),
    mobile: z.array(z.string()).optional(),
    email: z.array(z.string()).optional(),
    room: z.string().optional()
  })
});

const buergerservice = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/buergerservice" }),
  schema: z.object({
    topic: z.string(),
    office: z.string(),
    department: z.string().optional(),
    address: z.string().optional(),
    phone: z.array(z.string()).optional(),
    fax: z.string().optional(),
    email: z.string().optional(),
    note: z.string().optional(),
    link: z.object({ label: z.string(), url: z.string() }).optional()
  })
});

// Shared shape for the "business directory" collections below (Gesundheit, Einkaufen,
// Gastronomie, Übernachten, Dienstleistungen, Feuerwehr, Vereine, Unternehmen,
// Sehenswürdigkeiten) — each extends this with its own category enum and required-field
// overrides instead of redeclaring every contact field from scratch.
const businessContact = z.object({
  name: z.string(),
  icon: z.string().optional(),
  address: z.string().optional(),
  phone: z.array(z.string()).optional(),
  mobile: z.array(z.string()).optional(),
  fax: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  note: z.string().optional(),
  hours: z.array(z.object({ day: z.string(), time: z.string() })).optional(),
  hoursNote: z.string().optional()
});

const gesundheit = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/gesundheit" }),
  schema: businessContact.extend({
    type: z.enum(["arzt", "zahnarzt", "apotheke", "physiotherapie"]),
    role: z.array(z.string()).optional(),
    address: z.string(),
    bookingUrl: z.string().optional()
  })
});

const einkaufen = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/einkaufen" }),
  schema: businessContact.extend({
    type: z.enum(["geschaeft", "tankstelle"]).optional(),
    address: z.string()
  })
});

const gastronomie = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/gastronomie" }),
  schema: businessContact.extend({
    type: z.enum(["restaurant", "cafe", "kantine", "imbiss"]).optional(),
    address: z.string()
  })
});

const uebernachten = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/uebernachten" }),
  schema: businessContact.extend({
    type: z.enum(["hotel", "pension", "ferienwohnung", "ferienhaus", "zimmer", "camping"]).optional(),
    address: z.string()
  })
});

const dienstleistungen = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/dienstleistungen" }),
  schema: businessContact.extend({
    type: z.enum(["post", "friseur", "massage", "tierpflege", "versicherung", "haushaltshilfe", "immobilien"]).optional(),
    address: z.string()
  })
});

const feuerwehr = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/feuerwehr" }),
  schema: businessContact.extend({
    type: z.enum(["ortsfeuerwehr", "jugendfeuerwehr", "kinderfeuerwehr"]),
    roles: z.array(z.string())
  })
});

const vereine = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/vereine" }),
  schema: businessContact.extend({
    category: z.enum(["sport", "angeln", "garten", "sonstige", "freizeit"]),
    roles: z.array(z.string()).optional()
  })
});

const unternehmen = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/unternehmen" }),
  schema: businessContact.extend({
    address: z.string()
  })
});

const sehenswuerdigkeiten = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/sehenswuerdigkeiten" }),
  schema: businessContact
});

const schulen = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/schulen" }),
  schema: z.object({
    name: z.string(),
    subtitle: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    description: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    address: z.string(),
    phone: z.string().optional(),
    fax: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    contacts: z
      .array(z.object({ role: z.string(), name: z.string(), email: z.string().optional() }))
      .optional()
  })
});

const kitas = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/kitas" }),
  schema: z.object({
    name: z.string(),
    type: z.enum(["kita", "hort"]),
    ortsteil: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    description: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    address: z.string(),
    contacts: z
      .array(z.object({ role: z.string(), name: z.string() }))
      .optional(),
    phone: z.array(z.string()).optional(),
    mobile: z.array(z.string()).optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    hours: z.array(z.object({ day: z.string(), time: z.string() })).optional(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).optional()
  })
});

const seniorentreffs = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/seniorentreffs" }),
  schema: z.object({
    ortsteil: z.string(),
    location: z.string(),
    address: z.string().optional(),
    time: z.string(),
    contactRole: z.string(),
    contactName: z.string(),
    contactAddress: z.string().optional(),
    angebote: z.array(z.string()).optional()
  })
});

const veranstaltungen = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/veranstaltungen" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      start: z.coerce.date(),
      end: z.coerce.date().optional(),
      location: z
        .object({
          name: z.string(),
          street: z.string().optional(),
          zip: z.string().optional(),
          city: z.string().optional()
        })
        .optional(),
      admission: z.array(z.string()).optional(),
      image: image().optional()
    })
});

export const collections = {
  "page-hero": pageHero,
  people,
  ortsbeiraete,
  fraktionen,
  ausschuesse,
  meldungen,
  dokumentenportal,
  "see-kurier": seeKurier,
  veranstaltungen,
  "verwaltung-mitarbeiter": verwaltungMitarbeiter,
  buergerservice,
  gesundheit,
  schulen,
  kitas,
  seniorentreffs,
  einkaufen,
  gastronomie,
  dienstleistungen,
  uebernachten,
  feuerwehr,
  vereine,
  unternehmen,
  sehenswuerdigkeiten,
  "site-kontakt": siteKontakt,
  "verwaltung-info": verwaltungInfo,
  gesundheitsdienste,
  "feuerwehr-fuehrung": feuerwehrFuehrung,
  pflegestuetzpunkt,
  "ueber-uns": ueberUns,
  ladesaeulen,
  links
};
