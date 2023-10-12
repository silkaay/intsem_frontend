document.getElementById("buttonNeuerAccount").addEventListener("click", function() {
    window.location.href = "loginErstellen.html";
});

function postLogin() {
    // Werte aus den Input-Feldern abrufen
    const email = document.getElementById('email').value;
    const passwort = document.getElementById('passwort').value;
  
    // Die URL, an die der POST-Request gesendet wird
    const url = 'http://localhost:8080/post/login'; // Beispiel-URL für einen Login-Endpoint
  
    // Daten im JSON-Format erstellen
    const data = {
      email: email,
      passwort: passwort
    };
  
    // Konfigurationsobjekt für den POST-Request
    const requestOptions = {
      method: 'POST', // HTTP-Methode
      headers: {
        'Content-Type': 'application/json' // Art des gesendeten Inhalts (hier JSON)
      },
      body: JSON.stringify(data) // Daten im JSON-Format umgewandelt und gesendet
    };
  
    // Senden des POST-Requests mit fetch
    fetch(url, requestOptions)
      .then(response => {
        // Überprüfen, ob die Anfrage erfolgreich war
        if (response.ok) {
          return response.json(); // Antwort im JSON-Format extrahieren
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        // Verarbeiten Sie die erhaltenen Daten hier
        console.log(data);
        console.log("test");
      })
      .catch(error => {
        // Fehlerbehandlung hier
        console.error('Error:', error);
      });
  }
  