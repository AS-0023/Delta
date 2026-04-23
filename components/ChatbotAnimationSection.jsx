import React from 'react';
import './ChatbotAnimationSection.css';

const ChatbotAnimationSection = () => {
    return (
        <section className="chatbot-animation-section">
            <div className="chatbot-surround-wrapper">

                {/* Top Node */}
                <div className="surround-node node-top">
                    <span>Intelligent Performance Scoring Engine</span>
                </div>

                {/* Left Nodes */}
                <div className="surround-node node-left-1">
                    <span>Real-Time Productivity Monitoring</span>
                </div>
                <div className="surround-node node-left-2">
                    <span>Intelligent Task Allocation System</span>
                </div>

                {/* Right Nodes */}
                <div className="surround-node node-right-1">
                    <span>AI-Based Cost Estimation Engine</span>
                </div>
                <div className="surround-node node-right-2">
                    <span>Risk Detection & Early Warning System</span>
                </div>

                {/* Bottom Node */}
                <div className="surround-node node-bottom">
                    <span>Automated Performance Scoring</span>
                </div>

                <div className="chatbot-container">
                    {/* Glowing Base */}
                    <div className="chatbot-base"></div>

                    {/* Rotating Futuristic Interface */}
                    <div className="rotating-interface">
                        <div className="ring ring-1"></div>
                        <div className="ring ring-2"></div>
                        <div className="ring ring-3"></div>
                    </div>

                    {/* Main Robot */}
                    <div className="robot">
                        <div className="robot-head">
                            <div className="robot-antennas">
                                <div className="antenna left"></div>
                                <div className="antenna right"></div>
                            </div>
                            <div className="robot-headphones">
                                <div className="earpiece left"></div>
                                <div className="earpiece right"></div>
                            </div>
                            <div className="robot-face">
                                <div className="robot-eyes">
                                    <div className="eye left"></div>
                                    <div className="eye right"></div>
                                </div>
                                <div className="robot-mouth"></div>
                            </div>
                        </div>

                        <div className="robot-body">
                            <div className="robot-torso">
                                <div className="robot-core">
                                    <div className="core-inner"></div>
                                </div>
                            </div>
                            <div className="robot-arms">
                                <div className="arm left"></div>
                                <div className="arm right"></div>
                            </div>
                        </div>
                    </div>

                    {/* Speech Bubbles */}
                    <div className="speech-bubbles">
                        <div className="bubble bubble-top">
                            <div className="dot"></div><div className="dot active"></div><div className="dot"></div>
                        </div>
                        <div className="bubble bubble-middle">
                            <div className="dot active"></div><div className="dot"></div><div className="dot"></div>
                        </div>
                        <div className="bubble bubble-bottom">
                            <div className="dot"></div><div className="dot active"></div><div className="dot"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChatbotAnimationSection;
