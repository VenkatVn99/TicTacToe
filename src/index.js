let boxes = document.querySelectorAll(".box");
let winnerMsgEl = document.querySelector("#winner-msg");
let newGameBtn = document.querySelector("#new-game-button");
let resetBtn = document.querySelector("#reset-button");
let winnerMsgContainer = document.querySelector(".winner-message-container");

let turnO = true;
let count = 0;

const Patterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  winnerMsgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (turnO) {
        //playerO
        box.innerText = "O";
        turnO = false;
      } else {
        //playerX
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true;
      count++;

      if (checkWinner()) {
        return;
      }

      if (count === 9) {
        gameDraw();
      }
    }
  });
});

const showWinner = (winner) => {
  winnerMsgEl.innerText = `Congratulations! Winner is ${winner}`;
  winnerMsgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of Patterns) {
    let positionValue1 = boxes[pattern[0]].innerText;
    let positionValue2 = boxes[pattern[1]].innerText;
    let positionValue3 = boxes[pattern[2]].innerText;
    if (
      positionValue1 !== "" &&
      positionValue2 !== "" &&
      positionValue3 !== ""
    ) {
      if (
        positionValue1 === positionValue2 &&
        positionValue2 === positionValue3
      ) {
        showWinner(positionValue1);
        return true;
      }
    }
  }
  return false;
};

const gameDraw = () => {
  winnerMsgEl.innerText = `Game was a Draw.`;
  winnerMsgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
