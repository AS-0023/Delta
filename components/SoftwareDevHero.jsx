import React, { useState, useEffect, useRef } from 'react';
import './SoftwareDevHero.css';

const SoftwareDevHero = () => {
    const canvasRef = useRef(null);
    const [text, setText] = useState('');
    const fullText = "SOFTWARE DEVELOPMENT TEMPLATES";
    const [showCursor, setShowCursor] = useState(true);

    // Typing effect
    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            setText(fullText.slice(0, i + 1));
            i++;
            if (i >= fullText.length) {
                clearInterval(typingInterval);
            }
        }, 75);
        return () => clearInterval(typingInterval);
    }, []);

    // Cursor blink
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    // 3D Canvas rendering
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const particles = [];
        const numLat = 80; // Density rings
        const numLon = 160;

        for (let i = 0; i <= numLat; i++) {
            const lat = (i * Math.PI) / numLat;
            // Distribute points evenly on the sphere by reducing counts at poles
            const currentLonCount = Math.floor(numLon * Math.sin(lat)) || 1;
            for (let j = 0; j < currentLonCount; j++) {
                const lon = (j * 2 * Math.PI) / currentLonCount;
                particles.push({ lat, lon });
            }
        }

        let angleY = 0;
        let angleX = 0;
        let time = 0;

        const animate = () => {
            ctx.fillStyle = '#020012'; // Deep navy/dark background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width * 0.5;
            const centerY = canvas.height * 0.5;
            const fov = 700;
            const viewerDistance = 1000;

            angleY += 0.003;
            angleX += 0.001;
            time += 0.015; // Speed of the ripples

            const pointsToDraw = [];

            particles.forEach(p => {
                const lat = p.lat;
                const lon = p.lon;

                // Base radius
                let r = 160;

                // Organic wave/undulation
                // Mix 3 different sine waves for complex organic motion
                const w1 = Math.sin(lat * 5 + time) * 12;
                const w2 = Math.cos(lon * 4 - time) * 12;
                const w3 = Math.sin((lat + lon) * 6 + time * 1.5) * 8;
                r += w1 + w2 + w3;

                // 3D Cartesian coordinates
                let x = r * Math.sin(lat) * Math.cos(lon);
                let y = r * Math.sin(lat) * Math.sin(lon);
                let z = r * Math.cos(lat);

                // Rotate Y
                const cosY = Math.cos(angleY);
                const sinY = Math.sin(angleY);
                let x1 = x * cosY - z * sinY;
                let z1 = x * sinY + z * cosY;
                let y1 = y;

                // Rotate X
                const cosX = Math.cos(angleX);
                const sinX = Math.sin(angleX);
                let y2 = y1 * cosX - z1 * sinX;
                let z2 = y1 * sinX + z1 * cosX;

                // Add slight tilt Z
                const tiltZ = Math.PI / 8;
                const cosZ = Math.cos(tiltZ);
                const sinZ = Math.sin(tiltZ);
                const fx = x1 * cosZ - y2 * sinZ;
                const fy = x1 * sinZ + y2 * cosZ;
                const fz = z2;

                pointsToDraw.push({ x: fx, y: fy, z: fz });
            });

            // Sort by depth (Z-index back to front)
            pointsToDraw.sort((a, b) => b.z - a.z);

            pointsToDraw.forEach(p => {
                // 3D Projection
                const scale = fov / (viewerDistance + p.z);
                const projX = p.x * scale + centerX;
                const projY = p.y * scale + centerY;

                // Gradient logic: Magic gradient from Cyan to Magenta
                // Based purely on screen coordinates
                let normalizedX = (p.x + 200) / 400;
                let normalizedY = (p.y + 200) / 400;

                // Clamp
                normalizedX = Math.max(0, Math.min(1, normalizedX));
                normalizedY = Math.max(0, Math.min(1, normalizedY));

                // Diagonal mix: top-right cyan (1), bottom-left magenta (0)
                const mix = (normalizedX + (1 - normalizedY)) / 2; // 0 to 1

                // Cyan is ~ (0, 255, 255) -> mix = 1
                // Magenta is ~ (255, 0, 255) -> mix = 0
                const rCol = Math.floor(255 * (1 - mix));
                const gCol = Math.floor(255 * mix);
                const bCol = 255;

                // Fade alpha based on Z for depth
                const depthAlpha = Math.max(0.1, 1 - (p.z + 200) / 400);
                const alpha = depthAlpha * 0.8;

                if (alpha > 0.05) {
                    ctx.beginPath();
                    // point size
                    const size = 1.0 * scale;
                    ctx.arc(projX, projY, size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${rCol}, ${gCol}, ${bCol}, ${alpha})`;
                    ctx.fill();

                    // Add glow for particles strongly facing us
                    if (alpha > 0.6 && p.z < -50) {
                        ctx.shadowBlur = 4;
                        ctx.shadowColor = `rgba(${rCol}, ${gCol}, ${bCol}, 0.8)`;
                        ctx.fill();
                        ctx.shadowBlur = 0;
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="sd-hero-container">
            <canvas ref={canvasRef} className="sd-hero-canvas" />

            <div className="sd-hero-content">
                <h1 className="sd-hero-title">
                    {text}
                    <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
                </h1>
            </div>
        </div>
    );
};

export default SoftwareDevHero;
