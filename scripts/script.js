const screen = document.querySelector(".game__screen");
const gameScore = document.querySelector(".game__score");
const controls = document.querySelector(".game__controls");

let game = {
    MAX_X: 30,
    MAX_Y: 30,
    fps: 7,

    score: 3,

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
};

const initGame = () => {
    document.addEventListener("keydown", handleInput);
    updateSnakePosition();
    checkWallCollision();
    checkBodyCollision();
    checkFoodCollision();
    render();
};

const handleControlClick = (directionX, directionY) => {
    if (game.snake.direction.x !== directionX && game.snake.direction.y !== directionY) {
        game.snake.direction.x = directionX;
        game.snake.direction.y = directionY;
    }
};

controls.addEventListener("click", (event) => {
    if (event.target.classList.contains("game__button--up")) {
        handleControlClick(0, -1);
    } else if (event.target.classList.contains("game__button--down")) {
        handleControlClick(0, 1);
    } else if (event.target.classList.contains("game__button--right")) {
        handleControlClick(1, 0);
    } else if (event.target.classList.contains("game__button--left")) {
        handleControlClick(-1, 0);
    }
});

const handleInput = (key) => {
    if (key.code === "ArrowUp") {
        handleControlClick(0, -1);
    } else if (key.code === "ArrowDown") {
        handleControlClick(0, 1);
    } else if (key.code === "ArrowRight") {
        handleControlClick(1, 0);
    } else if (key.code === "ArrowLeft") {
        handleControlClick(-1, 0);
    }
};

const updateSnakePosition = () => {
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
};

const checkWallCollision = () => {
    if (
        game.snake.body[0].x < 1 ||
        game.snake.body[0].x > game.MAX_X ||
        game.snake.body[0].y < 1 ||
        game.snake.body[0].y > game.MAX_Y
    ) {
        gameOver();
    }
};

const checkFoodCollision = () => {
    if (game.snake.body[0].x === game.food.x && game.snake.body[0].y === game.food.y) {
        game.snake.body.push({ ...game.snake.body[0] });
        game.food.changePos();

        updateScore();
        return;
    }

    for (let i = 1; i < game.snake.body.length; i++) {
        if (
            game.snake.body[i].x === game.food.x &&
            game.snake.body[i].y === game.food.y
        ) {
            game.food.changePos();
        }
    }
};

const checkBodyCollision = () => {
    for (let i = 1; i < game.snake.body.length; i++) {
        if (
            game.snake.body[i].x === game.snake.body[0].x &&
            game.snake.body[i].y === game.snake.body[0].y
        ) {
            gameOver();
        }
    }
};

const updateScore = () => {
    game.score++;

    // Calculating the speed of the game based
    // on the player's points using a power function.
    // Formula: fps ≈ √(score / 10) + 7
    game.fps = Math.round(Math.sqrt(game.score / 10)) + 7;

    gameScore.innerHTML = `Score ${game.score}`;
};

const render = () => {
    let html = `<div class="food" style="grid-area: ${game.food.y} / ${game.food.x}"></div>`;
    html += game.snake.body
        .map(
            (elem) =>
                `<div class="snake__body" style="grid-area: ${elem.y} / ${elem.x}"></div>`
        )
        .join("");

    screen.innerHTML = html;
};

const gameOver = () => {
    clearInterval(timer);
    window.location.reload();
};

const timer = setInterval(initGame, 1000 / game.fps);
