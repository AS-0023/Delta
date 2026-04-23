import React, { useState, useEffect } from 'react';
import './RiskDetectionSection.css';

const RiskDetectionSection = () => {
    const [ticks, setTicks] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTicks((t) => (t > 50 ? 0 : t + 1));
        }, 400); // 400ms per tick
        return () => clearInterval(timer);
    }, []);

    const promptText = "Analyze current project timelines and resource usage to predict potential deadline slippage or budget overruns.";
    const typingLength = Math.min(promptText.length, Math.max(0, (ticks - 2) * 6));
    const displayedPrompt = promptText.substring(0, typingLength);

    const showCard1 = ticks >= 10;
    const card1Updates = Math.max(0, ticks - 11);
    const card2Updates = Math.max(0, ticks - 25);

    return (
        <section className="risk-detection-section" id="risk-detection">
            <div className="risk-detection-container">
                <div className="risk-detection-left">
                    <h2 className="ai-section-title">Risk Detection & Early Warning System</h2>
                    <p className="ai-section-subtitle">
                        The Risk Detection & Early Warning System uses AI to monitor project data and identify potential risks before they become major problems. It provides early alerts and actionable insights to ensure smoother project execution.
                    </p>
                </div>

                <div className="risk-detection-right">
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
                                    <div className="card-title">Risk Monitoring & Alert Engine Active</div>
                                    <div className="card-subtitle">Tracking data, identifying patterns, and assessing impacts.</div>
                                </div>

                                <div>
                                    <div className="progress-updates-header">
                                        <div className="progress-updates-title">Progress updates</div>
                                        <div className="expand-all">Expand all &lt;</div>
                                    </div>
                                    <div className="updates-list">
                                        {card1Updates >= 1 && <div className="update-item"><span className="update-num">1</span> <div><strong>Data Monitoring:</strong> Continuously track project timelines, budgets, task delays, and resource usage.</div></div>}
                                        {card1Updates >= 5 && <div className="update-item"><span className="update-num">2</span> <div><strong>Pattern Analysis:</strong> AI analyzes historical and real-time data to detect risk patterns.</div></div>}
                                        {card1Updates >= 9 && <div className="update-item"><span className="update-num">3</span> <div><strong>Risk Identification:</strong> The system identifies potential risks like deadline slippage or budget overruns.</div></div>}
                                        {card2Updates >= 1 && <div className="update-item"><span className="update-num">4</span> <div><strong>Impact Assessment:</strong> Evaluates the severity and possible impact of each risk.</div></div>}
                                        {card2Updates >= 5 && <div className="update-item"><span className="update-num">5</span> <div><strong>Early Alerts:</strong> Sends notifications and recommendations to managers before issues escalate.</div></div>}
                                        {card2Updates >= 9 && <div className="update-item"><span className="update-num">6</span> <div><strong>Continuous Learning:</strong> Improves prediction accuracy as more project data is collected.</div></div>}
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

export default RiskDetectionSection;
