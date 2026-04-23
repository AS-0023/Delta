import React, { useEffect, useRef } from 'react';
import './AIFeaturesSection.css';

const AIFeaturesSection = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false }); // optimize
        let width, height;
        let animationFrameId;

        const setSize = () => {
            width = window.innerWidth;
            height = 800;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', setSize);
        setSize();

        // 3D parameters
        const R = 90; // sphere radius
        const rings = 22; // latitudinal density
        const domePoints = [];
        const lines = [];
        const numSteps = 240; // length of fiber trails
        const gravity = 0.05; // downward pull

        for (let r = 0; r <= rings; r++) {
            let phi = (r / rings) * (Math.PI / 2); // Top hemisphere
            let numDotsInRing = Math.max(1, Math.floor(Math.sin(phi) * 50));
            if (r === 0) numDotsInRing = 1;

            for (let d = 0; d < numDotsInRing; d++) {
                let theta = (d / numDotsInRing) * Math.PI * 2;

                // coordinates
                let x = R * Math.sin(phi) * Math.cos(theta);
                let y = -R * Math.cos(phi);
                let z = R * Math.sin(phi) * Math.sin(theta);

                domePoints.push({ x, y, z, phi, theta });

                // Fiber optic lines spreading out like a fountain
                let nx = Math.sin(phi) * Math.cos(theta);
                let ny = -Math.cos(phi);
                let nz = Math.sin(phi) * Math.sin(theta);

                let speed = 2.0 + Math.random() * 1.5;
                let vx = nx * speed * 1.6 + (Math.random() - 0.5) * 0.4;
                let vy = ny * speed * 3.0 - 0.5; // strongly upward initially
                let vz = nz * speed * 1.6 + (Math.random() - 0.5) * 0.4;

                let linePts = [];
                let px = x, py = y, pz = z;
                for (let t = 0; t < numSteps; t++) {
                    linePts.push({ x: px, y: py, z: pz });
                    px += vx;
                    py += vy;
                    pz += vz;
                    vy += gravity; // Gravity pulls the curve downward
                }

                // Add moving particles to this line
                let particles = [];
                if (Math.random() > 0.2) {
                    particles.push({
                        progress: Math.random() * numSteps,
                        speed: 0.4 + Math.random() * 0.8
                    });
                }
                if (Math.random() > 0.6) {
                    particles.push({
                        progress: Math.random() * numSteps,
                        speed: 0.4 + Math.random() * 0.8
                    });
                }

                lines.push({ points: linePts, particles });
            }
        }

        let angle = 0;

        const rotateY = (p, a) => {
            let cos = Math.cos(a);
            let sin = Math.sin(a);
            return {
                x: p.x * cos - p.z * sin,
                y: p.y,
                z: p.z * cos + p.x * sin
            };
        };

        const project = (p3) => {
            let focalLength = 600;
            let cz = p3.z + 550; // push the system back into the screen
            let cy = p3.y + 120; // drop the system down 
            if (cz <= 0) cz = 1;
            let scale = focalLength / cz;
            return {
                x: p3.x * scale + width / 2,
                y: cy * scale + height / 2 + 50,
                scale,
                z: cz // depth for sorting
            };
        };

        const render = () => {
            // Very dark black for futuristic aesthetics
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, width, height);

            angle -= 0.003; // Constant slow rotation

            // 1) Draw the purple/magenta fiber paths
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(160, 60, 255, 0.12)`;
            for (let line of lines) {
                ctx.beginPath();
                // skip every other point to speed up path creation, curve is smooth enough
                for (let i = 0; i < line.points.length; i += 3) {
                    let p2 = project(rotateY(line.points[i], angle));
                    if (i === 0) ctx.moveTo(p2.x, p2.y);
                    else ctx.lineTo(p2.x, p2.y);
                }
                ctx.stroke();
            }

            // 2) Project and sort dome points for depth buffering
            const projectedDome = domePoints.map(p => {
                let rp = rotateY(p, angle);
                let p2 = project(rp);
                return { rp, p2 };
            });
            projectedDome.sort((a, b) => b.p2.z - a.p2.z);

            // 3) Draw Dome Dots (simulated bloom without expensive shadowBlur)
            ctx.globalCompositeOperation = 'screen';
            for (let d of projectedDome) {
                // Dimmer if on the back of the sphere
                let brightness = 0.2 + ((d.rp.z + R) / (2 * R)) * 0.8;
                if (brightness < 0) brightness = 0;

                // Outer halo
                ctx.beginPath();
                ctx.arc(d.p2.x, d.p2.y, 4 * d.p2.scale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(66, 133, 244, ${brightness * 0.3})`;
                ctx.fill();

                // Solid core
                ctx.beginPath();
                ctx.arc(d.p2.x, d.p2.y, 1.2 * d.p2.scale, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 240, 255, ${brightness})`;
                ctx.fill();
            }

            // 4) Draw Travelling Particles
            for (let line of lines) {
                for (let p of line.particles) {
                    p.progress += p.speed;
                    if (p.progress >= numSteps - 1) {
                        p.progress = 0; // seamless loop
                    }

                    let idx = Math.floor(p.progress);
                    let p3 = line.points[idx];
                    let rp = rotateY(p3, angle);
                    let p2 = project(rp);

                    let alpha = 1.0 - Math.pow(p.progress / numSteps, 2); // fades out towards end

                    // Particle halo
                    let rad = 6 * p2.scale;
                    ctx.beginPath();
                    ctx.arc(p2.x, p2.y, Math.max(1, rad), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(66, 133, 244, ${alpha * 0.6})`;
                    ctx.fill();

                    // Particle core
                    ctx.beginPath();
                    ctx.arc(p2.x, p2.y, Math.max(0.5, 1.5 * p2.scale), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.fill();
                }
            }

            ctx.globalCompositeOperation = 'source-over';

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', setSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="ai-features-section">
            <canvas ref={canvasRef} className="ai-features-canvas" />
            <div className="ai-features-overlay">
                <span className="ai-eyebrow">ADVANCED AI SYSTEM</span>
                <h2 className="ai-title">Powering your interconnected workflows</h2>
                <p className="ai-description">
                    Our dynamic artificial intelligence constantly processes information, driving automation, insights, and global connectivity across every layer of your projects.
                </p>
                <div className="ai-actions">
                    <button className="btn-ai-primary">Explore Machine Learning</button>
                    <button className="btn-ai-secondary">View Documentation</button>
                </div>
            </div>
        </section>
    );
};

export default AIFeaturesSection;
