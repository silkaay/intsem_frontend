document.getElementById("buttonzurückPasswortÄndern").addEventListener("click", function() {
    window.location.href = "einstellungen.html";
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('passwordChangeForm');
    const submitButton = document.getElementById('buttonspeichernModal');
    const oldPasswordInput = document.getElementById('pwalt');
    const newPasswordInput1 = document.getElementById('pwneu1');
    const newPasswordInput2 = document.getElementById('pwneu2');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const passwordMismatch = document.getElementById('passwordMismatch');
    const passwordCount = document.getElementById('passwordCount');
    const modal = new bootstrap.Modal(document.getElementById('staticBackdrop'));

    submitButton.addEventListener('click', function() {
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        const oldPassword = oldPasswordInput.value;
        const newPassword1 = newPasswordInput1.value;
        const newPassword2 = newPasswordInput2.value;

        // Hide error message when attempting to change password
        passwordMismatch.style.display = 'none';

        if (newPassword1 === newPassword2 && newPassword1.match(passwordRegex)) {
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

                    // Set a timer to hide the success message after 3 seconds (3000 milliseconds)
                    setTimeout(function() {
                        successMessage.style.display = 'none';
                        window.location.href='einstellungen.html';
                    }, 2000);

                } else {
                    // Error during password change
                    errorMessage.style.display = 'block';
                    successMessage.style.display = 'none';
                    modal.hide();

                    // Set a timer to hide the error message after 3 seconds (3000 milliseconds)
                    setTimeout(function() {
                        errorMessage.style.display = 'none';
                    }, 3000);
                }
            }).catch(error => {
                // Error during the request
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
                modal.hide();

                // Set a timer to hide the error message after 3 seconds (3000 milliseconds)
                setTimeout(function() {
                    errorMessage.style.display = 'none';
                }, 3000);
            });
        } else if (newPassword1.match(passwordRegex)) {
            // Passwords don't match
            passwordMismatch.style.display = 'block';
            modal.hide();

            // Set a timer to hide the password mismatch message after 3 seconds (3000 milliseconds)
            setTimeout(function() {
                passwordMismatch.style.display = 'none';
            }, 3000);
        } else {
            // Passwords don't match
            passwordCount.style.display = 'block';
            modal.hide();

            // Set a timer to hide the password mismatch message after 3 seconds (3000 milliseconds)
            setTimeout(function() {
                passwordCount.style.display = 'none';
            }, 3000);
        }
    });
});
