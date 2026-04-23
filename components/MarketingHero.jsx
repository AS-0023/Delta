import React, { useState, useEffect, useRef } from 'react';
import './MarketingHero.css';

const MarketingHero = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // 3D Point class
        class Point3D {
            constructor(x, y, z) {
                this.x = x;
                this.y = y;
                this.z = z;
                // Original positions to calculate rotation
                this.origX = x;
                this.origY = y;
                this.origZ = z;
            }

            rotateY(angle) {
                const cos = Math.cos(angle);
                const sin = Math.sin(angle);
                const x = this.origX * cos - this.origZ * sin;
                const z = this.origX * sin + this.origZ * cos;
                this.x = x;
                this.z = z;
            }

            rotateX(angle) {
                const cos = Math.cos(angle);
                const sin = Math.sin(angle);
                const y = this.origY * cos - this.z * sin;
                const z = this.origY * sin + this.z * cos;
                this.y = y;
                // Update z again after Y rotation if needed, but doing X then Y is common.
            }

            project(centerX, centerY, fov, viewerDistance) {
                const scale = fov / (viewerDistance + this.z);
                const x = this.x * scale + centerX;
                const y = this.y * scale + centerY;
                return { x, y, scale };
            }
        }

        // Generate lines radiating from center
        const lines = [];
        const numLines = 400;
        const radius = Math.min(canvas.width, canvas.height) * 0.45;
        const innerRadius = radius * 0.1;

        for (let i = 0; i < numLines; i++) {
            // Random point on a sphere surface (Fibonacci spiral or just random)
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            // Outer point
            const outX = radius * Math.sin(phi) * Math.cos(theta);
            const outY = radius * Math.sin(phi) * Math.sin(theta);
            const outZ = radius * Math.cos(phi);

            // Inner point (near center)
            const inX = innerRadius * Math.sin(phi) * Math.cos(theta);
            const inY = innerRadius * Math.sin(phi) * Math.sin(theta);
            const inZ = innerRadius * Math.cos(phi);

            // Add some variation to line lengths
            const randomLengthFactor = 0.8 + Math.random() * 0.2;

            lines.push({
                inner: new Point3D(inX, inY, inZ),
                outer: new Point3D(outX * randomLengthFactor, outY * randomLengthFactor, outZ * randomLengthFactor),
                baseColor: Math.random() > 0.5 ? '#1E40AF' : '#3B82F6', // Dark blue vs bright blue
                alpha: Math.random() * 0.5 + 0.5,
                dotSize: Math.random() * 1.5 + 0.5
            });
        }

        let angleY = 0;
        let angleX = 0;

        const animate = () => {
            ctx.fillStyle = '#02000a'; // Dark background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width * 0.5; // Sphere centered
            const centerY = canvas.height * 0.5;
            const fov = 800;
            const viewerDistance = 1000;

            angleY += 0.002;
            angleX += 0.001;

            // Sort lines by depth for 3D effect (draw furthest first)
            lines.forEach(line => {
                line.outer.rotateY(angleY);
                // line.outer.rotateX(angleX); 
                line.inner.rotateY(angleY);
                // line.inner.rotateX(angleX);
            });

            lines.sort((a, b) => b.outer.z - a.outer.z);

            lines.forEach(line => {
                const projInner = line.inner.project(centerX, centerY, fov, viewerDistance);
                const projOuter = line.outer.project(centerX, centerY, fov, viewerDistance);

                // Opacity based on Z depth (fade out elements further away)
                const depthAlpha = Math.max(0.1, 1 - (line.outer.z + radius) / (radius * 2));
                const finalAlpha = line.alpha * depthAlpha;

                // Draw line
                ctx.beginPath();
                ctx.moveTo(projInner.x, projInner.y);
                ctx.lineTo(projOuter.x, projOuter.y);

                // Gradient for the line
                const grad = ctx.createLinearGradient(projInner.x, projInner.y, projOuter.x, projOuter.y);
                grad.addColorStop(0, `rgba(2, 0, 10, 0)`);
                grad.addColorStop(1, `rgba(29, 78, 216, ${finalAlpha})`);

                ctx.strokeStyle = grad;
                ctx.lineWidth = projOuter.scale * 1.5;
                ctx.stroke();

                // Draw end dot
                if (finalAlpha > 0.2) {
                    ctx.beginPath();
                    ctx.arc(projOuter.x, projOuter.y, line.dotSize * projOuter.scale, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(96, 165, 250, ${finalAlpha + 0.2})`;
                    ctx.fill();

                    // Add glow to close dots
                    if (line.outer.z < 0) {
                        ctx.shadowBlur = 5;
                        ctx.shadowColor = '#60a5fa';
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

    const [text, setText] = useState('');
    const fullText = "MARKETING TEMPLATES";
    const [showCursor, setShowCursor] = useState(true);

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

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <div className="marketing-hero-container">
            <canvas ref={canvasRef} className="marketing-hero-canvas" />

            <div className="marketing-hero-content">
                <div className="hero-logo-wrapper" style={{ display: 'none' }}>
                </div>

                <h1 className="marketing-hero-title">
                    {text}
                    <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
                </h1>
            </div>
        </div>
    );
};

export default MarketingHero;
