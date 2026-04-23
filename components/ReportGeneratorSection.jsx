import React, { useState, useEffect } from 'react';
import './ReportGeneratorSection.css';

const ReportGeneratorSection = () => {
    const [ticks, setTicks] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTicks((t) => (t > 50 ? 0 : t + 1));
        }, 400); // 400ms per tick
        return () => clearInterval(timer);
    }, []);

    const promptText = "Generate a comprehensive end-of-project report summarizing all tasks, resources used, timelines, and key performance metrics.";
    const typingLength = Math.min(promptText.length, Math.max(0, (ticks - 2) * 6));
    const displayedPrompt = promptText.substring(0, typingLength);

    const showCard1 = ticks >= 10;
    const card1Updates = Math.max(0, ticks - 11);
    const card2Updates = Math.max(0, ticks - 25);

    return (
        <section className="report-generator-section" id="report-generator">
            <div className="report-generator-container">
                <div className="report-generator-left">
                    <h2 className="ai-section-title">Intelligent Report & Auto-Documentation Generator</h2>
                    <p className="ai-section-subtitle">
                        The Intelligent Report & Auto-Documentation Generator uses AI to automatically create structured project reports from real-time data. It saves time, reduces manual effort, and ensures accurate, up-to-date documentation for better decision-making.
                    </p>
                </div>

                <div className="report-generator-right">
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
                                    <div className="card-title">Data Gathering & Report Compilation</div>
                                    <div className="card-subtitle">Analyzing inputs, structuring content, and generating customized summaries.</div>
                                </div>

                                <div>
                                    <div className="progress-updates-header">
                                        <div className="progress-updates-title">Progress updates</div>
                                        <div className="expand-all">Expand all &lt;</div>
                                    </div>
                                    <div className="updates-list">
                                        {card1Updates >= 1 && <div className="update-item"><span className="update-num">1</span> <div><strong>Data Collection:</strong> Gather project data such as tasks, progress updates, timelines, performance metrics, and communications.</div></div>}
                                        {card1Updates >= 5 && <div className="update-item"><span className="update-num">2</span> <div><strong>Content Analysis:</strong> AI analyzes structured and unstructured data to understand key highlights and outcomes.</div></div>}
                                        {card1Updates >= 9 && <div className="update-item"><span className="update-num">3</span> <div><strong>Report Generation:</strong> Automatically create structured reports including summaries, charts, insights, and key metrics.</div></div>}
                                        {card2Updates >= 1 && <div className="update-item"><span className="update-num">4</span> <div><strong>Formatting & Customization:</strong> Generate reports in different formats (PDF, DOC, dashboard view) based on user needs.</div></div>}
                                        {card2Updates >= 5 && <div className="update-item"><span className="update-num">5</span> <div><strong>Auto-Updates:</strong> Reports are updated dynamically as project data changes.</div></div>}
                                        {card2Updates >= 9 && <div className="update-item"><span className="update-num">6</span> <div><strong>Storage & Sharing:</strong> Save reports securely and allow easy sharing with stakeholders.</div></div>}
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

export default ReportGeneratorSection;
