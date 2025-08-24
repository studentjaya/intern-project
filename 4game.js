const rows = 6, cols = 7;
let board = [];
let currentPlayer = "aqua"; // Player 1 starts
const boardDiv = document.getElementById("board");

// Create board
function createBoard() {
  board = [];
  boardDiv.innerHTML = "";
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      board[r][c] = "";
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener("click", () => dropDisc(c));
      boardDiv.appendChild(cell);
    }
  }
}

// Drop disc in column
function dropDisc(col) {
  for (let r = rows - 1; r >= 0; r--) {
    if (board[r][col] === "") {
      board[r][col] = currentPlayer;
      updateBoard();
      if (checkWin(r, col)) {
        setTimeout(() => alert(`${currentPlayer.toUpperCase()} wins! 🎉`), 100);
        return;
      }
      if (board.flat().every(cell => cell !== "")) {
        setTimeout(() => alert("It's a draw! 🤝"), 100);
        return;
      }
      currentPlayer = currentPlayer === "aqua" ? "orange" : "aqua";
      return;
    }
  }
  alert("Column full! Try another one.");
}

// Update board UI
function updateBoard() {
  document.querySelectorAll(".cell").forEach(cell => {
    let r = cell.dataset.row;
    let c = cell.dataset.col;
    cell.className = "cell"; 
    if (board[r][c]) cell.classList.add(board[r][c]);
  });
}

// Check win
function checkWin(r, c) {
  return checkDirection(r, c, 1, 0) || // vertical
         checkDirection(r, c, 0, 1) || // horizontal
         checkDirection(r, c, 1, 1) || // diagonal ↘
         checkDirection(r, c, 1, -1);  // diagonal ↙
}

function checkDirection(r, c, dr, dc) {
  let color = board[r][c];
  let count = 1;
  for (let i = 1; i < 4; i++) {
    let nr = r + dr * i, nc = c + dc * i;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === color) count++;
    else break;
  }
  for (let i = 1; i < 4; i++) {
    let nr = r - dr * i, nc = c - dc * i;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === color) count++;
    else break;
  }
  return count >= 4;
}

// Restart game
function restartGame() {
  currentPlayer = "aqua";
  createBoard();
}

createBoard();

