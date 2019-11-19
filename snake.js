var vm = new Vue({
    el: "#cuestionario",
    data: {
        metodo: " ",
        numeroMetodo: 1,
        metodos: [
            '1. Interpolacion lineal',
            '2. Interpolacion Lineal',
            'Newton hacia adelante',
            'Newton hacia atras',
            'Newton con diferencias divididas',
            'Lagrange',
            'Punto fijo o Sustituciones sucesivas',
            'Newton - Raphson',
            'Falsa posicion',
            'Secante',
            'Montante',
            'Gauss - Jordan',
            'Eliminacion Gaussiana',
            'Gauss - Seidel',
            'Jacobi',
            'Linea Recta',
            'Regla Trapezoidal',
            'Newton - Cotes (Abiertas)',
            'Regla 1/3 Simpson',
            'Regla de 3/8 Simpson',
            'Euler hacia adelante',
            'Euler modificado',
            'Runge - Kutta de 2° orden',
            'Runge - Kutta de 3er orden',
            'Runge - Kutta de 4to orden',
            'Runge - Kutta de 4to orden por 3/8 de Simpson',
            'Runge - Kutta de orden superior'
        ],
        respuestasCorrectas: [
            'g(x) = 1.304007668',
            'g(x) = 1.354025101',
            2.714444444,
            2.714444444, -1.723076923,
            2.714444444,
            "E = 0.000008941",
            "E = 0.0000001",
            "E = 0.000527473",
            "E = 0.00002705181386",
            "a = 62/87; b = 19/87; c = 66/87",
            "a = -1; b = 1/2; c = 5/2",
            "x1 = 1; x2 = 3; x3 = 2",
            "Ex = 0.000840625; Ey = 0.000417188; Ez = 0.000418438",
            "Ex = 0.000481445; Ey = 0.000230468; Ez = 0.000757812",
            "a1 = 0.633695283; a0 = 2.008443615",
            "I = 0.142416952",
            ""
        ],
        temp: 0,
        respuestaCorrecta: "",
        correcta: false,
        incorrecta: false,
    },
    methods: {
        elegirMetodo: function() {
            this.numeroMetodo = Math.floor(Math.random() * 5);
            this.metodos.forEach((element, index) => {
                if (index == this.numeroMetodo) {
                    this.metodo = element;
                    this.temp = index;
                    return;
                }
            });
        },
        validarRespuesta: function() {
            var inputVal = document.getElementById("campoRespuesta").value;
            this.respuestasCorrectas.forEach((respuesta, indice) => {
                if (this.temp == indice && inputVal == respuesta) {
                    this.respuestaCorrecta = 1;
                }
            });
            //console.log(this.respuestaCorrecta);
            if (this.respuestaCorrecta == 1) {
                console.log("Correcta");
                setTimeout(function() {
                    game = setInterval(draw, 100);
                }, 3000)
                this.correcta = true;
                document.getElementById("campoRespuesta").value = " ";
                setTimeout(function() {
                    cuestionario.style.visibility = 'hidden';
                    mensaje.style.visibility = "hidden";
                }, 3000);

            } else {
                console.log("incorrecta");
                this.correcta = false;
            }
            this.respuestaCorrecta = 0;
            // this.respuestaCorrecta = 0;
        },

    }

})


const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//unidad de medida
const unidad = 32;

//cargar imagenes (fondo verde e icono de manzana)
const ground = new Image();
ground.src = './img/ground.png';

const comidaImg = new Image();
comidaImg.src = './img/food.png';

//generar el snake
let snake = [];
snake[0] = {
    x: 9 * unidad,
    y: 10 * unidad
}

let choques = 0;

//generar aleatoriamente comida

let comida = {
    x: Math.floor(Math.random() * 17 + 1) * unidad,
    y: Math.floor(Math.random() * 15 + 3) * unidad,
}

let puntaje = 0;

let d;

//Funcion que decide la direccion de snake
document.addEventListener("keydown", direccion);

function pausa() {
    clearInterval(game);
}

function direccion(event) {
    if (event.keyCode == 37 && d != "DER") {
        d = "IZQ";
    } else if (event.keyCode == 38 && d != "ABAJO") {
        d = "ARRIBA";
    } else if (event.keyCode == 39 && d != "IZQ") {
        d = "DER";
    } else if (event.keyCode == 40 && d != "ARRIBA") {
        d = "ABAJO";
    }
}

//Funcion que valida si choco con las paredes o si se "comio"

function choque(cabeza, array) {
    for (let i = 0; i < array.length; i++) {
        if (cabeza.x == array[i].x && cabeza.y == array[i].y) {
            return true;
        }
    }
    return false
}

var vida = document.getElementById("vida1");
//draw canvas

var boton = document.getElementById("validar");
var mensaje = document.getElementById("mensaje");
boton.addEventListener("click", function() {
        mensaje.style.visibility = "visible";
    })
    //Funcion principal

function draw() {
    ctx.drawImage(ground, 0, 0);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, unidad, unidad);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, unidad, unidad);
    }
    ctx.drawImage(comidaImg, comida.x, comida.y);

    //posicion que va dejando la cabeza conforme avanza

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //decidir la direccion 
    if (d == "IZQ") snakeX -= unidad;
    if (d == "ARRIBA") snakeY -= unidad;
    if (d == "DER") snakeX += unidad;
    if (d == "ABAJO") snakeY += unidad;

    //si snake se come la comida

    if (snakeX == comida.x && snakeY == comida.y) {
        puntaje++;
        comida = {
            x: Math.floor(Math.random() * 17 + 1) * unidad,
            y: Math.floor(Math.random() * 15 + 3) * unidad,
        };
    } else {
        snake.pop();
    }

    //add a new cabeza

    let nuevaCabeza = {
        x: snakeX,
        y: snakeY
    }

    //game over
    let pregunta;

    if (snakeX < unidad || snakeX > 17 * unidad || snakeY < 3 * unidad || snakeY > 17 * unidad || choque(nuevaCabeza, snake)) {
        choques++;
        //console.log(choques);
        console.log(vm.respuestaCorrecta);

        vida1.src = "./img/lost_life.png"
        if (choques > 1) {
            vida2.src = "./img/lost_life.png"
        }
        if (choques > 2) {
            vida3.src = "./img/lost_life.png"
        }
        if (choques >= 3) {

            if (confirm("Acabas de chocar 3 veces, presiona OK para responder la pregunta o presiona cancelar para detener el juego")) {
                console.log("confirme")
                pausa();
                //game = !game;
                cuestionario = document.getElementById("cuestionario");
                cuestionario.style.visibility = 'visible';
                vm.elegirMetodo();
                pausa();
            } else {
                console.log("cancele");
                pausa();
            }
        }

        nuevaCabeza = {
            x: 9 * unidad,
            y: 10 * unidad
        }

    }
    snake.unshift(nuevaCabeza);

    ctx.fillStyle = "white";
    ctx.font = "45px Poppins";

    ctx.fillText(puntaje, 2 * unidad, 1.6 * unidad);
}

let game = setInterval(draw, 100);