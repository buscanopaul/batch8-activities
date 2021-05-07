//Messages
const xMessage = "It's X's turn";
const oMessage = "It's O's turn";
const drawMessage = "It's a draw!";
const winMessage = " is the winner!";
let announcer = document.getElementById("announcer");

//Global Variables
const xClass = 'x';
const oClass = 'o';
const empty = '';
const cellElements = document.querySelectorAll(".cell");
const board = document.getElementById("board");
let occupiedCells = 0;
let circleTurn;
let gameFinished = false;
let boardState = [
    [empty, empty, empty],
    [empty, empty, empty],
    [empty, empty, empty]
];

//Moves storage
let moves = [];
let movesCounter = 0;

//Starts the game
startGame();

function startGame() {
    const random_boolean = Math.random() < 0.5;
    circleTurn = random_boolean;
    setBoardClass();
}

//Adds event listener to each cell
cellElements.forEach(cell => {
    cell.addEventListener('click', clickHandler, {once:true});
});

function clickHandler() {
    if(gameFinished === false) {
    const cell = this;
    const currentClass = circleTurn ? oClass : xClass;
    //Places the Mark
    placeMark (cell, currentClass); //Done
    //Updates the Board State
    updateBoard(cell, currentClass); //Done
    //Logs the Move
    logMove(cell, currentClass); 
    //Checks if there's a winner
    checkWinner(currentClass);
    //Switches Turn
    switchTurn(); //Done
    setBoardClass(); //Done
    }
    //Disables further moves when game is finished
    else {
        board.classList.remove(xClass, oClass);
        console.log("The Game is finished. Please restart to play again");
    }
}



//FUNCTIONS FOR CLICK HANDLER

    //Add either o or x class
    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
    }

    //Switches the turn
    function switchTurn() {
        circleTurn = !circleTurn;
    }

    //Changes the class of the board to either o or x depending on circleTurn
    function setBoardClass() {
        board.classList.remove(xClass, oClass);
        if (gameFinished === false) {
            if (circleTurn) {
                board.classList.add(oClass);
                announcer.innerHTML = oMessage;
            }
            else {
                board.classList.add(xClass);
                announcer.innerHTML = xMessage;
            }
        }

    }

    //Updates the Board State
    function updateBoard(cell, currentClass) {
        const row = cell.dataset.row;
        const column = cell.dataset.column;
        boardState[row][column] = currentClass;
    }

    //Saves the Boardstate Every Turn    !UNFINISHED
    function logMove(cell, currentClass) {
        moves[movesCounter] = 
            [(movesCounter),
            (currentClass),
            (cell.dataset.row),
            (cell.dataset.column)
            ];
        console.log(`Turn ${moves[movesCounter][0] + 1}: ${moves[movesCounter][1].toUpperCase()} marked row ${Number((moves[movesCounter][2])) + 1}, column ${Number(moves[movesCounter][3]) + 1}`);
        movesCounter ++;

    }

    //Check the Board for Winner 
    function checkWinner(currentClass) {
        let winner = currentClass.toUpperCase();

        //Horizontal Win 
        for (let row=0; row<boardState.length; row++) {
            let a = boardState[row][0];
            let b = boardState[row][1];
            let c = boardState[row][2];
            if(a && a===b && b===c && gameFinished === false) {
                console.log(winner + " " + "is the winner! (Row)")
                hasWinner();
                break;
            }
        }

        //Vertical Win
        for (let column=0; column<boardState.length; column++) {
            let a = boardState[0][column];
            let b = boardState[1][column];
            let c = boardState[2][column];
            if(a && a===b && b===c && gameFinished === false) {
                console.log(winner + " " + "is the winner! (Column)");
                hasWinner();
                break
            }
        }

        //Diagonal Win (Left)
        if (gameFinished === false) {
            let a = boardState[0][0];
            let b = boardState[1][1];
            let c = boardState[2][2];
            if(a && a===b && b===c) {
                console.log(winner + " " + "is the winner! (Diagonal Left)");
                hasWinner();
            }
        }
        //Diagonal Win (Right)
        if (gameFinished === false) {
            let a = boardState[0][2];
            let b = boardState[1][1];
            let c = boardState[2][0];
            if(a && a===b && b===c) {
                console.log(winner + " " + "is the winner! (Diagonal Right)");
                hasWinner();
            }
        }

        function hasWinner() {
            gameFinished = true;
            announcer.innerHTML = winner + winMessage;
            previousButton.style.display = "flex";
            nextButton.style.display = "flex";
            nextButton.style.visibility = "hidden";
            winnerGif.style.display = "flex";

        }

        // Draw
        for (let row=0; row<boardState.length; row++) {
            for (let column=0; column<boardState.length; column++) {
                if(boardState[row][column] !== empty) {
                    occupiedCells += 1;
                }
            }
        }
        if (occupiedCells === 9 && gameFinished === false) {
            gameFinished = true;
            announcer.innerHTML = drawMessage;
            previousButton.style.display = "flex";
            nextButton.style.display = "flex";
            nextButton.style.visibility = "hidden";
            drawGif.style.display = "flex";
            console.log("It's a draw");
        }
        else {
            occupiedCells = 0;
        }
    }

// FUNCTIONS FOR BUTTONS
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const resetButton = document.getElementById("reset");

const winnerGif = document.getElementById("winner");
const drawGif = document.getElementById("draw");

//Resets the board
function resetBoard() {
    boardState = [
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty]
    ];
    moves = [];
    movesCounter = 0;
    gameFinished = false;
    occupiedCells = 0;
    cellElements.forEach(cell => {
        cell.classList.remove(xClass, oClass);
        cell.addEventListener('click', clickHandler, {once:true});
    })
    previousButton.style.display = "none";
    nextButton.style.display = "none";
    winnerGif.style.display = "none";
    drawGif.style.display = "none";
    
    startGame();
}

function previousMove() {
    //Sets limits on moves
    if (movesCounter === moves.length) {
        movesCounter -= 1;
    }
    if (movesCounter < 0) {
        movesCounter += 1;
    }

    if (movesCounter >= 0) {
        nextButton.style.visibility="visible";
        let moveData = moves[movesCounter];
        const turn = moveData[1];
        const row = moveData[2];
        const column = moveData[3];
        const cell = document.querySelector(`[data-row='${row}'][data-column='${column}']`);
        cell.classList.remove(turn);
        if (movesCounter === 0) {
            previousButton.style.visibility = "hidden";
            console.log("Reached first move");
        }
        else {
            movesCounter --;
        }
    }
}

function nextMove() {
    //Sets limits on moves
    if (movesCounter === moves.length) {
        movesCounter -= 1;
    }
    if (movesCounter < 0) {
        movesCounter += 1;
    }

    if (movesCounter < moves.length) {
        previousButton.style.visibility="visible";
        let moveData = moves[movesCounter];
        const turn = moveData[1];
        const row = moveData[2];
        const column = moveData[3];
        const cell = document.querySelector(`[data-row='${row}'][data-column='${column}']`);
        cell.classList.add(turn);
        if (movesCounter === moves.length - 1) {
            nextButton.style.visibility = "hidden";
            console.log("Reached final move");
        }
        else {
            movesCounter ++;
        }
        
    }
}