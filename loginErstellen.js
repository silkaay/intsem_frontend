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

function validatePassword() {
    var password = document.getElementById("passwort").value;
    var confirmPassword = document.getElementById("passwort_confirmation").value;
    if (password != confirmPassword) {
        alert("Passwords do not match. Please enter the same password in both fields.");
        return false;
    }
    return true;
}