import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const loginBtn =
document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    signInWithEmailAndPassword(
        auth,
        email,
        password
    )

    .then(() => {

        alert("Login berhasil!");

        window.location.href =
        "dashboard.html";

    })

    .catch((error) => {

        alert(error.message);

    });

});