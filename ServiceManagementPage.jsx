import React, { useState, useEffect } from 'react';
import './ServiceManagementPage.css';

const ServiceManagementPage = () => {
    const [text, setText] = useState('');
    const fullText = "SERVICE MANAGEMENT TEMPLATES";
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
        <div className="sm-page">
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

            <div className="sm-features-grid">
                {/* Row 1: Advanced IT Service Management */}
                <div className="sm-feature-info">
                    <h2 className="sm-feature-title">ADVANCED IT SERVICE MANAGEMENT (ITSM) TEMPLATE</h2>
                    <p className="sm-feature-text sm-typing-text">
                        {"Advanced IT Service Management (ITSM) template provides a comprehensive framework to manage incidents, changes, SLAs, and performance analytics efficiently. It enhances service reliability, automation, and continuous improvement to deliver high-quality IT support.".split(' ').map((word, index) => (
                            <React.Fragment key={index}>
                                <span className="styled-word" style={{ animationDelay: `${index * 0.1}s` }}>
                                    {word}
                                </span>
                                {' '}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
                <div className="sm-feature-image-wrapper">
                    <img src="/images/sm-advanced-itsm.png" alt="Advanced ITSM Dashboard" className="sd-feature-image" />
                </div>

                {/* Row 2: HR Service Management */}
                <div className="sm-feature-info">
                    <h2 className="sm-feature-title">HR SERVICE MANAGEMENT TEMPLATE</h2>
                    <p className="sm-feature-text sm-typing-text">
                        {"An HR Service Management template provides a structured system to manage employee requests efficiently. It improves response time, ensures transparency, and enhances overall employee experience through organized tracking and service delivery.".split(' ').map((word, index) => (
                            <React.Fragment key={index}>
                                <span className="styled-word" style={{ animationDelay: `${index * 0.1}s` }}>
                                    {word}
                                </span>
                                {' '}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
                <div className="sm-feature-image-wrapper">
                    <img src="/images/sm-hr.png" alt="HR Service Management Dashboard" className="sd-feature-image" />
                </div>

                {/* Row 3: IT Service Management */}
                <div className="sm-feature-info">
                    <h2 className="sm-feature-title">IT SERVICE MANAGEMENT (ITSM) TEMPLATE</h2>
                    <p className="sm-feature-text sm-typing-text">
                        {"An IT Service Management (ITSM) template provides a structured framework to manage IT incidents, service requests, and support processes. It helps organizations improve response times, maintain SLA compliance, and deliver consistent, high-quality IT services.".split(' ').map((word, index) => (
                            <React.Fragment key={index}>
                                <span className="styled-word" style={{ animationDelay: `${index * 0.1}s` }}>
                                    {word}
                                </span>
                                {' '}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
                <div className="sm-feature-image-wrapper">
                    <img src="/images/sm-itsm.png" alt="IT Service Management Dashboard" className="sd-feature-image" />
                </div>

                {/* Row 4: Analytics Service Management */}
                <div className="sm-feature-info">
                    <h2 className="sm-feature-title">ANALYTICS SERVICE MANAGEMENT TEMPLATE</h2>
                    <p className="sm-feature-text sm-typing-text">
                        {"An Analytics Service Management template provides a structured framework to collect, analyze, and visualize service data. It helps organizations monitor performance, generate actionable insights, and continuously optimize operations for better efficiency and decision-making.".split(' ').map((word, index) => (
                            <React.Fragment key={index}>
                                <span className="styled-word" style={{ animationDelay: `${index * 0.1}s` }}>
                                    {word}
                                </span>
                                {' '}
                            </React.Fragment>
                        ))}
                    </p>
                </div>
                <div className="sm-feature-image-wrapper">
                    <img src="/images/sm-analytics.png" alt="Analytics Service Management Dashboard" className="sd-feature-image" />
                </div>
            </div>
        </div>
    );
};

export default ServiceManagementPage;
