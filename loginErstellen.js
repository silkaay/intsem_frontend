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