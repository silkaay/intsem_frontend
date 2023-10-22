// Eventlistener hinzufügen, um den Code auszuführen, wenn die Seite vollständig geladen ist.
document.addEventListener('DOMContentLoaded', function () {
    // Deine Funktion hier aufrufen.
    fetchAdmin();
});
function fetchAdmin() {

    // Übergebe den Authentifizierungstoken im Authorization-Header (Bearer-Token).
    fetch("http://localhost:8080/getAllAdmins", {
        method: 'GET',
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            renderAdmin(data);
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen:', error);
        });
}
function renderAdmin(users) {
    const container = document.getElementById('admin');

    users.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('col-md-12');
        card.innerHTML = `
            <div class="card mt-3">
                <div class="row no-gutters">
                    <div class="col-md-2 d-flex align-items-center">
                        <div class="d-flex flex-column align-items-center w-100">
                            <h2 class="card-text text-center">Admin</h2>
                        </div>
                        <div class="vertical-line"></div>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body align-items-center">
                            <p class="card-text">${user.vorname} ${user.nachname}</p>
                            <p class="card-text">${user.email}</p>
                            
                        </div>
                    </div>
                    <div class="col-md-2 d-flex flex-column align-items-center justify-content-center">
                        <button type="button" class="btn btn-primary details-button">Details</button>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);

        // Event-Handler für den "Details"-Button
        const detailsButton = card.querySelector('.details-button');
        detailsButton.addEventListener('click', () => showUserDetails(user));
    });
}

function showUserDetails(user) {
    // Erstelle eine neue Karte für die Benutzerdetails
    const userDetailsCard = document.createElement('div');
    userDetailsCard.className = 'col-md-12';
    userDetailsCard.innerHTML = `
        <div class="card mt-3">
            <div class="card-body">
                <h2 class="card-text">Benutzerdetails</h2>
                <br>
                <p>ID: ${user.id}</p>
                <p>Vorname: ${user.vorname}</p>
                <p>Nachname: ${user.nachname}</p>
                <p>Email: ${user.email}</p>
                <p>Telefonnummer: ${user.telefonnummer}</p>
                <p>Verifiziert: ${user.verified ? 'Ja' : 'Nein'}</p>
                <p>Anschrift: ${user.anschrift.strasse} ${user.anschrift.hausnummer}, ${user.anschrift.plz} ${user.anschrift.ort}</p>
                
                <!-- Weitere Informationen hier hinzufügen -->
            </div>
        </div>
    `;

    // Füge die Benutzerdetails-Karte dem Dokument hinzu
    const container = document.getElementById('admin');
    container.innerHTML = ''; // Entferne vorherige Inhalte
    container.appendChild(userDetailsCard);
}
