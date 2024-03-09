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
