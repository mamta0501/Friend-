
const svg = document.getElementById("krishnaArt");
const startBtn = document.getElementById("startBtn");

const drawings = [...svg.querySelectorAll(".draw")];

let running = false;

// Create glowing particles
function createParticles() {

    svg.querySelectorAll(".particle").forEach(p => p.remove());

    for (let i = 0; i < 35; i++) {

        const particle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );

        const x = 30 + Math.random() * 540;
        const y = 30 + Math.random() * 640;
        const r = 1 + Math.random() * 2;

        particle.setAttribute("cx", x);
        particle.setAttribute("cy", y);
        particle.setAttribute("r", r);
        particle.setAttribute("class", "particle");

        particle.style.fill = "#ffe5a0";
        particle.style.filter =
            "drop-shadow(0 0 5px #ffca58)";

        svg.appendChild(particle);
    }
}

// Prepare drawing strokes
function prepareDrawing() {

    drawings.forEach(path => {

        const length = path.getTotalLength();

        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        path.style.opacity = "0";

    });
}

// Animate one stroke
function drawStroke(path, duration) {

    return new Promise(resolve => {

        const length = path.getTotalLength();

        path.style.opacity = "1";

        path.animate(
            [
                {
                    strokeDashoffset: length
                },
                {
                    strokeDashoffset: 0
                }
            ],
            {
                duration: duration,
                easing: "ease-in-out",
                fill: "forwards"
            }
        ).onfinish = resolve;

    });
}

// Start complete drawing
async function startDrawing() {

    if (running) return;

    running = true;
    startBtn.textContent = "✨ Drawing in Progress...";

    prepareDrawing();
    createParticles();

    for (let i = 0; i < drawings.length; i++) {

        await drawStroke(drawings[i], 650);

        await new Promise(resolve =>
            setTimeout(resolve, 100)
        );

    }

    running = false;

    startBtn.textContent = "✨ Draw Again";

}

startBtn.addEventListener("click", startDrawing);

// Initial setup
prepareDrawing();
createParticles();
