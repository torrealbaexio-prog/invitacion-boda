// 1. APERTURA DEL SOBRE INICIAL
function abrirInvitacion() {
    const sobre = document.getElementById('pantalla-sobre');
    const contenido = document.getElementById('contenido-invitacion');
    const musica = document.getElementById('musica-boda');
    
    sobre.classList.add('sobre-desvanecido');
    contenido.classList.add('mostrar-contenido');
    
    if (musica) {
        musica.play().catch(error => {
            console.log("Audio listo u omitido por el navegador.");
        });
    }
    
    setTimeout(() => {
        sobre.style.display = 'none';
    }, 800);
}

// 2. PROCESAMIENTO COMPATIBLE CON TU PANEL (?to=...)
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Captura el parámetro exacto que genera tu panel administrativo
    let parametroTo = urlParams.get('to') || "";
    let tipoInvitado = urlParams.get('tipo') || "fuera"; // Por defecto toma el tipo según tu panel

    // Reemplazar guiones por espacios si el panel formatea la URL con guiones
    parametroTo = parametroTo.replace(/-/g, " ").trim();

    const spanNombre = document.getElementById('nombre-invitado');
    const contenedorPases = document.getElementById('contenedor-pases-bloque');
    const ulListaPases = document.getElementById('lista-pases-dinamica');

    // LÓGICA DE DETECCIÓN Y DESGLOSE DE NOMBRES
    if (parametroTo !== "") {
        // Asignamos el saludo principal (Ej: "Estimado (a) Familia Garzon" o el nombre que digites)
        spanNombre.innerText = " " + parametroTo;

        // EJEMPLO DE CONTROL DE COMPAÑEROS DINÁMICOS
        // Si tu base de datos o backend renderiza los pases asignados en el HTML, o si decides pasarlos por URL:
        let parametroInvitados = urlParams.get('invitados') || "";
        
        // Simulación automática basada en tu captura si usas pases extras por URL
        if (parametroInvitados.trim() !== "") {
            ulListaPases.innerHTML = "";
            let arregloNombres = parametroInvitados.split(",");
            arregloNombres.forEach(function(nombre) {
                if (nombre.trim() !== "") {
                    let li = document.createElement("li");
                    li.innerText = nombre.trim();
                    li.style.padding = "6px 0";
                    li.style.borderBottom = "1px dashed rgba(125, 143, 105, 0.2)";
                    ulListaPases.appendChild(li);
                }
            });
            if(contenedorPases) contenedorPases.style.display = "block";
        } else {
            // Si la URL no trae lista desglosada de acompañantes, puedes dejar que el backend inyecte 
            // el contenido directo en el <ul> o mantener el contenedor oculto si está vacío
            if (ulListaPases && ulListaPases.children.length === 0) {
                if(contenedorPases) contenedorPases.style.display = "none";
            }
        }
    } else {
        // Si no hay ningún parámetro, se queda limpiamente en "Estimado (a)"
        spanNombre.innerText = "";
        if(contenedorPases) contenedorPases.style.display = "none";
    }

    // CONTROL DE INTERFAZ (LOCAL / FUERA CON MÓDULO DE REGALOS)
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

    // 3. ENGRANAJE DE CONTADORES SIMULTÁNEOS (BODA Y CONFIRMACIÓN)
    const fechaBoda = new Date("Jan 8, 2027 19:00:00").getTime();
    // Establecido exactamente al 24 de Julio de 2026
    const fechaLimiteConfirmacion = new Date("Jul 24, 2026 23:59:59").getTime();

    const intervaloContadores = setInterval(function() {
        const ahora = new Date().getTime();

        // RECONOCIMIENTO: CONTADOR DE LA BODA
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

        if (distBoda < 0) {
            const elContadorB = document.getElementById("contador");
            if (elContadorB) elContadorB.innerHTML = "¡Llegó el Gran Día!";
        }

        // RECONOCIMIENTO: CONTADOR DE CONFIRMACIÓN (24 JULIO)
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
        if (elMinutosC) elMinutosC.innerText = minutosC < 0 ? "00" : (minutosC < 10 ? "0" + minutosC : minutosC);
        if (elSegundosC) elSegundosC.innerText = segundosC < 0 ? "00" : (segundosC < 10 ? "0" + segundosC : segundosC);

        if (distConf < 0) {
            const elContadorC = document.getElementById("contador-confirmacion");
            if (elContadorC) elContadorC.innerHTML = "<span style='color: #baa06a; font-weight: bold;'>Tiempo de confirmación finalizado</span>";
        }

        if (distBoda < 0 && distConf < 0) {
            clearInterval(intervaloContadores);
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