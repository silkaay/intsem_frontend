document.addEventListener('DOMContentLoaded', function () {
    const createButton = document.getElementById('buttonspeichern');
    createButton.addEventListener('click', sendData);
});

    function sendData() {
    const titel = document.getElementById('titel').value;
    const anfangszeitpunkt = document.getElementById('anfangszeitpunkt').value;
    const endzeitpunkt = document.getElementById('endzeit').value;
    const anmeldezeitpunkt = document.getElementById('anmeldezeitpunkt').value;
    const beschreibung = document.getElementById('beschreibung').value;

    const data = {
    titel: titel,
    anfangszeitpunkt: anfangszeitpunkt,
    endzeitpunkt: endzeitpunkt,
    anmeldestart: anmeldezeitpunkt,
    beschreibung: beschreibung
};

    fetch("http://localhost:8080/createVeranstaltungsgruppe", {
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
