const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");


//create the unit
const box = 32;


//load images
const ground = new Image();
ground.src = './img/ground.png';

const foodImg = new Image();
foodImg.src = './img/food.png';

//create the snake

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}
let strikes = 0;

//create the food

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
}

let score = 0;

let d;


let isAnswering = false;
console.log(isAnswering);

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
    }
}

//collision

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false
}

var life = document.getElementById("life1");
//draw canvas

function draw() {
    ctx.drawImage(ground, 0, 0);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y);

    //old head position

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //which direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    //if the snake eats the food 

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        };
    } else {
        snake.pop();
    }

    //add a new head

    let newHead = {
            x: snakeX,
            y: snakeY
        }
        //cada que se pierda una vida, se puede recuperar si se responde correctamente la pregunta, de lo contrario la vida se pierde y se continua jugando
        //game over
    let pregunta;

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        strikes++;
        console.log(strikes);
        life1.src = "./img/lost_life.png"
        if (strikes > 1) {
            life2.src = "./img/lost_life.png"
        }
        if (strikes > 2) {
            life3.src = "./img/lost_life.png"
        }


        if (strikes >= 3) {
            /*  */

            if (confirm("Acabas de chocar 3 veces, presiona OK para responder la pregunta o presiona cancelar para detener el juego")) {
                pregunta = document.getElementById("pregunta");
                pregunta.style.visibility = 'visible';
            } else {
                clearInterval(game);
            }


            /* isAnswering = true;
            console.log(isAnswering); */

        }

        newHead = {
            x: 9 * box,
            y: 10 * box
        }

    }
    // reset();
    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Poppins";

    ctx.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);


/* let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", reset);

function reset() {
    setInterval(draw, 100);
    snake = [];
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    }
    score = 0;
    food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box,
    }

} */