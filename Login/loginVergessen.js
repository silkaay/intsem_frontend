document.getElementById("buttonzurückLogin").addEventListener("click", function() {
    window.location.href = "login.html";
});

function forgotPassword() {
    const email = document.getElementById('email').value;

    const jsonData = {
        email: email
    };

    const url = 'http://localhost:8080/resetPassword';

    // Die Optionen für den Fetch-Request, einschließlich der Methode (POST), Headers und Body
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(jsonData) // Das JSON-Objekt als String senden
    };

    // Den Fetch-Request durchführen, ohne auf die Antwort zu warten
    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response.ok) {
                console.log("alles gut");
                const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();

            // Schließen Sie das Modal, wenn die Schließen-Schaltfläche angeklickt wird
            const closeButton = document.querySelector('.close-button');
            closeButton.addEventListener('click', function() {
                successModal.hide();
            });
            }
        })
        .catch(error => {
            // Fehlerbehandlung, falls der Request fehlschlägt
            console.error('Error:', error);
        });

}
