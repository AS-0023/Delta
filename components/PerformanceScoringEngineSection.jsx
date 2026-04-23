import React, { useState, useEffect } from 'react';
import './PerformanceScoringEngineSection.css';

const PerformanceScoringEngineSection = () => {
    const [ticks, setTicks] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTicks((t) => (t > 50 ? 0 : t + 1));
        }, 400); // 400ms per tick
        return () => clearInterval(timer);
    }, []);

    const promptText = "Calculate real-time performance scores for the development team based on recent completion rates and quality metrics.";
    const typingLength = Math.min(promptText.length, Math.max(0, (ticks - 2) * 6));
    const displayedPrompt = promptText.substring(0, typingLength);

    const showCard1 = ticks >= 10;
    const card1Updates = Math.max(0, ticks - 11);
    const card2Updates = Math.max(0, ticks - 25);

    return (
        <section className="performance-scoring-engine-section" id="performance-scoring-engine">
            <div className="performance-scoring-engine-container">
                <div className="performance-scoring-engine-left">
                    <h2 className="ai-section-title">Intelligent Performance Scoring Engine</h2>
                    <p className="ai-section-subtitle">
                        The Intelligent Performance Scoring Engine uses AI to evaluate employee performance based on real-time task data and defined KPIs. It generates automated performance scores and actionable insights to improve productivity, transparency, and decision-making.
                    </p>
                </div>

                <div className="performance-scoring-engine-right">
                    <div className="animation-container">
                        {ticks >= 2 && (
                            <div className="prompt-bubble">
                                {displayedPrompt}
                                {typingLength < promptText.length && <span className="custom-cursor"></span>}
                            </div>
                        )}

                        {showCard1 && (
                            <div className="task-card active-gradient">
                                <div>
                                    <div className="card-title">Data Evaluation & Score Generation</div>
                                    <div className="card-subtitle">Gathering metrics, applying ML models, and generating real-time insights.</div>
                                </div>

                                <div>
                                    <div className="progress-updates-header">
                                        <div className="progress-updates-title">Progress updates</div>
                                        <div className="expand-all">Expand all &lt;</div>
                                    </div>
                                    <div className="updates-list">
                                        {card1Updates >= 1 && <div className="update-item"><span className="update-num">1</span> <div><strong>Data Collection:</strong> Gather real-time data such as task completion rate, deadlines met, work quality, collaboration, and time efficiency.</div></div>}
                                        {card1Updates >= 5 && <div className="update-item"><span className="update-num">2</span> <div><strong>Define KPIs:</strong> Set measurable performance indicators like productivity, consistency, accuracy, and teamwork.</div></div>}
                                        {card1Updates >= 9 && <div className="update-item"><span className="update-num">3</span> <div><strong>AI Analysis:</strong> Use machine learning algorithms to analyze patterns and compare performance against benchmarks.</div></div>}
                                        {card2Updates >= 1 && <div className="update-item"><span className="update-num">4</span> <div><strong>Score Calculation:</strong> Generate dynamic performance scores automatically based on weighted metrics.</div></div>}
                                        {card2Updates >= 5 && <div className="update-item"><span className="update-num">5</span> <div><strong>Insights & Feedback:</strong> Provide personalized improvement suggestions and highlight strengths.</div></div>}
                                        {card2Updates >= 9 && <div className="update-item"><span className="update-num">6</span> <div><strong>Continuous Learning:</strong> Update scores and improve accuracy as new data is recorded.</div></div>}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bottom-fade"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PerformanceScoringEngineSection;
