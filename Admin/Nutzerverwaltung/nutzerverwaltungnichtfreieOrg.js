// Eventlistener hinzufügen, um den Code auszuführen, wenn die Seite vollständig geladen ist.
document.addEventListener('DOMContentLoaded', function () {
    // Deine Funktion hier aufrufen.
    fetchAllenichtfreieOrg();
});
function fetchAllenichtfreieOrg() {

    // Übergebe den Authentifizierungstoken im Authorization-Header (Bearer-Token).
    fetch("http://localhost:8080/getAllUnenabledOrganisatoren", {
        method: 'GET',
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            renderAllenichtfreieOrg(data);
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen:', error);
        });
}
function renderAllenichtfreieOrg(users) {
    console.log(users)
    const container = document.getElementById('nichtfreieOrg');

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
                <div class="row">
                    <div class="col-md-10"> <button class="btn btn-danger" onclick="redirectToDelete(${user.id})">Account Löschen</button></div>
                    <div class="col-md-2"> <button class="btn btn-success" onclick="redirectToRelease(${user.id})">Freigeben</button></div>
                </div>
                
                <!-- Weitere Informationen hier hinzufügen -->
            </div>
        </div>
    `;

    // Füge die Benutzerdetails-Karte dem Dokument hinzu
    const container = document.getElementById('nichtfreieOrg');
    container.innerHTML = ''; // Entferne vorherige Inhalte
    container.appendChild(userDetailsCard);
}

function redirectToRelease(userId) {
    // Show the release modal
    const orgaModal = new bootstrap.Modal(document.getElementById('orgaModal'));
    orgaModal.show();

    // Handle release action when the user confirms
    const confirmReleaseBtn = document.getElementById('confirmReleaseBtn');
    confirmReleaseBtn.addEventListener('click', function () {
        // Call the enable organizator endpoint
        const releaseUrl = `http://localhost:8080/enableOrganisator/${userId}`;

        fetch(releaseUrl, {
            method: 'POST',
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    // Successful response
                    location.reload(); // Reload the page
                } else {
                    // Error response
                    console.error('Fehler bei der Anforderung:', response.status, response.statusText);
                }
            })
            .catch(error => {
                // Error in the request
                console.error('Fehler bei der Anforderung:', error);
            });
    });
}

function redirectToDelete(userId) {
    // Show the delete account modal
    const deleteAccountModal = new bootstrap.Modal(document.getElementById('deleteAccountModal'));
    deleteAccountModal.show();

    // Handle delete action when the user confirms
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    confirmDeleteBtn.addEventListener('click', function () {
        // Call the delete account endpoint
        const releaseUrl = `http://localhost:8080/deleteAccount/${userId}`;

        fetch(releaseUrl, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    // Successful response
                    location.reload(); // Reload the page
                } else {
                    // Error response
                    console.error('Fehler bei der Anforderung:', response.status, response.statusText);
                }
            })
            .catch(error => {
                // Error in the request
                console.error('Fehler bei der Anforderung:', error);
            });
    });
}