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
    if (event.target && event.target.id === 'buttoneinzelveranstaltungVeranstaltungDetails') {
        // ID aus dem Button-Datensatz (data-id) extrahieren
        const id = event.target.getAttribute('data-id');

        if (id) {
            // Verstecke den Container der Veranstaltungsgruppen
            document.getElementById('veranstaltungsgruppen-container').style.display = 'none';
            // Verstecke den Container der VeranstaltungsgruppenDetaills
            document.getElementById('veranstaltungen-container').style.display = 'none';

            // Zeige den Container für die Veranstaltungen
            document.getElementById('veranstaltungeneinzel-container').style.display = 'block';

            fetchVeranstaltungsgruppenDetailsVeranstaltung(id);
        }
    }
    if (event.target.id === 'buttonVeranstaltungsgruppeLöschen'){
        const id = event.target.getAttribute('data-id');

        if (id){
            deleteVeranstaltungsgruppe(id);

        }

    }
    if (event.target.id === 'buttoneinzelveranstaltungLöschen'){
        const id = event.target.getAttribute('data-id');

        if (id){
            deleteeinzelVeranstaltung(id);

        }

    }

});
function deleteeinzelVeranstaltung(id) {
    fetch(`http://localhost:8080/deleteVeranstaltung/${id}`, {
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
}


function deleteVeranstaltungsgruppe(id) {
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();

    // Handle delete action when the user confirms
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    confirmDeleteBtn.addEventListener('click', function () {
        fetch(`http://localhost:8080/deleteVeranstaltungsgruppe/${id}`, {
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
                          <div class="row mt-3 mb-3 no-gutters">
                              <div class="col-md-1 d-flex align-items-center">
                                 <!-- <img src="${veranstaltungsgruppe.files}" class="card-img" alt="Bild">-->
                              </div>
                              <div class="col-md-9">
                                  <div class="card-body">
                                      <h3 class="card-title">${veranstaltungsgruppe.titel} vom ${formatiereDatum(veranstaltungsgruppe.anfangszeitpunkt)} - ${formatiereDatum(veranstaltungsgruppe.endzeitpunkt)}</h3>
                                      <p class="card-text">${veranstaltungsgruppe.beschreibung}</p>
                                  </div>
                              </div>
                              <div class="col-md-2  d-flex align-items-center">
                                  <button type="button" class="btn btn-secondary" id="buttonVeranstaltungDetails" data-id="${veranstaltungsgruppe.id}">Veranstaltungen</button>
                              </div>
                          </div>
                      </div>
                  `;
                container.appendChild(card);
            }
            else{
                const card = document.createElement('div');
                card.classList.add('col-md-12');
                console.log('test');
                card.innerHTML = `
                    <div class="card mt-3">
                        <div class="row mt-3 mb-3 no-gutters">
                            <div class="col-md-1 d-flex align-items-center">
                               <!-- <img src="${veranstaltungsgruppe.files}" class="card-img" alt="Bild"> -->
                            </div>
                            <div class="col-md-9">
                                <div class="card-body">
                                    <h3 class="card-title">${veranstaltungsgruppe.titel} vom ${formatiereDatum(veranstaltungsgruppe.anfangszeitpunkt)} - ${formatiereDatum(veranstaltungsgruppe.endzeitpunkt)}</h3>
                                    <p class="card-text">${veranstaltungsgruppe.beschreibung}</p>
                                </div>
                            </div>
                            <div class="col-md-2 align-items-center">
                                <button type="button" class="btn btn-secondary" id="buttonVeranstaltungDetails" data-id="${veranstaltungsgruppe.id}">Veranstaltungen</button>
                                
                                <button class="btn btn-success" onclick="redirectToRelease(${veranstaltungsgruppe.id})">Freigeben</button>
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
      console.log(veranstaltungen);
        // Füge die Veranstaltungsgruppen-Information am Anfang ein
        const gruppenCard = document.createElement('div');
        gruppenCard.classList.add('col-md-12');
        gruppenCard.innerHTML = `
        <div class="card mt-3">
    <div class="row no-gutters">
        <!--<div class="col-md-2 d-flex flex-column align-items-center">
            
        </div>-->
        <div class="col-md-10 ">
            <div class="card-body zentrierung">
                <h3 class="card-title">${veranstaltungsgruppen.titel} vom ${formatiereDatum(veranstaltungsgruppen.anfangszeitpunkt)} - ${formatiereDatum(veranstaltungsgruppen.endzeitpunkt)}</h3>
                <p class="card-text">${veranstaltungsgruppen.beschreibung}</p>
            </div>
        </div>
        <div class="col-md-2 d-flex flex-column align-items-center">
        
             <button class="btn btn-secondary btn-sm my-1" onclick="fetchVeranstaltungsgruppenEdit(${veranstaltungsgruppen.id})" id="buttonVeranstaltungsgruppeBearbeiten" >Veranstaltungsgruppe bearbeiten</button>
            <!--<button class="btn btn-secondary btn-sm my-1" onclick="EditVeranstaltungsgruppen('${veranstaltungsgruppen.id}','${veranstaltungsgruppen.titel}','${veranstaltungsgruppen.anfangszeitpunkt}','${veranstaltungsgruppen.endzeitpunkt}','${veranstaltungsgruppen.beschreibung}','${veranstaltungsgruppen.anmeldestart}')" id="buttonVeranstaltungsgruppeBearbeiten" >Veranstaltungsgruppe bearbeiten</button> onclick funktioniert nicht-->
            <button class="btn btn-danger btn-sm my-1" id="buttonVeranstaltungsgruppeLöschen" data-id="${veranstaltungsgruppen.id}">Veranstaltungsgruppe löschen</button>
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
                <div class="card mt-3 mb-1">
    <div class="row no-gutters">
        <div class="col-md-2 d-flex align-items-center">
            <div class="d-flex flex-column align-items-center w-100">
                
                <p class="card-text text-center">${formatiereDatum(veranstaltung.startdatum)}</p>
                <p class="card-text text-center">${veranstaltung.startzeit} Uhr</p>
                
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
        <div class="col-md-2 d-flex flex-column align-items-center justify-content-center">
            <button type="button" class="btn btn-secondary" id="buttoneinzelveranstaltungVeranstaltungDetails" data-id="${veranstaltung.id}">Details und Anmeldung</button>
            <button type="button" class="btn btn-danger" id="buttoneinzelveranstaltungLöschen" data-id="${veranstaltung.id}">Veranstaltung löschen</button>
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

function fetchVeranstaltungsgruppenDetailsVeranstaltung(id){
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
            renderVeranstaltungsgruppenDetailsVeranstaltungen(data);
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen-Details:', error);
        });
}


function redirectToRelease(veranstaltungsgruppenId) {
    // Erstelle die URL mit der übergebenen VeranstaltungsgruppenId
    const releaseUrl = `http://localhost:8080/releaseVeranstaltungsgruppe/${veranstaltungsgruppenId}`;

    // Konfigurieren Sie die fetch-Anforderung für POST
    fetch(releaseUrl, {
        method: 'POST',
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


//detailansicht
function renderVeranstaltungsgruppenDetailsVeranstaltungen(veranstaltung) {
    const container = document.getElementById('veranstaltungsgruppenDetailsVeranstaltung');


    const card = document.createElement('div');
    card.classList.add('col-md-12');
    card.innerHTML = `
              <div class="card mt-3" id="veranstaltungsdetailsansicht">
                  <div class="row no-gutters">
                     <!-- <div class="col-md-1 d-flex align-items-center">
                         <img src="${veranstaltung.files}" class="card-img" alt="Bild">
                      </div>  -->
                      <div class="col-md-12">
                          <div class="card-body">
                              <h2 class="card-title" id="veranstaltungsdetailstitel">${veranstaltung.titel} am ${formatiereDatum(veranstaltung.startdatum)}</h2>
                              <h3 id="veranstaltungsdetailstitel">${veranstaltung.anfangszeitpunkt}-${veranstaltung.endzeit}</h3>
                              <p class="card-text" id="veranstaltungsdetailstitel">${veranstaltung.organisator}</p>
                              
                              <div class="row">
                              <div class="col-md-1">
                               </div>
                              <div class="col-md-11">
                                 <p class="card-text"><b>Adresse: 
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
                                <p class="card-text"><b>Kosten</b>: ${veranstaltung.kosten}€</p>
                                <b>Maximale Teilnehmer:</b> ${veranstaltung.maxTeilnehmer}  &emsp;  <b> Noch frei:</b>
                                <b id="personenzahl">${veranstaltung.freiePlaetze}</b>
                                </p>
                              <div class="row">
                                    <div class="col-md-10">
                                        <p class="card-text"><b>Spätestens Anmelden bis:</b> ${formatiereDatum(veranstaltung.anmeldefrist)}</p>
                                    </div>
                                    <div class="col-md-2 d-flex align-items-center">
                                        <!--<button type="button" class="btn" id="anmeldebutton"  data-id="${veranstaltung.id}">Anmelden</button> -->
                                    </div>
                              </div>
                              
                              </div>
                              </div>
                              
                             
                            
                          </div>
                      </div>
                  </div>
              </div>
              
          `;
    container.appendChild(card);

}
function fetchVeranstaltungsgruppenEdit(id) {

    // Navigiere zur neuen Seite
    window.location.href = `veranstaltungsgruppebearbeiten.html?id=${id}`;
}
