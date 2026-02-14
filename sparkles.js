// Add glitter particles directly on each corner band
document.addEventListener('DOMContentLoaded', function() {
    const cornerDivs = [
        { selector: '.corner-tl', angle: -45, centerX: 95, centerY: 55 },
        { selector: '.corner-tr', angle: 45, centerX: 205, centerY: 55 },
        { selector: '.corner-bl', angle: 45, centerX: 95, centerY: 245 },
        { selector: '.corner-br', angle: -45, centerX: 205, centerY: 245 }
    ];

    cornerDivs.forEach(function(corner) {
        const el = document.querySelector(corner.selector);
        if (!el) return;

        for (let i = 0; i < 40; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.position = 'absolute';

            const along = (Math.random() - 0.5) * 200;
            const across = (Math.random() - 0.5) * 24;

            const rad = corner.angle * Math.PI / 180;
            const x = corner.centerX + along * Math.cos(rad) - across * Math.sin(rad);
            const y = corner.centerY + along * Math.sin(rad) + across * Math.cos(rad);

            if (x < 0 || x > 300 || y < 0 || y > 300) {
                i--;
                continue;
            }

            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.setProperty('--duration', (0.3 + Math.random() * 1) + 's');
            sparkle.style.setProperty('--delay', (Math.random() * 3) + 's');

            const size = 2 + Math.random() * 6;
            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';

            el.appendChild(sparkle);
        }
    });

    // Helper: check if a point overlaps any text element
    function overlapsText(x, y) {
        const textEls = document.querySelectorAll('h1, h2, p, a, .name, .rank, .review, .tagline, li a');
        for (const el of textEls) {
            const r = el.getBoundingClientRect();
            const margin = 10;
            if (x >= r.left - margin && x <= r.right + margin &&
                y >= r.top - margin && y <= r.bottom + margin) {
                return true;
            }
        }
        return false;
    }

    // Store sparkle data so we can reposition on resize
    let areaSparkles = [];

    function placeAreaSparkles() {
        // Remove old area sparkles
        areaSparkles.forEach(function(s) { s.remove(); });
        areaSparkles = [];

        const topicList = document.querySelector('.topic-list') || document.querySelector('.rankings');
        if (!topicList) return;

        const rect = topicList.getBoundingClientRect();
        const scrollY = window.scrollY;
        const maxDist = 180;

        let placed = 0;
        let attempts = 0;

        while (placed < 350 && attempts < 3000) {
            attempts++;

            const perim = (rect.width + rect.height) * 2;
            const p = Math.random() * perim;

            let edgeX, edgeY;
            if (p < rect.width) {
                edgeX = rect.left + p;
                edgeY = rect.top;
            } else if (p < rect.width + rect.height) {
                edgeX = rect.right;
                edgeY = rect.top + (p - rect.width);
            } else if (p < rect.width * 2 + rect.height) {
                edgeX = rect.right - (p - rect.width - rect.height);
                edgeY = rect.bottom;
            } else {
                edgeX = rect.left;
                edgeY = rect.bottom - (p - rect.width * 2 - rect.height);
            }

            const outDist = Math.pow(Math.random(), 0.5) * maxDist;

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = edgeX - centerX;
            const dy = edgeY - centerY;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;

            const jitterAlong = (Math.random() - 0.5) * 60;
            const jitterPerp = (Math.random() - 0.5) * 30;

            const x = edgeX + (dx / len) * outDist + (-dy / len) * jitterAlong + (dx / len) * jitterPerp;
            const y = edgeY + (dy / len) * outDist + (dx / len) * jitterAlong + (dy / len) * jitterPerp;

            if (overlapsText(x, y)) continue;

            const fadeRange = 140 + (Math.random() - 0.5) * 100;
            const fadeOpacity = Math.max(0, 1 - (outDist / fadeRange));
            if (fadeOpacity < 0.03) continue;

            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle area-sparkle';
            sparkle.style.left = x + 'px';
            sparkle.style.top = (y + scrollY) + 'px';
            sparkle.style.position = 'absolute';
            sparkle.style.setProperty('--duration', (0.3 + Math.random() * 1.2) + 's');
            sparkle.style.setProperty('--delay', (Math.random() * 4) + 's');
            sparkle.style.setProperty('--max-opacity', fadeOpacity);

            const size = 2 + Math.random() * (5 * fadeOpacity + 2);
            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';

            document.body.appendChild(sparkle);
            areaSparkles.push(sparkle);
            placed++;
        }
    }

    // Scatter gold stars everywhere across the page
    function overlapsTextFixed(x, y) {
        const textEls = document.querySelectorAll('h1, h2, p, a, .name, .rank, .review, .tagline, li a');
        for (const el of textEls) {
            const r = el.getBoundingClientRect();
            const margin = 15;
            if (x >= r.left - margin && x <= r.right + margin &&
                y >= r.top - margin && y <= r.bottom + margin) {
                return true;
            }
        }
        return false;
    }

    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'gold-star';
        star.textContent = '\u2605'; // solid star character

        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Check overlap using viewport coords
        const pxX = (x / 100) * window.innerWidth;
        const pxY = (y / 100) * window.innerHeight;
        if (overlapsTextFixed(pxX, pxY)) {
            i--;
            if (i < -200) break; // safety valve
            continue;
        }

        star.style.left = x + 'vw';
        star.style.top = y + 'vh';

        // Random sizes from tiny to big
        const sizes = [10, 14, 18, 24, 32, 42];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        star.style.fontSize = size + 'px';

        // Smaller stars are more transparent, bigger ones more visible
        const minOpacity = 0.05 + Math.random() * 0.1;
        const maxOpacity = 0.15 + (size / 42) * 0.25;
        star.style.setProperty('--star-min-opacity', minOpacity);
        star.style.setProperty('--star-max-opacity', maxOpacity);
        star.style.setProperty('--star-duration', (3 + Math.random() * 5) + 's');
        star.style.setProperty('--star-delay', (Math.random() * 6) + 's');

        // Random slight rotation
        star.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';

        document.body.appendChild(star);
    }

    // Place sparkles initially
    placeAreaSparkles();

    // Recalculate on resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(placeAreaSparkles, 200);
    });
});
