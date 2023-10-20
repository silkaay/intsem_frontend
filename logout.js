function postLogout() {
    // Die URL, an die der POST-Request gesendet wird
    const url = 'http://localhost:8080/logout'; // Beispiel-URL für einen Login-Endpoint

    // Konfigurationsobjekt für den POST-Request
    const requestOptions = {
      method: 'POST', // HTTP-Methode
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Art des gesendeten Inhalts (hier JSON)
      },
      credentials: "include",
    };
  
    fetch(url, requestOptions)
      .then(response => {
        if (response.status === 403) {
            window.location.href = "../../Nichteingeloggt/veranstaltungen.html";
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }