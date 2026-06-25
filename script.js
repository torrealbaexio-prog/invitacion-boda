// 1. APERTURA DEL SOBRE
function abrirInvitacion() {
    const sobre = document.getElementById('pantalla-sobre');
    const contenido = document.getElementById('contenido-invitacion');
    const musica = document.getElementById('musica-boda');
    
    sobre.classList.add('sobre-desvanecido');
    contenido.classList.add('mostrar-contenido');
    
    if (musica) {
        musica.play().catch(error => console.log("Audio listo."));
    }
    
    setTimeout(() => {
        sobre.style.display = 'none';
    }, 800);
}

// 2. PROCESAMIENTO DE URL DE TU PANEL
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Captura los parámetros de la URL
    let saludoPrincipal = urlParams.get('to') || "";
    let listaAcompanantes = urlParams.get('invitados') || "";
    let tipoInvitado = urlParams.get('tipo') || "local";

    // Decodificar y limpiar el saludo principal (Familia Garzon)
    saludoPrincipal = decodeURIComponent(saludoPrincipal).replace(/-/g, " ").trim();
    const spanNombre = document.getElementById('nombre-invitado');

    if (saludoPrincipal !== "") {
        spanNombre.innerText = " " + saludoPrincipal;
    } else {
        spanNombre.innerText = "";
    }

    // Procesar la lista de invitados para el recuadro blanco
    const contenedorPases = document.getElementById('contenedor-pases-bloque');
    const ulListaPases = document.getElementById('lista-pases-dinamica');

    // Convertir a texto limpio si viene de la URL
    listaAcompanantes = decodeURIComponent(listaAcompanantes).trim();

    if (listaAcompanantes !== "") {
        if (ulListaPases) {
            ulListaPases.innerHTML = ""; // Limpiar parches previos
            
            // Separar por comas
            let nombresSeparados = listaAcompanantes.split(",");
            
            nombresSeparados.forEach(function(nombre) {
                let nombreLimpio = nombre.trim();
                
                // Quitar el texto molesto de la base de datos de manera automática
                if (nombreLimpio.includes("(Deberá ir de blanco)")) {
                    nombreLimpio = nombreLimpio.replace("(Deberá ir de blanco)", "").trim();
                }

                if (nombreLimpio !== "") {
                    let li = document.createElement("li");
                    li.innerText = nombreLimpio;
                    li.style.padding = "8px 0";
                    li.style.listStyle = "none";
                    li.style.borderBottom = "1px dashed rgba(125, 143, 105, 0.2)";
                    li.style.color = "#38422a";
                    li.style.fontFamily = "'Poppins', sans-serif";
                    ulListaPases.appendChild(li);
                }
            });
        }
        if (contenedorPases) contenedorPases.style.display = "block";
    } else {
        if (contenedorPases) contenedorPases.style.display = "none";
    }

    // CONTROL DE INTERFAZ (LOCAL / FUERA)
    const contenidoFueraCucuta = document.getElementById('contenido-fuera-cucuta');
    const regaloTexto = document.getElementById('regalo-texto');
    const seccionBancariaDesplegable = document.getElementById('seccion-bancaria-desplegable');

    if (tipoInvitado.toLowerCase() === "fuera" || tipoInvitado.toLowerCase() === "internacional") {
        if (contenidoFueraCucuta) contenidoFueraCucuta.style.display = "block";
        if (regaloTexto) regaloTexto.innerText = "Tu presencia es nuestro mejor regalo. Si deseas realizarnos un detalle en efectivo, dispondremos de una urna el día del evento o puedes realizar una transferencia bancaria:";
        if (seccionBancariaDesplegable) seccionBancariaDesplegable.style.display = "block";
    } else {
        if (contenidoFueraCucuta) contenidoFueraCucuta.style.display = "none";
        if (regaloTexto) regaloTexto.innerText = "Tu presencia es nuestro mejor regalo. Si deseas realizarnos un detalle en efectivo, dispondremos de una urna el día del evento para que deposites tu sobre.";
        if (seccionBancariaDesplegable) seccionBancariaDesplegable.style.display = "none";
    }

    // 3. RELOJES EN VIVO (BODA Y CONFIRMACIÓN)
    const fechaBoda = new Date("Jan 8, 2027 19:00:00").getTime();
    const fechaLimiteConfirmacion = new Date("Jul 24, 2026 23:59:59").getTime();

    const intervalo = setInterval(function() {
        const ahora = new Date().getTime();

        // Reloj Boda
        const distBoda = fechaBoda - ahora;
        const diasB = Math.floor(distBoda / (1000 * 60 * 60 * 24));
        const horasB = Math.floor((distBoda % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutosB = Math.floor((distBoda % (1000 * 60 * 60)) / (1000 * 60));
        const segundosB = Math.floor((distBoda % (1000 * 60)) / 1000);

        const elDiasB = document.getElementById("dias");
        const elHorasB = document.getElementById("horas");
        const elMinutosB = document.getElementById("minutos");
        const elSegundosB = document.getElementById("segundos");

        if (elDiasB) elDiasB.innerText = diasB < 10 ? "0" + diasB : diasB;
        if (elHorasB) elHorasB.innerText = horasB < 10 ? "0" + horasB : horasB;
        if (elMinutosB) elMinutosB.innerText = minutosB < 10 ? "0" + minutosB : minutesB;
        if (elSegundosB) elSegundosB.innerText = segundosB < 10 ? "0" + segundosB : segundosB;

        // Reloj Confirmación (Hasta el 24 de Julio)
        const distConf = fechaLimiteConfirmacion - ahora;
        const diasC = Math.floor(distConf / (1000 * 60 * 60 * 24));
        const horasC = Math.floor((distConf % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutosC = Math.floor((distConf % (1000 * 60 * 60)) / (1000 * 60));
        const segundosC = Math.floor((distConf % (1000 * 60)) / 1000);

        const elDiasC = document.getElementById("conf-dias");
        const elHorasC = document.getElementById("conf-horas");
        const elMinutosC = document.getElementById("conf-minutos");
        const elSegundosC = document.getElementById("conf-segundos");

        if (elDiasC) elDiasC.innerText = diasC < 0 ? "00" : (diasC < 10 ? "0" + diasC : diasC);
        if (elHorasC) elHorasC.innerText = horasC < 0 ? "00" : (horasC < 10 ? "0" + horasC : horasC);
        if (elMinutosC) elMinutosC.innerText = minutosC < 0 ? "00" : (minutosC < 10 ? "0" + minutosC : minutesC);
        if (elSegundosC) elSegundosC.innerText = segundosC < 0 ? "00" : (segundosC < 10 ? "0" + segundosC : segundosC);

        if (distConf < 0) {
            const elContadorC = document.getElementById("contador-confirmacion");
            if (elContadorC) elContadorC.innerHTML = "<span style='color: #baa06a; font-weight: bold;'>Tiempo finalizado</span>";
        }

        if (distBoda < 0 && distConf < 0) {
            clearInterval(intervalo);
        }
    }, 1000);
});

// 4. COPIAR DATOS BANCARIOS
function copiarDatoBancario(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(() => {
            alert("¡Copiado con éxito!");
        }).catch(() => fallbackCopiar(texto));
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
        alert("Copia manualmente: " + texto);
    }
    document.body.removeChild(textArea);
}