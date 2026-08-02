import type { NavigationItem } from "@models/navigation";


export const navigation: NavigationItem[] = [

  {
    title: "Willkommen",
    href: "/"
  },


  {
    title: "Gemeinde",
    children: [

      {
        title: "Über uns",
        href: "/ueber-uns"
      },

      {
        title: "Verwaltung",
        href: "/verwaltung"
      },

      {
        title: "Bürgerservice",
        href: "/gemeinde/buergerservice"
      },

      {
        title: "Gemeindevertretung",
        href: "/gemeinde/gemeindevertretung"
      },

      {
        title: "Ortsbeiräte",
        href: "/gemeinde/ortsbeiraete",

        children: [

          {
            title: "Kähnsdorf",
            href: "/gemeinde/ortsbeiraete/kaehnsdorf"
          },

          {
            title: "Neuseddin",
            href: "/gemeinde/ortsbeiraete/neuseddin"
          },

          {
            title: "Seddin",
            href: "/gemeinde/ortsbeiraete/seddin"
          }

        ]
      },

      {
        title: "Dokumentenportal",
        href: "/gemeinde/dokumentenportal"
      }

    ]
  },


  {
    title: "Aktuelles",
    href: "/meldungen",
    children: [

      {
        title: "Meldungen",
        href: "/meldungen"
      },

      {
        title: "Veranstaltungen",
        href: "/kultur/veranstaltungen"
      },

      {
        title: "See-Kurier",
        href: "/gemeinde/see-kurier"
      }

    ]
  },


{
  title: "Bildung & Soziales",
  children: [
    {
      title: "Kitas",
      href: "/bildung-soziales/kitas"
    },
    {
      title: "Schulen",
      href: "/bildung-soziales/schulen"
    },
    {
      title: "Senioren & Pflege",
      href: "/bildung-soziales/senioren"
    },
    {
      title: "Projekt „Stark vor Ort\"",
      href: "/bildung-soziales/stark-vor-ort"
    },
    {
      title: "Jugendtreff „Escape\"",
      href: "/bildung-soziales/jugendtreff-escape"
    }
  ]
},


{
  title: "Leben & Freizeit",
  children: [
    {
      title: "Einkaufen & Tanken",
      href: "/leben-freizeit/einkaufen"
    },
    {
      title: "Gastronomie",
      href: "/leben-freizeit/gastronomie"
    },
    {
      title: "Dienstleistungen",
      href: "/leben-freizeit/dienstleistungen"
    },
    {
      title: "Übernachten",
      href: "/leben-freizeit/uebernachten"
    },
    {
      title: "Gesundheit",
      href: "/leben-freizeit/gesundheit"
    },
    {
      title: "Freiwillige Feuerwehr",
      href: "/leben-freizeit/feuerwehr"
    },
    {
      title: "Vereine & Sport",
      href: "/leben-freizeit/vereine"
    }
  ]
},


{
  title: "Kontakt",
  href: "/kontakt"
}

];
