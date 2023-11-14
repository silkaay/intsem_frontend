// Eventlistener hinzufügen, um den Code auszuführen, wenn die Seite vollständig geladen ist.
document.addEventListener('DOMContentLoaded', function () {
    // Deine Funktion hier aufrufen.
    fetchmeineAllVeranstaltung();
});
//Eventlistener für den "Veranstaltungen"-Button hinzufügen
document.addEventListener('click', function (event) {
    if (event.target && event.target.id === 'buttonmeineVeranstaltungDetails') {
        // ID aus dem Button-Datensatz (data-id) extrahieren
        const id = event.target.getAttribute('data-id');

        if (id) {
            // Verstecke den Container der Veranstaltungsgruppen
            document.getElementById('meineveranstaltung-container').style.display = 'none';

            // Zeige den Container für die Veranstaltungen
            document.getElementById('meineveranstaltungeinzel-container').style.display = 'block';

            fetchmeineVeranstaltungEinzel(id);
        }
    }
    if(event.target.id === 'einzelStornieren') {
        const id = event.target.getAttribute('data-id');

        if(id){
            stonierThisUser(id);
        }

    }

    if (event.target.id === 'alleStornieren') {
        const stornierungsButtons = document.querySelectorAll('#einzelStornieren');
        const idsToStornieren = Array.from(stornierungsButtons).map(button => button.getAttribute('data-id'));

        if(idsToStornieren){
            stornierAllUser(idsToStornieren);
        }
    }
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
                            
                            <p class="card-text text-center">${formatiereDatum(veranstaltung.startdatum)}</p>
                            <p class="card-text text-center">${veranstaltung.startzeit} Uhr</p>
                            
                        </div>
                        <div class="vertical-line"></div>
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h3 class="card-title">${veranstaltung.titel}</h3>
                            <p class="card-text">${veranstaltung.beschreibung}</p>
                            <p class="card-text">Stornieren bis ${formatiereDatum(veranstaltung.anmeldefrist)} möglich</p>
                        </div>
                    </div>
                    <div class="col-md-3 d-flex align-items-center">
                        <button type="button" class="btn btn-secondary" id="buttonmeineVeranstaltungDetails" data-id="${veranstaltung.id}">Details und Stornierung</button>
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

function fetchmeineVeranstaltungEinzel(id){
    // Hier kannst du die ID verwenden und den entsprechenden Fetch-Aufruf durchführen.
    fetch(`http://localhost:8080/getVeranstaltungsDetails/${id}`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            // Verarbeite die erhaltenen Daten
            // Zum Beispiel: renderVeranstaltungsgruppenDetails(data);
            console.log(data);
            rendermeineVeranstaltungEinzel(data);
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen-Details:', error);
        });
}

function rendermeineVeranstaltungEinzel(veranstaltung) {
    const container = document.getElementById('meineveranstaltungEinzelDetails');

    // Haupt-Veranstaltungs-Card
    const mainCard = document.createElement('div');
    mainCard.classList.add('col-md-12');
    mainCard.innerHTML = `
              <div class="card mt-3 mb-3" id="veranstaltungsdetailsansicht">
                  <div class="row no-gutters">
                      <!--<div class="col-md-2 d-flex align-items-center">
                          <img src="${veranstaltung.files}" class="card-img" alt="Bild">
                      </div>-->
                      <div class="col-md-12">
                          <div class="card-body mt-3 mb-3">
                              <h2 class="card-title" id="veranstaltungsdetailstitel">${veranstaltung.titel} am ${formatiereDatum(veranstaltung.startdatum)}</h2>
                              <h3 id="veranstaltungsdetailstitel">${veranstaltung.startzeit}-${veranstaltung.endzeit}</h3>
                              <p class="card-text" id="veranstaltungsdetailstitel">${veranstaltung.organisator}</p>
                              <br>
                              <div class="row">
                              <div class="col-md-1">
                              </div>
                              <div class="col-md-11">
                              <p class="card-text "><b>Adresse: 
                                                    ${veranstaltung.anschrift.strasse} 
                                                    ${veranstaltung.anschrift.hausnummer},
                                                    ${veranstaltung.anschrift.plz} 
                                                    ${veranstaltung.anschrift.ort} </b>
                                                   
                              </p>
                              <br>
                              <p class="card-text">${veranstaltung.beschreibung}</p>
                              <br>
                              <p><b>Bedingungen:</b></p>
                              <p class="card-text">${veranstaltung.weitereBedingungen}</p>
                              <br>
                              <p class="card-text"><b>Kosten:</b> ${veranstaltung.kosten}€</p>
                              <p class="card-text"><b>Maximale Teilnehmer:</b> ${veranstaltung.maxTeilnehmer}  &emsp;  <b> Noch frei:</b>
                               <b id="personenzahl">${veranstaltung.freiePlaetze}</b>
                              </p>
                              
                              
                              <div class="row">
                                    <div class="col-md-10">
                                        <p class="card-text"><b>Spätestens Anmelden bis:</b> ${formatiereDatum(veranstaltung.anmeldefrist)}</p>
                                    </div>
                                     <div class="col-md-2 d-flex align-items-center">
                                        <button type="button" class="btn btn-secondary"  data-id="${veranstaltung.id}" onclick="goToEinschreiben(${veranstaltung.id})">Anmelden</button>
                                    </div>
                                    
                              </div>
                              </div>
                             </div>
                            
                          </div>
                      </div>
                  </div>
              </div>
              
          `;

    // Hinzufügen der Haupt-Veranstaltungs-Card zur Container-Div
    container.appendChild(mainCard);

    const anmeldungen = veranstaltung.anmeldungen;

const anmeldungenContainer = document.createElement('div');
anmeldungenContainer.classList.add('row');

anmeldungen.forEach((anmeldung) => {
    const anmeldungCard = document.createElement('div');
    anmeldungCard.classList.add('col-md-6'); // Jede Card nimmt die Hälfte der Breite

    const vorname = anmeldung.vornameAnzumeldendePerson !== null ? anmeldung.vornameAnzumeldendePerson : (anmeldung.vorname !== null ? anmeldung.vorname : 'anzumeldendePerson');
const nachname = anmeldung.nachnameAnzumeldendePerson !== null ? anmeldung.nachnameAnzumeldendePerson : (anmeldung.nachname !== null ? anmeldung.nachname : 'anzumeldendePerson');
const geburtsdatum = anmeldung.geburtsdatumAnzumeldendePerson !== null ? formatiereDatum(anmeldung.geburtsdatumAnzumeldendePerson) : (anmeldung.geburtsdatum !== null ? formatiereDatum(anmeldung.geburtsdatum) : 'anzumeldendePerson');


    anmeldungCard.innerHTML = `
        <div class="card mt-3 mb-3">
            <div class="row">
                <div class="col-md-4 d-flex align-items-center">
                    <div class="d-flex flex-column align-items-center w-100 mt-3 mb-3">
                        <p class="card-text">${vorname}</p>
                        <p class="card-text">${nachname}</p>
                    </div>
                    <div class="vertical-line"></div>
                </div>
                <div class="col-md-5">
                    <div class="card-body d-flex flex-column align-items-center w-100 mt-3 mb-3"">
                        <p class="card-text"> Geburtsdatum: ${geburtsdatum}</p>
                    </div>
                </div>
                <div class="col-md-3 d-flex align-items-center">
                    <button type="button" class="btn btn-secondary" id="einzelStornieren" data-id="${anmeldung.id}">Stornieren</button>
                </div>
            </div>
        </div>
    `;

    // Hinzufügen der Anmeldungs-Card zur Container-Div für Anmeldungen
    anmeldungenContainer.appendChild(anmeldungCard);
});



    // Hinzufügen der Container-Div für Anmeldungen zur Haupt-Container-Div
    container.appendChild(anmeldungenContainer);

    // Button "Alle Personen stornieren" am Ende hinzufügen
    const stornierenButton = document.createElement('button');
    stornierenButton.innerText = 'Alle Personen stornieren';
    stornierenButton.classList.add('btn', 'btn-secondary', 'mx-auto', 'mt-3');
    stornierenButton.style.width = 'fit-content';
    stornierenButton.id = 'alleStornieren';

    anmeldungen.forEach((anmeldung, index) => {
        anmeldungCard = anmeldungenContainer.children[index];
        anmeldungCard.querySelector('#einzelStornieren').setAttribute('data-id', anmeldung.id);
    });
    // Hinzufügen des Buttons zur Haupt-Container-Div
    container.appendChild(stornierenButton);

}


function stonierThisUser(id) {
    // Show the delete account modal
    const deleteModal = new bootstrap.Modal(document.getElementById('stornoModal'));
    deleteModal.show();

    // Handle delete action when the user confirms
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    confirmDeleteBtn.addEventListener('click', function () {
        fetch(`http://localhost:8080/deleteAnmeldung/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    // Successful response
                    location.reload(); // Reload the page
                }
                return response.json();
            })
            .catch(error => {
                console.error('Fehler beim Löschen der Veranstaltungsgruppe:', error);
            });
    });
}

function stornierAllUser(ids) {
    const deleteModal = new bootstrap.Modal(document.getElementById('stornoModalAll'));
    deleteModal.show();

    // Handle delete action when the user confirms
    const confirmDeleteBtn = document.getElementById('confirmDeleteAllBtn');
    confirmDeleteBtn.addEventListener('click', function () {
        const storniereNächstenBenutzer = (index) => {
            if (index < ids.length) {
                const id = ids[index];
                fetch(`http://localhost:8080/deleteAnmeldung/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                })
                    .then(response => {
                        if (response.ok) {
                            // Erfolgreiche Antwort, lösche den Benutzer
                            storniereNächstenBenutzer(index + 1);
                        } else {
                            console.error('Fehler beim Löschen der Anmeldung:', response);
                        }
                    })
                    .catch(error => {
                        console.error('Fehler beim Löschen der Anmeldung:', error);
                    });
            } else {
                // Alle Benutzer wurden gelöscht
                location.reload(); // Seite neu laden oder andere Aktionen durchführen
            }
        };

        // Starte die Stornierung für den ersten Benutzer
        storniereNächstenBenutzer(0);
    });
}




