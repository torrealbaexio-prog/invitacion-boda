// 1. CONTROL DE APERTURA DEL SOBRE
function abrirInvitacion() {
    const sobre = document.getElementById('pantalla-sobre');
    const contenido = document.getElementById('contenido-invitacion');
    
    sobre.classList.add('sobre-desvanecido');
    contenido.classList.add('mostrar-contenido');
    
    // Desencadena el inicio de efectos adicionales si los hay (ej. pétalos)
    setTimeout(() => {
        sobre.style.display = 'none';
    }, 800);
}

// 2. DETECCIÓN ROBUSTA DE INVITADOS (URL QUERY PARAMS)
document.addEventListener("DOMContentLoaded", function() {
    // Forzamos la lectura limpia de parámetros ignorando hashes de enrutamiento móvil
    const urlCleanString = window.location.search;
    const urlParams = new URLSearchParams(urlCleanString);
    
    // Obtener variables de la URL (Ejemplo: ?invitado=Familia+Perez&pases=3&tipo=fuera)
    let nombreInvitado = urlParams.get('invitado') || "Invitado Especial";
    let numPases = urlParams.get('pases') || "1";
    let tipoInvitado = urlParams.get('tipo') || "local"; // 'local' o 'fuera'

    // Inyectar Nombre de Invitado
    document.getElementById('nombre-invitado').innerText = nombreInvitado;

    // Renderizar cantidad de pases asignados
    const infoPases = document.getElementById('info-pases');
    if(parseInt(numPases) === 1) {
        infoPases.innerText = "Válido para: 1 Persona";
    } else {
        infoPases.innerText = `Válido para: ${numPases} Personas`;
    }

    // LÓGICA REFORZADA: Mostrar u ocultar sección de Regalos / Transmisión Virtual
    const bloqueVirtualRegalos = document.getElementById('bloque-virtual-regalos');
    const contenidoFueraCucuta = document.getElementById('contenido-fuera-cucuta');

    // Forzamos el display block en el contenedor principal si aplica
    if (tipoInvitado.toLowerCase() === "fuera") {
        bloqueVirtualRegalos.style.display = "block"; // Se muestra todo el bloque en el celular
        contenidoFueraCucuta.style.display = "block";  // Se muestra la parte de transmisión online
    } else {
        // Si es invitado local, de todas formas mostramos el bloque pero ocultamos la transmisión
        bloqueVirtualRegalos.style.display = "block";
        contenidoFueraCucuta.style.display = "none";
    }

    // 3. CONTADOR DE TIEMPO DEFINITIVO
    // Ajusta la fecha exacta de tu boda aquí (Año, Mes [0-11], Día, Hora, Min)
    const fechaBoda = new Date(2026, 11, 12, 16, 0, 0).getTime(); 

    const x = setInterval(function() {
        const ahora = new Date().getTime();
        const distancia = fechaBoda - ahora;

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // Imprimir resultados en los elementos correspondientes
        document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
        document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
        document.getElementById("minutos").innerText = minutos < 10 ? "0" + minutos : minutos;
        document.getElementById("segundos").innerText = segundos < 10 ? "0" + segundos : segundos;

        // Si el contador termina
        if (distancia < 0) {
            clearInterval(x);
            document.getElementById("contador").style.display = "none";
        }
    }, 1000);
});

// 4. FUNCIÓN PARA COPIAR AL PORTAPAPELES COHESIVA
function copiarCuenta() {
    const numeroCuenta = "123-456789-00"; // Asegúrate de cambiarlo por tu número real
    
    // Intento con API moderna de portapapeles, si falla usa fallback clásico para móviles viejos
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(numeroCuenta).then(() => {
            alert("¡Número de cuenta copiado con éxito!");
        }).catch(err => {
            fallbackCopiarTexto(numeroCuenta);
        });
    } else {
        fallbackCopiarTexto(numeroCuenta);
    }
}

function fallbackCopiarTexto(texto) {
    const textArea = document.createElement("textarea");
    textArea.value = texto;
    textArea.style.position = "fixed";  // Evitar scroll en pantalla móvil
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        alert("¡Número de cuenta copiado con éxito!");
    } catch (err) {
        alert("No se pudo copiar automáticamente. Número: " + texto);
    }
    document.body.removeChild(textArea);
}