document.getElementById("buttonzurückLogin").addEventListener("click", function() {
    window.location.href = "login.html";
});

function toggleForm(formId) {
    var privatForm = document.getElementById('privatForm');
    var orgaForm = document.getElementById('orgaForm');

    if (formId === 'privatForm') {
        privatForm.style.display = 'block';
        orgaForm.style.display = 'none';
    } else if (formId === 'orgaForm') {
        privatForm.style.display = 'none';
        orgaForm.style.display = 'block';
    }
}

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    function zeigePopover() {
        var passwortRichtliniePopover = new bootstrap.Popover(document.getElementById("passwortRichtlinie"), {
            content: "Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, eine Zahl, ein Sonderzeichen und Kleinbuchstaben enthalten."
        });
    
        // Zeige das Popover sofort an
        passwortRichtliniePopover.show();
    
        // Verberge das Popover nach 3 Sekunden
        setTimeout(function() {
            passwortRichtliniePopover.hide();
        }, 3000); // 3000 Millisekunden (3 Sekunden)
    }
    
   

function validatePassword() {
    var password = document.getElementById("passwort").value;
    var confirmPassword = document.getElementById("passwort_confirmation").value;

    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!password.match(passwordRegex)) {
        alert("Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, eine Zahl, ein Sonderzeichen und Kleinbuchstaben enthalten.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Die Passwörter stimmen nicht überein.");
        return false;
    }
    console.log("Succes!");

    return true;
}

function chooseRegister() {
    // Get the selected radio button within the group
    var selectedOption = document.querySelector('input[name="privatOrga"]:checked');
    var selectedValue = selectedOption.value;
    // Check if a radio button is selected
    if (selectedValue == "Privatperson") {
        console.log(selectedValue + "001");
        registerUser();
    } else {
        console.log(selectedValue + "002");
        registerOrga();
    }
}

function registerUser() {
    // Das Registrierungs-Formular-Element aus dem HTML-Dokument auswählen
    const registrierungsFormular = document.querySelector('#privatForm'); // oder '#privatForm', je nachdem, welches Formular aktiv ist

    console.log(registrierungsFormular);
    // Die Daten aus dem Formular sammeln
    const formData = new FormData(registrierungsFormular);

    // JSON-Objekt erstellen und Daten hinzufügen
    const jsonData = {
        email: formData.get('email'),
        passwort: formData.get('passwort'),
        telefonnummer: formData.get('tel'), // 'tel' ist das Feld für die Telefonnummer im Formular
        vorname: formData.get('vorname'),
        nachname: formData.get('nachname'),
        plz: formData.get('postleitzahl'), // 'postleitzahl' ist das Feld für die Postleitzahl im Formular
        ort: formData.get('ort'),
        strasse: formData.get('straße'), // 'straße' ist das Feld für die Straße im Formular
        hausnummer: formData.get('hausnummer')
    };
    console.log(jsonData);

    // Die URL, zu der der POST-Request gesendet werden soll
    const url = 'http://localhost:8080/registerUser';

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
                $('#myModal').modal('show');
            }
        })
        .catch(error => {
            // Fehlerbehandlung, falls der Request fehlschlägt
            console.error('Error:', error);
        });
}

function registerOrga() {
    // Das Registrierungs-Formular-Element aus dem HTML-Dokument auswählen
    const registrierungsFormular = document.querySelector('#orgaForm'); // oder '#privatForm', je nachdem, welches Formular aktiv ist

    console.log(registrierungsFormular);
    // Die Daten aus dem Formular sammeln
    const formData = new FormData(registrierungsFormular);

    // JSON-Objekt erstellen und Daten hinzufügen
    const jsonData = {
        email: formData.get('email'),
        passwort: formData.get('passwort'),
        telefonnummer: formData.get('tel'),
        name: formData.get('name'), // 'tel' ist das Feld für die Telefonnummer im Formular
        ansprechpartnerVorname: formData.get('vorname'),
        ansprechpartnerNachname: formData.get('nachname'),
        plz: formData.get('postleitzahl'), // 'postleitzahl' ist das Feld für die Postleitzahl im Formular
        ort: formData.get('ort'),
        strasse: formData.get('straße'), // 'straße' ist das Feld für die Straße im Formular
        hausnummer: formData.get('hausnummer')
    };
    console.log(jsonData);

    // Die URL, zu der der POST-Request gesendet werden soll
    const url = 'http://localhost:8080/registerOrganisator';

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
