document.getElementById("buttonAllgInfoBearbeiten").addEventListener("click", function() {
    window.location.href = "einstellungenAllgInfoBearbeiten.html";
});

document.getElementById("buttonPasswortaendern").addEventListener("click", function() {
    window.location.href = "einstellungenPasswortAendern.html";
});
document.addEventListener('DOMContentLoaded', function () {
    // Deine Funktion hier aufrufen.
    getLoggedInUser();
});

function getLoggedInUser() {
    fetch(`http://localhost:8080/getLoggedInUser`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("name").textContent = "Name: " + data.name;
            document.getElementById("email").textContent = "Email: " + data.email;
            document.getElementById("anschrift").textContent = "Anschrift: " + data.anschrift.strasse + " " + data.anschrift.hausnummer + ", " + data.anschrift.plz + " " + data.anschrift.ort;
            document.getElementById("vornameAnsprech").textContent = "Vorname Ansprechpartner: " + data.ansprechpartnerVorname;
            document.getElementById("nachnameAnsprech").textContent = "Nachname Ansprechpartner: " + data.ansprechpartnerNachname;
            document.getElementById("telefonAnsprech").textContent = "Telefon Ansprechpartner: " + data.telefonnummer;
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen-Details:', error);
        });
}

document.getElementById("AccountLoeschen").addEventListener("click", function() {
    accountloeschen();
});

function accountloeschen(){
    const releaseUrl = `http://localhost:8080/deleteAccount`;

    // Konfigurieren Sie die fetch-Anforderung für POST
    fetch(releaseUrl, {
        method: 'POST',
        credentials: 'include',
    })
        .then(response => {
            if (response.ok) {
                // Erfolgreiche Antwort
                window.location.href = "../../Nichteingeloggt/veranstaltungen.html"; // Seite neu laden
            } else {
                // Fehlerhafte Antwort
                console.error('Fehler bei der Anforderung:', response.status, response.statusText);
            }
        })
        .catch(error => {
            // Fehler bei der Anforderung
            console.error('Fehler bei der Anforderung:', error);
        });

}