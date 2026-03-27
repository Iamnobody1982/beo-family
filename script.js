/**
 * Béo's Family - Interface Logic
 * Handling 3D tilt, Node clicks, Navigation, and Easter Eggs.
 */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. Top-Right Navigation & Dropdown
       ========================================================= */
    const dropdownBtn = document.getElementById("dropdown-btn");
    const dropdownContent = document.getElementById("dropdown-content");
    
    // Toggle dropdown visibility
    dropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdownContent.classList.toggle("show");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest('.dropdown')) {
            dropdownContent.classList.remove("show");
        }
    });

    // Smooth scroll offset for anchor links
    document.querySelectorAll('.dropdown-content a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            
            if (targetEl) {
                // Close dropdown
                dropdownContent.classList.remove("show");
                // Scroll specifically to the timeline track area
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }
        });
    });

    /* =========================================================
       2. Hero Container 3D Tilt Effect
       ========================================================= */
    const heroTiltTarget = document.getElementById("hero-tilt-target");
    
    if (heroTiltTarget && window.matchMedia("(pointer: fine)").matches) {
        heroTiltTarget.addEventListener('mousemove', (e) => {
            const rect = heroTiltTarget.getBoundingClientRect();
            // Calculate mouse position relative to container center
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt degrees (max +- 8 degrees for subtlety)
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            // Apply transform - 'perspective' defines the 3D depth
            heroTiltTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        heroTiltTarget.addEventListener('mouseleave', () => {
            // Smooth snap-back
            heroTiltTarget.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }

    /* =========================================================
       3. Interactive Nodes & Persona Profiles
       ========================================================= */
    const nodes = document.querySelectorAll('.node');
    const popup = document.getElementById('profile-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupSubtitle = document.getElementById('popup-subtitle');
    const popupDesc = document.getElementById('popup-desc');
    const closePopup = document.getElementById('close-popup');

    // Data Source Mapping IDs to Persona Information
    const personaData = {
        'wise-leader': { 
            avatar: '👴',
            title: 'Ông nội bụng bự', 
            role: 'The Wise Leader', 
            desc: 'The strategic mind behind the empire. Brings wisdom, calm, and steady guidance to the entire guild.' 
        },
        'sweetest-soul': { 
            avatar: '👵',
            title: 'Bà nội hay quên', 
            role: 'The Sweetest Soul', 
            desc: 'The heart of our family. Always bringing joy and warmth to the server, even if the lore gets wonderfully retold.' 
        },
        'tech-head': { 
            avatar: '👨‍💻',
            title: 'Ba Mập ù', 
            role: 'Tech-Head & Delivery', 
            desc: 'Chief system operator and the ultimate logistical support. Makes sure the base runs smoothly with high-speed precision.' 
        },
        'energy-pack': { 
            avatar: '💼',
            title: 'Mẹ Béo đu đỉnh', 
            role: 'The Energy-Pack', 
            desc: 'Investment visionary with non-stop momentum. The dynamic powerhouse keeping the family economy thriving and ever-growing.' 
        },
        'grumpy-coder': { 
            avatar: '🖥️',
            title: 'Hai Bim quạu', 
            role: 'Grumpy Coder • Age 14', 
            desc: 'System overload mood. Usually found compiling code, debugging life, and plotting the next digital takeover. Do not disturb.' 
        },
        'princess-cute': { 
            avatar: '👸',
            title: 'Ốc Mun cư tê', 
            role: 'Princess of Cute • Age 11', 
            desc: 'Cuteness overflow. Has maxed out charisma stats and charms everyone effortlessly with her cheerful buffs.' 
        }
    };

    // Handle Node Clicks
    nodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const id = node.getAttribute('data-id');
            const data = personaData[id];

            if (data && popup) {
                // Inject content
                document.getElementById('popup-avatar').textContent = data.avatar;
                popupTitle.textContent = data.title;
                popupSubtitle.textContent = data.role;
                popupDesc.textContent = data.desc;

                // Force reflow to restart the slide-up animation cleanly
                popup.classList.remove('active');
                void popup.offsetWidth;
                popup.classList.add('active');
            }
        });
    });

    // Close Popup Interactions
    closePopup.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    // Click outside nodes/popup closes the popup
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.node') && !e.target.closest('.popup')) {
            popup.classList.remove('active');
        }
    });

    /* =========================================================
       4. Banner Easter Egg (Sound + Confetti)
       ========================================================= */
    const pigIcon = document.getElementById('pig-easter-egg');
    const pigAudio = document.getElementById('pig-sound');

    pigIcon.addEventListener('click', () => {
        // 1. Play Bounce Animation
        pigIcon.classList.remove('oink');
        void pigIcon.offsetWidth; // Reflow
        pigIcon.classList.add('oink');

        // 2. Play Audio (Catch promise errors safely typically caused by auto-play policies if user hasn't interacted, though this is click-driven so it should be fine)
        if (pigAudio) {
            pigAudio.currentTime = 0; // Reset to start
            let playPromise = pigAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio play prevented:", error);
                });
            }
        }

        // 3. Fire Confetti Showers
        if (typeof confetti === 'function') {
            const duration = 2500; // 2.5 seconds
            const end = Date.now() + duration;

            (function frame() {
                // Fire from left edge
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#fbcfe8', '#00f3ff', '#fcd34d'] // Pink, Neon Blue, Gold
                });
                
                // Fire from right edge
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#fbcfe8', '#00f3ff', '#fcd34d']
                });

                // Loop until duration ends
                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    });

});
