const addBtn = document.getElementById("addBtn");
const promiseList = document.getElementById("promiseList");

let promises =
    JSON.parse(localStorage.getItem("promises")) || [];

renderPromises();

addBtn.addEventListener("click", () => {

    const title =
        document.getElementById("title").value;

    const description =
        document.getElementById("description").value;

    const deadline =
        document.getElementById("deadline").value;

    if (
        title === "" ||
        description === "" ||
        deadline === ""
    ) {
        alert("Please fill all fields!");
        return;
    }

    const newPromise = {
        id: Date.now(),
        title,
        description,
        deadline,
        progress: 0
    };

    promises.push(newPromise);

    savePromises();
    renderPromises();

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("deadline").value = "";
});

function savePromises() {
    localStorage.setItem(
        "promises",
        JSON.stringify(promises)
    );
}

function renderPromises() {

    promiseList.innerHTML = "";

    promises.forEach((promise) => {

        const card =
            document.createElement("div");

        card.classList.add("promise-card");

        card.innerHTML = `
            <h3>${promise.title}</h3>

            <p>${promise.description}</p>

            <p>
                <strong>Deadline:</strong>
                ${promise.deadline}
            </p>

            <p>
                <strong>Progress:</strong>
                ${promise.progress}%
            </p>
        `;

        promiseList.appendChild(card);
    });
}