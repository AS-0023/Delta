import React, { useEffect, useState, useRef } from 'react';
import './AIPromoVideo.css';

const AIPromoVideo = () => {
    const titleText = "AI-Driven Strategic Goal Alignment System";
    const words = titleText.split(" ");

    // Setup a small particle generator for neural network nodes and floating dust
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate random particles
        const newParticles = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 10,
        }));
        setParticles(newParticles);
    }, []);

    const renderAnimatedText = () => {
        let charIndex = 0;
        return words.map((word, wIdx) => (
            <span key={wIdx} className="word">
                {word.split('').map((char, cIdx) => {
                    const i = charIndex++;
                    return (
                        <span key={i} className="char" style={{ animationDelay: `${i * 0.04 + 0.5}s` }}>
                            {char}
                        </span>
                    );
                })}
                {wIdx < words.length - 1 && <span className="space">&nbsp;</span>}
            </span>
        ));
    };

    return (
        <section className="promo-video-container">
            <div className="video-frame">

                {/* Camera Push-in Wrapper */}
                <div className="camera-push-in">

                    {/* Background Elements */}
                    <div className="bg-dark-tech"></div>
                    <div className="bg-grid-lines"></div>

                    {/* Ambient Lighting Layers */}
                    <div className="ambient-blue-glow primary-glow"></div>
                    <div className="ambient-blue-glow accent-glow"></div>

                    {/* Neural Network Abstract SVG / CSS lines */}
                    <div className="neural-network">
                        {/* We use basic CSS rotating elements for the neural vibe */}
                        <div className="neural-line line-1"></div>
                        <div className="neural-line line-2"></div>
                        <div className="neural-line line-3"></div>
                    </div>

                    {/* Floating Particles Layers */}
                    <div className="particles-container">
                        {particles.map((p) => (
                            <div
                                key={p.id}
                                className="crypto-particle"
                                style={{
                                    left: `${p.x}%`,
                                    top: `${p.y}%`,
                                    width: `${p.size}px`,
                                    height: `${p.size}px`,
                                    animationDelay: `${p.delay}s`,
                                    animationDuration: `${p.duration}s`
                                }}
                            />
                        ))}
                    </div>

                    {/* Scene 1 Content */}
                    <div className="scene title-scene">
                        <div className="title-wrapper">
                            <h1 className="title-reveal">
                                {renderAnimatedText()}
                            </h1>
                            {/* The light sweep element that runs after title reveal */}
                            <div className="sweep-container">
                                <div className="light-sweep"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AIPromoVideo;
