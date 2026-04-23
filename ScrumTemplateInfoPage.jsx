import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScrumTemplateInfoPage.css';

const tabData = {
    'Boards': {
        title: 'Boards',
        description: 'Scrum boards help agile teams break large, complex projects into manageable pieces of work so focused teams, working in sprints, ship faster.',
        image: '/images/jira-scrum-board.png', // Fallback to existing if possible, or new ones
    },
    'Backlogs': {
        title: 'Backlogs',
        description: 'The backlog gives teams a place to list and prioritize what needs to get done. It\'s the foundation of iteration planning.',
        image: '/images/scrum-backlog-tab.png',
    },
    'Timelines': {
        title: 'Timelines',
        description: 'Timelines help you visualize dependencies and the big picture. Track progress and plan ahead with a clear overview of your project.',
        image: '/images/scrum-timeline-tab.png',
    },
    'Reports': {
        title: 'Reports',
        description: 'Actionable agile metrics like burndown charts and velocity tracking provide insights to improve your team\'s performance over time.',
        image: '/images/scrum-reports-tab.png',
    }
};

const ScrumTemplateInfoPage = () => {
    const [activeTab, setActiveTab] = useState('Boards');
    const navigate = useNavigate();

    return (
        <div className="scrum-template-page">
            <div className="scrum-template-container">
                {/* Left Sidebar */}
                <div className="scrum-sidebar">
                    <h1>Scrum template</h1>
                    <p>Easily plan, track, and manage work across sprints.</p>

                    <button className="btn-use-template" onClick={() => navigate('/scrum-board')}>
                        Use template
                    </button>

                    <div className="sidebar-section">
                        <h4>BEST FOR</h4>
                        <div className="sidebar-item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                            <span>Software development</span>
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <h4>KEY FEATURES</h4>
                        <div className="sidebar-item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            <span>Sprint and task planning</span>
                        </div>
                        <div className="sidebar-item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
                            <span>Progress tracking</span>
                        </div>
                        <div className="sidebar-item">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                            <span>Sprint analytics tools</span>
                        </div>
                    </div>
                </div>

                {/* Right Main Content */}
                <div className="scrum-main-content">
                    <h2>What is a scrum template?</h2>
                    <p>
                        The scrum template is pre-formatted to help teams organize and plan their work within the Scrum framework.
                        Scrum is one of the most popular frameworks for implementing agile. With scrum, the product is built in a
                        series of fixed-length iterations called sprints that give teams a framework for shipping on a regular cadence.
                    </p>

                    <div className="tabs-container">
                        {Object.keys(tabData).map(tab => (
                            <button
                                key={tab}
                                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="tab-content">
                        <div className="tab-image-container">
                            {/* If image source fails, show a placeholder block */}
                            <img
                                src={tabData[activeTab].image}
                                alt={`${activeTab} Screenshot`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/images/jira-scrum-board.png"; // fallback
                                }}
                            />
                        </div>
                        <div className="tab-text">
                            <h3>{tabData[activeTab].title}</h3>
                            <p>{tabData[activeTab].description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-section: YouTube Video */}
            <div className="scrum-video-section">
                <h2>Learn more about Scrum</h2>
                <div className="scrum-video-wrapper">
                    <iframe
                        src="https://www.youtube.com/embed/8dGdIcyDk1w?start=77"
                        title="Scrum Methodology Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default ScrumTemplateInfoPage;
