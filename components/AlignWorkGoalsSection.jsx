import React, { useEffect, useState } from 'react';
import './AlignWorkGoalsSection.css';

const AlignWorkGoalsSection = () => {
    const text = "Define a clear company goal and break it into department objectives. Create projects that support those goals and divide them into actionable tasks. Link tasks to goals and track progress automatically as work gets completed.";
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
        <section className="align-work-section" id="align-work">
            <div className="align-work-container">
                {/* Left Side: Content */}
                <div className="align-work-content left">
                    <h1 className="hero-title">Align Work to Goals</h1>
                    <p id="sentence" className="sentence-text">
                        {displayedText}
                        <span className="cursor"></span>
                    </p>
                </div>

                {/* Right Side: Video Embed */}
                <div className="align-work-video right">
                    <div className="video-responsive">
                        <iframe
                            src="https://www.youtube.com/embed/JVhgN5gOXUc?autoplay=1&mute=1&loop=1&playlist=JVhgN5gOXUc"
                            title="Align Work to Goals Video"
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

export default AlignWorkGoalsSection;
