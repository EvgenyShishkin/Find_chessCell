
let playColor = "white";
const chessBoard = document.querySelector(".chessBoard"),
    btnColors = document.querySelectorAll(".btn"),
    btnStart = document.querySelector(".btn_start_game"),
    btnsWrapper = document.querySelector(".buttons_wrapper");

let words = ['a','b','c','d','e','f','g','h'];
chessBoardPaint(playColor)



function btnColorChoise (event) {
    
    for (let i = 0; i < btnColors.length;i++) {
        btnColors[i].classList.remove("btn_active")
    }

    event.target.classList.add("btn_active");
    let currentColor = event.target.dataset.color;
    if (currentColor === "randome") {
        currentColor = Math.random() > 0.5 ? "white" : "black";
    }
    playColor = currentColor;

    chessBoard.classList.remove("black");
    chessBoard.classList.remove("white");
    
    chessBoard.classList.add(playColor)

    chessBoardPaint(playColor);
}

btnsWrapper.addEventListener("click", (event) => {
    if (event.target.dataset.color) {
        btnColorChoise(event);
    }
    
} )

function chessBoardPaint (color) {
    chessBoard.innerHTML = '';

    if (color === "white") {
        for ( let k = 8; k > 0; k--) {
            for (let j = 0;j < words.length; j++) {
                const newElement = document.createElement("div");
                newElement.classList.add("chessBoard_cell");
                newElement.dataset.id = words[j]+k;
                chessBoard.appendChild(newElement);
            }
        }  
    } else {
        for ( let k = 1; k <= 8; k++) {
            for (let j = (words.length - 1);j >= 0; j--) {
                const newElement = document.createElement("div");
                newElement.classList.add("chessBoard_cell");
                newElement.dataset.id = words[j]+k;
                chessBoard.appendChild(newElement);
            }
        }
    }
}