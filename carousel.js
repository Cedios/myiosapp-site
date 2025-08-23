document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const totalSlides = 6;
    let autoplayInterval;
    let isPlaying = true;

    const slidesContainer = document.getElementById('carouselSlides');
    const indicators = document.querySelectorAll('.indicator');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const carouselContainer = document.querySelector('.carousel-container');

    const goToSlide = (index) => {
        currentSlide = index;
        updateCarousel();
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    };

    const updateCarousel = () => {
        const translateX = -currentSlide * (100 / totalSlides);
        slidesContainer.style.transform = `translateX(${translateX}%)`;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    };

    const startAutoplay = () => {
        autoplayInterval = setInterval(nextSlide, 3000);
    };

    const stopAutoplay = () => {
        clearInterval(autoplayInterval);
    };

    const toggleAutoplay = () => {
        if (isPlaying) {
            stopAutoplay();
            playPauseBtn.textContent = '▶️ Play';
        } else {
            startAutoplay();
            playPauseBtn.textContent = '⏸️ Pause';
        }
        isPlaying = !isPlaying;
    };

    // Événements
    playPauseBtn.addEventListener('click', toggleAutoplay);

    carouselContainer.addEventListener('mouseenter', () => {
        if (isPlaying) stopAutoplay();
    });

    carouselContainer.addEventListener('mouseleave', () => {
        if (isPlaying) startAutoplay();
    });

    // Support tactile
    let startX = 0;
    let endX = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    const handleSwipe = () => {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            diff > 0 ? nextSlide() : prevSlide();
        }
    };

    // Démarre au chargement
    startAutoplay();
});

