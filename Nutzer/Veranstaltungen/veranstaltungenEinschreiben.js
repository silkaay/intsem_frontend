function goToVer () {
    window.location.href = "veranstaltungen.html";
}

// Get the id from the URL
var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');


$(document).ready(function() {
    var cardCount = 1;
  
    $('#addPersonBtn').click(function() {
      // Clone the original card and update its ID
      var clonedCard = $('.card:first').clone();
      cardCount++;
      clonedCard.find('.card-header').text('Kontaktdaten ' + cardCount);
      clonedCard.find('input, textarea').val(''); // Clear input values if needed

      clonedCard.find('.form-control:not(#vorname, #nachname, #date, #infos)').closest('.mb-3').remove();

  
      // Add a remove button inside the cloned card with the btn-remove class
      var removeButton = $('<button class="btn btn-danger btn-remove btn-sm float-end">Remove</button>');
      removeButton.click(function() {
        $(this).closest('.card').remove();
      });
      clonedCard.find('.card-footer').empty().append(removeButton);

      clonedCard.addClass('mt-3');
  
      // Append the cloned card inside the specified container
      $('#clonedCardsContainer').append(clonedCard);
    });
  
    // Event handler for remove button click
    $('#clonedCardsContainer').on('click', '.btn-remove', function() {
      $(this).closest('.card').remove();
    });
  });
  
  function getLoggedInUser() {
    fetch(`http://localhost:8080/getLoggedInUser`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('vorname').value = data.vorname;
            document.getElementById('nachname').value = data.nachname;
            document.getElementById('straße').value = data.anschrift.strasse; 
            document.getElementById('hausnummer').value = data.anschrift.hausnummer;
            document.getElementById('postleitzahl').value = data.anschrift.plz;
            document.getElementById('ort').value = data.anschrift.ort; 
            document.getElementById('telefonnummer').value = data.telefonnummer;
            document.getElementById('email').value = data.email;
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen-Details:', error);
        });
}

getLoggedInUser();

    // Event handler for form submission
    $('#btn-payment').click(function() {

         // Get values from the form fields
      var vorname = document.getElementById("vorname").value;
      var nachname = document.getElementById("nachname").value;
      var straße = document.getElementById("straße").value;
      var hausnummer = document.getElementById("hausnummer").value;
      var postleitzahl = document.getElementById("postleitzahl").value;
      var ort = document.getElementById("ort").value;
      var telefonnummer = document.getElementById("telefonnummer").value;
      var email = document.getElementById("email").value;
      var datum = document.getElementById("date").value;
      var information = document.getElementById("infos").value;
        // Check if there are dynamically added cards
        var clonedCards = $('.card:gt(0)');
        var firstname, lastname, birthdate, infos;
       
        if (clonedCards.length === 0) {
            // No dynamically added cards, return null
            console.log("No dynamically added cards.");
            firstname = null;
            lastname = null;
            birthdate = null;
            infos = null;

        } else {
            clonedCards.each(function(index, card) {
                // Create an object to store data for each card
                    firstname =  $(card).find('#vorname').val();
                    lastname = $(card).find('#nachname').val();
                    birthdate =  $(card).find('#date').val();
                    infos =  $(card).find('#infos').val();
                    // Add more properties as needed
                    console.log("BAM: " + firstname + lastname + birthdate + infos);
            });
        }

        const formData = {
            email: email,
            vorname: vorname,
            nachname: nachname,
            geburtsdatum: datum,
            telefonnummer: telefonnummer,
            zusaetzlicheInformationen: information,
            plz: postleitzahl,
            ort: ort,
            strasse: straße,
            hausnummer: hausnummer,
            veranstaltungId: id,
            vornameAnzumeldendePerson: firstname,
            nachnameAnzumeldendePerson: lastname,
            geburtsdatumAnzumeldendePerson: birthdate
        }

        console.log(formData);

        // Die URL, zu der der POST-Request gesendet werden soll
    const url = 'http://localhost:8080/createAnmeldung';

    // Die Optionen für den Fetch-Request, einschließlich der Methode (POST), Headers und Body
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(formData) // Das JSON-Objekt als String senden
    };

    // Den Fetch-Request durchführen, ohne auf die Antwort zu warten
    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.ok) {
                window.location.href = "../meineVeranstaltungen/meineVeranstaltungen.html";
            }
        })
        .catch(error => {
            // Fehlerbehandlung, falls der Request fehlschlägt
            console.error('Error:', error);
        });
    });

