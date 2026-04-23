import { useRef, useEffect } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width, height;
        const particles = [];
        const particleCount = 120; // Slightly fewer for better performance with glow

        // Mouse state
        const mouse = { x: null, y: null };

        // Helper: Random range
        const random = (min, max) => Math.random() * (max - min) + min;

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = random(-0.3, 0.3); // Slower, floatier
                this.vy = random(-0.3, 0.3);
                this.size = random(1, 2);
                this.originalSize = this.size;
                this.baseColor = `rgba(100, 149, 237, ${random(0.1, 0.4)})`; // Cornflower Blue, low opacity
                this.activeColor = `rgba(255, 255, 255, 0.9)`; // White/Bright when active
                this.color = this.baseColor;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around edges for continuous flow
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;

                // Mouse Interaction
                if (mouse.x != null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const interactionRadius = 200;

                    if (distance < interactionRadius) {
                        // Calculate intensity based on distance
                        const intensity = 1 - (distance / interactionRadius);

                        // Push away slightly (antigravity)
                        // const forceX = dx / distance;
                        // const forceY = dy / distance;
                        // this.vx -= forceX * 0.02; // Gentle push
                        // this.vy -= forceY * 0.02;

                        // Grow and brighten based on proximity
                        this.size = this.originalSize + (2 * intensity);
                        this.color = this.activeColor; // Use the new activeColor
                    } else {
                        this.size = this.originalSize;
                        this.color = this.baseColor;
                    }
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            // Clear with slight fade for trails
            // Revert to dark fade for dark background
            ctx.fillStyle = 'rgba(5, 5, 10, 0.2)';
            ctx.fillRect(0, 0, width, height);

            // Draw Mouse Glow "Flashlight"
            if (mouse.x != null) {
                const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 250);
                gradient.addColorStop(0, 'rgba(0, 82, 204, 0.15)'); // Center glow
                gradient.addColorStop(1, 'rgba(0, 82, 204, 0)'); // Fade out
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 250, 0, Math.PI * 2);
                ctx.fill();
            }

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connecting lines if close and near mouse
            ctx.strokeStyle = 'rgba(100, 200, 255, 0.15)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        // Only connect if near mouse or just random? 
                        // Let's connect if both are reasonably close to mouse to reduce noise
                        const distMouseI = mouse.x ? Math.sqrt(Math.pow(particles[i].x - mouse.x, 2) + Math.pow(particles[i].y - mouse.y, 2)) : 1000;

                        if (distMouseI < 250) {
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
};

export default ParticleBackground;
