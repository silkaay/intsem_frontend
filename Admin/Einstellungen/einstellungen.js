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
            document.getElementById("vorname").textContent = "Vorname: " + data.vorname;
            document.getElementById("nachname").textContent = "Nachname: " + data.nachname;
            document.getElementById("anschrift").textContent = "Anschrift: " + data.anschrift.strasse + " " + data.anschrift.hausnummer + ", " + data.anschrift.plz + " " + data.anschrift.ort;
            document.getElementById("telefon").textContent = "Telefonnummer: " + data.telefonnummer;
            document.getElementById("email").textContent = "Email: " + data.email;
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen-Details:', error);
        });
}