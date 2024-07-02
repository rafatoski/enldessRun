const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const finalScoreDisplay = document.getElementById("final-score");
const startScreen = document.getElementById("start-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const game = document.getElementById("game");

let score = 0;
let isGameRunning = false;

function startGame() {
    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    score = 0;
    scoreDisplay.textContent = score;
    isGameRunning = true;
    moveObstacle();
}

function gameOver() {
    isGameRunning = false;
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove("hidden");
}

function jump() {
    if (!character.classList.contains("animate")) {
        character.classList.add("animate");
        setTimeout(() => {
            character.classList.remove("animate");
        }, 500);
    }
}

function moveObstacle() {
    if (!isGameRunning) return;

    let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));
    let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
    let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue("right"));

    if (obstacleRight > game.offsetWidth - 50 && obstacleRight < game.offsetWidth - 30 && characterBottom < 40) {
        gameOver();
        return;
    }

    if (obstacleRight > game.offsetWidth) {
        obstacle.style.right = "-5%";
        score++;
        scoreDisplay.textContent = score;
    } else {
        obstacle.style.right = (obstacleRight + 5) + "px";
    }

    requestAnimationFrame(moveObstacle);
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && isGameRunning) {
        jump();
    }
});

game.addEventListener("click", () => {
    if (isGameRunning) {
        jump();
    }
});

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

// Mantener la orientación landscape
function handleOrientation() {
    if (window.orientation === 0 || window.orientation === 180) {
        document.body.classList.add('portrait');
    } else {
        document.body.classList.remove('portrait');
    }
}

window.addEventListener('orientationchange', handleOrientation);
handleOrientation();