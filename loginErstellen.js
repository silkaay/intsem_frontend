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