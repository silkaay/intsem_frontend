// Eventlistener hinzufügen, um den Code auszuführen, wenn die Seite vollständig geladen ist.
document.addEventListener('DOMContentLoaded', function () {
    // Deine Funktion hier aufrufen.
    fetchmeineAllVeranstaltung();
});

function fetchmeineAllVeranstaltung() {

    // Übergebe den Authentifizierungstoken im Authorization-Header (Bearer-Token).
    fetch("http://localhost:8080/getMeineVeranstaltungen", {
        method: 'GET',
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            rendermeineVeranstaltungen(data);
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen:', error);
        });
}
// Diese Funktion formatiert das Datum im gewünschten Format (Anpassen nach Bedarf)
function formatiereDatum(datum) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(datum).toLocaleDateString('de-DE', options);
}

function rendermeineVeranstaltungen(veranstaltung) {
    const container = document.getElementById('meineveranstaltung');

    if (Array.isArray(veranstaltung)) {
        veranstaltung.forEach(veranstaltung => {
            if (veranstaltung.isVeroeffentlicht) {
                // Der Rest deines Codes für die Karten-Erstellung bleibt unverändert.
                const card = document.createElement('div');
                card.classList.add('col-md-12');
                card.innerHTML = `
                <div class="card mt-3">
                <div class="row no-gutters">
                    <div class="col-md-2 d-flex align-items-center">
                        <div class="d-flex flex-column align-items-center w-100">
                            
                            <p class="card-text text-center">${veranstaltung.startdatum}</p>
                            <p class="card-text text-center">${veranstaltung.startzeit}</p>
                            
                        </div>
                        <div class="vertical-line"></div>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title">${veranstaltung.titel}</h3>
                            <p class="card-text">${veranstaltung.beschreibung}</p>
                            <p class="card-text">Spätestens Anmelden bis: ${formatiereDatum(veranstaltung.anmeldefrist)}</p>
                        </div>
                    </div>
                    <div class="col-md-2 d-flex align-items-center">
                        <button type="button" class="btn btn-primary" id="buttoneinzelveranstaltungVeranstaltungDetails" data-id="${veranstaltung.id}">Details und Anmeldung</button>
                    </div>
                </div>
            </div>
          `;

                container.appendChild(card);
            }
        });
    } else {
        console.error('Ungültiges Format der Veranstaltungsgruppen-Daten.');
    }
}
