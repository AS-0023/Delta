import React, { useState, useEffect } from 'react';
import './ProductivityMonitoringSection.css';

const ProductivityMonitoringSection = () => {
    const [ticks, setTicks] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTicks((t) => (t > 50 ? 0 : t + 1));
        }, 400); // 400ms per tick
        return () => clearInterval(timer);
    }, []);

    const promptText = "Analyze the current sprint's task progress and team time logs to identify productivity bottlenecks and workload balance.";
    const typingLength = Math.min(promptText.length, Math.max(0, (ticks - 2) * 6));
    const displayedPrompt = promptText.substring(0, typingLength);

    const showCard1 = ticks >= 10;
    const card1Updates = Math.max(0, ticks - 11);

    const showCard2 = ticks >= 24;
    const card2Updates = Math.max(0, ticks - 25);

    return (
        <section className="productivity-monitoring-section" id="productivity-monitoring">
            <div className="productivity-monitoring-container">
                <div className="productivity-monitoring-left">
                    <h2 className="ai-section-title">Real-Time Productivity Monitoring</h2>
                    <p className="ai-section-subtitle">
                        Real-Time Productivity Monitoring tracks task progress, time usage, and team activity as work happens. The system analyzes performance metrics and updates live dashboards to show productivity levels instantly. It also provides alerts and insights to improve efficiency and ensure projects stay on track.
                    </p>
                </div>

                <div className="productivity-monitoring-right">
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
                                    <div className="card-title">Data Tracking & Analysis Insights</div>
                                    <div className="card-subtitle">Collecting real-time data, monitoring work patterns, and updating dashboards.</div>
                                </div>

                                <div>
                                    <div className="progress-updates-header">
                                        <div className="progress-updates-title">Progress updates</div>
                                        <div className="expand-all">Expand all &lt;</div>
                                    </div>
                                    <div className="updates-list">
                                        {card1Updates >= 1 && <div className="update-item"><span className="update-num">1</span> <div><strong>Data Collection:</strong> The system collects real-time data from tasks, time logs, project tools, and user activities.</div></div>}
                                        {card1Updates >= 5 && <div className="update-item"><span className="update-num">2</span> <div><strong>Activity Tracking:</strong> It monitors task progress, time spent, status updates, and work patterns.</div></div>}
                                        {card1Updates >= 9 && <div className="update-item"><span className="update-num">3</span> <div><strong>Performance Analysis:</strong> AI analyzes productivity metrics like task completion rate, delays, workload balance, and efficiency.</div></div>}
                                        {card2Updates >= 1 && <div className="update-item"><span className="update-num">4</span> <div><strong>Live Dashboard Updates:</strong> Results are displayed instantly on dashboards with charts and performance indicators.</div></div>}
                                        {card2Updates >= 5 && <div className="update-item"><span className="update-num">5</span> <div><strong>Alerts & Insights:</strong> The system sends alerts for delays, overload, or low productivity and provides improvement suggestions.</div></div>}
                                        {card2Updates >= 9 && <div className="update-item"><span className="update-num">6</span> <div><strong>Continuous Improvement:</strong> As more data is tracked, the system refines insights and improves accuracy over time.</div></div>}
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

export default ProductivityMonitoringSection;
