import React from 'react';
import './AIPoweredManagementSection.css';
import { ArrowUpRight, FileCheck2, Zap, BarChart3, Search, Plus, Filter, LayoutList, ChevronDown, CheckCircle2 } from 'lucide-react';

const AIPoweredManagementSection = () => {
    return (
        <section className="ai-management-section">
            <div className="ai-mgt-blue-shape-container">
                <div className="ai-mgt-blue-shape"></div>
            </div>

            <div className="ai-mgt-header-container">
                <div className="ai-mgt-header">
                    <h2 className="ai-mgt-title">Meet AI-powered project management</h2>
                </div>
            </div>

            <div className="ai-mgt-grid">

                {/* 1. Align work to goals */}
                <div className="ai-mgt-card-new" onClick={() => window.location.href = '/agileflow'} style={{ cursor: 'pointer' }}>
                    <div className="ai-mgt-mockup-wrapper">
                        <div className="mock-align-goals">
                            <div className="mag-header">
                                <span className="mag-title"><TargetIcon /> Develop and Launch Customer Portal</span>
                                <div className="mag-header-right">
                                    <span className="mag-tag-green">On track 0.8 v</span>
                                </div>
                            </div>
                            <div className="mag-body">
                                <div className="mag-main">
                                    <div className="mag-section-title">Contributing work</div>
                                    <div className="mag-table">
                                        <div className="mag-table-header"><span>Name</span><span>Status</span></div>
                                        <div className="mag-row"><span className="mag-icon">🍷</span> Portal Launch Market Launch <span className="mag-badge yellow">AT RISK</span></div>
                                        <div className="mag-row"><span className="mag-icon">💐</span> Inventory portal relaunch - design <span className="mag-badge green">ON TRACK</span></div>
                                        <div className="mag-row"><span className="mag-icon">⛺</span> Mobile Checkout Project <span className="mag-badge green">ON TRACK</span></div>
                                    </div>
                                    <div className="mag-section-title mt-2">v Work items without a project <span className="badge-count">2</span></div>
                                    <div className="mag-row"><span className="mag-icon purple">⚡</span> Develop a dedicated communication... <span className="mag-badge blue">IN PROGRESS</span></div>
                                </div>
                                <div className="mag-sidebar">
                                    <div className="mag-sidebar-item"><b>Owner</b><div className="mag-avatar">SM</div></div>
                                    <div className="mag-sidebar-item mt-2"><b>Type</b><div><TargetIcon /> Objective</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ai-mgt-card-text-area">
                        <ArrowUpRight className="ai-mgt-card-icon" size={32} />
                        <h3>Align work to goals</h3>
                        <p>Focus on work that will deliver impact and find cross-functional partners working towards the same goal</p>
                    </div>
                </div>

                {/* 2. Plan and Assign Work */}
                <div className="ai-mgt-card-new">
                    <div className="ai-mgt-mockup-wrapper gray-bg">
                        <div className="mock-plan-assign">
                            <div className="mpa-breadcrumbs">Projects / Nova corp / NOV-25</div>
                            <div className="mpa-title">Implement Control System Simulations</div>
                            <div className="mpa-buttons">
                                <button>+ Add</button> <button>Apps</button> <button className="blue-btn">❄ Improve Work Item</button>
                            </div>
                            <div className="mpa-modal">
                                <div className="mpa-modal-header"><b>Create suggested work items</b></div>
                                <div className="mpa-tasks">
                                    <div className="mpa-task"><input type="checkbox" defaultChecked /> <span className="mpa-task-id">TIC-189</span> Engage the Red Titan Hotel..</div>
                                    <div className="mpa-task"><input type="checkbox" defaultChecked /> <span className="mpa-task-id">TIC-190</span> Infographic</div>
                                    <div className="mpa-task"><span className="mpa-icon green">🔖</span> <span className="mpa-task-id">TIC-186</span> Adapt apps to new payment</div>
                                </div>
                                <div className="mpa-input-box">
                                    <input type="text" placeholder="What should I do next?" disabled />
                                </div>
                                <div className="mpa-modal-footer">
                                    <span>Uses AI. Verify results.</span>
                                    <button className="blue-solid-btn">Create all</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ai-mgt-card-text-area">
                        <FileCheck2 className="ai-mgt-card-icon" size={32} />
                        <h3>Plan and Assign Work</h3>
                        <p>Breakdown big ideas into actionable tasks and automatically assign them to the right person with Rovo AI.</p>
                    </div>
                </div>

                {/* 3. Automate workflows */}
                <div className="ai-mgt-card-new">
                    <div className="ai-mgt-mockup-wrapper">
                        <div className="mock-automate">
                            <div className="ma-flowchart">
                                <div className="ma-node start">START</div>
                                <div className="ma-line"></div>
                                <div className="ma-node white">Create</div>
                                <div className="ma-node white">NOT STARTED</div>
                                <div className="ma-node white">TO DO</div>
                                <div className="ma-node blue">PLANNING</div>
                            </div>
                            <div className="ma-chat">
                                <div className="ma-chat-header">&lt; ⚡ Workflow Builder</div>
                                <div className="ma-chat-bubble user">Create a new In Progress status and name it In Review</div>
                                <div className="ma-chat-bubble ai">
                                    Here's the newly created <span className="ma-tag">IN PROGRESS</span> status. Would you like to create this...
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ai-mgt-card-text-area">
                        <Zap className="ai-mgt-card-icon" size={32} />
                        <h3>Automate workflows</h3>
                        <p>Scale processes and save time with customizable workflows that integrate with your tech stack.</p>
                    </div>
                </div>

                {/* 4. Track your progress to Goals */}
                <div className="ai-mgt-card-new">
                    <div className="ai-mgt-mockup-wrapper purple-bg">
                        <div className="mock-track">
                            <div className="mt-header">🌐 Travel Company ⭐ </div>
                            <div className="mt-tabs">Summary Timeline List Calendar</div>
                            <div className="mt-body">
                                <div className="mt-chart-area">
                                    <div className="mt-pie-chart"><div className="mt-pie-inner">33%<br />Done</div></div>
                                </div>
                                <div className="mt-goals-modal">
                                    <div className="mt-goals-title">Goals</div>
                                    <div className="mt-progress-bar">
                                        <div className="mt-bar green" style={{ width: '40%' }}></div>
                                        <div className="mt-bar yellow" style={{ width: '20%' }}></div>
                                        <div className="mt-bar red" style={{ width: '40%' }}></div>
                                    </div>
                                    <div className="mt-goal-list">
                                        <div className="mt-goal-item"><CircleIcon color="#36b37e" /> Increase new website traffic by 5X</div>
                                        <div className="mt-goal-item"><CircleIcon color="#ffab00" /> Increase global market share 10X</div>
                                        <div className="mt-goal-item"><CircleIcon color="#bf2600" /> Deliver product growth in APAC</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ai-mgt-card-text-area">
                        <BarChart3 className="ai-mgt-card-icon" size={32} />
                        <h3>Track your progress to Goals</h3>
                        <p>Get visibility on your company's progress towards top priorities as projects advance</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

// Helper tiny icons
const TargetIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
const CircleIcon = ({ color }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" fill={color} /></svg>;

export default AIPoweredManagementSection;
