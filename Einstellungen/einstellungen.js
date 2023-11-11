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
            document.getElementById("anschrift").textContent = "Anschrift: " + data.anschrift.strasse + " " + data.anschrift.hausnummer + ", " + data.anschrift.plz + " " + data.anschrift.ort;
            document.getElementById("vornameAnsprech").textContent = "Vorname Ansprechpartner: " + data.ansprechpartnerVorname;
            document.getElementById("nachnameAnsprech").textContent = "Nachname Ansprechpartner: " + data.ansprechpartnerNachname;
            document.getElementById("telefonAnsprech").textContent = "Telefon Ansprechpartner: " + data.telefonnummer;
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen-Details:', error);
        });
}