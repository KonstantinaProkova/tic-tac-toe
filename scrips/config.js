function openPlayerConfig(event){
    editedPlayer = parseInt(event.target.dataset.playerid);
    playerConfigOverlayElement.style.display = "block";
    backdropElement.style.display = "block";
}

function closePlayerConfig() {
    playerConfigOverlayElement.style.display = "none";
    backdropElement.style.display = "none";
    formElement.firstElementChild.classList.remove("error");
    errorsOutputElement.textContent = "";
    formElement.firstElementChild.lastElementChild.value = "";
}


function validateInput() {
    const enteredPlayerName = formInputElement.value.trim();

    if (!enteredPlayerName || parseInt(enteredPlayerName)) {
        formElement.firstElementChild.classList.add("error");
        errorsOutputElement.textContent = "Please enter a valid name!"
        return false;
    }

    formElement.firstElementChild.classList.remove("error");
    errorsOutputElement.textContent = "";

    return true;
}

function formSubmit (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayerName = formData.get("playername").trim();

    const inputIsValid = validateInput();

    if(!inputIsValid) {
        return;
    }

    const playerNameElement = document.querySelector("#player-" + editedPlayer + "-data h3");
    playerNameElement.textContent = enteredPlayerName;

   players[editedPlayer - 1].name = enteredPlayerName;

   closePlayerConfig();
}