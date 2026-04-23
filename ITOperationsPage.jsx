import React, { useState, useEffect } from 'react';
import './ITOperationsPage.css';

const ITOperationsPage = () => {
    const [text, setText] = useState('');
    const fullText = "IT OPERATIONS TEMPLATES";
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
        <div className="it-ops-page">
            <div className="typing-container">
                <h1>
                    {text.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            {index !== text.split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                    <span
                        className="typing-cursor"
                        style={{ opacity: showCursor ? 1 : 0 }}
                    >
                        |
                    </span>
                </h1>
            </div>

            <div className="it-ops-features-grid">
                {/* Row 1: IT Service Management */}
                <div className="it-ops-feature-info">
                    <h2 className="it-ops-feature-title">IT SERVICE MANAGEMENT</h2>
                    <p className="it-ops-feature-text it-ops-typing-text">
                        {"An IT Service Management (ITSM) template provides a structured framework to manage IT incidents, service requests, and support processes. It helps organizations improve response times, maintain SLA compliance, and deliver consistent, high-quality IT services.".split(' ').map((word, index) => (
                            <React.Fragment key={index}>
                                <span
                                    className="styled-word"
                                    style={{
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                >
                                    {word}
                                </span>
                                {' '}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
                <div className="it-ops-feature-image-wrapper">
                    <img
                        src="/images/jira-itsm-board.png"
                        alt="ITSM Dashboard"
                        className="sd-feature-image"
                    />
                </div>

                {/* Row 2: Analytics Service Management */}
                <div className="it-ops-feature-info">
                    <h2 className="it-ops-feature-title">ANALYTICS SERVICE MANAGEMENT</h2>
                    <p className="it-ops-feature-text it-ops-typing-text">
                        {"An Analytics Service Management template provides a structured framework to collect, analyze, and visualize service data. It helps organizations monitor performance, generate actionable insights, and continuously optimize operations for better efficiency and decision-making.".split(' ').map((word, index) => (
                            <React.Fragment key={index}>
                                <span
                                    className="styled-word"
                                    style={{
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                >
                                    {word}
                                </span>
                                {' '}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
                <div className="it-ops-feature-image-wrapper">
                    <img
                        src="/images/jira-analytics-board.png"
                        alt="Analytics Dashboard"
                        className="sd-feature-image"
                    />
                </div>

                {/* Row 3: Advanced IT Service Management */}
                <div className="it-ops-feature-info">
                    <h2 className="it-ops-feature-title">ADVANCED IT SERVICE MANAGEMENT (ITSM)</h2>
                    <p className="it-ops-feature-text it-ops-typing-text">
                        {"Advanced IT Service Management (ITSM) template provides a comprehensive framework to manage incidents, changes, SLAs, and performance analytics efficiently. It enhances service reliability, automation, and continuous improvement to deliver high-quality IT support.".split(' ').map((word, index) => (
                            <React.Fragment key={index}>
                                <span
                                    className="styled-word"
                                    style={{
                                        animationDelay: `${index * 0.1}s`
                                    }}
                                >
                                    {word}
                                </span>
                                {' '}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
                <div className="it-ops-feature-image-wrapper">
                    <img
                        src="/images/jira-advanced-itsm-board.png"
                        alt="Advanced ITSM Dashboard"
                        className="sd-feature-image"
                    />
                </div>
            </div>
        </div>
    );
};

export default ITOperationsPage;
