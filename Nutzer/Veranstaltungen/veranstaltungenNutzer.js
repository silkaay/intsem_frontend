 // Lokale JSON-Daten für Veranstaltungsgruppen
 const lokaleVeranstaltungsgruppen = [
    {
        Id: 1,
        Titel: 'Ferienspiele',
        isVeroeffentlicht: true,
        Anfangszeitpunkt: '2023-10-20T10:00:00',
        Endzeitpunkt: '2023-10-22T12:00:00',
        Beschreibung: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        Bild: 'bildTest.jpg'
    },
    {
        Id: 2,
        Titel: 'Ferienspiele',
        isVeroeffentlicht: true,
        Anfangszeitpunkt: '2023-10-20T10:00:00',
        Endzeitpunkt: '2023-10-22T12:00:00',
        Beschreibung: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        Bild: 'bildTest.jpg'
    },
    {
        Id: 3,
        Titel: 'Ferienspiele',
        isVeroeffentlicht: true,
        Anfangszeitpunkt: '2023-10-20T10:00:00',
        Endzeitpunkt: '2023-10-22T12:00:00',
        Beschreibung: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        Bild: 'bildTest.jpg'
    },
    {
        Id: 4,
        Titel: 'Ferienspiele',
        isVeroeffentlicht: true,
        Anfangszeitpunkt: '2023-10-20T10:00:00',
        Endzeitpunkt: '2023-10-22T12:00:00',
        Beschreibung: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        Bild: 'bildTest.jpg'
    },
 ];

// Funktion zum Formatieren des Datums (z.B., 11.07.2023)
function formatiereDatum(datumString) {
    const datum = new Date(datumString);
    const tag = datum.getDate();
    const monat = datum.getMonth() + 1;
    const jahr = datum.getFullYear();
    return `${tag < 10 ? '0' : ''}${tag}.${monat < 10 ? '0' : ''}${monat}.${jahr}`;
}

// Funktion zum Erstellen von Bootstrap Cards aus den lokalen Daten
function createBootstrapCards(veranstaltungsgruppen) {
    const container = document.getElementById('veranstaltungsgruppen');

    veranstaltungsgruppen.forEach(veranstaltungsgruppe => {
        if (veranstaltungsgruppe.isVeroeffentlicht) {
            const card = document.createElement('div');
            card.classList.add('col-md-12');
            card.innerHTML = `
                <div class="card mt-3">
                    <div class="row no-gutters">
                        <div class="col-md-2 d-flex align-items-center" >
                            <img src="${veranstaltungsgruppe.Bild}" class="card-img" alt="Bild" >
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h3 class="card-title">${veranstaltungsgruppe.Titel} vom ${formatiereDatum(veranstaltungsgruppe.Anfangszeitpunkt)} - ${formatiereDatum(veranstaltungsgruppe.Endzeitpunkt)}</h3>
                                <p class="card-text">${veranstaltungsgruppe.Beschreibung}</p>
                            </div>
                        </div>
                        <div class="col-md-2 d-flex align-items-center">
                            <button type="button" class="btn btn-primary" id="buttonVeranstaltungDetails">Veranstaltungen</button>
                        </div>
                    </div>
                </div>
            `;

            container.appendChild(card);
        }
    });
}

// Rufen Sie die Funktion auf, um Bootstrap Cards für veröffentlichte Veranstaltungsgruppen zu erstellen
createBootstrapCards(lokaleVeranstaltungsgruppen);