const header = document.getElementById('site-header') || document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');

if (header) {
    const siteNav = header.querySelector('.site-nav');
    const navHost = siteNav || header;

    const closeSiteNav = () => {
        header.classList.remove('is-open');

        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
        }
    };

    const locationsPanel = document.createElement('section');
    locationsPanel.className = 'locations-menu-panel';
    locationsPanel.id = 'locations-menu-panel';
    locationsPanel.hidden = true;
    locationsPanel.innerHTML = `
        <div class="locations-directory-wrap">
            <div class="locations-directory-panel">
                <div class="locations-grid">
                    <div class="location-group">
                        <h2>Orange County</h2>
                        <a href="#">Anaheim Hills @ LA Fitness</a>
                        <a href="#">Huntington Beach</a>
                        <a href="#">Irvine</a>
                        <a href="#">Yorba Linda @ LA Fitness</a>
                    </div>
                    <div class="location-group">
                        <h2>San Gabriel Valley</h2>
                        <a href="#">Alhambra-Fremont @ LA Fitness</a>
                        <a href="#">Arcadia @ LA Fitness</a>
                        <a href="#">Diamond Bar @ LA Fitness</a>
                        <a href="#">Pasadena</a>
                        <a href="#">West Covina @ LA Fitness</a>
                    </div>
                    <div class="location-group">
                        <h2>Silicon Valley</h2>
                        <a href="#">North San Jose @ City Sports Club</a>
                        <a href="#">San Jose-Almaden @ City Sports Club</a>
                        <a href="#">San Jose-Bascom</a>
                        <a href="#">San Jose-Blossom Hill @ City Sports Club</a>
                        <a href="#">Sunnyvale @ City Sports Club</a>
                    </div>
                    <div class="location-group">
                        <h2>San Diego County</h2>
                        <a href="#">Carlsbad</a>
                        <a href="#">Poway @ LA Fitness</a>
                    </div>
                    <div class="location-group">
                        <h2>Los Angeles County</h2>
                        <a href="#">Culver City @ LA Fitness</a>
                        <a href="#">Harbor City @ LA Fitness</a>
                    </div>
                    <div class="location-group">
                        <h2>Alameda County</h2>
                        <a href="#">Hayward @ City Sports Club</a>
                    </div>
                    <div class="location-group">
                        <h2>San Francisco</h2>
                        <a href="#">San Francisco-20th Avenue @ City Sports Club</a>
                    </div>
                    <div class="location-group">
                        <h2>Denver</h2>
                        <a href="#">Highlands Ranch</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    navHost.appendChild(locationsPanel);

    const locationTriggers = header.querySelectorAll('.site-nav a[href="locations.html"]');

    const closeLocationsPanel = () => {
        if (!locationsPanel.hidden) {
            locationsPanel.hidden = true;
            locationTriggers.forEach((trigger) => {
                trigger.setAttribute('aria-expanded', 'false');
            });
        }
    };

    const openLocationsPanel = () => {
        locationsPanel.hidden = false;
        locationTriggers.forEach((trigger) => {
            trigger.setAttribute('aria-expanded', 'true');
        });
    };

    if (toggle) {
        toggle.addEventListener('click', () => {
            const isOpen = header.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));

            if (isOpen) {
                closeLocationsPanel();
            }
        });
    }

    locationTriggers.forEach((trigger) => {
        trigger.setAttribute('aria-controls', 'locations-menu-panel');
        trigger.setAttribute('aria-expanded', 'false');

        trigger.addEventListener('click', (event) => {
            event.preventDefault();

            if (locationsPanel.hidden) {
                openLocationsPanel();
            } else {
                closeLocationsPanel();
            }
        });
    });

    const otherNavLinks = header.querySelectorAll('.site-nav a:not([href="locations.html"])');
    otherNavLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeLocationsPanel();
            closeSiteNav();
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeLocationsPanel();
            closeSiteNav();
        }
    });

    document.addEventListener('click', (event) => {
        const clickedInsideHeader = header.contains(event.target);
        const clickedInsidePanel = locationsPanel.contains(event.target);

        if (!clickedInsideHeader && !clickedInsidePanel) {
            closeLocationsPanel();
        }
    });
}
