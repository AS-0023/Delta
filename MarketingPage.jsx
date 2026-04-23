import React, { useState, useEffect } from 'react';
import './MarketingPage.css';
import MarketingHero from './components/MarketingHero';

const MarketingPage = () => {
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
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <div className="mkt-page">
            <MarketingHero />

            <div className="mkt-features-grid">
                {/* Row 1: Project Management */}
                <div className="mkt-feature-info">
                    <h2 className="mkt-feature-title">PROJECT MANAGEMENT TEMPLATE</h2>
                    <p className="mkt-feature-text mkt-typing-text">
                        {"Project management templates provide a structured framework to plan, organize, and track projects efficiently. They help teams standardize workflows, save time, and improve collaboration by offering ready-to-use formats for managing tasks, timelines, and resources.".split(' ').map((word, index) => (
                            <React.Fragment key={index}>
                                <span className="styled-word" style={{ animationDelay: `${index * 0.1}s` }}>
                                    {word}
                                </span>
                                {' '}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
                <div className="mkt-feature-image-wrapper">
                    <img src="/images/marketing-project-management.png" alt="Project Management Timeline Dashboard" className="sd-feature-image" />
                </div>

                {/* Row 2: Marketing Service Management */}
                <div className="mkt-feature-info">
                    <h2 className="mkt-feature-title">MARKETING SERVICE MANAGEMENT TEMPLATE</h2>
                    <p className="mkt-feature-text mkt-typing-text">
                        {"Marketing Service Management template provides a structured framework to manage campaigns, requests, and performance tracking efficiently. It helps teams improve collaboration, optimize marketing efforts, and achieve measurable business growth.".split(' ').map((word, index) => (
                            <React.Fragment key={index}>
                                <span className="styled-word" style={{ animationDelay: `${index * 0.1}s` }}>
                                    {word}
                                </span>
                                {' '}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
                <div className="mkt-feature-image-wrapper">
                    <img src="/images/marketing-service-management.png" alt="Marketing Service Management Dashboard" className="sd-feature-image" />
                </div>

                {/* Row 3: Content Management */}
                <div className="mkt-feature-info">
                    <h2 className="mkt-feature-title">CONTENT MANAGEMENT TEMPLATE</h2>
                    <p className="mkt-feature-text mkt-typing-text">
                        {"A Content Management template provides a structured framework to plan, create, publish, and optimize content efficiently. It helps teams maintain consistency, improve collaboration, and maximize content performance across platforms.".split(' ').map((word, index) => (
                            <React.Fragment key={index}>
                                <span className="styled-word" style={{ animationDelay: `${index * 0.1}s` }}>
                                    {word}
                                </span>
                                {' '}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
                <div className="mkt-feature-image-wrapper">
                    <img src="/images/marketing-content-management.png" alt="Content Management Dashboard" className="sd-feature-image" />
                </div>
            </div>
        </div>
    );
};

export default MarketingPage;
