// Lagerlogistik-Template: 50 Fragen (10x5)
const jeopardyData = {
    categories: [
        { name: " Wareneingangsprüfung", questions: [
            { question: "Was wird beim Wareneingang zuerst geprüft?", answer: "Lieferschein mit Bestellung", points: 100 },
            { question: "Was ist eine Sichtkontrolle?", answer: "Prüfung auf äußere Schäden", points: 200 },
            { question: "Wann wird eine Lieferung abgelehnt?", answer: "Bei Transportschäden oder falscher Ware", points: 300 },
            { question: "Was ist eine Mengendifferenz?", answer: "Unterschied zwischen Soll und Ist", points: 400 },
            { question: "Wo wird der Wareneingang dokumentiert?", answer: "Im Warenwirtschaftssystem", points: 500 }
        ]},
        { name: " Lagerarten", questions: [
            { question: "Was ist ein Blocklager?", answer: "Ware wird direkt gestapelt", points: 100 },
            { question: "Nenne einen Vorteil von Regallagern", answer: "Übersichtlichkeit und Zugänglichkeit", points: 200 },
            { question: "Was ist ein Hochregallager?", answer: "Regal höher als 12 Meter", points: 300 },
            { question: "Was bedeutet FIFO?", answer: "First In First Out", points: 400 },
            { question: "Was ist ein Kommissionierlager?", answer: "Lager zur Zusammenstellung von Aufträgen", points: 500 }
        ]},
        { name: " Lagerkennzahlen", questions: [
            { question: "Was ist der Lagerbestand?", answer: "Menge der Ware im Lager", points: 100 },
            { question: "Was bedeutet Mindestbestand?", answer: "Untergrenze zur Vermeidung von Engpässen", points: 200 },
            { question: "Was ist der Meldebestand?", answer: "Punkt zur Neubestellung", points: 300 },
            { question: "Wie berechnet man die Umschlagshäufigkeit?", answer: "Jahresabsatz / durchschnittlicher Bestand", points: 400 },
            { question: "Was sagt die Lagerdauer aus?", answer: "Wie lange Ware im Lager liegt", points: 500 }
        ]},
        { name: " Transport & Versand", questions: [
            { question: "Was ist ein Frachtbrief?", answer: "Dokument für den Transport", points: 100 },
            { question: "Was bedeutet ab Werk?", answer: "Käufer holt Ware ab", points: 200 },
            { question: "Was ist eine Palette?", answer: "Standardisierte Ladungsträger", points: 300 },
            { question: "Nenne eine Transportart", answer: "LKW Bahn Schiff Flugzeug", points: 400 },
            { question: "Was ist ein Ladungssicherungsnetz?", answer: "Schutz vor Verrutschen", points: 500 }
        ]},
        { name: " Arbeitssicherheit", questions: [
            { question: "Was trägt man beim Kommissionieren?", answer: "Sicherheitsschuhe", points: 100 },
            { question: "Wie schwer darf eine Person max. heben?", answer: "Männer 25kg Frauen 15kg", points: 200 },
            { question: "Was ist eine PSA?", answer: "Persönliche Schutzausrüstung", points: 300 },
            { question: "Wann wird ein Hubwagen geprüft?", answer: "Vor jeder Benutzung", points: 400 },
            { question: "Was ist die UVV?", answer: "Unfallverhütungsvorschrift", points: 500 }
        ]},
        { name: " Lagerverwaltung", questions: [
            { question: "Was ist ein EAN-Code?", answer: "Europäische Artikel-Nummer Strichcode", points: 100 },
            { question: "Was macht ein Scanner?", answer: "Liest Barcodes", points: 200 },
            { question: "Was ist eine Bestandsliste?", answer: "Übersicht aller Waren im Lager", points: 300 },
            { question: "Was bedeutet ABC-Analyse?", answer: "Einteilung nach Wertigkeit", points: 400 },
            { question: "Was ist ein Lagerverwaltungssystem (LVS)?", answer: "Software zur Lagersteuerung", points: 500 }
        ]},
        { name: " Kommissionierung", questions: [
            { question: "Was ist Kommissionieren?", answer: "Zusammenstellen von Aufträgen", points: 100 },
            { question: "Was steht auf einem Kommissionierzettel?", answer: "Artikel Menge Lagerplatz", points: 200 },
            { question: "Was ist ein Pickliste?", answer: "Liste mit zu entnehmenden Artikeln", points: 300 },
            { question: "Nenne eine Kommissioniermethode", answer: "Pick-by-Paper Pick-by-Voice", points: 400 },
            { question: "Was ist ein Fehlerquote?", answer: "Prozentsatz falscher Kommissionierungen", points: 500 }
        ]},
        { name: " Inventur", questions: [
            { question: "Was ist eine Inventur?", answer: "Bestandsaufnahme im Lager", points: 100 },
            { question: "Wann findet eine Stichtagsinventur statt?", answer: "Zu einem bestimmten Datum", points: 200 },
            { question: "Was ist eine permanente Inventur?", answer: "Laufende Erfassung über das Jahr", points: 300 },
            { question: "Was sind Inventurdifferenzen?", answer: "Abweichungen zwischen Soll und Ist", points: 400 },
            { question: "Warum ist Inventur wichtig?", answer: "Für korrekte Bilanz und Bestandsgenauigkeit", points: 500 }
        ]},
        { name: " Umweltschutz", questions: [
            { question: "Wie entsorgt man Verpackungen?", answer: "Nach Material trennen", points: 100 },
            { question: "Was ist Mehrwegverpackung?", answer: "Wiederverwendbare Verpackung", points: 200 },
            { question: "Warum ist Mülltrennung wichtig?", answer: "Recycling und Umweltschutz", points: 300 },
            { question: "Was sind Gefahrstoffe?", answer: "Stoffe die gefährlich für Mensch/Umwelt sind", points: 400 },
            { question: "Was bedeutet Kreislaufwirtschaft?", answer: "Wiederverwertung von Materialien", points: 500 }
        ]},
        { name: " Wirtschaftlichkeit", questions: [
            { question: "Was sind Lagerkosten?", answer: "Kosten für Betrieb des Lagers", points: 100 },
            { question: "Warum ist niedriger Lagerbestand gut?", answer: "Weniger gebundenes Kapital", points: 200 },
            { question: "Was ist Just-in-Time?", answer: "Lieferung genau bei Bedarf", points: 300 },
            { question: "Was bedeutet Lieferbereitschaft?", answer: "Fähigkeit Aufträge sofort zu erfüllen", points: 400 },
            { question: "Was ist das Ziel der Lagerhaltung?", answer: "Optimales Verhältnis von Kosten und Service", points: 500 }
        ]}
    ]
};
