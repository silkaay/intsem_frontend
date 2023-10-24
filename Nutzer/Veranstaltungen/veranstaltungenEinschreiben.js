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
  