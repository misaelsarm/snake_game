var vm = new Vue({
    el: "#cuestionario",
    data: {
        metodo: " ",
        numeroMetodo: 1,
        metodos: [
            '1. Interpolacion lineal',
            '2. Interpolacion Lineal',

            '3. Newton hacia adelante',
            '4. Newton hacia adelante',

            '5. Newton hacia atras',
            '6. Newton hacia atras',

            '7. Newton con diferencias divididas',
            '8. Newton con diferencias divididas',

            '9. Lagrange',
            '10. Lagrange',

            '11. Punto fijo o Sustituciones sucesivas',
            '12. Punto fijo o Sustituciones sucesivas',

            '13. Newton - Raphson',

            '14. Falsa posicion',

            '15. Secante',
            '16. Secante',

            '17. Montante',
            '18. Montante',

            '19. Gauss - Jordan',
            '20. Gauss - Jordan',

            '21. Eliminacion Gaussiana',
            '22. Eliminacion Gaussiana',

            '23. Gauss - Seidel',

            '24. Jacobi',

            '25. Linea Recta',
            '26. Linea Recta',

            '27. Regla Trapezoidal',
            '28. Regla Trapezoidal',

            '29. Newton - Cotes (Abiertas)',
            '30. Newton - Cotes (Cerradas)',

            '31. Regla 1/3 Simpson',
            '32. Regla 1/3 Simpson',

            '33. Regla de 3/8 Simpson',
            '34. Regla de 3/8 Simpson',

            '35. Euler hacia adelante',
            '36. Euler modificado',
            '37. Runge - Kutta de 2° orden',
            '38. Runge - Kutta de 3er orden',
            '39. Runge - Kutta de 4to orden',
            '40. Runge - Kutta de 4to orden por 3/8 de Simpson',
            '41. Runge - Kutta de orden superior'
        ],
        respuestasCorrectas: [
            'g(x) = 1.304007668', //interpolacion lineal
            'g(x) = 1.354025101', //interpolacion lineal

            2.714444444, //newton hacia adelante
            3.06777778, //newton hacia adelante

            2.714444444, // newton hacia atras
            3.06777778, // newton hacia atras

            -1.723076923, -1.809074359, //newton con diferencias divididas

            2.714444444, // lagrange
            3.06777778, // lagrange

            "E = 0.000008941", // punto fijo
            "E = 0.000006565", //punto fijo

            "E = 0.0000001", //newton raphson

            "E = 0.000527473", // falsa posicion

            "E = 0.00002705181386", //secante
            "E = 0.000157823", //secante

            "a = 62/87; b = 19/87; c = 66/87", //montante
            "x = 21/16; y = 25/16; z = 19/16", //montante

            "a = -1; b = 1/2; c = 5/2", //gauss - jordan
            "x = 1; y = 0; z = 2 ", //gauss - jordan

            "x1 = 1; x2 = 3; x3 = 2", // elimincion gaussiana
            "x = 1/3; y = 0; z = 2/3", // elimincion gaussiana

            "Ex = 0.000840625; Ey = 0.000417188; Ez = 0.000418438", // gauss-seidel

            "Ex = 0.000481445; Ey = 0.000230468; Ez = 0.000757812", //jacobi

            "a1 = 0.633695283; a0 = 2.008443615", //linea recta
            "a1 = 0.374489795; a0 = 0.921122451", //linea recta

            "I = 0.142416952", //Regla trapezoidal
            "I = 0.662037037", //Rgla trapezoidal

            "-40", //abiertas
            "3.33297797", //cerradas

            "I = 0.14189715", //1/3 de simpson
            "I = 0.66666666", //1/3 de simpson

            "I = 0.575583627", //3/8 de simpson
            "I = 1.647045", //3/8 de simpson

            "y1 = 1.933333333; y2 = 1.995555555", //euler hacia adelante

            "y' = 0.939", //euler modificado

            "k1 = -0.6; k2 = 0.303265329; y1 = 0.651632664", //runge kutta 2 orden

            "k1 = 0.25; k2 = 0.253086419; k3 = 0.257939981; y1 = 1.211723276", //runge kutta 3 orden

            "k1 = 0.053333333; k2 = 0.096759689; k3 = 0.109031713; k4 = 0.2047895890; y1 = 0.511617621", //runge kutta 4 orden

            "k1 = -0.5; k2 = -0.483870959; k3 = -0.428066426; k4 = -0.343547869; y1 = 0.552579997", //runge kutta 4 orden 3/8 simpson

            "k1 = 0.24; m1 = -0.22; k2 = 0.196; m2 = -0.1892; y1 = 1.318; y'1 = 0.9952" //runge kutta orden superior
        ],
        saltadas: 0,
        temp: 0,
        respuestaCorrecta: "",
        correcta: false,
        incorrecta: false,
        cancelar: false,
    },
    methods: {
        elegirMetodo: function() {
            this.numeroMetodo = Math.floor(Math.random() * 28);
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
                this.saltadas = 0;
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
        saltarMetodo: function() {
            this.numeroMetodo = Math.floor(Math.random() * 28);
            this.metodos.forEach((element, index) => {
                if (index == this.numeroMetodo) {
                    this.metodo = element;
                    this.temp = index;
                    return;
                }
            });
        }

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


var saltar = document.getElementById("saltar");
saltar.addEventListener('click', function() {
        vm.saltadas++
            console.log(vm.saltadas);
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