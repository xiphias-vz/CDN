document.addEventListener('DOMContentLoaded', function() {
    const footerTitles = document.querySelectorAll('.cms-footer-block .toggle-title');

    footerTitles.forEach((title, index) => {
        title.addEventListener('click', function() {
            if (window.innerWidth <= 480) {
                const parentBlock = this.closest('.cms-footer-block');
                const list = parentBlock.querySelector('ul');
                this.classList.toggle('open');
                list.classList.toggle('open');

                footerTitles.forEach((otherTitle, otherIndex) => {
                    if (otherTitle !== title) {
                        const otherParentBlock = otherTitle.closest('.cms-footer-block');
                        const otherList = otherParentBlock.querySelector('ul');
                        otherTitle.classList.remove('open');
                        otherList.classList.remove('open');
                    }
                });
            }
        });
    });

    const urlPath = window.location.pathname;
    const localeMatch = urlPath.match(/\/(en|hr|de)\//);
    const currentLocale = localeMatch ? localeMatch[1] : 'hr';

    const internalFooterLinks = document.querySelectorAll('.cms-footer a[href^="/"]:not([href^="http"]):not([target="_blank"])');
    internalFooterLinks.forEach(link => {
        const href = link.getAttribute('href').replace(/^\//, '');
        link.href = `/${currentLocale}/${href}`;
    });

    const homepageElements = document.querySelectorAll('.header-logo a, .cms-footer-logo a, .return-button');
    homepageElements.forEach(el => {
        el.href = `https://kiel.bear-and-merlin.com/${currentLocale}/`;
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 480) {
            footerTitles.forEach(title => {
                const parentBlock = title.closest('.cms-footer-block');
                const list = parentBlock.querySelector('ul');
                title.classList.remove('open');
                list.classList.remove('open');
            });
        }
    });
});

