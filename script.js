document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    const links = document.querySelectorAll('.navbar ul li a');

    window.addEventListener('scroll', function() {
        const scrollPercentage = (document.documentElement.scrollTop + window.innerHeight) / document.documentElement.scrollHeight;

        // Calculate color index based on scroll percentage
        const colorIndex = Math.floor(scrollPercentage * 6); // 6 colors

        // Apply background color to body
        const backgroundColor = getColorByIndex(colorIndex);
        body.style.backgroundColor = backgroundColor;

        // Apply complementary text color
        const complementaryColor = getComplementaryColor(backgroundColor);
        navbar.style.backgroundColor = backgroundColor;
        navbar.style.color = complementaryColor;
        links.forEach(link => {
            link.style.color = complementaryColor;
            link.addEventListener('mouseover', () => {
                if (backgroundColor === '#ffffff') {
                    link.style.color = '#000000'; // Black text on white background
                } else {
                    link.style.color = '#ffffff'; // White text on other backgrounds
                }
            });
            link.addEventListener('mouseout', () => {
                link.style.color = complementaryColor; // Revert to original color
            });
        });
    });

    function getColorByIndex(index) {
        switch (index) {
            case 0: return '#ff6347'; // Red
            case 1: return '#ffbb00'; // Yellow
            case 2: return '#00ff00'; // Green
            case 3: return '#1e90ff'; // Blue
            case 4: return '#ff69b4'; // Pink
            case 5: return '#a0522d'; // Brown
            default: return '#ffffff'; // White (fallback)
        }
    }

    function getComplementaryColor(hexColor) {
        // Convert hex color to RGB
        const rgb = hexToRgb(hexColor);

        // Calculate inverted RGB values
        const invertedRgb = {
            r: 255 - rgb.r,
            g: 255 - rgb.g,
            b: 255 - rgb.b
        };

        // Convert RGB back to hex
        const invertedHex = rgbToHex(invertedRgb.r, invertedRgb.g, invertedRgb.b);

        return invertedHex;
    }

    function hexToRgb(hex) {
        // Remove '#' if present
        hex = hex.replace(/^#/, '');

        // Convert hex to RGB
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return { r, g, b };
    }

    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
});
