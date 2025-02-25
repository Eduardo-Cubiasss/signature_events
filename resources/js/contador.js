// Fecha de destino: Miércoles 5 de marzo de 2025
const targetDate = new Date("March 5, 2025 17:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        document.getElementById("countdown-container").innerHTML = "<h2>¡Tiempo terminado!</h2>";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

// Actualizar cada segundo
setInterval(updateCountdown, 1000);
updateCountdown();

// Generar archivo ICS para cualquier calendario
function descargarICS() {
    const title = "Recordatorio de Evento";
    const description = "No olvides asistir a este evento especial.";
    const location = "Academia de Fútbol";
    const startDate = "20250305T170000Z"; // Formato ICS: AAAAMMDDTHHMMSSZ
    const endDate = "20250305T180000Z";

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${startDate}
DTEND:${endDate}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "evento_recordatorio.ics";
    link.click();
}