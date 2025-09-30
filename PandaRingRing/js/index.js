document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("videoTag");
    const playButton = document.getElementById("playButton");
    const videoOverlay = document.getElementById("videoOverlay");

  addClickEvent();


    AOS.init();
    initSwiper();

    video.removeAttribute("controls");
    video.play().catch(() => {
        playButton.classList.remove("hidden");
        videoOverlay.classList.remove("hidden");
    });

    function toggleVideo() {
        if (video.paused) {
            video.play();
            playButton.classList.add("hidden");
            videoOverlay.classList.add("hidden");
            video.setAttribute("controls", "true");
        } else {
            video.pause();
            playButton.classList.remove("hidden");
            videoOverlay.classList.remove("hidden");
        }
    }

    playButton.addEventListener("click", toggleVideo);

    video.addEventListener("play", function () {
        playButton.classList.add("hidden");
        videoOverlay.classList.add("hidden");
        video.setAttribute("controls", "true");
    });

    video.addEventListener("pause", function () {
        if (video.currentTime === 0) {
            video.removeAttribute("controls");
        }
        playButton.classList.remove("hidden");
        videoOverlay.classList.remove("hidden");
    });

    video.addEventListener("ended", function () {
        playButton.classList.remove("hidden");
        videoOverlay.classList.remove("hidden");
        video.removeAttribute("controls");
    });
});

function addClickEvent() {
    const navDropdown = document.querySelector('.nav-dropdown');
    const navDropdownTrigger = document.querySelector('.nav-dropdown__trigger');
    const navDropdownList = document.querySelector('.nav-dropdown__list');

    navDropdownTrigger?.addEventListener('click', () => {
        navDropdown.toggleAttribute('open');
        navDropdownList.toggleAttribute('open');
        navDropdownTrigger.toggleAttribute('open');
    })

    navDropdown?.addEventListener('mouseleave', () => {
        navDropdown.removeAttribute('open');
        navDropdownList.removeAttribute('open');
        navDropdownTrigger.removeAttribute('open');
    })

    if(window.screen.width >= 1024) {
        navDropdown.addEventListener('mouseenter', () => {
            navDropdown.setAttribute('open','');
            navDropdownList.setAttribute('open','');
            navDropdownTrigger.setAttribute('open','');
        })
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('frm_contactUs');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch('/contact/send/panda', {
            method: 'POST',
            body: formData
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                const msg = document.getElementById('form-response');
                msg.innerText = result.message;
                msg.style.color = result.success ? 'black' : 'red';
                if (result.success) {
                    form.reset();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});

function initSwiper() {
    const swiper = new Swiper('.swiper', {
        spaceBetween: 20,
        slidesPerView: 1,
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

function toggleLanguageDropdown() {
    const dropdown = document.querySelector('.custom-language-selector .dropdown');
    dropdown.classList.toggle('hidden');
}

function selectLanguage(lang) {
    document.querySelector('.custom-language-selector .dropdown').classList.add('hidden');
}

document.addEventListener('click', function (event) {
    const selector = document.querySelector('.custom-language-selector');
    if (!selector.contains(event.target)) {
        selector.querySelector('.dropdown').classList.add('hidden');
    }
});
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.href.includes('/Legal')) {
        legalTabsToggle();
    }
    const trigger = document.getElementById("mobile-menu-trigger");
    const nav = document.querySelector("nav");
    const iconUse = trigger.querySelector('use');

    trigger.addEventListener("click", function () {
        const isOpen = nav.classList.toggle("show");
        document.body.classList.toggle("nav-open", isOpen);

        iconUse.setAttribute(
            "href",
            isOpen ? "/assets/panda-ring-ring/icons.svg#close" : "/assets/panda-ring-ring/icons.svg#menu"
        );
    });

    const navLinks = nav.querySelectorAll("a");
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            nav.classList.remove("show");
            document.body.classList.remove("nav-open");
            iconUse.setAttribute("href", "/assets/panda-ring-ring/icons.svg#menu");
        });
    });
});

function legalTabsToggle() {
    const tabs = document.querySelectorAll('nord-tab');
    window.addEventListener("hashchange", () => {
            const hash = window.location.hash.slice(1);
            if (hash) {
                setTimeout(() => {
                    setActiveTab(hash)
                }, 0)
            }
        }
    );

    tabs.forEach(element => {
        element.addEventListener('click', (event) => {
            history.pushState(null, null, '#' + element.dataset.target);
        });
    })

    window.addEventListener('DOMContentLoaded', () => {
        const hash = window.location.hash.slice(1);

        if (hash) {
            setTimeout(() => setActiveTab(hash), 0)
        }
    });

    function setActiveTab(selector) {
        const targetElement = document.querySelector(`nord-tab[data-target="${selector}"]`);
        targetElement.setAttribute('selected', '');
    }
}
