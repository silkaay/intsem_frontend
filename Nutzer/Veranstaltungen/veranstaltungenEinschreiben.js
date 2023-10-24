function goToVer () {
    window.location.href = "veranstaltungen.html";
}

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
            document.getElementById('email').data = data.email;
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Veranstaltungsgruppen-Details:', error);
        });
}

getLoggedInUser();

  function einschreiben () {
    window.location.href = "../meineVeranstaltungen/meineVeranstaltungen.html";
  }