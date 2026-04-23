import React, { useState, useEffect } from 'react';
import './PopularTemplatesSection.css';

const TypingText = ({ title, text }) => {
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
        <div className="template-text-content">
            <h1 className="hero-title">{title}</h1>
            <p className="sentence-text">
                {displayedText}
                <span className="cursor"></span>
            </p>
        </div>
    );
};

const PopularTemplatesSection = () => {
    return (
        <section className="popular-templates-section" id="popular-templates">
            <div className="popular-templates-container">
                <h2 className="popular-templates-title">Most popular templates</h2>

                <div className="templates-grid">
                    {/* Scrum Breakdown */}
                    <div className="template-element">
                        <TypingText title="SCRUM" text="Visualize, track, and manage your work easily from sprint to sprint." />
                        <div className="video-standalone">
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/DbCvs-60ytM?start=224&autoplay=1&mute=1&loop=1&playlist=DbCvs-60ytM"
                                title="Scrum explanation"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>

                    {/* Kanban Breakdown */}
                    <div className="template-element">
                        <TypingText title="KANBAN" text="Manage a continuous delivery of work on a powerful board." />
                        <div className="video-standalone">
                            <iframe
                                width="100%"
                                height="315"
                                src="https://www.youtube.com/embed/VtFJhHEieHM?start=12&autoplay=1&mute=1&loop=1&playlist=VtFJhHEieHM"
                                title="Kanban explanation"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularTemplatesSection;
