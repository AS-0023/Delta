import React, { useEffect, useState, useMemo } from 'react';
import './CuteRobotDashboardSection.css';

const CuteRobotDashboardSection = () => {
    // Generate initial message boxes
    const generateMessages = () => {
        const messages = [];
        const numMessages = 15; // Reduced number of floating messages for a cleaner look

        for (let i = 0; i < numMessages; i++) {
            // Random properties for each message box
            const size = Math.random() * 0.6 + 0.4; // Scale 0.4 to 1.0
            const zIndex = Math.floor(Math.random() * 20); // Depth 
            const isBlueDots = Math.random() > 0.5;

            // Starting position: Spread outwards from behind center (robot)
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 300 + 100; // Distance from center
            const initialX = Math.cos(angle) * radius;
            const initialY = Math.sin(angle) * radius - 150; // Shift up slightly

            // Movement vector (drift outwards and upwards gently)
            const velX = (Math.random() - 0.5) * 1.5;
            const velY = (Math.random() - 0.5) * 1.5 - 0.5; // Slight upward bias

            messages.push({
                id: i,
                x: initialX,
                y: initialY,
                vx: velX,
                vy: velY,
                size: size,
                zIndex: zIndex,
                isBlue: isBlueDots,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
        return messages;
    };

    const [messages, setMessages] = useState(generateMessages());

    // Update positions inside a requestAnimationFrame loop
    useEffect(() => {
        let animationFrameId;

        const updatePositions = () => {
            setMessages(prevMessages =>
                prevMessages.map(msg => {
                    // Update positions
                    let newX = msg.x + msg.vx;
                    let newY = msg.y + msg.vy;
                    let newOpacity = msg.opacity;

                    // Boundary conditions: if it floats too far away, reset to center-ish
                    if (Math.abs(newX) > 600 || newY < -400 || newY > 300) {
                        // Reset near center behind robot
                        const angle = Math.random() * Math.PI + Math.PI; // Upper half dome
                        const radius = Math.random() * 50 + 20;
                        newX = Math.cos(angle) * radius;
                        newY = Math.sin(angle) * radius - 100;
                        newOpacity = 0; // Start invisible
                    } else if (newOpacity < 1) {
                        newOpacity += 0.02; // Fade in gradually
                    }

                    return { ...msg, x: newX, y: newY, opacity: newOpacity };
                })
            );

            animationFrameId = requestAnimationFrame(updatePositions);
        };

        animationFrameId = requestAnimationFrame(updatePositions);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);


    return (
        <section className="cute-robot-dashboard-section">
            <div className="cr-background-glow"></div>

            {/* Dark glossy floor reflection area */}
            <div className="cr-floor-reflection"></div>

            <div className="cr-content-layer">

                {/* Floating Messages Container Layer (Behind Robot) */}
                <div className="cr-messages-layer">
                    {messages.map(msg => (
                        <div
                            key={msg.id}
                            className="cr-message-bubble"
                            style={{
                                transform: `translate(${msg.x}px, ${msg.y}px) scale(${msg.size})`,
                                zIndex: msg.zIndex,
                                opacity: msg.opacity
                            }}
                        >
                            <svg viewBox="0 0 100 70" width="100%" height="100%">
                                {/* Speech Bubble Shape */}
                                <path
                                    d="M10,10 L90,10 A5,5 0 0,1 95,15 L95,45 A5,5 0 0,1 90,50 L30,50 L10,65 L15,50 L10,50 A5,5 0 0,1 5,45 L5,15 A5,5 0 0,1 10,10 Z"
                                    fill="rgba(255, 255, 255, 0.95)"
                                    filter="drop-shadow(0px 5px 15px rgba(0,0,0,0.5))"
                                />
                                {/* Typing Dots */}
                                <circle cx="30" cy="30" r="4" fill={msg.isBlue ? "#00e5ff" : "#ccc"} />
                                <circle cx="50" cy="30" r="4" fill={msg.isBlue ? "#00e5ff" : "#ccc"} />
                                <circle cx="70" cy="30" r="4" fill={msg.isBlue ? "#00e5ff" : "#ccc"} />
                            </svg>
                        </div>
                    ))}
                </div>

                {/* Robot Character */}
                <div className="cr-robot-container">
                    {/* Floating shadow/glow below robot */}
                    <div className="cr-robot-shadow"></div>

                    <div className="cr-robot">
                        <div className="cr-head">
                            <div className="cr-antenna cr-antenna-left"></div>
                            <div className="cr-antenna cr-antenna-right"></div>
                            <div className="cr-ear cr-ear-left"></div>
                            <div className="cr-ear cr-ear-right"></div>
                            <div className="cr-visor">
                                <div className="cr-eye cr-eye-left"></div>
                                <div className="cr-eye cr-eye-right"></div>
                                <div className="cr-mouth"></div>
                            </div>
                        </div>
                        <div className="cr-body">
                            <div className="cr-arm cr-arm-left"></div>
                            <div className="cr-arm cr-arm-right"></div>
                            <div className="cr-chest-plate">
                                <div className="cr-chest-core"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Title below Robot */}
                <h1 className="cr-title">AI FEATURE</h1>

            </div>
        </section>
    );
};

export default CuteRobotDashboardSection;
