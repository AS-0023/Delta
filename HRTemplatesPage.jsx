import React, { useState, useEffect } from 'react';
import './HRTemplatesPage.css';

const HRTemplatesPage = () => {
    const [text, setText] = useState('');
    const fullText = "HUMAN RESOURCES TEMPLATES";
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            setText(fullText.slice(0, i + 1));
            i++;
            if (i >= fullText.length) {
                clearInterval(typingInterval);
            }
        }, 75); // Adjust typing speed here

        return () => clearInterval(typingInterval);
    }, []);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500); // Blinking speed
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <div className="hr-templates-page">
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

            <div className="hr-features-grid">
                {/* Row 1: Employee Onboarding */}
                <div className="hr-feature-info">
                    <h2 className="hr-feature-title">EMPLOYEE ONBOARDING TEMPLATES</h2>
                    <p className="hr-feature-text hr-typing-text">
                        {"Streamline the onboarding process for new hires with comprehensive templates. Track tasks across different departments, from IT setup to HR paperwork, ensuring every new employee has a seamless, welcoming experience and hits the ground running on day one.".split(' ').map((word, index) => (
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
                <div className="hr-feature-image-wrapper">
                    <img
                        src="/images/sm-hr.png"
                        alt="Employee Onboarding Template"
                        className="hr-feature-image"
                    />
                </div>

                {/* Row 2: Recruitment Pipeline */}
                <div className="hr-feature-info">
                    <h2 className="hr-feature-title">RECRUITMENT PIPELINE TEMPLATES</h2>
                    <p className="hr-feature-text hr-typing-text">
                        {"Visualize your hiring process with a clear Kanban board for tracking candidates from initial application to final offer. Manage interviews, gather feedback from hiring managers, and keep candidates engaged without losing track of details in a fast-paced hiring environment.".split(' ').map((word, index) => (
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
                <div className="hr-feature-image-wrapper">
                    <img
                        src="/images/jira-kanban-board.png"
                        alt="Recruitment Pipeline Template"
                        className="hr-feature-image"
                    />
                </div>

                {/* Row 3: Performance Reviews */}
                <div className="hr-feature-info">
                    <h2 className="hr-feature-title">PERFORMANCE REVIEW TEMPLATES</h2>
                    <p className="hr-feature-text hr-typing-text">
                        {"Standardize your evaluation cycles and track employee growth. These templates help HR managers organize self-assessments, manager reviews, and goal planning sessions effectively, promoting a continuous culture of feedback and career advancement.".split(' ').map((word, index) => (
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
                <div className="hr-feature-image-wrapper">
                    <img
                        src="/images/jira-process-control-board.png"
                        alt="Performance Review Template"
                        className="hr-feature-image"
                    />
                </div>
            </div>
        </div>
    );
};

export default HRTemplatesPage;
