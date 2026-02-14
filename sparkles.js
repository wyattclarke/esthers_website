// Add glitter particles along each corner band
document.addEventListener('DOMContentLoaded', function() {
    // Each band runs diagonally across its corner
    // We place sparkles along the diagonal line where the band sits
    const bands = [
        // top-left: band goes from ~(0,70) to ~(70,0) diagonal
        { startX: 0, startY: 90, endX: 90, endY: 0 },
        // top-right: band goes from ~(window-70,0) to ~(window,70)
        { startX: -90, startY: 0, endX: 0, endY: 90, fromRight: true },
        // bottom-left: band goes from ~(0,window-70) to ~(70,window)
        { startX: 0, startY: -90, endX: 90, endY: 0, fromBottom: true },
        // bottom-right
        { startX: -90, startY: 0, endX: 0, endY: -90, fromRight: true, fromBottom: true }
    ];

    bands.forEach(function(band) {
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            // Position along the band with some random spread
            const t = Math.random();
            const bandX = band.startX + t * (band.endX - band.startX);
            const bandY = band.startY + t * (band.endY - band.startY);

            // Add some random offset perpendicular to the band (spread)
            const spread = (Math.random() - 0.5) * 20;

            let finalX = bandX + spread;
            let finalY = bandY + spread;

            if (band.fromRight) {
                sparkle.style.right = (-finalX) + 'px';
            } else {
                sparkle.style.left = finalX + 'px';
            }

            if (band.fromBottom) {
                sparkle.style.bottom = (-finalY) + 'px';
            } else {
                sparkle.style.top = finalY + 'px';
            }

            sparkle.style.setProperty('--duration', (0.5 + Math.random() * 1.5) + 's');
            sparkle.style.setProperty('--delay', (Math.random() * 3) + 's');

            // Vary sizes
            const size = 2 + Math.random() * 5;
            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';

            document.body.appendChild(sparkle);
        }
    });
});
