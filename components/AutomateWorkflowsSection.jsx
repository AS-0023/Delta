import React, { useEffect, useState } from 'react';
import './AutomateWorkflowsSection.css';

const AutomateWorkflowsSection = () => {
    const text = "Trigger workflows when specific events occur and automatically check predefined conditions. Execute actions, move to the next step, and notify users when required. Log every activity to ensure tracking, visibility, and accountability.";
    const words = text.split(" ");

    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < words.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + (index === 0 ? "" : " ") + words[index]);
                setIndex(index + 1);
            }, 150);
            return () => clearTimeout(timeout);
        }
    }, [index, words]);

    return (
        <section className="automate-workflows-section" id="automate-workflows">
            <div className="automate-workflows-container">
                {/* Left Side: Content */}
                <div className="automate-workflows-content left">
                    <h1 className="hero-title">Automate Workflows</h1>
                    <p id="sentence" className="sentence-text">
                        {displayedText}
                        <span className="cursor"></span>
                    </p>
                </div>

                {/* Right Side: Video Embed */}
                <div className="automate-workflows-video right">
                    <div className="video-responsive">
                        <iframe
                            src="https://www.youtube.com/embed/FliBcpBswTU?autoplay=1&mute=1&loop=1&playlist=FliBcpBswTU"
                            title="Automate Workflows Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AutomateWorkflowsSection;
