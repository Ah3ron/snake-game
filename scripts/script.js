const screen = document.querySelector(".game__screen");

let game = {
    MAX_X: 30,
    MAX_Y: 30,
    snake: {
        body: [
            { x: 8, y: 12 },
            { x: 7, y: 12 },
            { x: 6, y: 12 },
        ],
        direction: {
            x: 1,
            y: 0,
        },
    },
    food: {
        x: 14,
        y: 14,
        changePos() {
            this.x = Math.floor(Math.random() * game.MAX_X) + 1;
            this.y = Math.floor(Math.random() * game.MAX_Y) + 1;
        },
    },
    score: 0,
};

const input = (key) => {
    switch (key.code) {
        case "ArrowUp":
            game.snake.direction.x = 0;
            game.snake.direction.y = -1;
            break;
        case "ArrowDown":
            game.snake.direction.x = 0;
            game.snake.direction.y = 1;
            break;
        case "ArrowRight":
            game.snake.direction.x = 1;
            game.snake.direction.y = 0;
            break;
        case "ArrowLeft":
            game.snake.direction.x = -1;
            game.snake.direction.y = 0;
            break;
        default:
            break;
    }

    initGame();
};

document.body.addEventListener("keydown", input);

const initGame = () => {
    let html = `<div class="food" style="grid-area: ${game.food.y} / ${game.food.x}"></div>`;

    game.snake.body = game.snake.body.map((elem, index) =>
        index === 0
            ? {
                  x: elem.x + game.snake.direction.x,
                  y: elem.y + game.snake.direction.y,
              }
            : {
                  x: game.snake.body[index - 1].x,
                  y: game.snake.body[index - 1].y,
              }
    );

    if (
        game.snake.body[0].x === game.food.x &&
        game.snake.body[0].y === game.food.y
    ) {
        game.food.changePos();
        game.snake.body.push({ ...game.snake.body[0] });
        game.score++;
    }

    html += game.snake.body
        .map(
            (elem) =>
                `<div class="snake__head" style="grid-area: ${elem.y} / ${elem.x}"></div>`
        )
        .join("");

    screen.innerHTML = html;
};

setInterval(initGame, 1000 / 8);
