function iniciarCuentaRegresiva() {
  const destino = new Date("2025-07-30T05:00:00Z").getTime(); // 00:00 UTC-5
  const cuenta = document.getElementById("cuenta-regresiva");
  const boton = document.getElementById("boton-sorpresa");
  const titulo = document.querySelector("h1");

  let simulando = false;
  let inicioSimulacion = null;
  const duracionSimulada = 15 * 24 * 60 * 60 * 1000;
  const duracionReal = 3000;

  function animar() {
    const ahora = new Date().getTime();
    let diferencia = destino - ahora;

    if (diferencia <= 0 && !simulando) {
      simulando = true;
      inicioSimulacion = ahora;
      requestAnimationFrame(animar);
      return;
    }

    if (simulando) {
      const ahoraSim = new Date().getTime();
      const tiempoTranscurrido = ahoraSim - inicioSimulacion;

      if (tiempoTranscurrido >= duracionReal) {
        if (titulo) titulo.classList.add("transicion-salida");
        cuenta.classList.add("transicion-salida");
        boton.classList.add("transicion-salida");

        setTimeout(() => {
          if (titulo) titulo.remove();
          cuenta.innerHTML = "🎉 ¡Feliz cumpleaños, Gabi!";
          cuenta.classList.remove("transicion-salida");

          confetti({
            particleCount: 200,
            spread: 80,
            origin: { y: 0.6 },
          });

          boton.classList.remove("bloqueado", "transicion-salida");
          boton.removeAttribute("disabled");
          boton.textContent = "Tu regalo te espera... 🎁";
          boton.classList.add("animado");
          boton.style.pointerEvents = "auto";
        }, 600);

        return;
      }

      const progreso = tiempoTranscurrido / duracionReal;
      const diferenciaSimulada = duracionSimulada * (1 - progreso);
      mostrarTiempo(diferenciaSimulada);

      requestAnimationFrame(animar);
      return;
    }

    mostrarTiempo(diferencia);
    requestAnimationFrame(animar);
  }

  function mostrarTiempo(ms) {
    const dias = Math.floor(ms / (1000 * 60 * 60 * 24));
    const horas = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((ms % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = String(horas).padStart(2, '0');
    document.getElementById("minutos").textContent = String(minutos).padStart(2, '0');
    document.getElementById("segundos").textContent = String(segundos).padStart(2, '0');
  }

  requestAnimationFrame(animar);
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarCuentaRegresiva();

  const boton = document.getElementById("boton-sorpresa");

  boton.addEventListener("click", function (e) {
    if (boton.classList.contains("bloqueado")) {
      e.preventDefault();
      boton.classList.add("vibrar");
      setTimeout(() => {
        boton.classList.remove("vibrar");
      }, 400);
    }
  });

  // 💖 Corazones flotantes con tonos armoniosos
  const contenedor = document.querySelector(".corazones-container");

  // Paleta de colores suaves y románticos
  const tonos = [
  "#f7a1b0", // rosa pastel
  "#ffccd5", // rosado claro
  "#f3b3bd", // rosa polvo
  "#eab6c2"  // coral muy suave
];

  function generarCorazon() {
    const corazon = document.createElement("div");
    corazon.classList.add("corazon");
    corazon.innerHTML = "&#9829;"; // ♥ — carácter unicode, no emoji

    corazon.style.left = Math.random() * 100 + "vw";
    corazon.style.animationDuration = 6 + Math.random() * 6 + "s";
    corazon.style.animationDelay = "0s";
    corazon.style.opacity = Math.random() * 0.5 + 0.3;
    corazon.style.transform = `scale(${Math.random() * 0.6 + 0.5})`;

    // Color aleatorio de la paleta
    const color = tonos[Math.floor(Math.random() * tonos.length)];
    corazon.style.color = color;

    contenedor.appendChild(corazon);

    // Eliminar después de la animación
    setTimeout(() => {
      corazon.remove();
    }, 12000);
  }

  // Crear corazones de forma continua
  setInterval(generarCorazon, 400);
})