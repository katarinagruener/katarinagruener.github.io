import { getCollection } from "astro:content";

import type { HomeData } from "@models/home";

const peopleEntries = await getCollection("people");
const mayor = peopleEntries.find((entry) => entry.id === "carinaSimmes")?.data;

export const home: HomeData = {

  welcome: {

    title: "Herzlich willkommen!",

    paragraphs: [
      "Unsere Gemeinde hat viel zu bieten: Der für die Gemeinde namensgebende Seddiner See lädt zum Wandern, Schwimmen oder Schlittschuhlaufen ein und die Wälder zu ausgiebigen Spaziergängen. Genießen Sie die Erholung und lassen Sie sich von den Gaststätten und Cafés kulinarisch verwöhnen. Machen Sie einen Rundgang durch den Findlingsgarten, besuchen Sie das DORV-Zentrum, die Ausstellungen in der Kulturscheune oder eines unserer Feste.",
      "Für die Kinder und Jugendlichen gibt es u. a. zwei Kindertagesstätten, eine Grundschule mit Hort, einen Jugendtreff, viele Spielplätze. Für alle Altersklassen sind verschiedene Vereine und Gruppen vor Ort, die sich über Unterstützung und neue Mitglieder freuen.",
      "Über die Jahre hinweg haben sich viele Unternehmen angesiedelt, so dass man bei uns nicht nur wohnen, sondern auch arbeiten kann. Neben einer medizinischen Grundversorgung finden Sie zudem verschiedene Einkaufsmöglichkeiten.",
      "Durch die Nähe und verkehrstechnische Anbindung an Potsdam und Berlin müssen Sie auch nicht auf die Möglichkeiten verzichten, die eine Großstadt bietet.",
      "Viele weitere Infos finden Sie hier auf unseren Seiten, klicken Sie sich durch und lernen Sie uns kennen."
    ],

    mayor: {
      name: mayor?.name ?? "Carina Simmes",
      role: mayor?.role ?? "Bürgermeisterin"
    }

  }

};
