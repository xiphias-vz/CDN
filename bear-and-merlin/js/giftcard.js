    document.addEventListener('DOMContentLoaded', function() {
        const hasKiel = window.location.hostname.includes('kiel.');

        if (!hasKiel) {
            const links = document.querySelectorAll('a[href*="kiel.bear-and-merlin.com"]');

            links.forEach(link => {
                link.href = link.href.replace('kiel.bear-and-merlin.com', 'bear-and-merlin.com');
            });
        }
    });
