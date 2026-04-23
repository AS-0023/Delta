import React, { useEffect, useRef } from 'react';
import './AnoryxNetworkSection.css';

const AnoryxNetworkSection = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false });
        let width, height;
        let animationFrameId;

        const numParticles = 200;
        const particles = [];
        const connectionDistance = 300;

        const setSize = () => {
            width = window.innerWidth;
            height = window.innerHeight > 800 ? window.innerHeight : 800;
            canvas.width = width;
            canvas.height = height;
        };

        const initParticles = () => {
            particles.length = 0;
            for (let i = 0; i < numParticles; i++) {
                // Determine a random point in a spherical shell, excluding the center
                let r = 250 + Math.random() * 800;
                let theta = Math.random() * 2 * Math.PI;
                let phi = Math.acos(2 * Math.random() - 1);

                let x = r * Math.sin(phi) * Math.cos(theta);
                let y = r * Math.sin(phi) * Math.sin(theta);
                let z = r * Math.cos(phi);

                particles.push({
                    x, y, z,
                    // gentle drift in 3D
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    vz: (Math.random() - 0.5) * 1.5,
                    size: Math.random() * 2.5 + 1.0
                });
            }
        };

        window.addEventListener('resize', setSize);
        setSize();
        initParticles();

        let angleY = 0;
        let angleX = 0;
        let time = 0;

        // Mouse interaction for parallax effect
        let targetAngleX = 0;
        let targetAngleY = 0;
        const handleMouseMove = (e) => {
            const cx = width / 2;
            const cy = height / 2;
            targetAngleY = (e.clientX - cx) * 0.0004;
            targetAngleX = (e.clientY - cy) * 0.0004;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const project = (x, y, z) => {
            const focalLength = 1100;
            const cz = z + 1200; // Push camera back for perspective
            if (cz <= 0) return null;
            const scale = focalLength / cz;
            return {
                x: x * scale + width / 2,
                y: y * scale + height / 2,
                scale,
                z: cz
            };
        };

        const render = () => {
            // Draw deep dark blue background gradient
            const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.8);
            gradient.addColorStop(0, '#021D49'); // Deep dark blue in center
            gradient.addColorStop(1, '#000A15'); // Very dark blue at edges
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            time += 0.015;

            // Gently rotate scene towards mouse position with easing
            angleY += (targetAngleY - angleY) * 0.05 + 0.001; // constant slow base rotation
            angleX += (targetAngleX - angleX) * 0.05;

            // Project all particles to 2D screen space
            const projected = [];
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.z += p.vz;

                // Bounce off an invisible outer sphere boundary to keep them contained
                let rSq = p.x * p.x + p.y * p.y + p.z * p.z;
                if (rSq > 1100 * 1100 || rSq < 200 * 200) {
                    p.vx *= -1;
                    p.vy *= -1;
                    p.vz *= -1;
                }

                // Apply Rotations
                let x1 = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
                let z1 = p.z * Math.cos(angleY) + p.x * Math.sin(angleY);
                let y1 = p.y;

                let y2 = y1 * Math.cos(angleX) - z1 * Math.sin(angleX);
                let z2 = z1 * Math.cos(angleX) + y1 * Math.sin(angleX);
                let x2 = x1;

                let proj = project(x2, y2, z2);
                if (proj) {
                    projected.push({
                        ...proj,
                        originalIndex: i,
                        origX: x2,
                        origY: y2,
                        origZ: z2,
                        size: p.size
                    });
                }
            }

            // Draw Plexus connections
            ctx.lineWidth = 0.6;
            for (let i = 0; i < projected.length; i++) {
                let p1 = projected[i];
                for (let j = i + 1; j < projected.length; j++) {
                    let p2 = projected[j];

                    // compute true distance in 3D to maintain consistent connection length without stretching
                    let dx = p1.origX - p2.origX;
                    let dy = p1.origY - p2.origY;
                    let dz = p1.origZ - p2.origZ;
                    let distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq < connectionDistance * connectionDistance) {
                        let dist = Math.sqrt(distSq);
                        let alpha = 1 - (dist / connectionDistance);

                        // Fading out lines deeper into the background (depth of field simulation)
                        let avgDepth = (p1.z + p2.z) / 2;
                        let depthAlpha = Math.max(0, 1 - (avgDepth - 800) / 1200);

                        let finalAlpha = alpha * depthAlpha * 0.7; // 0.7 max brightness

                        if (finalAlpha > 0.05) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(74, 144, 226, ${finalAlpha})`; // Blue plexus lines
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    }
                }
            }

            // Draw Parallax Particles (stars)
            for (let i = 0; i < projected.length; i++) {
                let p = projected[i];
                let depthAlpha = Math.max(0, 1 - (p.z - 800) / 1200);
                if (depthAlpha > 0.05) {
                    ctx.beginPath();
                    // Optional: Make closer particles slightly larger using p.scale
                    ctx.arc(p.x, p.y, Math.max(0.5, p.size * p.scale), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.9})`; // White/blue-ish stars
                    ctx.fill();

                    // Add subtle glow to individual stars
                    if (p.size * p.scale > 2) {
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = '#00F2FE';
                        ctx.fill();
                        ctx.shadowBlur = 0;
                    }
                }
            }

            // === Draw Center Static Elements ===
            const cx = width / 2;
            const cy = height / 2;
            const baseCircleRadius = 160; // Size to encompass ANORYX text

            // Subtle fast pulsating rhythm
            const pulse = 1 + Math.sin(time * 3.5) * 0.02;
            const circleRadius = baseCircleRadius * pulse;

            ctx.shadowBlur = 40;
            ctx.shadowColor = '#00F2FE';

            // 1. Primary glowing neon ring
            ctx.beginPath();
            ctx.arc(cx, cy, circleRadius, 0, Math.PI * 2);
            ctx.strokeStyle = '#00F2FE';
            ctx.lineWidth = 4;
            ctx.stroke();

            // 2. Faint Inner glow ring
            ctx.beginPath();
            ctx.arc(cx, cy, circleRadius - 8, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(79, 172, 254, 0.5)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // 3. Very subtle and slightly scattered outer ring
            ctx.beginPath();
            ctx.arc(cx, cy, circleRadius + 15, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(79, 172, 254, 0.2)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.shadowBlur = 0; // reset shadows

            // 4. Tiny orbiting "data" particles swirling intimately around the central ring
            const numRingParticles = 80;
            ctx.fillStyle = '#FFFFFF';
            for (let i = 0; i < numRingParticles; i++) {
                // Different speeds and directions based on index
                let speedFactor = i % 2 === 0 ? 1 : -0.7;
                let angle = i * (Math.PI * 2 / numRingParticles) + time * 0.8 * speedFactor;

                // Add an oscillating wobble to their radius
                let rOffset = Math.sin(time * 3 + i) * 15;
                let r = circleRadius + 15 + rOffset + Math.abs(Math.cos(i) * 25);

                let px = cx + Math.cos(angle) * r;
                let py = cy + Math.sin(angle) * r;

                // Add a bright dot and a glowing aura
                ctx.beginPath();
                ctx.arc(px, py, 1.5, 0, Math.PI * 2);
                let shimmeringAlpha = 0.4 + Math.sin(time * 5 + i) * 0.5; // Shimmer effect
                ctx.fillStyle = `rgba(0, 242, 254, ${Math.max(0, shimmeringAlpha)})`;
                ctx.fill();

                // Extra glow context just for these
                ctx.shadowBlur = 6;
                ctx.shadowColor = '#ffffff';
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', setSize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="anoryx-network-section">
            <canvas ref={canvasRef} className="anoryx-network-canvas" />
            <div className="anoryx-content-overlay">
                <h1 className="anoryx-center-text">ANORYX</h1>
            </div>
        </section>
    );
};

export default AnoryxNetworkSection;
