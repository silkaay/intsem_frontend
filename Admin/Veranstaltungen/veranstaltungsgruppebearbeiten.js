document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('ID:', id);

    // Hier kannst du den Rest deines Codes hinzufügen, der auf die ID zugreift.
    fetch(`http://localhost:8080/getVeranstaltungsgruppenDetails/${id}`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            // Führe deine gewünschten Aktionen durch
            console.log(data);
            document.getElementById('titel').value = data.titel;
            document.getElementById('anfangszeitpunkt').value = data.anfangszeitpunkt;
            document.getElementById('endzeit').value = data.endzeitpunkt;
            document.getElementById('anmeldezeitpunkt').value = data.anmeldestart;
            document.getElementById('beschreibung').value = data.beschreibung;
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
    const anfangszeitpunkt = document.getElementById('anfangszeitpunkt').value;
    const endzeitpunkt = document.getElementById('endzeit').value;
    const anmeldezeitpunkt = document.getElementById('anmeldezeitpunkt').value;
    const beschreibung = document.getElementById('beschreibung').value;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const data = {
        id: id,
        titel: titel,
        anfangszeitpunkt: anfangszeitpunkt,
        endzeitpunkt: endzeitpunkt,
        anmeldestart: anmeldezeitpunkt,
        beschreibung: beschreibung
    };
    console.log(data);

    fetch("http://localhost:8080/updateVeranstaltungsgruppe", {
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
            window.location.href = 'veranstaltungen.html';

        })
        .catch(error => {
            console.error('Fehler beim Senden der Daten:', error);
        });
}

