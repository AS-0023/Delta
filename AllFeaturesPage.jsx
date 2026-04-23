import React, { useState, useEffect, useRef } from 'react';
import './AllFeaturesPage.css';
import AllFeaturesGrid from './components/AllFeaturesGrid';

const AllFeaturesPage = () => {
    // 1. Word-by-Word Typing Effect
    const fullText = "AII FEATURES";
    const words = fullText.split(' ');

    // We will track how many words are currently displayed
    const [displayedWordsCount, setDisplayedWordsCount] = useState(0);

    useEffect(() => {
        const wordDelay = 250; // ms per word (adjust for speed)

        const intervalId = setInterval(() => {
            setDisplayedWordsCount(prevCount => {
                if (prevCount < words.length) {
                    return prevCount + 1;
                } else {
                    clearInterval(intervalId);
                    return prevCount;
                }
            });
        }, wordDelay);

        return () => clearInterval(intervalId);
    }, [words.length]);

    // Format text to break appropriately like the screenshot (after "the")
    const renderTypingText = () => {
        const currentWords = words.slice(0, displayedWordsCount);

        // Find split point ("the" is the 4th word, index 3)
        const breakIndex = 4;

        if (currentWords.length <= breakIndex) {
            return <span>{currentWords.join(' ')}</span>;
        } else {
            const firstLine = currentWords.slice(0, breakIndex).join(' ');
            const secondLine = currentWords.slice(breakIndex).join(' ');
            return (
                <>
                    <span>{firstLine}</span>
                    <br />
                    <span>{secondLine}</span>
                </>
            );
        }
    };

    // 2. Interactive Canvas Particle Engine (Antigravity Parallax 3D Swirl)
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width, height;
        const particles = [];
        const particleCount = 1800; // Increased number of dots for density

        const googleColors = ['#EA4335', '#4285F4', '#34A853', '#FBBC05'];

        // Math and Particle Setup
        const radiusBase = 450; // Base size of the sphere

        for (let i = 0; i < particleCount; i++) {
            // Golden spiral algorithm for even distribution across the sphere surface
            const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;

            // Randomly push some particles deeper or shallower to create a cloud, not just a thin shell
            const radiusOffset = (Math.random() * 250) - 100;
            const r = radiusBase + radiusOffset;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.cos(phi);
            const z = r * Math.sin(phi) * Math.sin(theta);

            // Create an organic "dash" shape swirling along the latitude (theta tangent)
            // This gives it the vortex/swirl appearance of antigravity.google
            const tx = -1 * Math.sin(theta);
            const ty = 0;
            const tz = Math.cos(theta);

            // How long the dash is
            const dashScale = 15 + Math.random() * 20;

            particles.push({
                x, y, z,
                color: googleColors[Math.floor(Math.random() * googleColors.length)],
                size: 1.0 + Math.random() * 2.5 // Dot size
            });
        }

        // State for Parallax rotation
        let targetRotX = 0;
        let targetRotY = 0;
        let currentRotX = 0;
        let currentRotY = 0;
        let globalSwirlAngle = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            // High DPI support for smooth lines
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener('resize', resize);

        window.addEventListener('mousemove', (e) => {
            // Normalize mouse from [-1, 1] relative to center
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;

            // Max tilt angles: ~25 degrees (0.4 radians)
            targetRotY = nx * 0.45;
            targetRotX = -ny * 0.45; // Invert Y to "look" towards the mouse
        });

        const animate = () => {
            // Clean up exact white background
            ctx.clearRect(0, 0, width, height);

            // Increment the background auto-rotation
            globalSwirlAngle += 0.0015;

            // Ease the parallax tracking for smooth motion
            currentRotX += (targetRotX - currentRotX) * 0.05;
            currentRotY += (targetRotY - currentRotY) * 0.05;

            const cx = width / 2;
            const cy = height / 2;

            // Project a 3D coordinate directly to 2D screen space
            const project = (px, py, pz) => {
                // 1. Swirl (Auto Rotation around Y axis)
                let rx = px * Math.cos(globalSwirlAngle) + pz * Math.sin(globalSwirlAngle);
                let ry = py;
                let rz = -px * Math.sin(globalSwirlAngle) + pz * Math.cos(globalSwirlAngle);

                // 2. Parallax left/right tilt (Rotation around Y)
                let tx = rx * Math.cos(currentRotY) + rz * Math.sin(currentRotY);
                let trz = -rx * Math.sin(currentRotY) + rz * Math.cos(currentRotY);
                rx = tx;
                rz = trz;

                // 3. Parallax up/down tilt (Rotation around X)
                let try_val = ry * Math.cos(currentRotX) - rz * Math.sin(currentRotX);
                let trz2 = ry * Math.sin(currentRotX) + rz * Math.cos(currentRotX);
                ry = try_val;
                rz = trz2;

                // 4. Perspective Projection
                const fov = 1000;
                const distance = 1200; // How far the camera is from the center

                const scale = fov / (fov + distance + rz);

                return {
                    scrX: cx + rx * scale,
                    scrY: cy + ry * scale,
                    scale: scale,
                    z: rz
                };
            };

            // Map standard particles to 2D space
            const projectedDots = particles.map(p => {
                return {
                    ...p,
                    p1: project(p.x, p.y, p.z)
                };
            });

            // Painter's algorithm: sort back to front by Z depth
            projectedDots.sort((a, b) => b.p1.z - a.p1.z);

            // Draw all dots
            projectedDots.forEach(dot => {
                // Dim particles on the back side of the sphere to give 3D depth
                let opacity = 0.9;
                if (dot.p1.z > 0) {
                    opacity = Math.max(0.1, 0.9 - (dot.p1.z / 600));
                }

                ctx.beginPath();
                const radius = dot.size * dot.p1.scale;
                ctx.arc(dot.p1.scrX, dot.p1.scrY, radius, 0, Math.PI * 2);
                ctx.fillStyle = dot.color;
                ctx.globalAlpha = opacity;
                ctx.fill();
            });

            ctx.globalAlpha = 1.0;

            animationFrameId = requestAnimationFrame(animate);
        };

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="features-page-viewport">
            <div className="features-page-container">
                {/* Interactive Canvas Background */}
                <canvas ref={canvasRef} className="interactive-particles-canvas"></canvas>

                {/* Foreground Content */}
                <div className="hero-content-wrapper">
                    <h1 className="hero-typing-title">
                        {renderTypingText()}
                        <span className={`typing-cursor ${displayedWordsCount < words.length ? 'is-typing' : 'is-blinking'}`}></span>
                    </h1>
                </div>
            </div>

            {/* Premium Features Grid (Added below animation) */}
            <AllFeaturesGrid />
        </div>
    );
};

export default AllFeaturesPage;
