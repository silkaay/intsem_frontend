

document.getElementById("buttonNeuerAccount").addEventListener("click", function() {
  window.location.href = "loginErstellen.html";
});

function postLogin() {
  // Hier fügst du den Rest deines vorhandenen Codes ein, der den POST-Request durchführt
  // Werte aus den Input-Feldern abrufen
  const user = document.getElementById('email').value;
  const pass = document.getElementById('passwort').value;

  // Die URL, an die der POST-Request gesendet wird
  const url = 'http://localhost:8080/login'; // Beispiel-URL für einen Login-Endpoint

  // Daten im JSON-Format erstellen
  const data = new URLSearchParams();
    data.append('username', user);
    data.append('password', pass);


  // Konfigurationsobjekt für den POST-Request
  const requestOptions = {
    method: 'POST', // HTTP-Methode
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' // Art des gesendeten Inhalts (hier JSON)
    },
    credentials: "include",
    body: data.toString() // Daten im JSON-Format umgewandelt und gesendet
  };

  fetch(url, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log(data);
      console.log("test");
      // Führe den Redirect nach dem POST-Request durch
      window.location.href = "../Nutzer/Veranstaltungen/veranstaltugnen.html";
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


