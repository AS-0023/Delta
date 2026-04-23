import React, { useEffect, useState } from 'react';
import './PlanAssignWorkSection.css';

const PlanAssignWorkSection = () => {
    const text = "Define the project goal and break it into small tasks. Assign tasks to the right team members with deadlines and priorities. Track progress and update status until completion.";
    const words = text.split(" ");

    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < words.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + (index === 0 ? "" : " ") + words[index]);
                setIndex(index + 1);
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [index, words]);

    return (
        <section className="plan-assign-section" id="plan-assign">
            <div className="plan-assign-container">
                {/* Left Side: Content */}
                <div className="plan-assign-content left">
                    <h1 className="hero-title">Plan and Assign Work</h1>
                    <p id="sentence" className="sentence-text">
                        {displayedText}
                        <span className="cursor"></span>
                    </p>
                </div>

                {/* Right Side: Video Embed */}
                <div className="plan-assign-video right">
                    <div className="video-responsive">
                        <iframe
                            src="https://www.youtube.com/embed/sBKTpFEH_fU?autoplay=1&mute=1&loop=1&playlist=sBKTpFEH_fU"
                            title="Plan and Assign Work Video"
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

export default PlanAssignWorkSection;
