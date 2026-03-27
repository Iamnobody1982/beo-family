/**
 * Béo's Family — Interface Logic
 * Nodes · Dropdown · Gallery · Lightbox · Easter Egg · 3D Tilt
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       1. NAVIGATION DROPDOWN
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    const dropdownBtn     = document.getElementById('dropdown-btn');
    const dropdownContent = document.getElementById('dropdown-content');

    dropdownBtn.addEventListener('click', e => {
        e.stopPropagation();
        dropdownContent.classList.toggle('show');
    });
    document.addEventListener('click', e => {
        if (!e.target.closest('.dropdown')) dropdownContent.classList.remove('show');
    });

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       2. 3D TILT EFFECT ON HERO
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    const heroTilt = document.getElementById('hero-tilt-target');
    if (heroTilt && window.matchMedia('(pointer: fine)').matches) {
        heroTilt.addEventListener('mousemove', e => {
            const r = heroTilt.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            const rx = ((y - r.height / 2) / r.height) * -7;
            const ry = ((x - r.width  / 2) / r.width)  *  7;
            heroTilt.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
        });
        heroTilt.addEventListener('mouseleave', () => {
            heroTilt.style.transform = 'rotateX(0) rotateY(0) scale3d(1,1,1)';
        });
    }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       3. INTERACTIVE NODES — PERSONA PROFILES
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    const popup      = document.getElementById('profile-popup');
    const popupAvatar   = document.getElementById('popup-avatar');
    const popupTitle    = document.getElementById('popup-title');
    const popupSubtitle = document.getElementById('popup-subtitle');
    const popupDesc     = document.getElementById('popup-desc');
    const closePopup    = document.getElementById('close-popup');

    const personaData = {
        'wise-leader': {
            avatar: '👴',
            title: 'Ông nội bụng bự',
            role: 'The Wise Leader',
            desc: 'Cột trụ vững chắc nhất của nhà. Ông không nói nhiều, nhưng mỗi lời ông nói đều chứa đựng yêu thương và sự khôn ngoan của cả một đời người.'
        },
        'sweetest-soul': {
            avatar: '👵',
            title: 'Bà nội hay quên',
            role: 'The Sweetest Soul',
            desc: 'Quên nè, nhưng chắc chắn không bao giờ quên yêu thương các con. Bà là người giữ lửa ấm cho cả nhà, mỗi bữa cơm bà nấu đều là một món quà từ trái tim.'
        },
        'tech-head': {
            avatar: '👨‍💻',
            title: 'Ba Mập ù',
            role: 'Tấm Lưng Vững Chắc',
            desc: 'Kiểu gì cũng lo được, kiểu gì cũng tự giải quyết. Ba không cần ai hỏi thăm mà vẫn đặt những đứa con lên hàng đầu trong từng quyết định.'
        },
        'energy-pack': {
            avatar: '🐷',
            title: 'Mẹ Béo đu đỉnh',
            role: 'Linh Hồn Năng Lượng',
            desc: 'Mẹ vừa làm việc, vừa chăm con, vừa yêu thương cả nhà mà vẫn đu đỉnh được. Bí quyết? Chắc là vì nhà mình quá vui nên mẹ chẳng bao giờ mệt.'
        },
        'grumpy-coder': {
            avatar: '🤴',
            title: 'Hai Bim quạu',
            role: 'Anh Hai Kế Cách • 14 tuổi',
            desc: 'Nhìn thì quạu nhưng thực ra rất phá, rất nghịch và rất thương em. Anh Hai là người lúc nào cũng có kế hoạch, chỉ là kế hoạch đó chưa ai biết thôi.'
        },
        'princess-cute': {
            avatar: '👸',
            title: 'Ốc Mun cư tê',
            role: 'Công chúa dễ thương • 11 tuổi',
            desc: 'Nhìn cái mặt là thấy người ta muốn niêu liền. Ốc Mun mang đến nụ cười cho cả nhà mỗi ngày — không cần lý do, chỉ cần được là chính mình.'
        }
    };

    document.querySelectorAll('.node').forEach(node => {
        node.addEventListener('click', e => {
            e.stopPropagation();
            const data = personaData[node.getAttribute('data-id')];
            if (!data || !popup) return;
            popupAvatar.textContent   = data.avatar;
            popupTitle.textContent    = data.title;
            popupSubtitle.textContent = data.role;
            popupDesc.textContent     = data.desc;
            popup.classList.remove('active');
            void popup.offsetWidth;
            popup.classList.add('active');
        });
    });

    closePopup.addEventListener('click', () => popup.classList.remove('active'));
    document.addEventListener('click', e => {
        if (!e.target.closest('.node') && !e.target.closest('.popup')) {
            popup.classList.remove('active');
        }
    });

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       4. GALLERY SYSTEM
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    const galleryOverlay  = document.getElementById('gallery-overlay');
    const galleryGrid     = document.getElementById('gallery-grid');
    const galleryEmpty    = document.getElementById('gallery-empty');
    const galleryTitle    = document.getElementById('gallery-year-title');
    const gallerySubtitle = document.getElementById('gallery-subtitle');
    const galleryEmptyYear= document.getElementById('gallery-empty-year');
    const galleryCloseBtn = document.getElementById('gallery-close-btn');

    const specialYears = {
        2011: 'Năm Hai Bim chào đời 🎂',
        2014: 'Năm Ốc Mun chào đời 🎀'
    };

    let currentGalleryImages = [];

    function openGallery(year) {
        const photos = (typeof GALLERY_DATA !== 'undefined' && GALLERY_DATA[year]) ? GALLERY_DATA[year] : [];
        currentGalleryImages = photos.map(f => `assets/${year}/${f}`);

        galleryTitle.textContent    = year;
        gallerySubtitle.textContent = specialYears[year] || `Ký ức năm ${year}`;
        galleryEmptyYear.textContent = year;

        // Clear and populate grid
        galleryGrid.innerHTML = '';

        if (currentGalleryImages.length === 0) {
            galleryGrid.style.display  = 'none';
            galleryEmpty.style.display = 'flex';
        } else {
            galleryGrid.style.display  = 'grid';
            galleryEmpty.style.display = 'none';
            currentGalleryImages.forEach((src, idx) => {
                const thumb = document.createElement('div');
                thumb.className = 'gallery-thumb';
                thumb.innerHTML = `<img src="${src}" alt="Photo ${idx + 1}" loading="lazy"><div class="thumb-overlay"></div>`;
                thumb.addEventListener('click', () => openLightbox(idx));
                galleryGrid.appendChild(thumb);
            });
        }

        galleryOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
        galleryOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    galleryCloseBtn.addEventListener('click', closeGallery);
    galleryOverlay.addEventListener('click', e => {
        if (e.target === galleryOverlay) closeGallery();
    });

    // Year cards in timeline → open gallery
    document.querySelectorAll('.year-card').forEach(card => {
        card.addEventListener('click', () => {
            const year = parseInt(card.getAttribute('data-year'));
            openGallery(year);
        });
    });

    // Dropdown year links → scroll to card + open gallery
    document.querySelectorAll('.year-nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const year    = parseInt(link.getAttribute('data-year'));
            const targetCard = document.getElementById(`year-${year}`);
            dropdownContent.classList.remove('show');

            if (targetCard) {
                // Scroll the timeline wrapper so the card is visible
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                // Small delay for pleasant UX before gallery opens
                setTimeout(() => openGallery(year), 500);
            } else {
                openGallery(year);
            }
        });
    });

    // Start Journey button → scroll to timeline
    const startBtn = document.getElementById('start-journey-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            document.getElementById('year-2011').scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });
    }

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       5. LIGHTBOX
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    const lightbox        = document.getElementById('lightbox');
    const lightboxImg     = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose   = document.getElementById('lightbox-close');
    const lightboxPrev    = document.getElementById('lightbox-prev');
    const lightboxNext    = document.getElementById('lightbox-next');
    const lightboxBdrop   = document.getElementById('lightbox-backdrop');

    let lightboxIndex = 0;

    function openLightbox(idx) {
        lightboxIndex = idx;
        showLightboxImage();
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'hidden'; // keep gallery scroll locked
    }

    function showLightboxImage() {
        lightboxImg.src = currentGalleryImages[lightboxIndex];
        lightboxCounter.textContent = `${lightboxIndex + 1} / ${currentGalleryImages.length}`;
        lightboxPrev.style.opacity = lightboxIndex === 0 ? '0.3' : '1';
        lightboxNext.style.opacity = lightboxIndex === currentGalleryImages.length - 1 ? '0.3' : '1';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBdrop.addEventListener('click', closeLightbox);

    lightboxPrev.addEventListener('click', () => {
        if (lightboxIndex > 0) { lightboxIndex--; showLightboxImage(); }
    });
    lightboxNext.addEventListener('click', () => {
        if (lightboxIndex < currentGalleryImages.length - 1) { lightboxIndex++; showLightboxImage(); }
    });

    // Keyboard navigation
    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft'  && lightboxIndex > 0) { lightboxIndex--; showLightboxImage(); }
            if (e.key === 'ArrowRight' && lightboxIndex < currentGalleryImages.length - 1) { lightboxIndex++; showLightboxImage(); }
            if (e.key === 'Escape') closeLightbox();
        } else if (!galleryOverlay.classList.contains('hidden')) {
            if (e.key === 'Escape') closeGallery();
        }
    });

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       6. EASTER EGG 🐷
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    const pigIcon  = document.getElementById('pig-easter-egg');
    const pigAudio = document.getElementById('pig-sound');

    pigIcon.addEventListener('click', () => {
        pigIcon.classList.remove('oink');
        void pigIcon.offsetWidth;
        pigIcon.classList.add('oink');

        if (pigAudio) {
            pigAudio.currentTime = 0;
            pigAudio.play().catch(() => {});
        }

        if (typeof confetti === 'function') {
            const end = Date.now() + 2500;
            (function frame() {
                confetti({ particleCount: 5, angle: 60,  spread: 55, origin: { x: 0 }, colors: ['#f9a8d4','#00f3ff','#fbbf24'] });
                confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#f9a8d4','#00f3ff','#fbbf24'] });
                if (Date.now() < end) requestAnimationFrame(frame);
            }());
        }
    });

});
