function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME</span>!';
    gameOverElement.style.display = "none";

    let gameBoardIndex = 0;
    for(let i=0; i<3; i++){
        for (let j=0; j<3; j++){
            gameData[i][j] = 0;
            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex++];
            gameBoardItemElement.textContent = '';
            gameBoardItemElement.classList.remove("disabled");
        }
    }

}

function startNewGame() {
    if (players[0].name === "" || players[1].name === "") {
        alert("Please set custom player names for both players!");
        return;
    }

    resetGameStatus();

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = "block";
}

function checkForGameOver() {
    for (let i = 0; i < 3; i++) {
        if (gameData[i][0] > 0 && gameData[i][0] === gameData[i][1] && gameData[i][1] === gameData[i][2]) {
            return gameData[i][0];
        }
    }
    for (let i = 0; i < 3; i++) {
        if (gameData[0][i] > 0 && gameData[0][i] === gameData[1][i] && gameData[1][i] === gameData[2][i]) {
            return gameData[0][i];
        }
    }

    if (gameData[0][0] > 0 && gameData[0][0] === gameData [1][1] && gameData[1][1] === gameData [2][2]) {
        return gameData[0][0];
    }

    if (gameData[0][2] > 0 && gameData[0][2] === gameData [1][1] && gameData[1][1] === gameData [2][0]) {
        return gameData[0][2];
    }

    if (currentRound === 9) {
        return -1;
    }

    return 0;
}

function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    if ((event.target.textContent !== "" || checkForGameOver() !== 0) && currentRound !== 9) {
        return;
    }

    event.target.textContent = players[activePlayer].symbol;
    event.target.classList.add("disabled");

    const selectedColumn = event.target.dataset.col - 1;
    const selectedRow = event.target.dataset.row - 1;

    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    const winnerId = checkForGameOver();

    if (winnerId !== 0) {
        endGame(winnerId);
    }

    currentRound++;
    switchPlayer();
}

function endGame(winnerId) {
    gameOverElement.style.display = "block";
    if (winnerId > 0) {
        gameOverElement.firstElementChild.firstElementChild.textContent = players[winnerId - 1].name;
    } else {
        gameOverElement.firstElementChild.textContent = "It's a draw!"
    }
}