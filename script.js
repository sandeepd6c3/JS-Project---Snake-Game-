// ============================
// 🐍 Snake Game - JavaScript
// ============================



// ============================
// 🔹 DOM ELEMENTS
// ============================

// Game Board
let Board = document.querySelector(".Board");

// Buttons & Modals
const startbutton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startgamemodal = document.querySelector(".start-game");
const gameovermodal = document.querySelector(".game-over");
const restartbutton = document.querySelector(".btn-restart");

// Info Elements
const highscoreElement = document.querySelector("#high-Score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");



// ============================
// 🔹 GAME STATE VARIABLES
// ============================

// Highscore (from localStorage)
let highscore = parseInt(localStorage.getItem("high-Score")) || 0;

// Game stats
let score = 0;
let time = `00-00`;

// Display highscore
highscoreElement.innerText = highscore;



// ============================
// 🔹 BOARD CONFIGURATION
// ============================

// Block size
const blockheight = 40;
const blockwidth = 40;

// Game loop IDs
let setIntervalId = null;
let timerIntervalId = null;

// Store all blocks
const blocks = [];

// Grid dimensions
const cols = Math.floor(Board.clientWidth / blockwidth);
const rows = Math.floor(Board.clientHeight / blockheight);



// ============================
// 🔹 INITIAL GAME STATE
// ============================

// Snake starting position
let snake = [{ x: 1, y: 3 }];

// Initial direction
let direction = "right";

// Food position
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};



// ============================
// 🔹 CREATE GAME GRID
// ============================

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {

    let block = document.createElement("div");
    block.classList.add("block");

    Board.appendChild(block);

    // Save reference
    blocks[`${row}-${col}`] = block;
  }
}



// ============================
// 🔹 GAME RENDER FUNCTION
// ============================

function render() {

  let head = null;

  // Show food
  blocks[`${food.x}-${food.y}`].classList.add("food");


  // 🔸 Calculate new head position
  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };

  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };

  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };

  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }


  // 🔸 Wall collision
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {

    clearInterval(setIntervalId);

    modal.style.display = "flex";
    startgamemodal.style.display = "none";
    gameovermodal.style.display = "flex";

    return;
  }


  // 🔸 Food collision
  if (head.x == food.x && head.y == food.y) {

    blocks[`${food.x}-${food.y}`].classList.remove("food");

    // New food
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };

    blocks[`${food.x}-${food.y}`].classList.add("food");

    // Grow snake
    snake.unshift(head);

    // Update score
    score += 10;
    scoreElement.innerText = score;

    // Update highscore
    if (score > highscore) {
      highscore = score;
      highscoreElement.innerText = highscore;
      localStorage.setItem("high-Score", highscore.toString());
    }
  }


  // 🔸 Clear previous snake
  snake.forEach(segment => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });


  // 🔸 Move snake
  snake.unshift(head);
  snake.pop();


  // 🔸 Render snake
  snake.forEach(segment => {
    console.log(segment);
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}



// ============================
// 🔹 START GAME
// ============================

startbutton.addEventListener("click", () => {

  modal.style.display = "none";

  // Game loop
  setIntervalId = setInterval(() => {
    render();
  }, 500);

  // Timer
  timerIntervalId = setInterval(() => {

    let [min, sec] = time.split("-").map(Number);

    sec = sec + 1;

    if (sec == 60) {
      min += 1;
      sec = 0;
    }

    time = `${min}-${sec}`;
    timeElement.innerText = time;

  }, 1000);
});



// ============================
// 🔹 RESTART GAME
// ============================

restartbutton.addEventListener("click", restartgame);

function restartgame() {

  clearInterval(setIntervalId);

  modal.style.display = "none";


  // Remove food
  blocks[`${food.x}-${food.y}`].classList.remove("food");


  // Clear snake
  snake.forEach(segment => {
    console.log(segment);
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });


  // Reset values
  score = 0;
  scoreElement.innerText = score;

  time = `00-00`;
  timeElement.innerText = time;


  // Reset snake
  snake = [{ x: 1, y: 3 }];
  direction = "right";


  // New food
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };


  // Restart loop
  setIntervalId = setInterval(() => {
    render();
  }, 500);
}



// ============================
// 🔹 KEYBOARD CONTROLS
// ============================

addEventListener("keydown", (event) => {

  if (event.key == "ArrowUp") {
    direction = "up";

  } else if (event.key == "ArrowDown") {
    direction = "down";

  } else if (event.key == "ArrowLeft") {
    direction = "left";

  } else if (event.key == "ArrowRight") {
    direction = "right";
  }

});