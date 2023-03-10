const screen = document.querySelector(".game__screen");
const body = document.querySelector("body");

let snakeHeadPosX = 10;
let snakeHeadPosY = 12;

const changeFoodPos = () => {
    foodPosX = Math.floor(Math.random() * 30) + 1;
    foodPosY = Math.floor(Math.random() * 30) + 1;
};

let foodPosX;
let foodPosY;
changeFoodPos();

let velocity = [0, 0];


const input = (key) => {
    if (key.code == "ArrowUp") {
        velocity = [0, -1]
    } else if (key.code == "ArrowDown") {
        velocity = [0, 1]
    } else if (key.code == "ArrowRight") {
        velocity = [1, 0]
    } else if (key.code == "ArrowLeft") {
        velocity = [-1, 0]
    }
    initGame();
}
body.addEventListener('keydown', input)

const move = () => {
    snakeHeadPosX += velocity[0];
    snakeHeadPosY += velocity[1];
}


const initGame = () => {
    let html = `<div class="snake__head" style="grid-area: ${snakeHeadPosY} / ${snakeHeadPosX}"></div>`;

    html += `<div class="food" style="grid-area: ${foodPosY} / ${foodPosX}"></div>`;

    move()

    screen.innerHTML = html;
};

setInterval(initGame, 1000 / 16)