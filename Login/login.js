

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
       // Überprüfe die Rolle und leite entsprechend um

       //hier müssen noch die verzeichnisse angepasst werden!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      if (data.role.name === "USER") {
        window.location.href = "../Nutzer/Veranstaltungen/veranstaltungen.html";
      } else if (data.role.name === "ADMIN") {
        window.location.href = "../Admin/Veranstaltungen/veranstaltungen.html";
      } else if (data.role.name === "ORGANISATOR") {
        window.location.href = "../Organisation/Veranstaltungen/veranstaltungen.html";
      } else {
        console.error('Unbekannte Rolle:', data.role.name);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
