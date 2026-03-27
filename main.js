/**
 * The Piggy Empire - Core Logic
 * - Easter Egg & Confetti
 * - Member Persona Modals
 * - Timeline Track Generation
 */

document.addEventListener('DOMContentLoaded', () => {
    initEasterEgg();
    initMemberModals();
    initTimeline();
    initTiltEffect();
    
    // Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

/* --- Easter Egg: The Oink Factor --- */
function initEasterEgg() {
    const piggy = document.getElementById('piggy-icon');
    const canvas = document.getElementById('confetti-canvas');
    if (!piggy || !canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const colors = ['#ffb7b2', '#ff9aa2', '#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea'];

    window.addEventListener('resize', resizeCanvas);
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.radius = Math.random() * 5 + 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.vx = (Math.random() - 0.5) * 10;
            this.vy = (Math.random() - 0.5) * 10;
            this.gravity = 0.2;
            this.life = 100;
        }
        update() {
            this.vx *= 0.99;
            this.vy *= 0.99;
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        if (particles.length > 0) requestAnimationFrame(animate);
    }

    piggy.addEventListener('click', () => {
        // Log the sound effect for now
        console.log('éc éc!'); 
        
        // Trigger confetti from center
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
        animate();

        // Visual feedback on the pig
        piggy.style.transform = 'scale(1.5) rotate(20deg)';
        setTimeout(() => piggy.style.transform = '', 300);
    });
}

/* --- Member Personas & Modals --- */
const personas = {
    'ong-noi': {
        name: 'Ông nội bụng bự',
        role: 'The Wise Leader',
        desc: 'The backbone of the empire. Spends his time strategizing (napping) and sharing ancient wisdom about the world.',
        widget: '> SYSTEM STATUS: ONLINE\n> EXPERIENCE: 70+ SOLAR CYCLES\n> AUTHORITY: SUPREME'
    },
    'ba-noi': {
        name: 'Bà nội hay quên',
        role: 'The Sweetest Soul',
        desc: 'A database of kindness. She might forget the password to the vault, but she never forgets a smile or a meal.',
        widget: '> HEART RATE: CONSTANT WARMTH\n> MEMORY CACHE: FULL OF LOVE\n> ALERT: COOKIES NEEDED'
    },
    'me-beo': {
        name: 'Mẹ Béo đu đỉnh',
        role: 'The Energy-Pack',
        desc: 'Digital Investment expert and general chaos manager. If there is a peak to reach, she is already there.',
        widget: '> MARKET VIBE: BULLISH\n> ASSET CLASS: UNSTOPPABLE\n> ENERGY LEVEL: 110%'
    },
    'ba-map': {
        name: 'Ba Mập ù',
        role: 'Tech-Head & Delivery',
        desc: 'The master of bits and bites. If it is broken, he fixes it. If it is food, he delivers it with a smile.',
        widget: '> LATENCY: 0ms\n> PROTOCOLS: TCP (TASTY CAKE PROVIDER)\n> GEAR: PEAK CONFIG'
    },
    'hai-bim': {
        name: 'Hai Bim quạu',
        role: 'Grumpy Coder',
        desc: 'A 14-year-old system architect with a Permanent System Overload mood. High performance, even with a frown.',
        widget: '> MOOD: [######----] 60% GRUMPY\n> CODE STATUS: STABLE-ISH\n> ERROR: MORE COFFEE REQUIRED'
    },
    'oc-mun': {
        name: 'Ốc Mun cư tê',
        role: 'Princess of Cute',
        desc: 'The ultimate interface. Master of the "puppy eyes" protocol. Capable of bypassing any defensive firewall within the family.',
        widget: '> CUTENESS_LEVEL: OVERFLOW\n> DEPLOYMENT: GLOBAL ADORATION\n> STATUS: ACTIVE'
    }
};

function initMemberModals() {
    const hotspots = document.querySelectorAll('.hotspot');
    const modal = document.getElementById('member-modal');
    const closeBtn = document.querySelector('.close-btn');
    
    const mTitle = document.getElementById('modal-title');
    const mRole = document.getElementById('modal-role');
    const mDesc = document.getElementById('modal-desc');
    const mWidget = document.getElementById('modal-widget');

    hotspots.forEach(spot => {
        // Modal trigger
        spot.addEventListener('click', () => {
            const memberKey = spot.getAttribute('data-member');
            const data = personas[memberKey];
            if (data) {
                mTitle.textContent = data.name;
                mRole.textContent = data.role;
                mDesc.textContent = data.desc;
                mWidget.innerText = data.widget;
                modal.classList.add('active');
            }
        });

        // 3D Tilt Highlight Logic
        spot.addEventListener('mouseenter', () => {
            const container = document.querySelector('.image-map-container');
            const rect = spot.getBoundingClientRect();
            const contRect = container.getBoundingClientRect();
            
            // Calculate tilt based on spot position relative to center
            const x = (rect.left + rect.width/2) - (contRect.left + contRect.width/2);
            const y = (rect.top + rect.height/2) - (contRect.top + contRect.height/2);
            
            const tiltX = (y / contRect.height) * 15;
            const tiltY = -(x / contRect.width) * 15;
            
            container.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });

        spot.addEventListener('mouseleave', () => {
            const container = document.querySelector('.image-map-container');
            container.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

/* --- Timeline Track --- */
function initTimeline() {
    const container = document.getElementById('timeline-nodes');
    if (!container) return;

    for (let year = 2011; year <= 2026; year++) {
        const node = document.createElement('div');
        node.className = 'timeline-node';
        node.innerHTML = `
            <div class="node-year">${year}</div>
            <div class="node-album">+ Album</div>
        `;
        node.addEventListener('click', () => {
            alert(`Opening digital archives for Year ${year}...`);
        });
        container.appendChild(node);
    }
}

/* --- Interactive Tilt --- */
function initTiltEffect() {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
}
