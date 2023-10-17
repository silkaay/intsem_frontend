document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('passwordChangeForm');
    const submitButton = document.getElementById('buttonspeichernModal');
    const oldPasswordInput = document.getElementById('pwalt');
    const newPasswordInput1 = document.getElementById('pwneu1');
    const newPasswordInput2 = document.getElementById('pwneu2');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));

    submitButton.addEventListener('click', function() {
        const oldPassword = oldPasswordInput.value;
        const newPassword1 = newPasswordInput1.value;
        const newPassword2 = newPasswordInput2.value;

        if (newPassword1 === newPassword2) {
            const requestData = {
                oldPassword: oldPassword,
                newPassword: newPassword1
            };

            fetch('http://localhost:8080/changePassword', {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            }).then(response => {
                if (response.status == 200) {
                    // Password change was successful
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    
                    // Reset input fields
                    oldPasswordInput.value = '';
                    newPasswordInput1.value = '';
                    newPasswordInput2.value = '';
                    
                    // Close the modal
                    modal.hide();
                } else {
                    // Error during password change
                    errorMessage.style.display = 'block';
                    successMessage.style.display = 'none';
                }
            }).catch(error => {
                // Error during the request
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            });
        } else {
            alert('Die neuen Passwörter stimmen nicht überein.');
        }
    });
});
