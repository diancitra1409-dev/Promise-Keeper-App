import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const auth = getAuth();

const logoutBtn =
document.getElementById("logoutBtn");

const totalPromise =
document.getElementById("totalPromise");

const activePromise =
document.getElementById("activePromise");

const completedPromise =
document.getElementById("completedPromise");

const deadlineList =
document.getElementById("deadlineList");


// ======================
// CEK LOGIN
// ======================

onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  loadDashboard(user);

});


// ======================
// LOAD DASHBOARD
// ======================

async function loadDashboard(user) {

  const q = query(
    collection(db, "promises"),
    where("userId", "==", user.uid)
  );

  const snapshot =
  await getDocs(q);

  let total = 0;
  let completed = 0;

  deadlineList.innerHTML = "";

  snapshot.forEach((doc) => {

    const promise = doc.data();

    total++;

    if (promise.completed) {
      completed++;
    }

    if (promise.deadline) {

      deadlineList.innerHTML += `
        <div class="promise-card">
          <h3>${promise.title}</h3>
          <p>📅 ${promise.deadline}</p>
        </div>
      `;
    }

  });

  totalPromise.textContent = total;

  completedPromise.textContent =
  completed;

  activePromise.textContent =
  total - completed;

}


// ======================
// LOGOUT
// ======================

logoutBtn.addEventListener("click", async () => {

  await signOut(auth);

  window.location.href =
  "login.html";

});