// 1. CONTROL DE APERTURA DEL SOBRE Y REPRODUCCIÓN DE MÚSICA REAL
function abrirInvitacion() {
    const sobre = document.getElementById('pantalla-sobre');
    const contenido = document.getElementById('contenido-invitacion');
    const musica = document.getElementById('musica-boda');
    
    // Ocultar sobre de forma elegante
    sobre.classList.add('sobre-desvanecido');
    contenido.classList.add('mostrar-contenido');
    
    // Intentar reproducir la canción real (musica.mp3) tras interactuar
    if (musica) {
        musica.play().catch(error => {
            console.log("La reproducción automática fue bloqueada por el navegador móvil, pero el código está listo.");
        });
    }
    
    setTimeout(() => {
        sobre.style.display = 'none';
    }, 800);
}

// 2. DETECCIÓN ROBUSTA DE PARÁMETROS URL (SIN CONFLICTO DE FORMATO EN CELULARES)
document.addEventListener("DOMContentLoaded", function() {
    // Leemos la URL limpiando cualquier interferencia de hash de redes sociales o navegadores móviles
    const urlParams = new URLSearchParams(window.location.search);
    
    let nombreInvitado = urlParams.get('invitado') || "Invitado Especial";
    let numPases = urlParams.get('pases') || "1";
    let tipoInvitado = urlParams.get('tipo') || "local"; // 'local' o 'fuera'

    // Limpieza automática por si viene el paréntesis de la novia en la base de datos
    if (nombreInvitado.includes("(Deberá ir de blanco)")) {
        nombreInvitado = nombreInvitado.replace("(Deberá ir de blanco)", "").trim();
    }

    // Inyectar Nombre del Invitado
    document.getElementById('nombre-invitado').innerText = nombreInvitado;

    // Renderizar cantidad de pases asignados
    const infoPases = document.getElementById('info-pases');
    if (parseInt(numPases) === 1) {
        infoPases.innerText = "Válido para: 1 Persona";
    } else {
        infoPases.innerText = `Válido para: ${numPases} Personas`;
    }

    // CONTROL COMPLETO DE VISIBILIDAD DE BLOQUES INTERNACIONALES (MÓVIL Y PC)
    const bloqueVirtualRegalos = document.getElementById('bloque-virtual-regalos');
    const contenidoFueraCucuta = document.getElementById('contenido-fuera-cucuta');
    const regaloLocal = document.getElementById('regalo-local');
    const regaloAfuera = document.getElementById('regalo-afuera');
    const seccionBancariaDesplegable = document.getElementById('seccion-bancaria-desplegable');

    // Forzamos el comportamiento idéntico en celulares
    if (tipoInvitado.toLowerCase() === "fuera") {
        bloqueVirtualRegalos.style.display = "block";
        contenidoFueraCucuta.style.display = "block";
        regaloLocal.style.display = "none";
        regaloAfuera.style.display = "block";
        seccionBancariaDesplegable.style.display = "block"; // Muestra los datos de Banco Falabella
    } else {
        // Invitados locales: Muestra solo el bloque de regalos físico con la urna
        bloqueVirtualRegalos.style.display = "block";
        contenidoFueraCucuta.style.display = "none";
        regaloLocal.style.display = "block";
        regaloAfuera.style.display = "none";
        seccionBancariaDesplegable.style.display = "none";
    }

    // 3. CUENTA REGRESIVA REAL HASTA EL 8 DE ENERO DE 2027
    const fechaBoda = new Date("Jan 8, 2027 19:00:00").getTime();

    const x = setInterval(function() {
        const ahora = new Date().getTime();
        const distancia = fechaBoda - ahora;

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // Inyectar valores con ceros a la izquierda
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

// 4. SISTEMA DE COPIADO SEGURO PARA DISPOSITIVOS MÓVILES
function copiarDatoBancario(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(() => {
            alert("Copiado al portapapeles con éxito.");
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
        alert("Copiado al portapapeles con éxito.");
    } catch (err) {
        alert("Por favor copia manualmente el dato: " + texto);
    }
    document.body.removeChild(textArea);
}