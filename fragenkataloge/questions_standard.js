/*
    🎯 STANDARD-MODUS FRAGEN
    Allgemeinwissen ohne Berufsfokus - Für alle
    Entwickler: Nico Kaschube | Oberlinhaus Oberhausen | 2025
*/

// Fragen-Datenbank
const jeopardyData = {
    categories: [
        {
            name: "Allgemeinwissen",
            questions: [
                { question: "Wie viele Bundesländer hat Deutschland?", answer: "16", points: 100 },
                { question: "Welche Farben hat die deutsche Flagge?", answer: "Schwarz-Rot-Gold", points: 200 },
                { question: "Was ist die Hauptstadt von Frankreich?", answer: "Paris", points: 300 },
                { question: "Wie viele Kontinente gibt es?", answer: "7 (Afrika, Antarktika, Asien, Australien, Europa, Nordamerika, Südamerika)", points: 400 },
                { question: "In welchem Jahr fiel die Berliner Mauer?", answer: "1989", points: 500 }
            ]
        },
        {
            name: "Mathematik & Logik",
            questions: [
                { question: "Was ist 5 + 7?", answer: "12", points: 100 },
                { question: "Was ist 8 × 9?", answer: "72", points: 200 },
                { question: "Was ist die Quadratwurzel aus 144?", answer: "12", points: 300 },
                { question: "Wie viel Prozent sind 1/4?", answer: "25%", points: 400 },
                { question: "Was ist die Summe aller Zahlen von 1 bis 10?", answer: "55", points: 500 }
            ]
        },
        {
            name: "Deutsch & Sprache",
            questions: [
                { question: "Was ist das Gegenteil von 'groß'?", answer: "Klein", points: 100 },
                { question: "Wie heißt der Plural von 'Kind'?", answer: "Kinder", points: 200 },
                { question: "Was bedeutet das Wort 'obsolet'?", answer: "Veraltet, nicht mehr gebräuchlich", points: 300 },
                { question: "Welche Wortart ist 'schnell'?", answer: "Adjektiv", points: 400 },
                { question: "Was ist ein Palindrom?", answer: "Ein Wort das vorwärts und rückwärts gleich ist (z.B. Otto)", points: 500 }
            ]
        },
        {
            name: "Kultur & Geschichte",
            questions: [
                { question: "Wer malte die Mona Lisa?", answer: "Leonardo da Vinci", points: 100 },
                { question: "In welchem Jahr begann der Zweite Weltkrieg?", answer: "1939", points: 200 },
                { question: "Wer schrieb 'Faust'?", answer: "Johann Wolfgang von Goethe", points: 300 },
                { question: "Wie heißt das höchste Gebäude der Welt?", answer: "Burj Khalifa", points: 400 },
                { question: "Wer komponierte die 9. Sinfonie?", answer: "Ludwig van Beethoven", points: 500 }
            ]
        },
        {
            name: "Wissenschaft & Natur",
            questions: [
                { question: "Wie viele Planeten hat unser Sonnensystem?", answer: "8", points: 100 },
                { question: "Was ist H2O?", answer: "Wasser", points: 200 },
                { question: "Welches ist das größte Säugetier der Welt?", answer: "Blauwal", points: 300 },
                { question: "Bei welcher Temperatur gefriert Wasser?", answer: "0 Grad Celsius", points: 400 },
                { question: "Wie lange braucht das Licht von der Sonne zur Erde?", answer: "Etwa 8 Minuten", points: 500 }
            ]
        }
    ]
};
