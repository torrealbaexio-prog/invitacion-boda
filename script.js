// 1. MANEJO DE LA APERTURA DEL SOBRE INICIAL
function abrirInvitacion() {
    const sobre = document.getElementById('pantalla-sobre');
    const contenido = document.getElementById('contenido-invitacion');
    const musica = document.getElementById('musica-boda');
    
    if (sobre) sobre.classList.add('sobre-desvanecido');
    if (contenido) contenido.classList.add('mostrar-contenido');
    
    if (musica) {
        musica.play().catch(err => console.log("Interacción requerida o reproducción lista."));
    }
    
    setTimeout(() => {
        if (sobre) sobre.style.display = 'none';
    }, 800);
}

// 2. PARSEO DE PARÁMETROS DEL PANEL Y LOGICA DINÁMICA
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    
    let toParam = urlParams.get('to') || "";
    let invitadosParam = urlParams.get('invitados') || "";
    let tipoParam = urlParams.get('tipo') || "local";

    // Decodificar y formatear el Nombre del Invitado Principal
    toParam = decodeURIComponent(toParam).replace(/-/g, " ").trim();
    const spanNombre = document.getElementById('nombre-invitado');
    if (spanNombre) {
        spanNombre.innerText = toParam !== "" ? " " + toParam : "";
    }

    // Gestionar e Inyectar los Acompañantes en el Recuadro Blanco
    const contenedorPases = document.getElementById('contenedor-pases-bloque');
    const ulListaPases = document.getElementById('lista-pases-dinamica');

    invitadosParam = decodeURIComponent(invitadosParam).trim();

    if (invitadosParam !== "") {
        if (ulListaPases) {
            ulListaPases.innerHTML = ""; // Limpieza absoluta de residuos anteriores
            let nombresSeparados = invitadosParam.split(",");
            
            nombresSeparados.forEach(function(item) {
                let nombreLimpio = item.trim();
                
                // Remover tags automáticos heredados si existen en base de datos
                if (nombreLimpio.includes("(Deberá ir de blanco)")) {
                    nombreLimpio = nombreLimpio.replace("(Deberá ir de blanco)", "").trim();
                }

                if (nombreLimpio !== "") {
                    let li = document.createElement("li");
                    li.className = "pase-item";
                    li.innerText = nombreLimpio;
                    ulListaPases.appendChild(li);
                }
            });
        }
        if (contenedorPases) contenedorPases.style.display = "block";
    } else {
        if (contenedorPases) contenedorPases.style.display = "none";
    }

    // ADAPTACIÓN LOCAL VS FUERA (MODULO REGALOS Y ASISTENCIA)
    const contenidoFuera = document.getElementById('contenido-fuera-cucuta');
    const regaloTexto = document.getElementById('regalo-texto');
    const seccionBancaria = document.getElementById('seccion-bancaria-desplegable');

    if (tipoParam.toLowerCase() === "fuera" || tipoParam.toLowerCase() === "internacional") {
        if (contenidoFuera) contenidoFuera.style.display = "block";
        if (seccionBancaria) seccionBancaria.style.display = "block";
        if (regaloTexto) regaloTexto.innerText = "Tu presencia es nuestro mejor regalo. Si deseas realizarnos un detalle en efectivo, dispondremos de una urna el día del evento o puedes realizar una transferencia bancaria de manera cómoda a la siguiente cuenta:";
    } else {
        if (contenidoFuera) contenidoFuera.style.display = "none";
        if (seccionBancaria) seccionBancaria.style.display = "none";
        if (regaloTexto) regaloTexto.innerText = "Tu presencia es nuestro mejor regalo. Si deseas realizarnos un detalle en efectivo, dispondremos de una urna el día del evento para que deposites tu sobre con total comodidad.";
    }

    // 3. RELOJES EN VIVO (Sincronizados al segundo exacto)
    const fechaBoda = new Date("Jan 8, 2027 19:00:00").getTime();
    const fechaLimite = new Date("Jul 24, 2026 23:59:59").getTime();

    const xIntervalo = setInterval(function() {
        const ahora = new Date().getTime();

        // Cálculo Contador Boda Principal
        const distBoda = fechaBoda - ahora;
        const dB = Math.floor(distBoda / (1000 * 60 * 60 * 24));
        const hB = Math.floor((distBoda % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mB = Math.floor((distBoda % (1000 * 60 * 60)) / (1000 * 60));
        const sB = Math.floor((distBoda % (1000 * 60)) / 1000);

        const elDB = document.getElementById("dias");
        const elHB = document.getElementById("horas");
        const elMB = document.getElementById("minutos");
        const elSB = document.getElementById("segundos");

        if (elDB) elDB.innerText = dB < 10 ? "0" + dB : dB;
        if (elHB) elHB.innerText = hB < 10 ? "0" + hB : hB;
        if (elMB) elMB.innerText = mB < 10 ? "0" + mB : mB;
        if (elSB) elSB.innerText = sB < 10 ? "0" + sB : sB;

        // Cálculo Contador Fecha Límite Formulario
        const distConf = fechaLimite - ahora;
        const dC = Math.floor(distConf / (1000 * 60 * 60 * 24));
        const hC = Math.floor((distConf % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mC = Math.floor((distConf % (1000 * 60 * 60)) / (1000 * 60));
        const sC = Math.floor((distConf % (1000 * 60)) / 1000);

        const elDC = document.getElementById("conf-dias");
        const elHC = document.getElementById("conf-horas");
        const elMC = document.getElementById("conf-minutos");
        const elSC = document.getElementById("conf-segundos");

        if (elDC) elDC.innerText = dC < 0 ? "00" : (dC < 10 ? "0" + dC : dC);
        if (elHC) elHC.innerText = hC < 0 ? "00" : (hC < 10 ? "0" + hC : hC);
        if (elMC) elMC.innerText = mC < 0 ? "00" : (mC < 10 ? "0" + mC : mC);
        if (elSC) elSC.innerText = sC < 0 ? "00" : (sC < 10 ? "0" + sC : sC);

        if (distConf < 0) {
            const elContadorC = document.getElementById("contador-confirmacion");
            if (elContadorC) elContadorC.innerHTML = "<span style='color: #bfa472; font-weight: 600; font-size:1.1rem;'>Plazo de confirmación cerrado</span>";
        }

        if (distBoda < 0 && distConf < 0) {
            clearInterval(xIntervalo);
        }
    }, 1000);
});

// 4. PORTAPAPELES UNIVERSAL PARA CUENTAS
function copiarDatoBancario(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(() => {
            alert("¡Número de cuenta copiado al portapapeles!");
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
        alert("¡Número de cuenta copiado al portapapeles!");
    } catch (err) {
        alert("Copia manualmente este número: " + texto);
    }
    document.body.removeChild(textArea);
}