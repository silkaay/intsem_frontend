// Eventlistener hinzufügen, um den Code auszuführen, wenn die Seite vollständig geladen ist.
document.addEventListener('DOMContentLoaded', function () {
    // Deine Funktion hier aufrufen.
    fetchAllVeranstaltungsgruppen();
});
function fetchAllVeranstaltungsgruppen() {

    // Übergebe den Authentifizierungstoken im Authorization-Header (Bearer-Token).
    fetch("http://localhost:8080/getAllVeranstaltungsgruppen", {
        method: 'GET',
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            renderVeranstaltungsgruppen(data);
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

function renderVeranstaltungsgruppen(veranstaltungsgruppen) {
    const container = document.getElementById('veranstaltungsgruppen');

    if (Array.isArray(veranstaltungsgruppen)) {
        veranstaltungsgruppen.forEach(veranstaltungsgruppe => {
            if (veranstaltungsgruppe.isVeroeffentlicht) {
                // Der Rest deines Codes für die Karten-Erstellung bleibt unverändert.
                const card = document.createElement('div');
                card.classList.add('col-md-12');
                card.innerHTML = `
              <div class="card mt-3">
                  <div class="row no-gutters">
                      <div class="col-md-2 d-flex align-items-center">
                          <img src="${veranstaltungsgruppe.files}" class="card-img" alt="Bild">
                      </div>
                      <div class="col-md-8">
                          <div class="card-body">
                              <h3 class="card-title">${veranstaltungsgruppe.titel} vom ${formatiereDatum(veranstaltungsgruppe.anfangszeitpunkt)} - ${formatiereDatum(veranstaltungsgruppe.endzeitpunkt)}</h3>
                              <p class="card-text">${veranstaltungsgruppe.beschreibung}</p>
                          </div>
                      </div>
                      <div class="col-md-2 d-flex align-items-center">
                          <button type="button" class="btn btn-primary" id="buttonVeranstaltungDetails" data-id="${veranstaltungsgruppe.id}">Veranstaltungen</button>
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
