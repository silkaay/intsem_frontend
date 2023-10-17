// Eventlistener hinzufügen, um den Code auszuführen, wenn die Seite vollständig geladen ist.
document.addEventListener('DOMContentLoaded', function () {
    // Deine Funktion hier aufrufen.
    fetchAllVeranstaltungsgruppen();
});
//Eventlistener für den "Veranstaltungen"-Button hinzufügen
document.addEventListener('click', function (event) {
    if (event.target && event.target.id === 'buttonVeranstaltungDetails') {
        // ID aus dem Button-Datensatz (data-id) extrahieren
        const id = event.target.getAttribute('data-id');
        
        if (id) {
            // Verstecke den Container der Veranstaltungsgruppen
            document.getElementById('veranstaltungsgruppen-container').style.display = 'none';
            
            // Zeige den Container für die Veranstaltungen
            document.getElementById('veranstaltungen-container').style.display = 'block';
            
            fetchVeranstaltungsgruppenDetails(id);
        }
    }
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


function fetchVeranstaltungsgruppenDetails(id) {
    // Hier kannst du die ID verwenden und den entsprechenden Fetch-Aufruf durchführen.
    fetch(`http://localhost:8080/getVeranstaltungsgruppenDetails/${id}`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            // Verarbeite die erhaltenen Daten
            // Zum Beispiel: renderVeranstaltungsgruppenDetails(data);
            console.log(data);
            renderVeranstaltungsgruppenDetails(data);
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen-Details:', error);
        });
}

function renderVeranstaltungsgruppenDetails(veranstaltungsgruppen) {
    const container = document.getElementById('veranstaltungsgruppenDetails');

    if (veranstaltungsgruppen && veranstaltungsgruppen.veranstaltungen) {
        const veranstaltungen = veranstaltungsgruppen.veranstaltungen;

        // Füge die Veranstaltungsgruppen-Information am Anfang ein
    const gruppenCard = document.createElement('div');
    gruppenCard.classList.add('col-md-12');
    gruppenCard.innerHTML = `
        <div class="card mt-3">
            <div class="row no-gutters">
                <div class="col-md-2 d-flex align-items-center">
                    <!-- Hier kannst du ein Bild für die Veranstaltungsgruppe einfügen -->
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h3 class="card-title">${veranstaltungsgruppen.titel}</h3>
                        <p class="card-text">${veranstaltungsgruppen.beschreibung}</p>
                        <!-- Weitere Informationen zur Veranstaltungsgruppe hier einfügen -->
                    </div>
                </div>
                <div class="col-md-2 d-flex align-items-center">
                    <!-- Füge hier den entsprechenden Button für die Veranstaltungsgruppendetails ein -->
                </div>
            </div>
        </div>
    `;

    container.appendChild(gruppenCard);
    
        veranstaltungen.forEach(veranstaltung => {
            if (veranstaltung.isVeroeffentlicht) {
                // Hier den Code anpassen, um die Veranstaltungen anzuzeigen.
                const card = document.createElement('div');
                card.classList.add('col-md-12');
                card.innerHTML = `
                  <div class="card mt-3">
                      <div class="row no-gutters">
                          <div class="col-md-2 d-flex align-items-center">
                              <img src="${veranstaltung.files}" class="card-img" alt="Bild">
                          </div>
                          <div class="col-md-8">
                              <div class="card-body">
                                  <h3 class="card-title">${veranstaltung.titel}</h3>
                                  <p class="card-text">${veranstaltung.beschreibung}</p>
                                  <p class="card-text">Maximale Teilnehmer: ${veranstaltung.maxTeilnehmer}</p>
                                  <p class="card-text">Kosten: ${veranstaltung.kosten}</p>
                                  <p class="card-text">Anmeldefrist: ${veranstaltung.anmeldefrist}</p>
                                  <p class="card-text">Startdatum: ${veranstaltung.startdatum}</p>
                                  <p class="card-text">Startzeit: ${veranstaltung.startzeit}</p>
                                  <p class="card-text">Enddatum: ${veranstaltung.enddatum}</p>
                                  <p class="card-text">Endzeit: ${veranstaltung.endzeit}</p>
                                  <p class="card-text">Organisator: ${veranstaltung.organisator}</p>
                                  <p class="card-text">Ort: ${veranstaltung.anschrift.ort}</p>
                              </div>
                          </div>
                          <div class="col-md-2 d-flex align-items-center">
                              <!-- Füge hier den entsprechenden Button für die Veranstaltungsdetails ein -->
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
