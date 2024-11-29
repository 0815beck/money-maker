export type Wisdom = {
    content: string[],
    source?: string
}

const wisdom: Wisdom[] = [
    {content: ["Wer den Tag im Bett verpennt,", "wird vom Leben abgehängt."]},
    {content: ["In guten wie in schlechten Zeiten:", "man muss sich immer hocharbeiten."]},
    {content: ["Verlass dich bloß nicht auf den Staat,", "arbeite stattdessen hart."]},
    {content: ["Niemand muss in Armut leben..", "du musst dir einfach Mühe geben."]},
    {content: ["Nicht Freundschaft, Kunst, nicht Fantasie,", "im Leben gehts um Hierachie."]},
    {content: ["Sage zur Gewerkschaft nein,", "du willst nicht Kommunistin sein."]},
    {content: ["Viele Chancen sich vermasselt,", "wer nicht jede Stunde husselt."]},
    {content: ["Steige jetzt ein oder nie,", "kaufe dir ein NFT!"]},
    {content: ["Der Kunde wartet schon."], source: "Lindner 1997"},
    {content: ["Der eine wartet, dass die Zeit sich wandelt,", "der andre packt sie an und handelt"], source: "Lindner 1997"},
    {content: ["Rann an die Arbeit, Arbeit bewältigen.", "Probleme sind nur dornige Chancen."], source: "Lindner 1997"},
    {content: ["Auf dem Weg zum Erflog gibt es keinen Aufzug.", "Man muss schon die Treppen benutzen."], source: "Lindner 1997"}
];

export function getRandomWisdom(): Wisdom {
    let index = Math.floor(Math.random() * wisdom.length);
    return wisdom[index];
}