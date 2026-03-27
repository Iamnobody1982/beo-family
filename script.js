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
            role: 'The Silent Guardian',
            desc: 'Là điểm tựa vững chãi của cả đế chế với trái tim hiền hậu và bao dung. Ông ít nói, chỉ lặng lẽ quan tâm và chăm sóc cả nhà bằng những hành động thiết thực. Hình ảnh ông luôn kề cạnh Bà nội, không một lời than vãn, chính là biểu tượng của tình yêu vĩnh cửu trong gia đình.'
        },
        'sweetest-soul': {
            avatar: '👵',
            title: 'Bà nội hay quên',
            role: 'The Sweetest Soul',
            desc: 'Trái tim của bà luôn tràn ngập sự lo lắng và yêu thương cho con cháu. Dù đôi khi “bộ nhớ” có chút trục trặc kiểu “não cá vàng” khiến cả nhà dở khóc dở cười, nhưng chính sự hồn nhiên và tấm lòng vị tha của bà là sợi dây kết nối hạnh phúc cho mọi thành viên.'
        },
        'tech-head': {
            avatar: '👨‍💻',
            title: 'Ba Mập ù',
            role: 'The Super Architect',
            desc: 'Vừa là thuyền trưởng, vừa là “siêu nhân” của gia đình. Ba gánh vác mọi trọng trách, từ việc lớn đến việc nhỏ đều xử lý gọn gàng mà không bao giờ ca thán. Với Ba, hạnh phúc của vợ con là hệ điều hành quan trọng nhất mà Ba luôn cố gắng tối ưu mỗi ngày.'
        },
        'energy-pack': {
            avatar: '🐷',
            title: 'Mẹ Béo đu đỉnh',
            role: 'The Energy-Pack',
            desc: '“Nàng thơ” của cả nhà với những sở thích cực kỳ đáng yêu: ăn, ngủ, chốt đơn livestream và chăm lo cho Pun ù. Dù đôi lúc có hay cằn nhằn một chút “cho vui cửa vui nhà”, nhưng đằng sau đó là một tình yêu thương vô bờ bến dành cho tổ ấm nhỏ.'
        },
        'grumpy-coder': {
            avatar: '🤴',
            title: 'Hai Bim đập chai',
            role: 'The Warm Coder',
            desc: 'Sở hữu vẻ ngoài điển trai chuẩn Hàn Quốc cùng tính cách “ít nói, hay quạu” đặc trưng của tuổi 14. Tuy nhiên, ẩn sau lớp vỏ bọc ấy là một tâm hồn ấm áp và ý chí cầu tiến, luôn nỗ lực hết mình trong học tập để trở thành phiên bản tốt nhất của chính mình.'
        },
        'princess-cute': {
            avatar: '👸',
            title: 'Ốc Mun cư tê',
            role: 'The Cuteness CEO',
            desc: 'Đại sứ ngoại giao của gia đình với tính cách hoạt bát và khả năng kết nối mọi người. Không chỉ khéo tay với những sản phẩm móc len tinh xảo, Mun còn bộc lộ tố chất “nữ doanh nhân” từ sớm. Đặc biệt, Mun còn là “trợ lý đắc lực” không thể thiếu của Ba trong mọi việc vặt.'
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
        2014: 'Năm Ốc Mun chào đời 🎀',
        2022: 'Hai Bim tốt nghiệp Cấp 1 🎓',
        2024: 'Ốc Mun tốt nghiệp Cấp 1 🎓',
        2025: 'Pun Ù về nhà 💕',
        2026: 'Hai Bim tốt nghiệp Cấp 2 🎓'
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
