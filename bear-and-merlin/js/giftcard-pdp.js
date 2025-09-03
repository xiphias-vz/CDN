 const swiper = new Swiper('.swiper', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: false,
        speed: 400,
        grabCursor: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20
            }
        },
        slideToClickedSlide: false
    });

    const slides = document.querySelectorAll('.swiper-slide');

    slides.forEach(slide => {
        slide.addEventListener('click', function() {
            slides.forEach(s => s.classList.remove('active-slide'));
            this.classList.add('active-slide');
            this.querySelector('input[type="radio"]').checked = true;
        });
    });
