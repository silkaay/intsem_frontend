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

            
                const card = document.createElement('div');
                card.classList.add('col-md-12');
                card.innerHTML = `
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
          container.appendChild(card);
        
}
