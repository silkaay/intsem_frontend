document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('ID:', id);

    // Hier kannst du den Rest deines Codes hinzufügen, der auf die ID zugreift.
    fetch(`http://localhost:8080/getVeranstaltungsDetails/${id}`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            // Führe deine gewünschten Aktionen durch
            console.log(data);
            document.getElementById('titel').value = data.titel;
            document.getElementById('anfangszeitpunkt').value = data.startdatum;
            document.getElementById('anfangszeitpunktUhr').value = data.startzeit;
            document.getElementById('endzeit').value = data.enddatum;
            document.getElementById('endzeitUhr').value = data.endzeit;
            document.getElementById('anmeldefrist').value = data.anmeldefrist;
            document.getElementById('strasse').value = data.anschrift.strasse;
            document.getElementById('hausnummer').value = data.anschrift.hausnummer;
            document.getElementById('plz').value = data.anschrift.plz;
            document.getElementById('ort').value = data.anschrift.ort;
            document.getElementById('beschreibung').value = data.beschreibung;
            document.getElementById('bedingungen').value = data.weitereBedingungen;
            document.getElementById('kosten').value = data.kosten;
            document.getElementById('maxteilnehmer').value = data.maxTeilnehmer;

        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen-Details:', error);
        });
});

document.addEventListener('DOMContentLoaded', function () {
    const createButton = document.getElementById('buttonspeichern');
    createButton.addEventListener('click', sendData);
});

function sendData(event) {
    // Hinzufügen von 'event' als Parameter, um auf das event-Objekt zuzugreifen
    event.preventDefault();  // Stoppt das Standardverhalten des Formulars
    const titel = document.getElementById('titel').value;
    const anfangdatum = document.getElementById('anfangszeitpunkt').value;
    const anfangzeit = document.getElementById('anfangszeitpunktUhr').value;
    const endzeit = document.getElementById('endzeit').value;
    const endzeituhr = document.getElementById('endzeitUhr').value;
    const frist = document.getElementById('anmeldefrist').value;
    const strasse = document.getElementById('strasse').value;
    const hausnummer = document.getElementById('hausnummer').value;
    const plz = document.getElementById('plz').value;
    const ort = document.getElementById('ort').value;
    const beschreibung = document.getElementById('beschreibung').value;
    const bedingung = document.getElementById('bedingungen').value;
    const kosten = document.getElementById('kosten').value;
    const maxteilnehmer = document.getElementById('maxteilnehmer').value;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const data = {
        id: id,
        titel: titel,
        startdatum: anfangdatum,
        startzeit: anfangzeit,
        enddatum: endzeit,
        endzeit: endzeituhr,
        anmeldefrist: frist,
        strasse: strasse,
        hausnummer: hausnummer,
        plz: plz,
        ort: ort,
        weitereBedingungen: bedingung,
        kosten: kosten,
        maxTeilnehmer: maxteilnehmer,
        beschreibung: beschreibung
    };
    console.log(data);

    fetch("http://localhost:8080/updateVeranstaltung", {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(responseData => {
            // Hier kannst du die Serverantwort verarbeiten
            console.log('Serverantwort:', responseData);
            // Umleiten oder andere Aktionen durchführen, wenn nötig
            window.location.href = 'meineVeranstaltungen.html';

        })
        .catch(error => {
            console.error('Fehler beim Senden der Daten:', error);
        });
}