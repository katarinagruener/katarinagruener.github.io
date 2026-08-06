import type { SiteConfig } from "@models/site";

export const site: SiteConfig = {
  name: "Gemeinde Seddiner See",

  description:
    "Offizielle Website der Gemeinde Seddiner See",

  contacts: {
    organization: "Gemeindeverwaltung",

    address: {
      street: "Kiefernweg 5",
      zip: "14554",
      city: "Seddiner See"
    },

    phone: "033205 / 536-0",

    fax: "033205 / 53627",

    email: "info@seddiner-see.de"
  },

  legal: {
    imprint: "/impressum",

    privacy: "/datenschutz"
  }
};