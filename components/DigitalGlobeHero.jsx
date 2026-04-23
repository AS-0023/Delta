import React, { useRef, useEffect } from 'react';
import './DigitalGlobeHero.css';

const DigitalGlobeHero = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let raf;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        /* ─── Globe Config ─────────────────────────────────── */
        const DOT_COUNT = 900;    // Points on sphere
        const SPHERE_SCALE = 0.40;   // Fraction of canvas height
        const GLOBE_OFFSET_X = -0.18;  // Fraction of canvas width (negative = left)
        const ROT_SPEED = 0.012;  // Auto-rotation speed (3× faster)

        /* ─── Data-stream Config ───────────────────────────── */
        const STREAM_COUNT = 18;
        const PLUS_COUNT = 80;
        const TRI_COUNT = 40;

        /* ─── Colours ──────────────────────────────────────── */
        const C_DOT = '#00c4ff';
        const C_LINE = 'rgba(0,196,255,';
        const C_STREAM = '#38bdf8';
        const C_STREAM_GLOW = 'rgba(56,189,248,';
        const C_PLUS = '#00dfff';
        const C_TRI = '#1e9fff';

        /* ═══════════════════════════════════════════════════ */

        /* ─── Globe Dots ─────────────────────────────────── */
        const rawDots = [];
        for (let i = 0; i < DOT_COUNT; i++) {
            const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
            const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;
            rawDots.push({
                bx: Math.cos(theta) * Math.sin(phi),
                by: Math.cos(phi),
                bz: Math.sin(theta) * Math.sin(phi),
            });
        }

        /* ─── Data Streams (horizontal lines from globe edge) */
        class DataStream {
            constructor() { this.init(); }
            init() {
                const W = canvas.width, H = canvas.height;
                const R = H * SPHERE_SCALE;
                const cx = W * 0.5 + W * GLOBE_OFFSET_X;
                // Pick a random angle on the right half of the globe
                const angle = (Math.random() - 0.5) * Math.PI * 0.8; // ±72°
                const startX = cx + Math.cos(angle) * R * 0.92;
                const startY = H * 0.5 + Math.sin(angle) * R * 0.92;

                this.sx = startX;
                this.sy = startY;
                this.len = W * (0.25 + Math.random() * 0.45);
                this.headX = startX;
                this.speed = 5 + Math.random() * 9;
                this.alpha = 0;
                this.done = false;
            }
            update() {
                this.headX += this.speed;
                const progress = (this.headX - this.sx) / this.len;
                this.alpha = progress < 0.1 ? progress / 0.1 :
                    progress > 0.85 ? (1 - progress) / 0.15 : 1;
                if (this.headX - this.sx > this.len) this.init();
            }
            draw() {
                if (this.alpha <= 0) return;
                const tail = Math.max(this.sx, this.headX - 120);
                // Glowing tail
                const grad = ctx.createLinearGradient(tail, 0, this.headX, 0);
                grad.addColorStop(0, `${C_STREAM_GLOW}0)`);
                grad.addColorStop(1, `${C_STREAM_GLOW}${this.alpha.toFixed(2)})`);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.5;
                ctx.shadowBlur = 10;
                ctx.shadowColor = C_STREAM;
                ctx.beginPath();
                ctx.moveTo(tail, this.sy);
                ctx.lineTo(this.headX, this.sy);
                ctx.stroke();
                // Bright head node
                ctx.fillStyle = `${C_STREAM_GLOW}${this.alpha.toFixed(2)})`;
                ctx.shadowBlur = 18;
                ctx.beginPath();
                ctx.arc(this.headX, this.sy, 2.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        /* ─── Floating Plus Signs ────────────────────────── */
        class PlusSign {
            constructor() { this.reset(true); }
            reset(init = false) {
                const W = canvas.width, H = canvas.height;
                const R = H * SPHERE_SCALE;
                const cx = W * 0.5 + W * GLOBE_OFFSET_X;
                const angle = (Math.random() - 0.5) * Math.PI;
                const r = R * (0.6 + Math.random() * 0.7);
                this.x = init ? Math.random() * W : cx + Math.cos(angle) * r;
                this.y = init ? Math.random() * H : H * 0.5 + Math.sin(angle) * r;
                this.vx = 1.2 + Math.random() * 3.5;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.size = 4 + Math.random() * 6;
                this.alpha = Math.random();
                this.fadeIn = true;
                this.lifeMax = 120 + Math.random() * 160;
                this.life = init ? Math.random() * this.lifeMax : 0;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life++;
                if (this.life < 20) this.alpha = this.life / 20;
                else if (this.life > this.lifeMax - 20) this.alpha = (this.lifeMax - this.life) / 20;
                else this.alpha = 1;
                if (this.life >= this.lifeMax || this.x > canvas.width + 60) this.reset();
            }
            draw() {
                const s = this.size;
                ctx.save();
                ctx.globalAlpha = this.alpha * 0.85;
                ctx.strokeStyle = C_PLUS;
                ctx.lineWidth = 1.5;
                ctx.shadowBlur = 12;
                ctx.shadowColor = C_PLUS;
                ctx.beginPath();
                ctx.moveTo(this.x - s, this.y);
                ctx.lineTo(this.x + s, this.y);
                ctx.moveTo(this.x, this.y - s);
                ctx.lineTo(this.x, this.y + s);
                ctx.stroke();
                ctx.restore();
            }
        }

        /* ─── Floating Triangles ─────────────────────────── */
        class Triangle {
            constructor() { this.reset(true); }
            reset(init = false) {
                const W = canvas.width, H = canvas.height;
                const R = H * SPHERE_SCALE;
                const cx = W * 0.5 + W * GLOBE_OFFSET_X;
                const angle = (Math.random() - 0.5) * Math.PI;
                const r = R * (0.5 + Math.random() * 0.8);
                this.x = init ? Math.random() * W : cx + Math.cos(angle) * r;
                this.y = init ? Math.random() * H : H * 0.5 + Math.sin(angle) * r;
                this.vx = 1.0 + Math.random() * 2.8;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = 5 + Math.random() * 7;
                this.rot = Math.random() * Math.PI * 2;
                this.rotSpeed = (Math.random() - 0.5) * 0.03;
                this.lifeMax = 100 + Math.random() * 180;
                this.life = init ? Math.random() * this.lifeMax : 0;
                this.alpha = 0;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.rot += this.rotSpeed;
                this.life++;
                if (this.life < 20) this.alpha = this.life / 20;
                else if (this.life > this.lifeMax - 20) this.alpha = (this.lifeMax - this.life) / 20;
                else this.alpha = 1;
                if (this.life >= this.lifeMax || this.x > canvas.width + 60) this.reset();
            }
            draw() {
                const s = this.size;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rot);
                ctx.globalAlpha = this.alpha * 0.75;
                ctx.strokeStyle = C_TRI;
                ctx.lineWidth = 1.5;
                ctx.shadowBlur = 10;
                ctx.shadowColor = C_TRI;
                ctx.beginPath();
                ctx.moveTo(0, -s);
                ctx.lineTo(s * 0.87, s * 0.5);
                ctx.lineTo(-s * 0.87, s * 0.5);
                ctx.closePath();
                ctx.stroke();
                ctx.restore();
            }
        }

        /* ─── Init particles ─────────────────────────────── */
        const streams = Array.from({ length: STREAM_COUNT }, () => new DataStream());
        const pluses = Array.from({ length: PLUS_COUNT }, () => new PlusSign());
        const tris = Array.from({ length: TRI_COUNT }, () => new Triangle());

        /* ─── Rotation state ─────────────────────────────── */
        let rotY = 0;
        const rotX = 0.25; // Slight tilt

        /* ─── Main loop ──────────────────────────────────── */
        const draw = () => {
            const W = canvas.width, H = canvas.height;
            const R = H * SPHERE_SCALE;
            const cx = W * 0.5 + W * GLOBE_OFFSET_X;
            const cy = H * 0.5;
            const FOV = 900;

            // Dark gradient background (repaint each frame)
            const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, W);
            bg.addColorStop(0, '#0d2259');
            bg.addColorStop(0.55, '#061435');
            bg.addColorStop(1, '#010818');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            rotY += ROT_SPEED;
            const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
            const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

            // ── Project all dots ───────────────────────────
            const projected = rawDots.map(({ bx, by, bz }) => {
                // Rotate Y
                let x1 = bx * cosY + bz * sinY;
                let z1 = -bx * sinY + bz * cosY;
                // Rotate X
                let y2 = by * cosX - z1 * sinX;
                let z2 = by * sinX + z1 * cosX;
                const scale = FOV / (FOV + z2 * R);
                return {
                    px: cx + x1 * R * scale,
                    py: cy + y2 * R * scale,
                    z: z2,
                    scale,
                    alpha: Math.max(0, Math.min(1, 1 - z2 * 1.6)),
                };
            });

            // ── Draw globe connections ─────────────────────
            ctx.shadowBlur = 0;
            for (let i = 0; i < projected.length; i += 3) {
                const a = projected[i];
                if (a.z > 0.1) continue;
                for (let j = i + 3; j < projected.length; j += 3) {
                    const b = projected[j];
                    if (b.z > 0.1) continue;
                    const d = Math.hypot(a.px - b.px, a.py - b.py);
                    if (d < 40) {
                        const opacity = (1 - d / 40) * 0.25 * a.alpha * b.alpha;
                        ctx.strokeStyle = `${C_LINE}${opacity.toFixed(3)})`;
                        ctx.lineWidth = 0.7;
                        ctx.beginPath();
                        ctx.moveTo(a.px, a.py);
                        ctx.lineTo(b.px, b.py);
                        ctx.stroke();
                    }
                }
            }

            // ── Draw globe dots ────────────────────────────
            projected.forEach(({ px, py, alpha, scale }) => {
                if (alpha < 0.05) return;
                ctx.beginPath();
                ctx.arc(px, py, Math.max(0.5, 1.8 * scale), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0,196,255,${(alpha * 0.9).toFixed(3)})`;
                ctx.shadowBlur = alpha > 0.6 ? 6 : 0;
                ctx.shadowColor = C_DOT;
                ctx.fill();
            });

            // ── Data Streams ──────────────────────────────
            ctx.shadowBlur = 0;
            streams.forEach(s => { s.update(); s.draw(); });

            // ── Floating symbols ──────────────────────────
            pluses.forEach(p => { p.update(); p.draw(); });
            tris.forEach(t => { t.update(); t.draw(); });

            // Soft right-fade so text is legible
            const fade = ctx.createLinearGradient(W * 0.6, 0, W, 0);
            fade.addColorStop(0, 'rgba(1,8,24,0)');
            fade.addColorStop(1, 'rgba(1,8,24,0.55)');
            ctx.fillStyle = fade;
            ctx.fillRect(0, 0, W, H);

            raf = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div className="digital-globe-hero">
            <canvas ref={canvasRef} className="digital-globe-canvas" />
            <div className="digital-globe-text">
                <h1>AI FEATURES</h1>
            </div>
        </div>
    );
};

export default DigitalGlobeHero;
