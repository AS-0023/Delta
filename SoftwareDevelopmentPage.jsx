import React from 'react';
import { Link } from 'react-router-dom';
import './SoftwareDevelopmentPage.css';

import SoftwareDevHero from './components/SoftwareDevHero';

const SoftwareDevelopmentPage = () => {
    return (
        <div className="software-dev-page">
            <SoftwareDevHero />

            <div className="sd-features-grid">
                {/* Row 1: Scrum */}
                <div className="sd-feature-info">
                    <h2 className="sd-feature-title">SCRUM TEMPLATES</h2>
                    <p className="sd-feature-text sd-typing-text">
                        {"The Scrum process begins with creating a product backlog of all project requirements. Tasks are selected during sprint planning and completed collaboratively within a fixed sprint duration. Teams review progress daily, demonstrate completed work to stakeholders, and continuously improve through retrospectives after each sprint.".split(' ').map((word, index) => (
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
                <div className="sd-feature-image-wrapper">
                    <Link to="/scrum-template">
                        <img
                            src="/images/jira-scrum-board.png"
                            alt="Jira Backlog Screenshot"
                            className="sd-feature-image"
                        />
                    </Link>
                </div>

                {/* Row 2: Kanban */}
                <div className="sd-feature-info">
                    <h2 className="sd-feature-title">KANBAN TEMPLATES</h2>
                    <p className="sd-feature-text sd-typing-text">
                        {"Kanban is a visual workflow management method that helps teams manage continuous delivery of work. A Kanban board template offers a beginner-friendly option for organizing tasks and schedules, providing a structured framework to visualize work, improve efficiency, and enhance collaboration.".split(' ').map((word, index) => (
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
                <div className="sd-feature-image-wrapper">
                    <img
                        src="/images/jira-kanban-board.png"
                        alt="Jira Kanban Board Screenshot"
                        className="sd-feature-image"
                    />
                </div>

                {/* Row 3: Bug Tracking */}
                <div className="sd-feature-info">
                    <h2 className="sd-feature-title">BUG TRACKING TEMPLATES</h2>
                    <p className="sd-feature-text sd-typing-text">
                        {"Bug tracking is a system used to identify, record, manage, and resolve software issues efficiently. It improves product quality by ensuring timely fixes, better collaboration, and continuous monitoring of defects.".split(' ').map((word, index) => (
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
                <div className="sd-feature-image-wrapper">
                    <img
                        src="/images/jira-bug-tracking.png"
                        alt="Jira Bug Tracking Screenshot"
                        className="sd-feature-image"
                    />
                </div>
            </div>
        </div>
    );
};

export default SoftwareDevelopmentPage;
