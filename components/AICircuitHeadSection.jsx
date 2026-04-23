import React, { useRef, useEffect } from 'react';
import './AICircuitHeadSection.css';
import aiHeadImg from '../assets/ai_head_circuit.png';

const AICircuitHeadSection = () => {
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
            initPaths();
        };
        window.addEventListener('resize', handleResize);

        // Circuit Logic
        let paths = [];
        let pulses = [];

        const initPaths = () => {
            paths = [];
            const NUM_PATHS = Math.floor(width / 30); // scale paths to screen size

            for (let i = 0; i < NUM_PATHS; i++) {
                let startY = (Math.random() * 0.95 + 0.025) * height; // distributed across height
                let path = [{ x: -20, y: startY }];

                let cx = -20;
                let cy = startY;
                let targetX = width * 0.65 + Math.random() * width * 0.1; // Head position approx

                // Construct standard circuit 45/90 angular traces
                while (cx < targetX) {
                    let mode = Math.random();
                    let dist = Math.random() * 80 + 30; // Random segment lengths

                    if (mode < 0.6) {
                        cx += dist; // pure horizontal
                    } else if (mode < 0.8) {
                        // 45 degree up
                        cx += dist;
                        cy -= dist;
                    } else {
                        // 45 degree down
                        cx += dist;
                        cy += dist;
                    }

                    // Keep Y inside screen limits smoothly
                    if (cy < 20) cy += dist * 2;
                    if (cy > height - 20) cy -= dist * 2;

                    path.push({ x: cx, y: cy });
                }

                paths.push({
                    points: path,
                    color: `rgba(255, 120, 20, ${Math.random() * 0.15 + 0.05})`, // dim copper static lines
                    thickness: Math.random() > 0.8 ? 1.5 : 0.5
                });
            }
        };

        initPaths();

        const draw = () => {
            // Dark solid background matching image
            ctx.fillStyle = '#0f0b1a'; // deep dark purple-ish/pure-black base
            ctx.fillRect(0, 0, width, height);

            // Draw a subtle gradient glow near the head (right side)
            const bgGlow = ctx.createRadialGradient(width * 0.8, height / 2, width * 0.1, width * 0.8, height / 2, width * 0.5);
            bgGlow.addColorStop(0, 'rgba(60, 20, 100, 0.4)');
            bgGlow.addColorStop(1, 'rgba(15, 11, 26, 0)');
            ctx.fillStyle = bgGlow;
            ctx.fillRect(0, 0, width, height);

            // Draw all static circuit paths
            paths.forEach(p => {
                ctx.lineWidth = p.thickness;
                ctx.strokeStyle = p.color;
                ctx.beginPath();
                ctx.moveTo(p.points[0].x, p.points[0].y);
                for (let i = 1; i < p.points.length; i++) {
                    ctx.lineTo(p.points[i].x, p.points[i].y);
                }
                ctx.stroke();

                // Draw connecting nodes (solder dots)
                p.points.forEach((pt, index) => {
                    if (index > 0 && index < p.points.length - 1) {
                        ctx.beginPath();
                        ctx.arc(pt.x, pt.y, p.thickness + 0.5, 0, Math.PI * 2);
                        ctx.fillStyle = p.color;
                        ctx.fill();
                    }
                });
            });

            // Randomly spawn current pulses
            if (Math.random() < 0.3 && paths.length > 0) {
                let pObj = paths[Math.floor(Math.random() * paths.length)];
                pulses.push({
                    pathObj: pObj,
                    seg: 0,
                    prog: 0,
                    speed: 0.015 + Math.random() * 0.02, // vary current speed
                });
            }

            // Draw and update current pulses
            for (let i = pulses.length - 1; i >= 0; i--) {
                let pulse = pulses[i];
                pulse.prog += pulse.speed;

                // If finished segment, move to next
                while (pulse.prog >= 1 && pulse.seg < pulse.pathObj.points.length - 1) {
                    pulse.prog -= 1;
                    pulse.seg++;
                }

                // If finished path, remove
                if (pulse.seg >= pulse.pathObj.points.length - 1) {
                    pulses.splice(i, 1);
                    continue;
                }

                let p1 = pulse.pathObj.points[pulse.seg];
                let p2 = pulse.pathObj.points[pulse.seg + 1];

                let curX = p1.x + (p2.x - p1.x) * pulse.prog;
                let curY = p1.y + (p2.y - p1.y) * pulse.prog;

                // Draw trailing/glowing energy ball
                ctx.beginPath();
                ctx.arc(curX, curY, 3, 0, Math.PI * 2);
                ctx.fillStyle = "#ffffff";
                ctx.shadowBlur = 12;
                ctx.shadowColor = "#ff6a00";
                ctx.fill();
                ctx.shadowBlur = 0; // reset
            }

            raf = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section className="ai-circuit-head-section">
            <canvas ref={canvasRef} className="ai-circuit-head-canvas" />

            {/* Overlay cybernetic AI Head image on the right */}
            <div className="ai-head-image-container">
                <img src={aiHeadImg} alt="AI Cybernetic Head" className="ai-head-image" />
            </div>

            {/* Overlay Text Content */}
            <div className="ai-circuit-content">
                <h1 className="ai-circuit-title">AI FEATURE</h1>
            </div>
        </section>
    );
};

export default AICircuitHeadSection;
