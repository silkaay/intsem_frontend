document.getElementById("buttonzurückPasswortÄndern").addEventListener("click", function() {
    window.location.href = "einstellungen.html";
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('passwordChangeForm');
    const submitButton = document.getElementById('buttonspeichernModal');
    const oldPasswordInput = document.getElementById('pwalt');
    const newPasswordInput1 = document.getElementById('pwneu1');
    const newPasswordInput2 = document.getElementById('pwneu2');

    submitButton.addEventListener('click', function() {
        const oldPassword = oldPasswordInput.value;
        const newPassword1 = newPasswordInput1.value;
        const newPassword2 = newPasswordInput2.value;

        if (newPassword1 === newPassword2) {
            const requestData = {
                oldPassword: oldPassword,
                newPassword: newPassword1
            };

            // Hier fügen Sie den Code ein, um den POST-Request an den Server zu senden
            // Verwenden Sie z.B. Fetch oder XMLHttpRequest, um die Anfrage zu verarbeiten
            fetch('http://localhost:8080/changePassword', {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"

             }).then(response => {
                if (response.status == 200) {
                    console.log(response);
                    // Erfolgreiche Änderung des Passworts, hier können Sie eine Erfolgsmeldung anzeigen
                } else {
                    // Fehler bei der Passwortänderung, hier können Sie eine Fehlermeldung anzeigen
                }
             }).catch(error => {
                // Fehler bei der Anfrage
             });
        } else {
            alert('Die neuen Passwörter stimmen nicht überein.');
        }
    });
});