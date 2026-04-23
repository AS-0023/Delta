import React, { useState, useEffect, useRef } from 'react';
import { Target, Activity, Zap, Shield, Users, BarChart } from 'lucide-react';
import './GoalAlignmentSection.css';

const GoalAlignmentSection = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const [animationStage, setAnimationStage] = useState(0);

    const features = [
        {
            id: 1,
            icon: <Target size={24} />,
            title: "Automatic Goal Mapping",
            subtitle: "AI Matching Engine",
            desc: "Automatically links tasks to strategic goals by analyzing context and keywords.",
            color: "#4C9AFF"
        },
        {
            id: 2,
            icon: <Activity size={24} />,
            title: "Goal Contribution Score",
            subtitle: "Impact Analysis",
            desc: "Calculates the exact % contribution of each task based on impact and progress.",
            color: "#36B37E"
        },
        {
            id: 3,
            icon: <Zap size={24} />,
            title: "Achievement Prediction",
            subtitle: "Future Forecasting",
            desc: "Predicts goal completion probability and identifies potential bottlenecks early.",
            color: "#FFAB00"
        },
        {
            id: 4,
            icon: <Shield size={24} />,
            title: "Misalignment Detection",
            subtitle: "Risk Prevention",
            desc: "Alerts you to tasks that don't align with any strategic objectives.",
            color: "#FF5630"
        },
        {
            id: 5,
            icon: <Users size={24} />,
            title: "Cross-Team Intelligence",
            subtitle: "Collaboration",
            desc: "Identifies missing stakeholders and suggests cross-functional partnerships.",
            color: "#6554C0"
        },
        {
            id: 6,
            icon: <BarChart size={24} />,
            title: "Impact Forecasting",
            subtitle: "Revenue & Growth",
            desc: "Predicts business outcomes like revenue increase and user growth.",
            color: "#00B8D9"
        }
    ];

    // Animation Loop for the "AI Processing" visual
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationStage(prev => (prev + 1) % 4);
        }, 3000); // Change stage every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="goal-alignment-section">
            <div className="goal-container">
                <div className="header-center">
                    <span className="eyebrow-accent">STRATEGY & EXECUTION</span>
                    <h2>Align Work to Goals</h2>
                    <p className="sub-text">Stop manually updating spreadsheets. Let AI connect every task to the big picture.</p>
                </div>

                <div className="content-grid">
                    {/* Left Side: Interactive Feature List */}
                    <div className="features-list">
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                className={`feature-card ${activeFeature === index ? 'active' : ''}`}
                                onClick={() => setActiveFeature(index)}
                                style={{ '--accent-color': feature.color }}
                            >
                                <div className="feature-icon" style={{ color: feature.color }}>
                                    {feature.icon}
                                </div>
                                <div className="feature-text">
                                    <h4>{feature.title}</h4>
                                    <p>{feature.desc}</p>
                                </div>
                                {activeFeature === index && <div className="active-indicator" style={{ background: feature.color }}></div>}
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Visual / Animation Canvas */}
                    <div className="visual-canvas">
                        <div className="canvas-content">
                            {/* Background UI (Dashboard Image) */}
                            <div className="dashboard-bg">
                                <img src="/images/goals.png" alt="Goal Dashboard" />
                                <div className="overlay-gradient"></div>
                            </div>

                            {/* Dynamic Overlay Elements based on Active Feature */}
                            <div className="ai-overlay">

                                {/* Feature 1: Goal Mapping Animation */}
                                {activeFeature === 0 && (
                                    <div className="animation-container mapping">
                                        <div className="task-card-float">
                                            <span className="task-tag">TASK-102</span>
                                            <p>Improve checkout API performance</p>
                                        </div>

                                        <div className="connection-line">
                                            <div className="particle"></div>
                                        </div>

                                        <div className="goal-card-float">
                                            <span className="goal-icon">🎯</span>
                                            <p>Goal: Increase Conversion Rate</p>
                                            <span className="match-badge">98% Match</span>
                                        </div>
                                    </div>
                                )}

                                {/* Feature 2: Contribution Score */}
                                {activeFeature === 1 && (
                                    <div className="animation-container scoring">
                                        <div className="score-circle">
                                            <svg viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="45" className="bg-ring" />
                                                <circle cx="50" cy="50" r="45" className="progress-ring" strokeDasharray="283" strokeDashoffset="40" />
                                            </svg>
                                            <span className="score-text">85%</span>
                                            <span className="score-label">Impact</span>
                                        </div>
                                        <div className="impact-stats">
                                            <div className="stat-row">
                                                <span>Velocity</span>
                                                <div className="bar"><div className="fill" style={{ width: '90%' }}></div></div>
                                            </div>
                                            <div className="stat-row">
                                                <span>Quality</span>
                                                <div className="bar"><div className="fill" style={{ width: '75%' }}></div></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Fallback for other features (Generic Scan) */}
                                {activeFeature > 1 && (
                                    <div className="animation-container generic-scan">
                                        <div className="scanner-line"></div>
                                        <div className="data-points">
                                            <span className="data-point p1" style={{ top: '20%', left: '30%' }}></span>
                                            <span className="data-point p2" style={{ top: '50%', left: '60%' }}></span>
                                            <span className="data-point p3" style={{ top: '70%', left: '20%' }}></span>
                                        </div>
                                        <div className="analysis-box">
                                            <span>AI Analysis in Progress...</span>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GoalAlignmentSection;
