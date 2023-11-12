
document.getElementById("buttonzurückInformationenÄndern").addEventListener("click", function() {
    window.location.href = "einstellungen.html";
});
document.addEventListener('DOMContentLoaded', function () {
    // Hier kannst du den Rest deines Codes hinzufügen, der auf die ID zugreift.
    fetch(`http://localhost:8080/getLoggedInUser`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            // Führe deine gewünschten Aktionen durch
            console.log(data);
            document.getElementById('vorname').value = data.vorname;
            document.getElementById('nachname').value = data.nachname;
            document.getElementById('straße').value = data.anschrift.strasse;
            document.getElementById('hausnummer').value = data.anschrift.hausnummer;
            document.getElementById('postleitzahl').value = data.anschrift.plz;
            document.getElementById('ort').value = data.anschrift.ort;
            document.getElementById('telefonnummer').value = data.telefonnummer;
            document.getElementById('email').value = data.email;
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen-Details:', error);
        });
});
document.addEventListener('DOMContentLoaded', function () {
    const createButton = document.getElementById('buttonspeichern');
    createButton.addEventListener('click', openConfirmationModal);
});

function openConfirmationModal() {
    // Öffne das Bestätigungsmodal
    const confirmationModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    confirmationModal.show();
}

// Der Bestätigungsmodal enthält den "Änderungen speichern"-Button
document.getElementById("aenderungspeichern").addEventListener("click", sendData);

function sendData(event) {
    // Hinzufügen von 'event' als Parameter, um auf das event-Objekt zuzugreifen
    event.preventDefault();  // Stoppt das Standardverhalten des Formulars
    const vorname = document.getElementById('vorname').value;
    const nachname = document.getElementById('nachname').value;
    const straße = document.getElementById('straße').value;
    const hausnummer = document.getElementById('hausnummer').value;
    const plz = document.getElementById('postleitzahl').value;
    const ort = document.getElementById('ort').value;
    const tele = document.getElementById('telefonnummer').value;
    const email = document.getElementById('email').value;


    const data = {
        vorname: vorname,
        nachname: nachname,
        strasse: straße,
        hausnummer: hausnummer,
        plz: plz,
        ort: ort,
        telefonnummer: tele,
        email: email
    };
    console.log(data);

    fetch("http://localhost:8080/updateUser", {
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
            window.location.href = 'einstellungen.html';

        })
        .catch(error => {
            console.error('Fehler beim Senden der Daten:', error);
        });
}
