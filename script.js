// ========================================
// APERTURA DE LA INVITACIÓN
// ========================================

function abrirInvitacion() {
    const sobre = document.getElementById('pantalla-sobre');
    const contenido = document.getElementById('contenido-invitacion');
    const musica = document.getElementById('musica-boda');

    if (sobre) {
        sobre.classList.add('sobre-desvanecido');
    }

    if (contenido) {
        contenido.classList.add('mostrar-contenido');
    }

    if (musica) {
        musica.volume = 0.5;

        musica.play().catch(() => {
            console.log("Audio bloqueado por el navegador.");
        });
    }

    setTimeout(() => {
        if (sobre) {
            sobre.style.display = 'none';
        }
    }, 800);
}

// ========================================
// CARGA DE DATOS DE LA URL
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const urlParams = new URLSearchParams(window.location.search);

    let saludoPrincipal = urlParams.get('to') || "";
    let listaAcompanantes = urlParams.get('invitados') || "";
    let tipoInvitado = urlParams.get('tipo') || "local";

    saludoPrincipal = decodeURIComponent(saludoPrincipal)
        .replace(/-/g, " ")
        .trim();

    const spanNombre = document.getElementById('nombre-invitado');

    if (spanNombre) {
        spanNombre.innerText = saludoPrincipal ? " " + saludoPrincipal : "";
    }

    // ========================================
    // MARCAR COMO VISTO
    // ========================================

    try {
        const dbInvitados =
            JSON.parse(localStorage.getItem('boda_invitados')) || [];

        dbInvitados.forEach(inv => {
            if (
                inv.nombre.toLowerCase() ===
                saludoPrincipal.toLowerCase()
            ) {
                inv.estado = "visto";
            }
        });

        localStorage.setItem(
            'boda_invitados',
            JSON.stringify(dbInvitados)
        );

    } catch (e) {
        console.log("No se pudo actualizar estado.");
    }

    // ========================================
    // LISTA DE PASES
    // ========================================

    const contenedorPases =
        document.getElementById('contenedor-pases-bloque');

    const ulListaPases =
        document.getElementById('lista-pases-dinamica');

    listaAcompanantes =
        decodeURIComponent(listaAcompanantes).trim();

    if (listaAcompanantes !== "") {

        if (ulListaPases) {

            ulListaPases.innerHTML = "";

            const nombresSeparados =
                listaAcompanantes.split(",");

            nombresSeparados.forEach(nombre => {

                let nombreLimpio = nombre.trim();

                nombreLimpio =
                    nombreLimpio.replace(
                        "(Deberá ir de blanco)",
                        ""
                    ).trim();

                if (nombreLimpio !== "") {

                    const li =
                        document.createElement("li");

                    li.innerText = nombreLimpio;

                    ulListaPases.appendChild(li);
                }
            });
        }

        if (contenedorPases) {
            contenedorPases.style.display = "block";
        }

    } else {

        if (contenedorPases) {
            contenedorPases.style.display = "none";
        }
    }

    // ========================================
    // LOCAL / INTERNACIONAL
    // ========================================

    const contenidoFueraCucuta =
        document.getElementById('contenido-fuera-cucuta');

    const regaloTexto =
        document.getElementById('regalo-texto');

    const seccionBancariaDesplegable =
        document.getElementById(
            'seccion-bancaria-desplegable'
        );

    const tipo = tipoInvitado.toLowerCase();

    const esInternacional =
        tipo === "afuera" ||
        tipo === "fuera" ||
        tipo === "internacional";

    if (esInternacional) {

        if (contenidoFueraCucuta) {
            contenidoFueraCucuta.style.display = "block";
        }

        if (regaloTexto) {
            regaloTexto.innerText =
                "Tu presencia es nuestro mejor regalo. Si deseas realizarnos un detalle en efectivo, también puedes realizar una transferencia bancaria:";
        }

        if (seccionBancariaDesplegable) {
            seccionBancariaDesplegable.style.display = "block";
        }

    } else {

        if (contenidoFueraCucuta) {
            contenidoFueraCucuta.style.display = "none";
        }

        if (regaloTexto) {
            regaloTexto.innerText =
                "Tu presencia es nuestro mejor regalo. Si deseas realizarnos un detalle en efectivo, dispondremos de una urna el día del evento para que deposites tu sobre.";
        }

        if (seccionBancariaDesplegable) {
            seccionBancariaDesplegable.style.display = "none";
        }
    }

    // ========================================
    // CONTADOR BODA
    // ========================================

    const fechaBoda =
        new Date("January 8, 2027 19:00:00").getTime();

    function actualizarContador() {

        const ahora = new Date().getTime();

        const distancia =
            fechaBoda - ahora;

        if (distancia < 0) {
            return;
        }

        const dias =
            Math.floor(
                distancia /
                (1000 * 60 * 60 * 24)
            );

        const horas =
            Math.floor(
                (distancia %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );

        const minutos =
            Math.floor(
                (distancia %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );

        const segundos =
            Math.floor(
                (distancia %
                    (1000 * 60)) /
                1000
            );

        const elDias =
            document.getElementById("dias");

        const elHoras =
            document.getElementById("horas");

        const elMinutos =
            document.getElementById("minutos");

        const elSegundos =
            document.getElementById("segundos");

        if (elDias) {
            elDias.innerText =
                String(dias).padStart(2, "0");
        }

        if (elHoras) {
            elHoras.innerText =
                String(horas).padStart(2, "0");
        }

        if (elMinutos) {
            elMinutos.innerText =
                String(minutos).padStart(2, "0");
        }

        if (elSegundos) {
            elSegundos.innerText =
                String(segundos).padStart(2, "0");
        }
    }

    actualizarContador();

    setInterval(actualizarContador, 1000);
});

// ========================================
// COPIAR DATOS BANCARIOS
// ========================================

function copiarDatoBancario(texto) {

    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(texto)
            .then(() => {
                alert("¡Copiado con éxito!");
            })
            .catch(() => {
                fallbackCopiar(texto);
            });

    } else {

        fallbackCopiar(texto);
    }
}

function fallbackCopiar(texto) {

    const textArea =
        document.createElement("textarea");

    textArea.value = texto;

    textArea.style.position = "fixed";

    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {

        document.execCommand("copy");

        alert("¡Copiado con éxito!");

    } catch {

        alert("Copia manualmente: " + texto);

    }

    document.body.removeChild(textArea);
}