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
    images: z.array(z.object({ src: z.string(), alt: z.string() })),
    members: z.array(z.string()),
    history: z.array(z.string()).optional()
  })
});

const meldungen = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/meldungen" }),
  schema: z.object({
    title: z.string(),
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

const gesundheit = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/gesundheit" }),
  schema: z.object({
    name: z.string(),
    type: z.enum(["arzt", "zahnarzt", "apotheke", "physiotherapie"]),
    icon: z.string().optional(),
    role: z.array(z.string()).optional(),
    address: z.string(),
    phone: z.array(z.string()).optional(),
    mobile: z.array(z.string()).optional(),
    fax: z.string().optional(),
    website: z.string().optional(),
    hours: z.array(z.object({ day: z.string(), time: z.string() })).optional(),
    hoursNote: z.string().optional(),
    bookingUrl: z.string().optional()
  })
});

const einkaufen = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/einkaufen" }),
  schema: z.object({
    name: z.string(),
    type: z.enum(["geschaeft", "tankstelle"]).optional(),
    icon: z.string().optional(),
    address: z.string(),
    phone: z.array(z.string()).optional(),
    mobile: z.array(z.string()).optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    note: z.string().optional(),
    hours: z.array(z.object({ day: z.string(), time: z.string() })).optional(),
    hoursNote: z.string().optional()
  })
});

const gastronomie = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/gastronomie" }),
  schema: z.object({
    name: z.string(),
    type: z.enum(["restaurant", "cafe", "kantine", "imbiss"]).optional(),
    icon: z.string().optional(),
    address: z.string(),
    phone: z.array(z.string()).optional(),
    mobile: z.array(z.string()).optional(),
    fax: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    note: z.string().optional(),
    hours: z.array(z.object({ day: z.string(), time: z.string() })).optional(),
    hoursNote: z.string().optional()
  })
});

const uebernachten = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/uebernachten" }),
  schema: z.object({
    name: z.string(),
    type: z.enum(["hotel", "pension", "ferienwohnung", "ferienhaus", "zimmer"]).optional(),
    icon: z.string().optional(),
    address: z.string(),
    phone: z.array(z.string()).optional(),
    mobile: z.array(z.string()).optional(),
    fax: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    note: z.string().optional()
  })
});

const dienstleistungen = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/dienstleistungen" }),
  schema: z.object({
    name: z.string(),
    type: z.enum(["post", "friseur", "massage", "tierpflege"]).optional(),
    icon: z.string().optional(),
    address: z.string(),
    phone: z.array(z.string()).optional(),
    mobile: z.array(z.string()).optional(),
    fax: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional(),
    note: z.string().optional(),
    hours: z.array(z.object({ day: z.string(), time: z.string() })).optional(),
    hoursNote: z.string().optional()
  })
});

const feuerwehr = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/feuerwehr" }),
  schema: z.object({
    name: z.string(),
    type: z.enum(["ortsfeuerwehr", "jugendfeuerwehr", "kinderfeuerwehr"]),
    icon: z.string().optional(),
    roles: z.array(z.string()),
    phone: z.array(z.string()).optional(),
    email: z.string().optional(),
    website: z.string().optional()
  })
});

const vereine = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/vereine" }),
  schema: z.object({
    name: z.string(),
    category: z.enum(["sport", "angeln", "garten", "sonstige", "freizeit"]),
    icon: z.string().optional(),
    address: z.string().optional(),
    roles: z.array(z.string()).optional(),
    phone: z.array(z.string()).optional(),
    fax: z.string().optional(),
    email: z.string().optional(),
    website: z.string().optional()
  })
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
      .array(z.object({ role: z.string(), name: z.string() }))
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
  vereine
};
