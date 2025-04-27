document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.querySelector('.explore-btn');
    exploreBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const targetSection = document.querySelector('#games');
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });

    const words = ['games', 'softwares', 'our world!'];
    const dynamicText = document.querySelector('.dynamic-words');
    let currentIndex = 0;

    function changeText() {
        dynamicText.style.transform = 'translate(-100%, 0)';
        dynamicText.style.opacity = '0';

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % words.length;
            dynamicText.textContent = words[currentIndex];
            dynamicText.style.transform = 'translate(100%, 0)';

            setTimeout(() => {
                dynamicText.style.transform = 'translate(0, 0)';
                dynamicText.style.opacity = '1';
            }, 50);
        }, 500);
    }

    dynamicText.textContent = words[0];
    dynamicText.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    dynamicText.style.opacity = '1';

    setInterval(changeText, 3000);

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