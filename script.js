// Three.js background effect
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BufferGeometry();
const vertices = [];
const colors = [];
for (let i = 0; i < 15000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(2000));
    vertices.push(THREE.MathUtils.randFloatSpread(2000));
    vertices.push(THREE.MathUtils.randFloatSpread(2000));

    colors.push(Math.random(), Math.random(), Math.random());
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const particles = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({ size: 3, vertexColors: true, blending: THREE.AdditiveBlending })
);
scene.add(particles);

camera.position.z = 1000;

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Terminal-like text effect
const terminal = document.getElementById('terminal');
const skills = {
    "Network Architecture and Design": ["Switching", "Routing", "VLANs"],
    "Cybersecurity and Risk Management": ["Network Security", "Firewall Configuration", "CTF Challenges"],
    "Networking Protocols and Standards": ["TCP/IP", "Cisco IOS"],
    "Systems Administration": ["Linux", "Windows Server"],
    "Programming and Scripting": ["Python", "Shell"],
    "Virtualization and Containerization": ["VirtualBox", "Docker"]
};

function typeWriter(text, element, speed = 50) {
    let i = 0;
    return new Promise((resolve) => {
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

async function displaySkills() {
    await typeWriter('> Initializing skill matrix...\n', terminal);
    for (const [category, skillList] of Object.entries(skills)) {
        await typeWriter(`\n> ${category}\n`, terminal);
        for (const skill of skillList) {
            await typeWriter(`  - ${skill}\n`, terminal, 30);
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    await typeWriter('\n> Skill matrix loaded successfully.', terminal);
}

displaySkills();

// Hacker-style text animation
const hackerText = document.getElementById('hacker-text');
const phrases = [
    "Securing networks, one packet at a time.",
    "Debugging the matrix.",
    "Firewall: Activated. Threats: Neutralized.",
    "Exploring the digital frontier.",
    "Code is poetry, security is art."
];

let phraseIndex = 0;

function animateHackerText() {
    const phrase = phrases[phraseIndex];
    let i = 0;
    hackerText.textContent = '';

    function typeChar() {
        if (i < phrase.length) {
            hackerText.textContent += phrase[i];
            i++;
            setTimeout(typeChar, 50);
        } else {
            setTimeout(eraseText, 2000);
        }
    }

    function eraseText() {
        if (hackerText.textContent.length > 0) {
            hackerText.textContent = hackerText.textContent.slice(0, -1);
            setTimeout(eraseText, 30);
        } else {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(animateHackerText, 500);
        }
    }

    typeChar();
}

animateHackerText();

// Glitch effect on hover
const glitchElement = document.querySelector('.glitch');
glitchElement.addEventListener('mouseover', () => {
    glitchElement.style.animation = 'glitch-anim 0.3s infinite';
});
glitchElement.addEventListener('mouseout', () => {
    glitchElement.style.animation = 'none';
});

// Matrix rain effect
const matrixRain = document.getElementById('matrix-rain');
const ctx = matrixRain.getContext('2d');

matrixRain.width = window.innerWidth;
matrixRain.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
const fontSize = 10;
const columns = matrixRain.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrixRain() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, matrixRain.width, matrixRain.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrixRain.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrixRain, 33);

// Network graph visualization
const networkGraph = document.getElementById('network-graph');

const width = networkGraph.clientWidth;
const height = 300;

const svg = d3.select(networkGraph)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const nodes = [
    { id: "Server", group: 1 },
    { id: "Router", group: 2 },
    { id: "Firewall", group: 3 },
    { id: "Client1", group: 4 },
    { id: "Client2", group: 4 },
    { id: "Client3", group: 4 }
];

const links = [
    { source: "Server", target: "Router", value: 1 },
    { source: "Router", target: "Firewall", value: 1 },
    { source: "Firewall", target: "Client1", value: 1 },
    { source: "Firewall", target: "Client2", value: 1 },
    { source: "Firewall", target: "Client3", value: 1 }
];

const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-400))
    .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke", "#39ff14")
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", d => Math.sqrt(d.value));

const node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("r", 5)
    .attr("fill", d => d3.schemeCategory10[d.group])
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

node.append("title")
    .text(d => d.id);

simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
});

function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
}

function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
}

function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
}