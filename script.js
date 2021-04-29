let playColor = "white";
const chessBoard = document.querySelector(".chessBoard"),
    btnColors = document.querySelectorAll(".btn"),
    btnStart = document.querySelector(".btn_start_game"),
    btnsWrapper = document.querySelector(".buttons_wrapper"),
    playTimerBlock = document.querySelector(".playTimer"),
    chessBoardCells = document.getElementsByClassName("chessBoard_cell"),
    resultCount = document.querySelector(".result_count");

let words = ["a", "b", "c", "d", "e", "f", "g", "h"];
let playTimer = 30;
let targetCell = null;
let results = {
    current: 0,
    white: [],
    black: [],
};
chessBoardPaint(playColor);

function btnColorChoise(event) {
    for (let i = 0; i < btnColors.length; i++) {
        btnColors[i].classList.remove("btn_active");
    }

    event.target.classList.add("btn_active");
    let currentColor = event.target.dataset.color;
    if (currentColor === "randome") {
        currentColor = Math.random() > 0.5 ? "white" : "black";
    }
    playColor = currentColor;

    chessBoard.classList.remove("black");
    chessBoard.classList.remove("white");

    chessBoard.classList.add(playColor);

    chessBoardPaint(playColor);
}

btnsWrapper.addEventListener("click", (event) => {
    if (event.target.dataset.color) {
        btnColorChoise(event);
    }
});

function chessBoardPaint(color) {
    chessBoard.innerHTML = "";
    chessBoard.appendChild(createNewElement("div", "cell_name"));

    if (color === "white") {
        for (let k = 8; k > 0; k--) {
            for (let j = 0; j < words.length; j++) {
                const newElement = createNewElement("div", "chessBoard_cell");
                newElement.dataset.id = words[j] + k;
                chessBoard.appendChild(newElement);
            }
        }
    } else {
        for (let k = 1; k <= 8; k++) {
            for (let j = words.length - 1; j >= 0; j--) {
                const newElement = createNewElement("div", "chessBoard_cell");
                newElement.dataset.id = words[j] + k;
                chessBoard.appendChild(newElement);
            }
        }
    }
}

btnStart.addEventListener("click", () => {
    btnStart.setAttribute("disabled", "true");
    playTimerBlock.classList.remove("number_text_timeIsUp");
    results.current = 0;
    let intervalId = setInterval(function () {
        if (playTimer < 0) {
            clearInterval(intervalId);
            playTimer = 30;
            btnStart.removeAttribute("disabled");
            document.querySelector(".cell_name").innerHTML = "";
            results[playColor].push(results.current);
            return;
        }
        if (playTimer < 6) {
            playTimerBlock.classList.add("number_text_timeIsUp");
        }
        playTimerBlock.innerHTML = playTimer--;
    }, 1000);
    startTrain();
});

function createNewElement(tag, className) {
    const newElement = document.createElement(tag);
    newElement.classList.add(className);
    return newElement;
}

function startTrain() {
    let currentCellName = document.querySelector(".cell_name");
    const currentCell =
        chessBoardCells[getRandomInt(0, chessBoardCells.length)].dataset.id;
    currentCellName.innerHTML = currentCell;
    targetCell = currentCell;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

chessBoard.addEventListener("click", (event) => {
    if (event.target.dataset.id) {
        if (event.target.dataset.id === targetCell) {
            //event.target.classList.add("right_choise");
            startTrain();
            resultCount.innerHTML = ++results.current;
        }
    }
});
