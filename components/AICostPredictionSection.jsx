import React, { useState, useEffect } from 'react';
import './AICostPredictionSection.css';

const AICostPredictionSection = () => {
    const [ticks, setTicks] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTicks((t) => (t > 50 ? 0 : t + 1));
        }, 400); // 400ms per tick
        return () => clearInterval(timer);
    }, []);

    const promptText = "Estimate the cost of scaling the backend infrastructure to handle 10x traffic, considering historical deployment data.";
    const typingLength = Math.min(promptText.length, Math.max(0, (ticks - 2) * 6));
    const displayedPrompt = promptText.substring(0, typingLength);

    const showCard1 = ticks >= 10;
    const card1Updates = Math.max(0, ticks - 11);

    const showCard2 = ticks >= 24;
    const card2Updates = Math.max(0, ticks - 25);

    return (
        <section className="ai-cost-prediction-section" id="ai-cost-prediction">
            <div className="ai-cost-prediction-container">
                <div className="ai-cost-prediction-left">
                    <h2 className="ai-section-title">AI-Based Cost Estimation Engine</h2>
                    <p className="ai-section-subtitle">
                        The AI-Based Cost Estimation Engine predicts project budgets using machine learning and historical data. It provides accurate cost forecasts and helps organizations make better financial decisions.
                    </p>
                </div>

                <div className="ai-cost-prediction-right">
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
                                    <div className="card-title">Setup & Prediction Engine Active</div>
                                    <div className="card-subtitle">Preparing historical data, initializing models, and predicting requirements.</div>
                                </div>

                                <div>
                                    <div className="progress-updates-header">
                                        <div className="progress-updates-title">Progress updates</div>
                                        <div className="expand-all">Expand all &lt;</div>
                                    </div>
                                    <div className="updates-list">
                                        {card1Updates >= 1 && <div className="update-item"><span className="update-num">1</span> <div><strong>Historical Data Collection:</strong> Gather past project budgets, durations, and resource usage.</div></div>}
                                        {card1Updates >= 5 && <div className="update-item"><span className="update-num">2</span> <div><strong>Data Processing:</strong> Clean and structure data for analysis.</div></div>}
                                        {card1Updates >= 9 && <div className="update-item"><span className="update-num">3</span> <div><strong>Model Training:</strong> Train machine learning models to understand cost-driving factors.</div></div>}
                                        {card2Updates >= 1 && <div className="update-item"><span className="update-num">4</span> <div><strong>New Project Input:</strong> Input project scope, timeline, resources, and complexity.</div></div>}
                                        {card2Updates >= 5 && <div className="update-item"><span className="update-num">5</span> <div><strong>Cost Prediction:</strong> AI generates an estimated budget with accuracy metrics.</div></div>}
                                        {card2Updates >= 9 && <div className="update-item"><span className="update-num">6</span> <div><strong>Continuous Improvement:</strong> Model updates as more project data becomes available.</div></div>}
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

export default AICostPredictionSection;
