let boxes = document.querySelectorAll(".box");
let resetGameBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");

let turnX = true;
let count = 0;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(turnX){
            box.innerText = "X";
            box.style.color = "#b0413e";
            turnX = false;
        }else{
            box.innerText = "O";
            box.style.color = "navy";
            turnX = true;
        }
        box.disabled = true;
        count++;

        let isWinner =chkWinner();
        if(count == 9 && !isWinner){
            tieGame();
        }
    })
});

const tieGame = () =>{
    msg.innerText = `Sorry, It's a tie match.`;
    msgContainer.classList.remove("hide");
    disableBtns();
}

const resetGame = () =>{
    turnX = true;
    enableBtns();
    msgContainer.classList.add("hide");
}

newGameBtn.addEventListener("click", resetGame);
resetGameBtn.addEventListener("click", resetGame);
const chkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                showWinner(pos1Val);
            }
        }
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is Player who used ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtns();
}

const disableBtns = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBtns = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
