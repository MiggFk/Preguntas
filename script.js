let temporizadorInterval;
const respuestasCorrectasArray = ["femur", "206", "tokyo", "las marianas", "burj khalifa"];

document.addEventListener('DOMContentLoaded', function() {
    iniciarTemporizador(); // Iniciar el temporizador al cargar la página
});

// Función para inicializar el temporizador
function iniciarTemporizador() {
    let tiempoRestante = 120; 
    const timerDisplay = document.getElementById('timer');
    actualizarTemporizador(tiempoRestante, timerDisplay);

    temporizadorInterval = setInterval(function() {
        tiempoRestante--;
        actualizarTemporizador(tiempoRestante, timerDisplay);

        if (tiempoRestante <= 0) {
            clearInterval(temporizadorInterval);
            timerDisplay.textContent = "¡Tiempo Agotado!";
            document.getElementById('alarmasonido').play();
            alert("¡Se acabó el tiempo! Envía tus respuestas.");
            calificarRespuestas();
        }
    }, 1000);
}

// Función para actualizar el temporizador en la interfaz
function actualizarTemporizador(tiempoRestante, display) {
    const minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;
    segundos = segundos < 10 ? '0' + segundos : segundos;
    display.textContent = `${minutos}:${segundos}`;
}

// Función para calificar respuestas
function calificarRespuestas() {
    const respuestas = document.querySelectorAll('input[type="text"]');
    let respuestasCorrectas = 0;

    for (let i = 0; i < respuestas.length; i++) {
        if (respuestas[i].value.trim().toUpperCase() === respuestasCorrectasArray[i].toUpperCase()) {
            respuestas[i].style.backgroundColor = 'lightgreen';
            respuestasCorrectas++;
        } else {
            respuestas[i].style.backgroundColor = 'tomato';
        }
        respuestas[i].disabled = true; // Deshabilitar los inputs después de calificar
    }

    alert(`Has acertado ${respuestasCorrectas} de 5 preguntas.`);
}

// Función para repetir el cuestionario
function repetirCuestionario() {
    clearInterval(temporizadorInterval); // Detener el temporizador al repetir
    const respuestas = document.querySelectorAll('input[type="text"]');
    
    for (let i = 0; i < respuestas.length; i++) {
        respuestas[i].value = ''; // Limpiar los valores de los inputs
        respuestas[i].style.backgroundColor = ''; // Limpiar el color de fondo
        respuestas[i].disabled = false; // Habilitar los inputs nuevamente
    }

    iniciarTemporizador(); // Reiniciar el temporizador
}
