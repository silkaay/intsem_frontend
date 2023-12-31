// Eventlistener hinzufügen, um den Code auszuführen, wenn die Seite vollständig geladen ist.
document.addEventListener('DOMContentLoaded', function () {
    // Deine Funktion hier aufrufen.
    fetchAllefreieOrg();
});
function fetchAllefreieOrg() {

    // Übergebe den Authentifizierungstoken im Authorization-Header (Bearer-Token).
    fetch("http://localhost:8080/getAllEnabledOrganisatoren", {
        method: 'GET',
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            renderAllefreieOrg(data);
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen:', error);
        });
}
function renderAllefreieOrg(users) {
    console.log(users)
    const container = document.getElementById('freieOrg');

    users.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('col-md-12');
        card.innerHTML = `
            <div class="card mt-4">
                <div class="row no-gutters">
                    <div class="col-md-3 d-flex align-items-center">
                        <div class="d-flex flex-column align-items-center w-100">
                            <h3 class="card-text text-center">freigebene Organistation</h3>
                        </div>
                        <div class="vertical-line"></div>
                    </div>
                    <div class="col-md-7">
                        <div class="card-body align-items-center">
                            <p class="card-text">${user.name}</p>
                            <p class="card-text">${user.email}</p>
                            
                        </div>
                    </div>
                    <div class="col-md-2 d-flex flex-column align-items-center justify-content-center">
                        <button type="button" class="btn btn-secondary details-button">Details</button>
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
            <div class="card-body align-items-center">
                <h2 class="card-text">Benutzerdetails</h2>
                <br>
                <div class="row">
                    <div class="col-md-3"><p>Organistation:</p></div>
                    <div class="col-md-9"><p>${user.name}</p></div>
                </div>
                <div class="row">
                    <div class="col-md-3"><p>Email: </p></div>
                    <div class="col-md-9"><p>${user.email}</p></div>
                </div>
                <div class="row">
                    <div class="col-md-3"><p>Anschrift:</p></div>
                    <div class="col-md-9"><p>${user.anschrift.strasse} ${user.anschrift.hausnummer}, ${user.anschrift.plz} ${user.anschrift.ort}</p></p></div>
                </div>
                <div class="row">
                    <div class="col-md-3"><p>Verifiziert:</p></div>
                    <div class="col-md-9"><p>${user.verified? 'Ja' : 'Nein'}</p></div>
                </div>
                <div class="row">
                    <div class="col-md-3"> <p>Begründung:</p></div>
                    <div class="col-md-9"><p>${user.nutzungsbegruendung}</p></div>
                </div>
                <div class="row">
                    <div class="col-md-3"><p>Anzahl veröffentlichter Veranstaltungen:</p></div>
                    <div class="col-md-9"><p>${user.veranstaltungen}</p></div>
                </div>
                <br>
                <p><b>Ansprechperson:</b></p>
                <div class="row">
                    <div class="col-md-3"><p>Vorname:</p></div>
                    <div class="col-md-9"><p>${user.ansprechpartnerVorname}</p></div>
                </div>
                <div class="row">
                    <div class="col-md-3"><p>Nachname:</p></div>
                    <div class="col-md-9"><p>${user.ansprechpartnerNachname}</p></div>
                </div>
                <div class="row">
                    <div class="col-md-3"><p>Telefonnummer:</p></div>
                    <div class="col-md-9"><p>${user.telefonnummer}</p></div>
                </div>
                
                 
                <br>
                <button class="btn btn-danger" onclick="redirectToDelete(${user.id})">Account Löschen</button>
                  <!-- Weitere Informationen hier hinzufügen -->
            </div>
        </div>
    `;

    // Füge die Benutzerdetails-Karte dem Dokument hinzu
    const container = document.getElementById('freieOrg');
    container.innerHTML = ''; // Entferne vorherige Inhalte
    container.appendChild(userDetailsCard);
}

function redirectToDelete(userId) {
    // Erstelle die URL mit der übergebenen VeranstaltungsgruppenId
    const releaseUrl = `http://localhost:8080/deleteAccount/${userId}`;

    // Konfigurieren Sie die fetch-Anforderung für POST
    fetch(releaseUrl, {
        method: 'DELETE',
        credentials: 'include',
    })
        .then(response => {
            if (response.ok) {
                // Erfolgreiche Antwort
                location.reload(); // Seite neu laden
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