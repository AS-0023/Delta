import React, { useState, useEffect } from 'react';
import './OperationsPage.css';

const OperationsPage = () => {
    const [text, setText] = useState('');
    const fullText = "OPERATIONS TEMPLATES";
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
        <div className="ops-page">
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

            <div className="ops-features-grid">
                {/* Row 1: Planning Templates */}
                <div className="ops-feature-info">
                    <h2 className="ops-feature-title">PLANNING TEMPLATES</h2>
                    <p className="ops-feature-text ops-typing-text">
                        {"A planning template provides a structured framework to organize goals, tasks, timelines, and resources. It helps teams plan efficiently, reduce risks, and ensure smooth project execution.".split(' ').map((word, index) => (
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
                <div className="ops-feature-image-wrapper">
                    <img
                        src="/images/jira-operations-board.png"
                        alt="Planning Board Screenshot"
                        className="sd-feature-image"
                    />
                </div>

                {/* Row 2: Process Control Templates */}
                <div className="ops-feature-info">
                    <h2 className="ops-feature-title">PROCESS CONTROL TEMPLATES</h2>
                    <p className="ops-feature-text ops-typing-text">
                        {"A Process Control template provides a structured framework to monitor, manage, and improve operational workflows. It ensures consistency, reduces errors, and maintains quality by detecting deviations and enabling timely corrective actions.".split(' ').map((word, index) => (
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
                <div className="ops-feature-image-wrapper">
                    <img
                        src="/images/jira-process-control-board.png"
                        alt="Process Control Board Screenshot"
                        className="sd-feature-image"
                    />
                </div>

                {/* Row 3: Procurement Templates */}
                <div className="ops-feature-info">
                    <h2 className="ops-feature-title">PROCUREMENT TEMPLATES</h2>
                    <p className="ops-feature-text ops-typing-text">
                        {"A procurement template provides a structured framework to manage purchasing activities efficiently. It helps organizations streamline vendor selection, approval workflows, and payment processes while ensuring transparency and cost control.".split(' ').map((word, index) => (
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
                <div className="ops-feature-image-wrapper">
                    <img
                        src="/images/jira-procurement-board.png"
                        alt="Procurement Board Screenshot"
                        className="sd-feature-image"
                    />
                </div>
            </div>
        </div>
    );
};

export default OperationsPage;
