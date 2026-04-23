import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, Sun, Moon } from 'lucide-react';
import './RadiantDomeSection.css';

const RadiantDomeSection = () => {
    const canvasRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const isPausedRef = useRef(isPaused);
    const isDarkModeRef = useRef(isDarkMode);
    const timeRef = useRef(0);
    const lastFrameTimeRef = useRef(performance.now());

    useEffect(() => {
        isPausedRef.current = isPaused;
    }, [isPaused]);

    useEffect(() => {
        isDarkModeRef.current = isDarkMode;
    }, [isDarkMode]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: true });
        let animationFrameId;

        const fibers = [];
        const numFibers = 3500;
        let baseRadius = 400;

        for (let i = 0; i < numFibers; i++) {
            const theta = Math.random() * Math.PI;

            let lengthFactor;
            const rClass = Math.random();
            if (rClass > 0.3) {
                // Outer shell
                lengthFactor = 0.92 + Math.random() * 0.08;
            } else if (rClass > 0.1) {
                // Secondary inner layer
                lengthFactor = 0.75 + Math.random() * 0.2;
            } else {
                // Deep inner fill
                lengthFactor = 0.3 + Math.random() * 0.45;
            }

            const thickness = Math.random() * 1.5 + 0.2;
            fibers.push({
                baseAngle: theta,
                lengthFactor: lengthFactor,
                thickness: thickness,
                hasDot: Math.random() > 0.85,
                dotSize: Math.random() * 1.5 + 0.8,
            });
        }

        const buckets = [
            { width: 0.6, alpha: 0.2, fibers: [] },
            { width: 1.0, alpha: 0.35, fibers: [] },
            { width: 1.5, alpha: 0.5, fibers: [] },
        ];

        fibers.forEach(f => {
            if (f.thickness < 0.8) buckets[0].fibers.push(f);
            else if (f.thickness < 1.3) buckets[1].fibers.push(f);
            else buckets[2].fibers.push(f);
        });

        const resize = () => {
            const parent = canvas.parentElement;
            const w = parent.clientWidth;
            const h = parent.clientHeight;
            const dpr = window.devicePixelRatio || 1;

            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);

            // Radius scales to fit screen nicely
            baseRadius = Math.min(w * 0.45, h * 0.8);

            fibers.forEach(f => {
                f.length = baseRadius * f.lengthFactor;
            });
        };

        const render = (currentTime) => {
            const dt = currentTime - lastFrameTimeRef.current;
            lastFrameTimeRef.current = currentTime;

            if (!isPausedRef.current) {
                timeRef.current += dt;
            }

            const w = canvas.width / (window.devicePixelRatio || 1);
            const h = canvas.height / (window.devicePixelRatio || 1);

            ctx.clearRect(0, 0, w, h);

            const t = timeRef.current * 0.001;
            const cx = w / 2;
            const cy = h + 10; // Slightly below bottom edge

            // Complex organic parting logic (leaves opening)
            const windWaveTime = t * 2;

            // Primary dynamic gap
            const part1Center = Math.PI / 2 + Math.sin(t * 0.9) * 1.1;
            const part1Strength = 0.28 * Math.max(0, Math.sin(t * 1.5));

            // Secondary dynamic gap
            const part2Center = Math.PI / 2 + Math.cos(t * 0.7) * 0.9;
            const part2Strength = 0.22 * Math.max(0, Math.cos(t * 1.1));

            const rgb = isDarkModeRef.current ? '100, 140, 255' : '45, 80, 190';

            buckets.forEach(b => {
                ctx.beginPath();
                for (let f of b.fibers) {
                    const theta = f.baseAngle;

                    const windWave = Math.sin(theta * 5 + windWaveTime) * 0.03;

                    // Deep localized partings (exp^4 for sharp, crisp gaps)
                    const dist1 = theta - part1Center;
                    const deflect1 = Math.sign(dist1) * part1Strength * Math.exp(-Math.pow(dist1 / 0.15, 4));

                    const dist2 = theta - part2Center;
                    const deflect2 = Math.sign(dist2) * part2Strength * Math.exp(-Math.pow(dist2 / 0.12, 4));

                    let finalTheta = theta + windWave + deflect1 + deflect2;

                    // Clamp to ground visually
                    if (finalTheta < 0) finalTheta = 0;
                    if (finalTheta > Math.PI) finalTheta = Math.PI;

                    const ex = cx + f.length * Math.cos(finalTheta);
                    const ey = cy - f.length * Math.sin(finalTheta);

                    ctx.moveTo(cx, cy);
                    ctx.lineTo(ex, ey);

                    f.tempEx = ex;
                    f.tempEy = ey;
                }
                ctx.lineWidth = b.width;
                ctx.strokeStyle = `rgba(${rgb}, ${b.alpha})`;
                ctx.stroke();
            });

            // Draw glowing particles at tips
            ctx.beginPath();
            for (let f of fibers) {
                if (f.hasDot) {
                    ctx.moveTo(f.tempEx + f.dotSize, f.tempEy);
                    ctx.arc(f.tempEx, f.tempEy, f.dotSize, 0, Math.PI * 2);
                }
            }
            ctx.fillStyle = `rgba(${rgb}, 0.8)`;
            ctx.fill();

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', resize);

        // Initial setup
        lastFrameTimeRef.current = performance.now();
        resize();
        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className={`radiant-dome-section ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <div className="radiant-dome-controls">
                <button className="rd-btn" onClick={() => setIsPaused(!isPaused)}>
                    {isPaused ? <Play size={16} /> : <Pause size={16} />}
                </button>
                <button className="rd-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                </button>
            </div>
            <canvas ref={canvasRef} className="radiant-dome-canvas" />
        </section>
    );
};

export default RadiantDomeSection;
