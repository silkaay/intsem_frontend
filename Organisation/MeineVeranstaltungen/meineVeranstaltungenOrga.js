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
    if (event.target && event.target.id === 'personDetails') {
        // ID aus dem Button-Datensatz (data-id) extrahieren
        const id = event.target.getAttribute('data-id');

        if (id) {
            // Verstecke den Container der Veranstaltungsgruppen
            document.getElementById('meineveranstaltung-container').style.display = 'none';

            // Zeige den Container für die Veranstaltungen
            document.getElementById('meineveranstaltungeinzel-container').style.display = 'none';

            document.getElementById('personDetails-container').style.display = 'block';

            displayUserDetails(id);
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
                            
                            <p class="card-text text-center">${veranstaltung.startdatum}</p>
                            <p class="card-text text-center">${veranstaltung.startzeit}</p>
                            
                        </div>
                        <div class="vertical-line"></div>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title">${veranstaltung.titel}</h3>
                            <p class="card-text">${veranstaltung.beschreibung}</p>
                            <p class="card-text">Stornieren bis ${formatiereDatum(veranstaltung.anmeldefrist)} möglich</p>
                        </div>
                    </div>
                    <div class="col-md-2 d-flex align-items-center">
                        <button type="button" class="btn btn-primary" id="buttonmeineVeranstaltungDetails" data-id="${veranstaltung.id}">Details und Stornierung</button>
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

let veranstaltungData = null; // Initialisiere die Variable außerhalb der Funktion

function fetchmeineVeranstaltungEinzel(id) {
    fetch(`http://localhost:8080/getVeranstaltungsDetails/${id}`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            // Speichere das JSON-Objekt in der außerhalb deklarierten Variable
            veranstaltungData = data;
            //console.log(data);
            console.log('Daten erfolgreich abgerufen:', veranstaltungData);
            // Verarbeite die erhaltenen Daten
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
              <div class="card mt-3" id="veranstaltungsdetailsansicht">
                  <div class="row no-gutters">
                      <div class="col-md-2 d-flex align-items-center">
                          <img src="${veranstaltung.files}" class="card-img" alt="Bild">
                      </div>
                      <div class="col-md-10">
                          <div class="card-body">
                              <h2 class="card-title" id="veranstaltungsdetailstitel">${veranstaltung.titel} am ${veranstaltung.startdatum}</h2>
                              <h3 id="veranstaltungsdetailstitel">${veranstaltung.startzeit}-${veranstaltung.endzeit}</h3>
                              <p class="card-text" id="veranstaltungsdetailstitel">${veranstaltung.organisator}</p>
                              <p class="card-text"><b>Adresse: 
                                                    ${veranstaltung.anschrift.strasse} 
                                                    ${veranstaltung.anschrift.hausnummer},
                                                    ${veranstaltung.anschrift.plz} 
                                                    ${veranstaltung.anschrift.ort} </b>
                              </p>
                              <p class="card-text">${veranstaltung.beschreibung}</p>
                              <p>Bedingungen:</p>
                              <p class="card-text">${veranstaltung.weitereBedingungen}</p>
                              <br>
                              <p class="card-text">Kosten: ${veranstaltung.kosten}€</p>
                              <p class="card-text">Maximale Teilnehmer:
                               <b id="personenzahl">${veranstaltung.maxTeilnehmer}</b>
                              </p>
                              <div class="row">
                                    <div class="col-md-10">
                                        <p class="card-text">Spätestens Anmelden bis: ${formatiereDatum(veranstaltung.anmeldefrist)}</p>
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
<div class="card mt-3">
    <div class="row">
        <div class="col-md-2 d-flex align-items-center">
            <div class="d-flex flex-column align-items-center w-100">
                <p class="card-text">${vorname}</p>
                <p class="card-text">${nachname}</p>
            </div>
            <div class="vertical-line"></div>
        </div>
        <div class="col-md-4">
            <div class="card-body">
                <p class="card-text">${geburtsdatum}</p>
            </div>
        </div>
        <div class="col-md-4 d-flex align-items-center">
            <button type="button" class="btn btn-danger mx-2" id="einzelStornieren" data-id="${anmeldung.id}">Entfernen</button>
            <button type="button" class="btn btn-primary mx-2" id="personDetails" data-id="${anmeldung.id}">Details</button>
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
    stornierenButton.innerText = 'Veranstaltung absagen und löschen';
    stornierenButton.classList.add('btn', 'btn-danger', 'mx-auto', 'mt-3');
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
}

function stornierAllUser(ids) {
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
}
function displayUserDetails(userId) {
    if (veranstaltungData) {
        const selectedAnmeldung = veranstaltungData.anmeldungen.find(anmeldung => String(anmeldung.id) === String(userId));

        console.log(selectedAnmeldung);

        if (selectedAnmeldung) {
            const userDetailsContainer = document.getElementById('userDetailsContainer');

            // Initialisiere die userDetailsHTML-Variable
            let userDetailsHTML = '<div class="row">'; // Öffne eine Bootstrap-Row

            userDetailsHTML += `
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h4>Kontaktdaten:</h4>
                            <p>Vorname: ${selectedAnmeldung.vorname || 'Nicht verfügbar'}</p>
                            <p>Nachname: ${selectedAnmeldung.nachname || 'Nicht verfügbar'}</p>
                            <p>Geburtsdatum: ${formatiereDatum(selectedAnmeldung.geburtsdatum) || 'Nicht verfügbar'}</p>
                            <p class="card-text">Adresse: 
                                                    ${selectedAnmeldung.anschrift.strasse} 
                                                    ${selectedAnmeldung.anschrift.hausnummer},
                                                    ${selectedAnmeldung.anschrift.plz} 
                                                    ${selectedAnmeldung.anschrift.ort}
                            </p>
                            <p>Geburtsdatum: ${selectedAnmeldung.email || 'Nicht verfügbar'}</p>
                            

                        </div>
                    </div>
                </div>
            `;

            if (selectedAnmeldung.vornameAnzumeldendePerson !== null) {
                userDetailsHTML += `
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h4>Anzumeldende Person</h4>
                                <p>Vorname: ${selectedAnmeldung.vornameAnzumeldendePerson}</p>
                                <p>Nachname: ${selectedAnmeldung.nachnameAnzumeldendePerson}</p>
                                <p>Geburtsdatum: ${formatiereDatum(selectedAnmeldung.geburtsdatumAnzumeldendePerson)}</p>
                                <p>Zusätzliche Informationen: ${selectedAnmeldung.zusaetzlicheInfomationen}</p>
                            </div>
                        </div>
                    </div>
                `;
            }

            userDetailsHTML += '</div>'; // Schließe die Bootstrap-Row

            userDetailsContainer.innerHTML = userDetailsHTML;
            userDetailsContainer.style.display = 'block';
        } else {
            console.error('Nutzer mit der ID ' + userId + ' nicht gefunden.');
        }
    } else {
        console.error('JSON-Objekt ist nicht verfügbar. Stelle sicher, dass du die Daten zuerst abrufst.');
    }
}


