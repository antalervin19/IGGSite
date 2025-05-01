document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelector('.carousel-slides');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const modal = document.querySelector('.image-modal');
    const modalImg = document.querySelector('#modal-image');
    const closeModal = document.querySelector('.close-modal');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');

    const imagePaths = [
        '../resources/the-swing/img1.png',
        '../resources/the-swing/img2.png',
        '../resources/the-swing/img3.png',
        '../resources/the-swing/img4.png'
    ];

    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    imagePaths.forEach(path => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';

        const img = document.createElement('img');
        img.src = path;
        img.alt = 'THE SWING Preview';

        slide.appendChild(img);
        slides.appendChild(slide);
    });

    imagePaths.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            goToSlide(index);
        });

        dotsContainer.appendChild(dot);
    });

    function updateDisplay() {
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;

        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        if (modal.style.display === 'block') {
            modalImg.src = imagePaths[currentSlide];
        }
    }

    function goToSlide(index) {
        currentSlide = index;
        updateDisplay();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % imagePaths.length;
        updateDisplay();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + imagePaths.length) % imagePaths.length;
        updateDisplay();
    }

    prevButton.addEventListener('click', function(e) {
        e.stopPropagation();
        prevSlide();
    });

    nextButton.addEventListener('click', function(e) {
        e.stopPropagation();
        nextSlide();
    });

    modalPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        prevSlide();
    });

    modalNext.addEventListener('click', function(e) {
        e.stopPropagation();
        nextSlide();
    });

    carousel.addEventListener('click', function(e) {
        if (!e.target.classList.contains('carousel-prev') && 
            !e.target.classList.contains('carousel-next') && 
            !e.target.classList.contains('carousel-dot')) {
            modal.style.display = 'block';
            modalImg.src = imagePaths[currentSlide];
        }
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
    }

    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbyalZFPJpg4QVy1uGRICfEtm9rCKsBrreMFhy7cNiDV2K5rD7FNXG4f13izqy9a5ndy/exec';

            let cooldown = false;

            document.getElementById('emailForm').addEventListener('submit', function(event) {
                event.preventDefault();

                const email = document.getElementById('email').value;
                const consent = document.getElementById('consent').checked;

                if (email && consent && !cooldown) {
                    saveEmailToSheet(email);
                    cooldown = true;
                    setTimeout(() => {
                        cooldown = false;
                    }, 30000);
                } else if (cooldown) {
                    alert('Please wait 30 seconds before submitting again.');
                }
            });

            function saveEmailToSheet(email) {
                fetch(scriptUrl, {
                    method: 'POST',
                    body: new URLSearchParams({ 'email': email }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(response => response.text())
                .then(text => {
                    alert(text);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }

            const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
            const mobileMenu = document.querySelector('.mobile-menu');

            mobileNavToggle.addEventListener('click', function() {
                mobileMenu.classList.toggle('active');
            });

            document.addEventListener('click', function(event) {
                if (!mobileMenu.contains(event.target) && !mobileNavToggle.contains(event.target)) {
                    mobileMenu.classList.remove('active');
                }
            });
});