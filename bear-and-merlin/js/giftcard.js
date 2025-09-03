    document.addEventListener('DOMContentLoaded', function() {
        const hasKiel = window.location.hostname.includes('kiel.');

        if (!hasKiel) {
            const links = document.querySelectorAll('a[href*="kiel.bear-and-merlin.com"]');

            links.forEach(link => {
                link.href = link.href.replace('kiel.bear-and-merlin.com', 'bear-and-merlin.com');
            });
        }
         // Find the problematic content container
            const giftCardContent = document.getElementById('GiftCardFullCMSContent');
            
            if (giftCardContent) {
                // Extract just the body content from the malformed HTML
                const originalHTML = giftCardContent.innerHTML;
                
                // Try to extract just the body content
                let cleanHTML = originalHTML;
                
                // Remove the nested html, head and body tags but keep their content
                cleanHTML = cleanHTML.replace(/<html[^>]*>/gi, '')
                                    .replace(/<\/html>/gi, '')
                                    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
                                    .replace(/<body[^>]*>/gi, '')
                                    .replace(/<\/body>/gi, '');
                
                // Update the content with the cleaned HTML
                giftCardContent.innerHTML = cleanHTML;
                
                // Re-initialize any scripts that might be in the content
                const scripts = giftCardContent.getElementsByTagName('script');
                for (let i = 0; i < scripts.length; i++) {
                    if (scripts[i].src) {
                        // For external scripts
                        const newScript = document.createElement('script');
                        newScript.src = scripts[i].src;
                        document.head.appendChild(newScript);
                    } else {
                        // For inline scripts
                        try {
                            eval(scripts[i].innerHTML);
                        } catch (e) {
                            console.error('Error executing script:', e);
                        }
                    }
                }
            }
    });
