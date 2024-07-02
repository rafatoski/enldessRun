const character = document.getElementById("character");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
let score = 0;

function jump() {
    if (character.classList != "animate") {
        character.classList.add("animate");
    }
    setTimeout(function(){
        character.classList.remove("animate");
    }, 300);
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});

let isAlive = setInterval(function() {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    
    if (obstacleLeft < 20 && obstacleLeft > 0 && characterTop >= 130) {
        alert("Game Over! Tu puntuación: " + score);
        score = 0;
    } else {
        score++;
        scoreDisplay.textContent = score;
    }
}, 10);

function moveObstacle() {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    if (obstacleLeft < -20) {
        obstacle.style.left = "480px";
    } else {
        obstacle.style.left = (obstacleLeft - 5) + "px";
    }
    requestAnimationFrame(moveObstacle);
}

moveObstacle();