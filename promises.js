import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  addDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const auth = getAuth();


// ====================
// ELEMENTS
// ====================

const openModalBtn =
document.getElementById("openModalBtn");

const addModal =
document.getElementById("addModal");

const closeAddModal =
document.getElementById("closeAddModal");

const saveAddBtn =
document.getElementById("saveAddBtn");

const editModal =
document.getElementById("editModal");

const closeEditModal =
document.getElementById("closeEditModal");

const saveEditBtn =
document.getElementById("saveEditBtn");

const promiseList =
document.getElementById("promiseList");

let selectedPromiseId = null;


// ====================
// LOGIN CHECK
// ====================

onAuthStateChanged(auth, (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  loadPromises(user);

});


// ====================
// LOAD PROMISES
// ====================

async function loadPromises(user) {

  promiseList.innerHTML = "";

  const q = query(
    collection(db, "promises"),
    where("userId", "==", user.uid)
  );

  const snapshot =
  await getDocs(q);

  snapshot.forEach((document) => {

    const promise =
    document.data();

    promiseList.innerHTML += `

      <div class="promise-card">

        <h3>
          ${promise.title}

          ${
            promise.completed
            ? `<span class="completed-badge">
                ✅ Completed
              </span>`
            : ""
          }

        </h3>

        <p>${promise.description}</p>

        <div class="deadline">
          📅 Deadline:
          ${promise.deadline || "-"}
        </div>

        <div class="progress-section">

          <div class="progress-text">
            Progress:
            ${promise.progress || 0}%
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value="${promise.progress || 0}"
            class="progress-slider"
            data-id="${document.id}"
            ${
              promise.completed
              ? "disabled"
              : ""
            }
          >

        </div>

        <div class="action-buttons">

          <button
            class="edit-btn"
            data-id="${document.id}"
            data-title="${promise.title}"
            data-description="${promise.description}"
          >
            ✏️ Edit
          </button>

          <button
            class="delete-btn"
            data-id="${document.id}"
          >
            🗑 Delete
          </button>

        </div>

      </div>

    `;

  });

  addEditEvents();
  addDeleteEvents();
  addProgressEvents();

}


// ====================
// OPEN ADD MODAL
// ====================

openModalBtn.addEventListener("click", () => {

  addModal.style.display = "flex";

});


// ====================
// CLOSE ADD MODAL
// ====================

closeAddModal.addEventListener("click", () => {

  addModal.style.display = "none";

});


// ====================
// SAVE NEW PROMISE
// ====================

saveAddBtn.addEventListener("click", async () => {

  const user =
  auth.currentUser;

  const title =
  document.getElementById("addTitle").value;

  const description =
  document.getElementById("addDescription").value;

  const deadline =
  document.getElementById("addDeadline").value;

  try {

    await addDoc(
      collection(db, "promises"),
      {
        userId: user.uid,
        title,
        description,
        deadline,
        progress: 0,
        completed: false
      }
    );

    alert("Promise berhasil ditambahkan!");

    addModal.style.display = "none";

    document.getElementById("addTitle").value = "";
    document.getElementById("addDescription").value = "";
    document.getElementById("addDeadline").value = "";

    loadPromises(user);

  }
  catch(error) {

    console.error(error);

  }

});


// ====================
// EDIT EVENTS
// ====================

function addEditEvents() {

  const editButtons =
  document.querySelectorAll(".edit-btn");

  editButtons.forEach((button) => {

    button.addEventListener("click", () => {

      selectedPromiseId =
      button.dataset.id;

      document.getElementById("editTitle").value =
      button.dataset.title;

      document.getElementById("editDescription").value =
      button.dataset.description;

      editModal.style.display = "flex";

    });

  });

}


// ====================
// CLOSE EDIT MODAL
// ====================

closeEditModal.addEventListener("click", () => {

  editModal.style.display = "none";

});


// ====================
// SAVE EDIT
// ====================

saveEditBtn.addEventListener("click", async () => {

  const title =
  document.getElementById("editTitle").value;

  const description =
  document.getElementById("editDescription").value;

  try {

    await updateDoc(
      doc(
        db,
        "promises",
        selectedPromiseId
      ),
      {
        title,
        description
      }
    );

    alert("Promise berhasil diupdate!");

    editModal.style.display = "none";

    loadPromises(auth.currentUser);

  }
  catch(error) {

    console.error(error);

  }

});


// ====================
// DELETE EVENTS
// ====================

function addDeleteEvents() {

  const deleteButtons =
  document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {

    button.addEventListener("click", async () => {

      const confirmDelete =
      confirm(
        "Yakin ingin menghapus promise ini?"
      );

      if (!confirmDelete) return;

      try {

        await deleteDoc(
          doc(
            db,
            "promises",
            button.dataset.id
          )
        );

        alert(
          "Promise berhasil dihapus!"
        );

        loadPromises(
          auth.currentUser
        );

      }
      catch(error) {

        console.error(error);

      }

    });

  });

}


// ====================
// UPDATE PROGRESS
// ====================

function addProgressEvents() {

  const sliders =
  document.querySelectorAll(".progress-slider");

  sliders.forEach((slider) => {

    slider.addEventListener("change", async () => {

      const progressValue =
      Number(slider.value);

      try {

        await updateDoc(
          doc(
            db,
            "promises",
            slider.dataset.id
          ),
          {
            progress: progressValue,

            completed:
              progressValue >= 100
          }
        );

        loadPromises(
          auth.currentUser
        );

      }
      catch(error) {

        console.error(error);

      }

    });

  });

}