import React, { useEffect, useRef } from 'react';
import './InteractivePricingSection.css';

const InteractivePricingSection = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const leftCardRef = useRef(null);
    const isHoverLeftRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        let animationFrameId;
        let particles = [];
        let targetPoints = [];

        let width = window.innerWidth;
        let height = 700;

        const initParticles = () => {
            if (!containerRef.current) return;
            width = containerRef.current.clientWidth;
            height = containerRef.current.clientHeight || 700;
            canvas.width = width;
            canvas.height = height;

            // Offscreen canvas for `{  }` 
            const offscreen = document.createElement('canvas');
            offscreen.width = width;
            offscreen.height = height;
            const offCtx = offscreen.getContext('2d', { willReadFrequently: true });

            let cardCenterX = width * 0.3;
            let cardCenterY = height / 2.2;
            if (leftCardRef.current) {
                const rect = leftCardRef.current.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();
                cardCenterX = rect.left - containerRect.left + rect.width / 2;
                cardCenterY = rect.top - containerRect.top + rect.height / 2;
            }

            offCtx.font = '200 600px system-ui, -apple-system, sans-serif';
            offCtx.fillStyle = 'black';
            offCtx.textAlign = 'center';
            offCtx.textBaseline = 'middle';
            // Brackets further apart
            offCtx.fillText('{', cardCenterX - 260, cardCenterY - 40);
            offCtx.fillText('}', cardCenterX + 260, cardCenterY - 40);

            const imageData = offCtx.getImageData(0, 0, width, height).data;
            targetPoints = [];
            for (let y = 0; y < height; y += 9) {
                for (let x = 0; x < width; x += 9) {
                    const alpha = imageData[(y * width + x) * 4 + 3];
                    if (alpha > 128) {
                        targetPoints.push({ x, y, isTarget: true });
                    }
                }
            }

            const numParticles = 4000;
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                const isShape = i < targetPoints.length;
                let targetPos = isShape ? targetPoints[i] : null;

                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    baseX: Math.random() * width,
                    baseY: Math.random() * height,
                    targetX: targetPos ? targetPos.x : Math.random() * width,
                    targetY: targetPos ? targetPos.y : Math.random() * height,
                    isShape: isShape,
                    vx: 0,
                    vy: 0,
                    size: Math.random() * 1.2 + 0.8,
                    colorRandomizer: Math.random()
                });
            }
        };

        // Delay init slightly so layout completes
        const timer = setTimeout(initParticles, 100);

        const handleResize = () => {
            initParticles();
        };

        window.addEventListener('resize', handleResize);

        let mouse = { x: -1000, y: -1000 };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };
        const handleMouseLeave = () => {
            mouse = { x: -1000, y: -1000 };
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Re-check width safely
            if (!containerRef.current) return;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                let tx = p.baseX;
                let ty = p.baseY;

                const hovering = isHoverLeftRef.current;

                if (hovering && p.isShape) {
                    tx = p.targetX;
                    ty = p.targetY;
                }

                const dx = tx - p.x;
                const dy = ty - p.y;

                // Repel from mouse - creates small void/design
                const dMouseX = p.x - mouse.x;
                const dMouseY = p.y - mouse.y;
                const distMouse = Math.sqrt(dMouseX * dMouseX + dMouseY * dMouseY);
                let forceX = 0;
                let forceY = 0;

                if (distMouse < 150) {
                    const force = (150 - distMouse) / 150;
                    forceX = (dMouseX / distMouse) * force * 15;
                    forceY = (dMouseY / distMouse) * force * 15;
                }

                // Spring physics
                const spring = (hovering && p.isShape) ? 0.08 : 0.02;
                const drag = (hovering && p.isShape) ? 0.75 : 0.90;

                p.vx = p.vx * drag + dx * spring + forceX;
                p.vy = p.vy * drag + dy * spring + forceY;

                p.x += p.vx;
                p.y += p.vy;

                // Add slight wandering to standard dots
                if (!hovering || !p.isShape) {
                    p.x += Math.sin(Date.now() * 0.001 + i) * 0.3;
                    p.y += Math.cos(Date.now() * 0.001 + i) * 0.3;
                }

                // Draw configuration
                if (hovering && p.isShape) {
                    // Make it vibrant blue #1a73e8
                    ctx.fillStyle = '#1a73e8';
                    ctx.globalAlpha = 1.0;
                } else {
                    // Small scattered colored dots inside white background
                    if (p.colorRandomizer > 0.99) {
                        ctx.fillStyle = '#ea4335'; // Red
                    } else if (p.colorRandomizer > 0.98) {
                        ctx.fillStyle = '#4285f4'; // Blue
                    } else if (p.colorRandomizer > 0.97) {
                        ctx.fillStyle = '#fbbc04'; // Yellow
                    } else {
                        ctx.fillStyle = '#9aa0a6'; // Gray
                    }
                    ctx.globalAlpha = 0.5;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="interactive-pricing-section" ref={containerRef}>
            <canvas ref={canvasRef} className="pricing-canvas"></canvas>

            <div className="pricing-grid">
                <div
                    className="pricing-card"
                    ref={leftCardRef}
                    style={{ minHeight: '300px' }}
                    onMouseEnter={() => { isHoverLeftRef.current = true; }}
                    onMouseLeave={() => { isHoverLeftRef.current = false; }}
                >
                </div>

                <div className="pricing-card" style={{ minHeight: '300px' }}>
                </div>
            </div>
        </section>
    );
};

export default InteractivePricingSection;
