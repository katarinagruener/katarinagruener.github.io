import { getCollection } from "astro:content";

const peopleEntries = await getCollection("people");

type Person = (typeof peopleEntries)[number]["data"];

const peopleById = Object.fromEntries(
  peopleEntries.map((entry) => [entry.id, entry.data])
);

const people = new Proxy(peopleById, {
  get(target, id: string) {
    if (!(id in target)) {
      throw new Error(
        `gemeindevertretung.ts references unknown person id "${id}" — check that src/content/people/${id}.json exists`
      );
    }
    return target[id];
  }
}) as Record<string, Person>;



export interface Fraktion {

  title: string;

  chairman?: Person;

  members: Person[];

}



export interface Ausschuss {

  title: string;

  chairman?: Person;

  members: Person[];

  sachkundigeEinwohner?: Person[];

}





export const gemeindevertretung = {


  title:
    "Gemeindevertretung Seddiner See",



  informationSystem:
    "https://ratsinfo-online.de/seddinersee-bi/si010_e.asp",





  fraktionen: [



    {
      title:
        "Brandenburger vereinigte Bürgerbewegungen / Freie Wähler Seddiner See (BVB/FW Seddiner See)",

      chairman:
        people.beatriceKirchhof,

      members: [

        people.juergenWagler,

        people.andreBiermann,

        people.doreenDobiasch,

        people.marioPenkert

      ]

    },





    {
      title:
        "Unabhängige Wählergruppe pro Gemeinde Seddiner See (UWGS)",

      chairman:
        people.benjaminBoege,

      members: [

        people.henryBoege,

        people.silkeSchulze,

        people.mandyStrauss

      ]

    },





    {
      title:
        "Die Linke",

      chairman:
        people.andreBirkner,

      members: [

        people.mathiasFrey,

        people.janSchoenauer

      ]

    },





    {
      title:
        "Listenvereinigung Wählergemeinschaft Vereine (WGV)",

      chairman:
        people.andreasBauch,

      members: [

        people.alexanderZinke

      ]

    },





    {
      title:
        "Wählergruppe Neuseddin Kähnsdorf Seddin (WGNKS)",

      members: [

        people.emanuelPantel

      ]

    },





    {
      title:
        "Sozialdemokratische Partei Deutschlands (SPD)",

      members: [

        people.marcelHauke

      ]

    }



  ] as Fraktion[],








  ausschuesse: [



    {
      title:
        "Hauptausschuss",

      chairman:
        people.carinaSimmes,

      members: [

        people.benjaminBoege,

        people.marioPenkert,

        people.mathiasFrey,

        people.andreasBauch,

        people.emanuelPantel,

        people.marcelHauke

      ]

    },





    {
      title:
        "Bauausschuss",

      chairman:
        people.andreasBauch,

      members: [

        people.mandyStrauss,

        people.andreBiermann,

        people.janSchoenauer,

        people.emanuelPantel

      ]

    },





    {
      title:
        "Sozialausschuss",

      chairman:
        people.beatriceKirchhof,

      members: [

        people.silkeSchulze,

        people.andreBirkner,

        people.alexanderZinke,

        people.emanuelPantel

      ]

    },





    {
      title:
        "Finanzausschuss",

      chairman:
        people.janSchoenauer,

      members: [

        people.alexanderZinke,

        people.doreenDobiasch,

        people.henryBoege,

        people.emanuelPantel

      ]

    },

        {

      title:
        "Ortsentwicklungsausschuss",

      chairman:
        people.juergenWagler,

      members: [

        people.benjaminBoege,

        people.janSchoenauer,

        people.andreasBauch,

        people.marcelHauke

      ],


      sachkundigeEinwohner: [

        people.alexanderSommer,

        people.mirkoPierdzig,

        people.marioMaiwald

      ]

    }



  ] as Ausschuss[]



};