import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const registerBtn =
document.getElementById("registerBtn");

registerBtn.addEventListener("click", () => {

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    createUserWithEmailAndPassword(
        auth,
        email,
        password
    )

    .then(() => {

        alert("Register berhasil!");

    })

    .catch((error) => {

        alert(error.message);

    });

});