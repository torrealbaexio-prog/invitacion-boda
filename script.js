// 1. APERTURA DEL SOBRE INICIAL
function abrirInvitacion() {
    const sobre = document.getElementById('pantalla-sobre');
    const contenido = document.getElementById('contenido-invitacion');
    const musica = document.getElementById('musica-boda');
    
    sobre.classList.add('sobre-desvanecido');
    contenido.classList.add('mostrar-contenido');
    
    if (musica) {
        musica.play().catch(error => {
            console.log("Audio listo.");
        });
    }
    
    setTimeout(() => {
        sobre.style.display = 'none';
    }, 800);
}

// 2. CONEXIÓN DIRECTA CON TU PANEL DE ADMINISTRACIÓN
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Obtiene las variables dinámicas de tu admin (Se eliminó el texto de respaldo)
    let nombreInvitado = urlParams.get('invitado') || "";
    let tipoInvitado = urlParams.get('tipo') || "local";

    if (nombreInvitado.includes("(Deberá ir de blanco)")) {
        nombreInvitado = nombreInvitado.replace("(Deberá ir de blanco)", "").trim();
    }

    // Inyecta el nombre real del invitado en el HTML justo después de "Estimado (a)"
    document.getElementById('nombre-invitado').innerText = nombreInvitado;

    // CONTROL DE VISIBILIDAD DE INTERFAZ SEGÚN EL TIPO DE INVITADO
    const contenidoFueraCucuta = document.getElementById('contenido-fuera-cucuta');
    const regaloTexto = document.getElementById('regalo-texto');
    const seccionBancariaDesplegable = document.getElementById('seccion-bancaria-desplegable');

    if (tipoInvitado.toLowerCase() === "fuera") {
        contenidoFueraCucuta.style.display = "block";
        regaloTexto.innerText = "Tu presencia es nuestro mejor regalo. Si deseas realizarnos un detalle en efectivo, dispondremos de una urna el día del evento o puedes realizar una transferencia bancaria:";
        seccionBancariaDesplegable.style.display = "block";
    } else {
        contenidoFueraCucuta.style.display = "none";
        regaloTexto.innerText = "Tu presencia es nuestro mejor regalo. Si deseas realizarnos un detalle en efectivo, dispondremos de una urna el día del evento para que deposites tu sobre.";
        seccionBancariaDesplegable.style.display = "none";
    }

    // 3. CUENTA REGRESIVA EN VIVO CORREGIDA
    const fechaBoda = new Date("Jan 8, 2027 19:00:00").getTime();

    const x = setInterval(function() {
        const ahora = new Date().getTime();
        const distancia = fechaBoda - ahora;

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
        document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
        document.getElementById("minutos").innerText = minutos < 10 ? "0" + minutos : minutos;
        document.getElementById("segundos").innerText = segundos < 10 ? "0" + segundos : segundos;

        if (distancia < 0) {
            clearInterval(x);
            document.getElementById("contador").innerHTML = "¡Llegó el Gran Día!";
        }
    }, 1000);
});

// 4. PORTAPAPELES
function copiarDatoBancario(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(() => {
            alert("¡Copiado con éxito!");
        }).catch(() => {
            fallbackCopiar(texto);
        });
    } else {
        fallbackCopiar(texto);
    }
}

function fallbackCopiar(texto) {
    const textArea = document.createElement("textarea");
    textArea.value = texto;
    textArea.style.position = "fixed"; 
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        alert("¡Copiado con éxito!");
    } catch (err) {
        alert("Copia manualmente el dato: " + texto);
    }
    document.body.removeChild(textArea);
}