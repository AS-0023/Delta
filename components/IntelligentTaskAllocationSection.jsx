import React, { useState, useEffect } from 'react';
import './IntelligentTaskAllocationSection.css';

const IntelligentTaskAllocationSection = () => {
    const [ticks, setTicks] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTicks((t) => (t > 50 ? 0 : t + 1));
        }, 400); // 400ms per tick
        return () => clearInterval(timer);
    }, []);

    const promptText = "Assign the upcoming sprint's backlog to the team based on past performance, skill sets, and current capacity.";
    const typingLength = Math.min(promptText.length, Math.max(0, (ticks - 2) * 6));
    const displayedPrompt = promptText.substring(0, typingLength);

    const showCard1 = ticks >= 10;
    const card1Updates = Math.max(0, ticks - 11);
    const card2Updates = Math.max(0, ticks - 25);

    return (
        <section className="intelligent-task-allocation-section" id="intelligent-task-allocation">
            <div className="intelligent-task-allocation-container">
                <div className="intelligent-task-allocation-left">
                    <h2 className="ai-section-title">Intelligent Task Allocation System</h2>
                    <p className="ai-section-subtitle">
                        The Intelligent Task Allocation System assigns tasks using AI based on skills, workload, and deadlines. It improves productivity by ensuring the right person handles the right task at the right time.
                    </p>
                </div>

                <div className="intelligent-task-allocation-right">
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
                                    <div className="card-title">Task Requirements & Auto-Assignment</div>
                                    <div className="card-subtitle">Analyzing skills, balancing workload, and automating assignments.</div>
                                </div>

                                <div>
                                    <div className="progress-updates-header">
                                        <div className="progress-updates-title">Progress updates</div>
                                        <div className="expand-all">Expand all &lt;</div>
                                    </div>
                                    <div className="updates-list">
                                        {card1Updates >= 1 && <div className="update-item"><span className="update-num">1</span> <div><strong>Team Data Analysis:</strong> Collect skills, experience, availability, and past performance data.</div></div>}
                                        {card1Updates >= 5 && <div className="update-item"><span className="update-num">2</span> <div><strong>Task Requirement Evaluation:</strong> Understand task complexity, priority, and deadlines.</div></div>}
                                        {card1Updates >= 9 && <div className="update-item"><span className="update-num">3</span> <div><strong>AI Matching Engine:</strong> Match tasks to the most suitable team members.</div></div>}
                                        {card2Updates >= 1 && <div className="update-item"><span className="update-num">4</span> <div><strong>Workload Optimization:</strong> Balance workload to avoid overburdening or idle time.</div></div>}
                                        {card2Updates >= 5 && <div className="update-item"><span className="update-num">5</span> <div><strong>Auto Assignment:</strong> Assign tasks automatically for maximum efficiency.</div></div>}
                                        {card2Updates >= 9 && <div className="update-item"><span className="update-num">6</span> <div><strong>Feedback Learning:</strong> Improve future allocations based on performance results.</div></div>}
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

export default IntelligentTaskAllocationSection;
