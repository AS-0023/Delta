import React, { useState, useEffect, useRef } from 'react';
import './AntigravityHero.css';

const AntigravityHero = () => {
    // Canvas Parallax Particle Engine
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width, height;
        const particles = [];
        const particleCount = 600; // Dense starfield

        // Use mostly blues to match the provided screenshot
        const particleColors = ['#4285F4', '#8ab4f8', '#aecbfa', '#e8f0fe', '#5f6368'];

        // Base sphere layout
        const radiusBase = 600;

        for (let i = 0; i < particleCount; i++) {
            const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;

            const radiusOffset = (Math.random() * 400) - 100; // Deep spatial field
            const r = radiusBase + radiusOffset;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.cos(phi);
            const z = r * Math.sin(phi) * Math.sin(theta);

            // Vector along the latitude for dash effect
            const tx = -1 * Math.sin(theta);
            const ty = 0;
            const tz = Math.cos(theta);

            // Length of the lines/dashes
            const dashScale = 12 + Math.random() * 25;

            const px2 = x + tx * dashScale;
            const py2 = y + ty * dashScale;
            const pz2 = z + tz * dashScale;

            particles.push({
                x, y, z,
                px2, py2, pz2,
                color: particleColors[Math.floor(Math.random() * particleColors.length)],
                size: 1 + Math.random() * 1.5
            });
        }

        let targetRotX = 0;
        let targetRotY = 0;
        let currentRotX = 0;
        let currentRotY = 0;
        let globalSwirlAngle = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);

        // Global mouse movement listener tracking
        const handleMouseMove = (e) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;

            targetRotY = nx * 0.45;
            targetRotX = -ny * 0.45;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Slow constant rotation
            globalSwirlAngle += 0.001;

            currentRotX += (targetRotX - currentRotX) * 0.04;
            currentRotY += (targetRotY - currentRotY) * 0.04;

            const cx = width / 2;
            const cy = height / 2;

            const project = (px, py, pz) => {
                let rx = px * Math.cos(globalSwirlAngle) + pz * Math.sin(globalSwirlAngle);
                let ry = py;
                let rz = -px * Math.sin(globalSwirlAngle) + pz * Math.cos(globalSwirlAngle);

                let tx = rx * Math.cos(currentRotY) + rz * Math.sin(currentRotY);
                let trz = -rx * Math.sin(currentRotY) + rz * Math.cos(currentRotY);
                rx = tx;
                rz = trz;

                let try_val = ry * Math.cos(currentRotX) - rz * Math.sin(currentRotX);
                let trz2 = ry * Math.sin(currentRotX) + rz * Math.cos(currentRotX);
                ry = try_val;
                rz = trz2;

                const fov = 1000;
                const distance = 1400;

                const scale = fov / (fov + distance + rz);

                return {
                    scrX: cx + rx * scale,
                    scrY: cy + ry * scale,
                    scale: scale,
                    z: rz
                };
            };

            const projectedLines = particles.map(p => ({
                ...p,
                p1: project(p.x, p.y, p.z),
                p2: project(p.px2, p.py2, p.pz2)
            })).sort((a, b) => b.p1.z - a.p1.z); // Depth sorting

            projectedLines.forEach(line => {
                let opacity = 0.9;
                if (line.p1.z > 0) opacity = Math.max(0.05, 0.9 - (line.p1.z / 800));

                ctx.beginPath();
                ctx.moveTo(line.p1.scrX, line.p1.scrY);
                ctx.lineTo(line.p2.scrX, line.p2.scrY);
                ctx.strokeStyle = line.color;
                ctx.lineWidth = line.size * line.p1.scale;
                ctx.lineCap = 'round';
                ctx.globalAlpha = opacity;
                ctx.stroke();
            });

            ctx.globalAlpha = 1.0;
            animationFrameId = requestAnimationFrame(animate);
        };

        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="antigravity-hero dark-theme">
            {/* Dark Parallax Canvas Background */}
            <canvas ref={canvasRef} className="particles-canvas-bg"></canvas>

            <div className="hero-content-wrapper-left">
                <h1 className="hero-dark-title">
                    Download Google <br />
                    Antigravity for <br />
                    Windows <span className="typing-cursor is-blinking"></span>
                </h1>

                <div className="action-buttons-dark">
                    <button className="btn-light-capsule">
                        Download for x64
                    </button>
                    <button className="btn-dark-capsule">
                        Download for ARM64
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AntigravityHero;
