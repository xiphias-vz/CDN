    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM fully loaded, setting up event listeners for footer titles');
        const footerTitles = document.querySelectorAll('.cms-footer-block .toggle-title');
        console.log(`Found ${footerTitles.length} footer titles`);

        footerTitles.forEach((title, index) => {
            console.log(`Adding click event listener to footer title ${index + 1}`);
            title.addEventListener('click', function() {
                console.log(`Footer title clicked: ${this.textContent}`);
                console.log(`Current window width: ${window.innerWidth}px`);

                if (window.innerWidth <= 480) {
                    console.log('Window width <= 480px, executing toggle logic');
                    const parentBlock = this.closest('.cms-footer-block');
                    console.log(`Parent block found: ${parentBlock ? 'Yes' : 'No'}`);

                    const list = parentBlock.querySelector('ul');
                    console.log(`List found: ${list ? 'Yes' : 'No'}`);

                    console.log(`Toggling 'open' class on clicked title and list`);
                    this.classList.toggle('open');
                    list.classList.toggle('open');
                    console.log(`Clicked title 'open' status: ${this.classList.contains('open')}`);
                    console.log(`List 'open' status: ${list.classList.contains('open')}`);

                    console.log('Closing other footer titles and lists');
                    footerTitles.forEach((otherTitle, otherIndex) => {
                        if (otherTitle !== title) {
                            console.log(`Processing other footer title ${otherIndex + 1}`);
                            const otherParentBlock = otherTitle.closest('.cms-footer-block');
                            const otherList = otherParentBlock.querySelector('ul');
                            otherTitle.classList.remove('open');
                            otherList.classList.remove('open');
                            console.log(`Other title ${otherIndex + 1} 'open' status: ${otherTitle.classList.contains('open')}`);
                            console.log(`Other list ${otherIndex + 1} 'open' status: ${otherList.classList.contains('open')}`);
                        }
                    });
                } else {
                    console.log('Window width > 480px, no toggle logic executed');
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
