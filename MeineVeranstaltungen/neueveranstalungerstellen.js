// Funktion zum Abrufen aller Veranstaltungsgruppen und Aktualisieren des Dropdown-Menüs
function updateVeranstaltungsgruppenDropdown() {
    const dropdown = document.getElementById('gruppenid');

    // Mock-Aufruf des Endpunkts (ersetze dies durch einen echten Fetch-Aufruf)
    fetch('http://localhost:8080/getAllVeranstaltungsgruppen')
        .then(response => response.json())
        .then(data => {
            // Leere das Dropdown-Menü
            dropdown.innerHTML = '';

            // Füge Optionen basierend auf den Daten hinzu
            data.forEach(gruppe => {
                const option = document.createElement('option');
                option.value = gruppe.id; // Verwende die ID der Gruppe als Wert
                option.text = gruppe.titel; // Verwende den Titel der Gruppe als sichtbaren Text
                dropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen:', error);
        });
}

// Rufe die Funktion auf, um das Dropdown-Menü zu initialisieren
updateVeranstaltungsgruppenDropdown();

//Veranstalung ertellen
document.addEventListener('DOMContentLoaded', function () {
    const createButton = document.getElementById('buttonspeichern');
    createButton.addEventListener('click', sendData);
});

function sendData() {
    const titel = document.getElementById('titel').value;
    const beschreibung = document.getElementById('beschreibung').value;
    const maxTeilnehmer = document.getElementById('maxteilnehmer').value;
    const kosten = document.getElementById('kosten').value;
    const bedinngung = document.getElementById('bedingungen').value;
    const anmeldefrist = document.getElementById('anmeldefrist').value;
    const startdatum = document.getElementById('anfangszeitpunkt').value;
    const startzeit = document.getElementById('anfangszeitpunktUhr').value;
    const enddatum = document.getElementById('endzeit').value;
    const endzeit = document.getElementById('endzeitUhr').value;
    const plz = document.getElementById('plz').value;
    const ort= document.getElementById('ort').value;
    const strasse = document.getElementById('strasse').value;
    const hausnummer = document.getElementById('hausnummer').value;
    const dropdown = document.getElementById('gruppenid');
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const veranstaltungsgruppenId = selectedOption.value;

    const data = {
        titel: titel,
        beschreibung: beschreibung,
        maxTeilnehmer: maxTeilnehmer,
        kosten: kosten,
        weitereBedingungen: bedinngung,
        anmeldefrist: anmeldefrist,
        startdatum: startdatum,
        startzeit: startzeit,
        enddatum: enddatum,
        endzeit: endzeit,
        plz: plz,
        ort: ort,
        strasse: strasse,
        hausnummer: hausnummer,
        veranstaltungsgruppeId: veranstaltungsgruppenId
    };

    fetch("http://localhost:8080/createVeranstaltung", {
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
