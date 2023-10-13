document.getElementById("buttonNeuerAccount").addEventListener("click", function() {
    window.location.href = "loginErstellen.html";
});

    // Erstelle eine Funktion, um die Kommentare abzurufen
    function getTest() {
        test = "Es klapptt!?";

        // Rufe die Daten von der API ab
        fetch(`http://localhost:8080/test`)
            .then(response => response.json())
            .then(test => {
                console.log(test);
                
            })
            .catch(error => {
                console.log("Error: Ich will nicht mehr");
                console.error(error);
            });
    }
  



function postLogin() {
  // Werte aus den Input-Feldern abrufen
  const username = document.getElementById('email').value;
  const password = document.getElementById('passwort').value;

  // Die URL, an die der POST-Request gesendet wird
  const url = 'http://localhost:8080/test/'; // Beispiel-URL für einen Login-Endpoint

  // Daten im application/x-www-form-urlencoded-Format erstellen
  const data = new URLSearchParams();
  data.append('username', username);
  data.append('password', password);

  // Konfigurationsobjekt für den POST-Request
  const requestOptions = {
    method: 'POST', // HTTP-Methode
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' // Content-Type auf application/x-www-form-urlencoded ändern
    },
    body: data.toString() // Daten im application/x-www-form-urlencoded-Format umgewandelt und gesendet
  };

  // Senden des POST-Requests mit fetch
  fetch(url, requestOptions)
    .then(response => {
      // Überprüfen, ob die Anfrage erfolgreich war
      if (response.ok) {
        window.location.href = 'veranstaltungen.html';
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
