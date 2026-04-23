import React, { useRef, useEffect } from 'react';
import './ComplexNetworkSection.css';

const ComplexNetworkSection = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        let raf;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', handleResize);

        // Core Configuration for the specific mandala shape
        const SPIKES = 16;
        const SLICE_ANGLE = (2 * Math.PI) / SPIKES;
        const LAYERS = 12;

        const baseNodes = [];
        const dataBursts = []; // Particles travelling along the lines
        const ambientDust = []; // Bokeh floating particles

        const getBaseMaxRadius = () => Math.min(width, height) * 0.42;

        // Generate ambient dust for realistic "camera" feel
        for (let i = 0; i < 150; i++) {
            ambientDust.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * 2 + 0.1, // depth
                speedY: -Math.random() * 0.3 - 0.1,
                speedX: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 2.5 + 0.5,
                alpha: Math.random() * 0.5
            });
        }

        // Generate the 3D-like geometric nodes
        for (let layer = 1; layer <= LAYERS; layer++) {
            const rProgress = layer / LAYERS;

            for (let i = 0; i < SPIKES; i++) {
                let rMultiplier = 1;
                if (rProgress > 0.4) {
                    rMultiplier = (i % 2 === 0) ? 1 + (rProgress * 0.4) : 1 - (rProgress * 0.2);
                }

                const baseR = rProgress * 1.0 * rMultiplier;
                const theta = i * SLICE_ANGLE;

                // Add depth to nodes to simulate 3D rotation
                const zDepth = layer === 1 ? 0 : Math.sin(layer * 0.5) * 0.2;

                baseNodes.push({
                    id: baseNodes.length,
                    rPercent: baseR,
                    theta: theta,
                    speed: 0.2,
                    amp: 0.02 * rProgress,
                    phase: i + layer,
                    size: rProgress > 0.8 ? 2 : 1.2,
                    isMain: true,
                    layerDepth: zDepth
                });

                if (layer > 2 && layer < LAYERS) {
                    const interR = baseR * 0.85;
                    const interTheta = theta + (SLICE_ANGLE / 2);
                    baseNodes.push({
                        id: baseNodes.length,
                        rPercent: interR,
                        theta: interTheta,
                        speed: 0.15,
                        amp: 0.015,
                        phase: i - layer,
                        size: 1,
                        isMain: false,
                        layerDepth: zDepth + 0.05
                    });

                    if (layer > 4 && layer < LAYERS - 2) {
                        const innerR = baseR * 0.95;
                        baseNodes.push({
                            id: baseNodes.length,
                            rPercent: innerR,
                            theta: theta + (SLICE_ANGLE * 0.25),
                            speed: 0.1,
                            amp: 0.01,
                            phase: layer * i,
                            size: 0.8,
                            isMain: false,
                            layerDepth: zDepth - 0.05
                        });
                        baseNodes.push({
                            id: baseNodes.length,
                            rPercent: innerR,
                            theta: theta + (SLICE_ANGLE * 0.75),
                            speed: 0.1,
                            amp: 0.01,
                            phase: layer * i + 1,
                            size: 0.8,
                            isMain: false,
                            layerDepth: zDepth - 0.05
                        });
                    }
                }
            }
        }

        let time = 0;

        const draw = () => {
            // Dark solid background
            ctx.fillStyle = '#05131f';
            ctx.fillRect(0, 0, width, height);

            // Add a cinematic center glow that pulses
            const pulse = Math.sin(time * 1.5) * 0.1 + 0.9;
            const bgGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.6 * pulse);
            bgGradient.addColorStop(0, 'rgba(12, 39, 56, 1)');
            bgGradient.addColorStop(1, 'rgba(5, 19, 31, 1)');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            time += 0.012; // Slow cinematic time

            // --- 1. Draw Background Ambient Dust (Bokeh) ---
            ambientDust.forEach(dust => {
                dust.x += dust.speedX;
                dust.y += dust.speedY;
                if (dust.y < -10) dust.y = height + 10;
                if (dust.x < -10) dust.x = width + 10;
                if (dust.x > width + 10) dust.x = -10;

                const bokehRadius = dust.size * (1 + Math.sin(time * 2 + dust.x));
                const alpha = dust.alpha * (Math.sin(time + dust.y * 0.01) * 0.5 + 0.5);

                ctx.beginPath();
                ctx.arc(dust.x, dust.y, bokehRadius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(100, 200, 255, ${alpha.toFixed(3)})`;
                ctx.fill();
            });

            const maxRadius = getBaseMaxRadius();

            // Transform base nodes into screen space
            const points = [];
            const globalRot = time * 0.05;

            // Simulate a slight 3D wobble/tilt in the entire structure
            const tiltX = Math.cos(time * 0.3) * 0.08;
            const tiltY = Math.sin(time * 0.4) * 0.05;

            for (let i = 0; i < baseNodes.length; i++) {
                const node = baseNodes[i];
                const currentR = maxRadius * (node.rPercent + node.amp * Math.sin(time * node.speed + node.phase));
                const currentTheta = node.theta + globalRot;

                // Basic 2D position
                let px = cx + currentR * Math.cos(currentTheta);
                let py = cy + currentR * Math.sin(currentTheta);

                // Add 3D parallax tilt based on node layer pseudo-depth
                px += tiltX * currentR * node.layerDepth * maxRadius * 0.01;
                py += tiltY * currentR * node.layerDepth * maxRadius * 0.01;

                points.push({
                    originalId: node.id,
                    x: px,
                    y: py,
                    radius: node.size,
                    isMain: node.isMain,
                    rPercent: node.rPercent
                });
            }

            // Connection phase & Data Bursts
            ctx.lineWidth = 0.5;
            const CONNECT_DIST = maxRadius * 0.28;
            const maxPoints = points.length;

            // Occasionally spawn a rapid "data burst" along a random valid connection
            if (Math.random() > 0.8 && dataBursts.length < 25) {
                const p1 = points[Math.floor(Math.random() * maxPoints)];
                // Create a burst that will find a target in the drawing loop
                dataBursts.push({
                    x: p1.x, y: p1.y,
                    targetX: p1.x, targetY: p1.y, // Will be updated
                    progress: 0,
                    life: 1,
                    speed: 0.05 + Math.random() * 0.1
                });
            }

            // Draw Lines and find targets for bursts
            for (let i = 0; i < maxPoints; i++) {
                const p1 = points[i];
                for (let j = i + 1; j < maxPoints; j++) {
                    const p2 = points[j];

                    if (Math.abs(p1.x - p2.x) > CONNECT_DIST) continue;
                    if (Math.abs(p1.y - p2.y) > CONNECT_DIST) continue;

                    const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                    if (d < CONNECT_DIST) {
                        // Dynamic line opacity simulating "energy flowing"
                        const energy = Math.sin(time * 4 - (p1.rPercent * 10)) * 0.5 + 0.5;
                        const baseAlpha = Math.pow(1 - (d / CONNECT_DIST), 1.5) * 0.4;
                        const finalAlpha = baseAlpha + (baseAlpha * energy * 0.6);

                        ctx.strokeStyle = `rgba(100, 200, 255, ${finalAlpha.toFixed(3)})`;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();

                        // Give a target to a waiting data burst
                        dataBursts.forEach(burst => {
                            if (burst.progress === 0 && Math.abs(burst.x - p1.x) < 1) {
                                burst.targetX = p2.x;
                                burst.targetY = p2.y;
                                burst.progress = 0.01; // start moving
                            }
                        });
                    }
                }
            }

            // Draw Data Bursts (shooting lights)
            for (let i = dataBursts.length - 1; i >= 0; i--) {
                const b = dataBursts[i];
                if (b.progress > 0) {
                    b.progress += b.speed;
                    const currentX = b.x + (b.targetX - b.x) * b.progress;
                    const currentY = b.y + (b.targetY - b.y) * b.progress;

                    // Draw glowing trail
                    ctx.beginPath();
                    ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = '#ffffff';
                    ctx.fill();
                    ctx.shadowBlur = 0; // reset
                }

                if (b.progress >= 1) {
                    dataBursts.splice(i, 1);
                }
            }

            // Draw the nodes (dots) on top of lines
            for (let i = 0; i < maxPoints; i++) {
                const p = points[i];
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

                // Pulsating brightness for nodes
                const nodePulse = Math.sin(time * 3 + p.originalId) * 0.3 + 0.7;

                if (p.isMain) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${nodePulse})`;
                    ctx.shadowBlur = 10 * nodePulse;
                    ctx.shadowColor = '#64c8ff';
                } else {
                    ctx.fillStyle = `rgba(140, 224, 255, ${nodePulse})`;
                    ctx.shadowBlur = 5 * nodePulse;
                    ctx.shadowColor = '#64c8ff';
                }

                ctx.fill();
            }
            ctx.shadowBlur = 0;

            // Top layer cinematic vignette to make it more like a video
            const vignette = ctx.createRadialGradient(cx, cy, maxRadius * 0.5, cx, cy, Math.max(width, height) * 0.8);
            vignette.addColorStop(0, 'rgba(0,0,0,0)');
            vignette.addColorStop(1, 'rgba(0,0,0,0.6)'); // darker edges
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, width, height);

            raf = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section className="complex-network-section">
            <canvas ref={canvasRef} className="complex-network-canvas" />
            <div className="complex-network-content">
                <h1 className="complex-network-title">AI FEATURE</h1>
                <p className="complex-network-subtitle">Next-Generation Neural Architecture</p>
            </div>
        </section>
    );
};

export default ComplexNetworkSection;
