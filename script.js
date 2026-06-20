window.copiarDatoBancario = function(idElemento, boton) {
    const contenedorDato = document.getElementById(idElemento);
    if (!contenedorDato) return;
    const textoACopiar = contenedorDato.innerText;
    
    navigator.clipboard.writeText(textoACopiar).then(() => {
        const textOrig = boton.innerText;
        boton.innerText = "¡Copiado! ✓";
        setTimeout(() => { boton.innerText = textOrig; }, 2000);
    }).catch(err => console.error("Error al copiar: ", err));
};

document.addEventListener("DOMContentLoaded", () => {
    const sobreClic = document.getElementById("sobre-clic");
    const pantallaSobre = document.getElementById("pantalla-sobre");
    const contenidoInvitacion = document.getElementById("contenido-invitacion");
    const musica = document.getElementById("musica-boda");
    const btnCalendario = document.querySelector(".btn-calendario-principal");

    const fechaBoda = new Date("Jan 8, 2027 19:00:00").getTime();
    const fechaLimite = new Date("Jul 20, 2026 23:59:00").getTime();

    const urlParams = new URLSearchParams(window.location.search);
    const aliasInvitado = urlParams.get('to'); 

    let nombreInvitado = "Invitado Especial";
    let pasesInvitado = "";
    let tipoInvitado = "local"; // Por defecto 'local' (Cúcuta)

    if (aliasInvitado) {
        try {
            const dbInvitados = JSON.parse(localStorage.getItem('boda_invitados')) || [];
            const nombreBuscado = aliasInvitado.replace(/-/g, ' ').toLowerCase().trim();
            const invitadoEncontrado = dbInvitados.find(inv => inv.nombre.toLowerCase().trim() === nombreBuscado);

            if (invitadoEncontrado) {
                nombreInvitado = invitadoEncontrado.nombre;
                pasesInvitado = invitadoEncontrado.pases;
                tipoInvitado = invitadoEncontrado.tipo || 'local';

                if (invitadoEncontrado.estado === 'enviado') {
                    invitadoEncontrado.estado = 'visto';
                    localStorage.setItem('boda_invitados', JSON.stringify(dbInvitados));
                }
            } else {
                nombreInvitado = aliasInvitado.replace(/-/g, ' ');
            }
        } catch (e) {
            nombreInvitado = aliasInvitado.replace(/-/g, ' ');
        }
    }

    const itemNombre = document.getElementById('nombre-invitado');
    if (itemNombre) itemNombre.innerText = nombreInvitado;
    
    const contenedorLista = document.getElementById('detalle-pases');
    if (contenedorLista) {
        contenedorLista.innerHTML = ""; 
        if (pasesInvitado) {
            pasesInvitado.split(',').forEach(nombre => {
                if(nombre.trim() !== "") {
                    const li = document.createElement('li');
                    li.innerText = nombre.trim();
                    contenedorLista.appendChild(li);
                }
            });
        } else {
            const li = document.createElement('li');
            li.innerText = "Pase Personal Familiar";
            contenedorLista.appendChild(li);
        }
    }

    // GESTIÓN DINÁMICA POR PROCEDENCIA (Locales vs Afuera)
    const divInternacionales = document.getElementById('seccion-internacionales');
    const divRegalosBancarios = document.getElementById('seccion-regalos');
    const parrafoLocal = document.getElementById('regalo-local');
    const parrafoAfuera = document.getElementById('regalo-afuera');

    if (tipoInvitado === 'afuera') {
        if (divInternacionales) divInternacionales.style.display = 'block';
        if (divRegalosBancarios) divRegalosBancarios.style.display = 'block';
        if (parrafoAfuera) parrafoAfuera.style.display = 'block';
        if (parrafoLocal) parrafoLocal.style.display = 'none';
    } else {
        // Invitados de Cúcuta (Locales)
        if (divInternacionales) divInternacionales.style.display = 'none';
        if (divRegalosBancarios) divRegalosBancarios.style.display = 'none';
        if (parrafoAfuera) parrafoAfuera.style.display = 'none';
        if (parrafoLocal) parrafoLocal.style.display = 'block';
    }

    if (sobreClic) {
        sobreClic.onclick = function() {
            if (pantallaSobre) pantallaSobre.classList.add("sobre-desvanecido");
            if (contenidoInvitacion) contenidoInvitacion.classList.add("mostrar-contenido");
            if (musica) {
                musica.play().catch(() => console.log("Permiso de audio requerido"));
            }
            lanzarLluviaPetalos();
        };
    }

    if (btnCalendario) {
        btnCalendario.onclick = function(e) {
            e.preventDefault();
            const googleCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+Dayana+Garz%C3%B3n+%26+Exio+Torrealba&dates=20270108T190000/20270109T020000&details=%C2%A1Acomp%C3%A1%C3%B1anos+a+celebrar+nuestra+boda%21&location=Restaurante+Tramonti,+Bogot%C3%A1&sf=true&output=xml";
            window.open(googleCalendarUrl, '_blank');
        };
    }

    function lanzarLluviaPetalos() {
        const contenedor = document.getElementById("contenedor-petalos");
        if (!contenedor) return;
        for (let i = 0; i < 25; i++) {
            const petalo = document.createElement("div");
            petalo.classList.add("petalo");
            petalo.style.width = `${Math.random() * 5 + 8}px`; 
            petalo.style.height = `${Math.random() * 10 + 12}px`;
            petalo.style.left = `${Math.random() * 100}vw`;
            petalo.style.animationDuration = `${Math.random() * 2 + 4}s`;
            contenedor.appendChild(petalo);
        }
    }

    function actualizarContadores() {
        const ahora = new Date().getTime();

        const contBoda = document.getElementById("contador-boda");
        if (contBoda) {
            const difBoda = fechaBoda - ahora;
            if (difBoda < 0) {
                contBoda.innerHTML = "<p>¡Llegó el gran día!</p>";
            } else {
                const d = Math.floor(difBoda / (1000 * 60 * 60 * 24));
                const h = Math.floor((difBoda % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const m = Math.floor((difBoda % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((difBoda % (1000 * 60)) / 1000);
                contBoda.innerHTML = `<div class="contador-display">
                    <div class="unidad-tiempo"><span class="numero">${d}</span><span class="etiqueta">Días</span></div>
                    <div class="unidad-tiempo"><span class="numero">${h}</span><span class="etiqueta">Horas</span></div>
                    <div class="unidad-tiempo"><span class="numero">${m}</span><span class="etiqueta">Min</span></div>
                    <div class="unidad-tiempo"><span class="numero">${s}</span><span class="etiqueta">Seg</span></div>
                </div>`;
            }
        }

        const contConfirmar = document.getElementById("contador-confirmacion");
        if (contConfirmar) {
            const difReal = fechaLimite - ahora;
            if (difReal < 0) {
                contConfirmar.innerHTML = "<p style='color:#c62828; font-weight:bold;'>Confirmaciones cerradas</p>";
            } else {
                const d = Math.floor(difReal / (1000 * 60 * 60 * 24));
                const h = Math.floor((difReal % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const m = Math.floor((difReal % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((difReal % (1000 * 60)) / 1000);
                contConfirmar.innerHTML = `<div class="contador-display">
                    <div class="unidad-tiempo"><span class="numero">${d}</span><span class="etiqueta">Días</span></div>
                    <div class="unidad-tiempo"><span class="numero">${h}</span><span class="etiqueta">Horas</span></div>
                    <div class="unidad-tiempo"><span class="numero">${m}</span><span class="etiqueta">Min</span></div>
                    <div class="unidad-tiempo"><span class="numero">${s}</span><span class="etiqueta">Seg</span></div>
                </div>`;
            }
        }
    }
    setInterval(actualizarContadores, 1000);
    actualizarContadores();
});