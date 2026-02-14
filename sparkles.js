// Add gold sparkle particles to each corner
document.addEventListener('DOMContentLoaded', function() {
    const corners = [
        { x: [5, 80], y: [5, 80] },     // top-left
        { x: [920, 995], y: [5, 80] },   // top-right (% based)
        { x: [5, 80], y: [920, 995] },   // bottom-left
        { x: [920, 995], y: [920, 995] } // bottom-right
    ];

    // Use viewport-based positioning
    corners.forEach(function(corner) {
        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            // Random position within this corner zone (in vw/vh)
            const xMin = corner.x[0] / 10;
            const xMax = corner.x[1] / 10;
            const yMin = corner.y[0] / 10;
            const yMax = corner.y[1] / 10;

            const x = xMin + Math.random() * (xMax - xMin);
            const y = yMin + Math.random() * (yMax - yMin);

            sparkle.style.left = x + 'vw';
            sparkle.style.top = y + 'vh';
            sparkle.style.setProperty('--duration', (1 + Math.random() * 2) + 's');
            sparkle.style.setProperty('--delay', (Math.random() * 3) + 's');

            // Vary sizes
            const size = 3 + Math.random() * 6;
            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';

            document.body.appendChild(sparkle);
        }
    });
});
