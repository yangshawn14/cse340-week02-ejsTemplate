// Validate Password
document.getElementById('password').addEventListener('input', function () {
    var passwordInput = this;
    var isValid = passwordInput.checkValidity();

    if (isValid) {
        passwordInput.classList.add('password-valid');
    } else {
        passwordInput.classList.remove('password-valid');
    }
});

// Toggle Hide/Show password
const pswBtn = document.getElementById("pswBtn");

pswBtn.addEventListener("click", function () {
    const pswInput = document.getElementById("password");
    const type = pswInput.getAttribute("type");

    if (type == "password") {
        pswInput.setAttribute("type", "text");
        pswBtn.innerHTML = "Hide Password";
    } else {
        pswInput.setAttribute("type", "password");
        pswBtn.innerHTML = "Show Password";
    }
});
