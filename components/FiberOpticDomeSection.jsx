import React, { useEffect, useRef } from 'react';
import './FiberOpticDomeSection.css';

const FiberOpticDomeSection = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight; // Take full viewport height for a grander look
        };
        window.addEventListener('resize', resize);
        resize();

        // --- Core Sphere Setup ---
        const coreDots = [];
        const latCountCore = 24;
        const lonCountCore = 48;
        const coreRadius = 100; // Radius of the central sphere

        // Create a full sphere for the core
        for (let lat = 0; lat <= latCountCore; lat++) {
            const phi = (lat / latCountCore) * Math.PI; // 0 to PI for full sphere
            for (let lon = 0; lon <= lonCountCore; lon++) {
                const theta = (lon / lonCountCore) * Math.PI * 2;
                coreDots.push({ theta, phi, radius: coreRadius });
            }
        }

        // --- Data Streams / Fibers Setup ---
        // These emanate from the sphere to an outer dome shell
        const fibers = [];
        const numFibers = 600;
        const domeOuterRadius = 450; // How far the lines reach

        for (let i = 0; i < numFibers; i++) {
            // Emitting primarily upwards and sideways to form a dome over the core
            const theta = Math.random() * Math.PI * 2;
            // Phi mostly upper hemisphere, maybe a bit below equator
            const phi = Math.random() * (Math.PI / 1.5);

            const isReceiving = Math.random() > 0.5; // Flow out or flow in?

            fibers.push({
                theta,
                phi,
                length: domeOuterRadius,
                particlePhase: Math.random() * Math.PI * 2,
                particleSpeed: 0.003 + Math.random() * 0.006,
                isReceiving,
                pulseSpeed: 0.02 + Math.random() * 0.05
            });
        }

        let time = 0;

        const render = () => {
            time += 0.01;

            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2 + 150; // Center the dome base

            // Core rotation
            const rotY = time * 0.2;

            // 3D Projection
            const project = (x, y, z) => {
                // Y rotation
                let rx = x * Math.cos(rotY) + z * Math.sin(rotY);
                let rz = -x * Math.sin(rotY) + z * Math.cos(rotY);

                // Slight X rotation (tilt down)
                const tilt = -0.2;
                let ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
                rz = y * Math.sin(tilt) + rz * Math.cos(tilt);

                const fov = 700;
                const distance = 900;
                const scale = fov / (fov + distance + rz);

                return {
                    x: centerX + rx * scale,
                    y: centerY - ry * scale,
                    scale: scale,
                    z: rz
                };
            };

            ctx.globalCompositeOperation = 'screen';

            // 1. Draw Fibers and Data Streams
            fibers.forEach(f => {
                // Start exactly at the surface of the core
                const px0 = coreRadius * Math.sin(f.phi) * Math.cos(f.theta);
                const py0 = coreRadius * Math.cos(f.phi);
                const pz0 = coreRadius * Math.sin(f.phi) * Math.sin(f.theta);

                // End at the outer dome perimeter
                const px2 = f.length * Math.sin(f.phi) * Math.cos(f.theta);
                const py2 = f.length * Math.cos(f.phi);
                const pz2 = f.length * Math.sin(f.phi) * Math.sin(f.theta);

                // Control point pushes the curve outwards and down for the dome 'umbrella' effect
                const baseCtrlDist = coreRadius + (f.length - coreRadius) * 0.3;
                const ctrlPhi = f.phi + 0.4; // Push outward
                const px1 = baseCtrlDist * Math.sin(ctrlPhi) * Math.cos(f.theta);
                const py1 = baseCtrlDist * Math.cos(ctrlPhi) - 50;
                const pz1 = baseCtrlDist * Math.sin(ctrlPhi) * Math.sin(f.theta);

                const proj0 = project(px0, py0, pz0);
                const proj1 = project(px1, py1, pz1);
                const proj2 = project(px2, py2, pz2);

                if (proj0.z > -800 && proj2.z > -800) {

                    // The glowing connection line
                    ctx.beginPath();
                    ctx.moveTo(proj0.x, proj0.y);
                    ctx.quadraticCurveTo(proj1.x, proj1.y, proj2.x, proj2.y);
                    ctx.strokeStyle = `rgba(40, 90, 220, ${0.08 + (Math.sin(time + f.particlePhase) / 2 + 0.5) * 0.15})`;
                    ctx.lineWidth = 1 * proj2.scale;
                    ctx.stroke();

                    // Endpoint dot (outer shell)
                    const pulse = Math.sin(time * f.pulseSpeed * 10 + f.particlePhase);
                    ctx.beginPath();
                    ctx.arc(proj2.x, proj2.y, 1.5 * proj2.scale, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(130, 200, 255, ${0.1 + pulse * 0.5})`;
                    ctx.fill();

                    // Data stream particle (moves along quadratic curve)
                    let t = ((time * f.particleSpeed) + f.particlePhase) % 1;
                    if (f.isReceiving) {
                        t = 1 - t; // Reverse direction (flowing inwards)
                    }

                    const t1 = 1 - t;
                    const travelingX = t1 * t1 * proj0.x + 2 * t1 * t * proj1.x + t * t * proj2.x;
                    const travelingY = t1 * t1 * proj0.y + 2 * t1 * t * proj1.y + t * t * proj2.y;

                    // Glowing particle effect
                    ctx.beginPath();
                    ctx.arc(travelingX, travelingY, 1.5 * proj2.scale, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; // Bright white core
                    ctx.fill();

                    // Particle halo
                    ctx.beginPath();
                    ctx.arc(travelingX, travelingY, 3.5 * proj2.scale, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(100, 180, 255, 0.4)'; // Blue halo
                    ctx.fill();
                }
            });

            // 2. Draw Core Sphere Dots
            const projectedCore = coreDots.map(dot => {
                const x = dot.radius * Math.sin(dot.phi) * Math.cos(dot.theta);
                const y = dot.radius * Math.cos(dot.phi);
                const z = dot.radius * Math.sin(dot.phi) * Math.sin(dot.theta);
                return project(x, y, z);
            });

            // Sort core dots by depth (painter's algorithm)
            projectedCore.sort((a, b) => b.z - a.z);

            ctx.globalCompositeOperation = 'source-over';

            projectedCore.forEach(p => {
                let opacity = 0.9;
                // Fade out dots on the far side of the sphere to give 3D volume
                if (p.z > 0) opacity = Math.max(0.1, 0.9 - (p.z / 150));

                ctx.beginPath();
                ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);

                const radGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 4 * p.scale);
                radGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
                radGradient.addColorStop(0.4, `rgba(50, 150, 255, ${opacity * 0.8})`);
                radGradient.addColorStop(1, `rgba(0, 50, 255, 0)`);

                ctx.fillStyle = radGradient;
                ctx.fill();

                // Core inner bright speck
                ctx.beginPath();
                ctx.arc(p.x, p.y, 0.8 * p.scale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(230, 245, 255, ${opacity})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="fiber-optic-section">
            <canvas ref={canvasRef} className="fiber-optic-canvas" />
        </section>
    );
};

export default FiberOpticDomeSection;
