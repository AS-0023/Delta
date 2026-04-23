import React, { useState } from 'react';
import { BarChart2, Target, GitBranch, FileText, AlertTriangle, CheckSquare, CheckCircle, UserCheck, Binoculars } from 'lucide-react';
import './ProjectTrackingSection.css';

const tabData = {
    seeData: {
        id: 'seeData',
        label: 'See data',
        title: 'Stay updated with summaries',
        items: [
            { icon: <BarChart2 />, text: 'Get key metrics at a glance' },
            { icon: <Target />, text: 'Track project progress and priorities' },
            { icon: <GitBranch />, text: 'Identify issues to make quick decisions' }
        ],
        mockupType: 'data'
    },
    intakeWork: {
        id: 'intakeWork',
        label: 'Intake work',
        title: 'Manage requests on mobile',
        items: [
            { icon: <FileText />, text: 'Standardize and customize forms' },
            { icon: <AlertTriangle />, text: 'Submit requests and report issues' },
            { icon: <CheckSquare />, text: 'Streamline task assignments' }
        ],
        mockupType: 'intake'
    },
    getApprovals: {
        id: 'getApprovals',
        label: 'Get approvals',
        title: 'Unblock work right away',
        items: [
            { icon: <CheckCircle />, text: 'Review and approve work items' },
            { icon: <UserCheck />, text: 'Assign reviews to the right users' },
            { icon: <Binoculars />, text: 'Create a consistent review process' }
        ],
        mockupType: 'approvals'
    }
};

const ProjectTrackingSection = () => {
    const [activeTab, setActiveTab] = useState('seeData');
    const data = tabData[activeTab];

    return (
        <section className="project-tracking-section">
            <h2 className="pt-main-title">Track and make progress on your team's projects</h2>

            <div className="pt-tabs">
                {Object.values(tabData).map(tab => (
                    <button
                        key={tab.id}
                        className={`pt-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="pt-content" key={activeTab}>
                <div className="pt-text-side">
                    <h3 className="pt-content-title">{data.title}</h3>
                    <ul className="pt-list">
                        {data.items.map((item, index) => (
                            <li key={index} className="pt-list-item">
                                <span className="pt-icon-wrapper">{item.icon}</span>
                                <span className="pt-text">{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="pt-image-side">
                    <div className={`pt-mockup-container ${data.mockupType}`}>
                        {data.mockupType === 'data' && (
                            <>
                                <div className="pt-bg-decor seeData-decor1"></div>
                                <div className="pt-bg-decor seeData-decor2"></div>
                                <div className="pt-bg-decor seeData-decor3"></div>
                                <div className="pt-mockup-image data-mockup">
                                    <div className="pt-phone-header">
                                        <span className="pt-back">&lt;</span>
                                        <span className="pt-title">Creative Operations ▾</span>
                                        <span className="pt-dots">···</span>
                                    </div>
                                    <div className="pt-phone-tabs">
                                        <span className="active">Summary</span><span>Board</span><span>Calendar</span><span>Forms</span>
                                    </div>
                                    <div className="pt-phone-content">
                                        <div className="pt-grid-2">
                                            <div className="pt-stat-card"><div className="pt-stat-icon green">✔</div><b>8 done</b><small>in the last 7 days</small></div>
                                            <div className="pt-stat-card"><div className="pt-stat-icon blue">📝</div><b>23 updated</b><small>in the last 7 days</small></div>
                                            <div className="pt-stat-card"><div className="pt-stat-icon purple">+</div><b>13 created</b><small>in the last 7 days</small></div>
                                            <div className="pt-stat-card"><div className="pt-stat-icon red">📅</div><b>2 due</b><small>in the next 7 days</small></div>
                                        </div>
                                        <div className="pt-chart-card">
                                            <b>Priority breakdown</b>
                                            <small style={{ display: 'block', marginBottom: '8px', color: '#5e6c84' }}>in the last 14 days</small>
                                            <div className="pt-bar-chart">
                                                <div className="pt-bar red"></div>
                                                <div className="pt-bar orange"></div>
                                                <div className="pt-bar red"></div>
                                                <div className="pt-bar yellow"></div>
                                                <div className="pt-bar blue"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {data.mockupType === 'intake' && (
                            <>
                                <div className="pt-bg-decor intakeWork-decor1"></div>
                                <div className="pt-bg-decor intakeWork-decor2"></div>
                                <div className="pt-mockup-image intake-mockup">
                                    <div className="pt-phone-header">
                                        <span className="pt-back">&lt;</span>
                                        <span className="pt-title">App Build ▾</span>
                                        <span className="pt-dots">···</span>
                                    </div>
                                    <div className="pt-phone-tabs">
                                        <span>Summary</span><span>Board</span><span>Calendar</span><span className="active">Forms</span>
                                    </div>
                                    <div className="pt-phone-content pt-forms-list">
                                        <div className="pt-form-card border-left-green">
                                            <b>Content Request Form</b>
                                            <small>Last updated 1 month ago by Marisa Robertson</small>
                                            <div className="pt-form-tag blue">☑ Task</div>
                                        </div>
                                        <div className="pt-form-card border-left-purple">
                                            <b>Request for Research</b>
                                            <small>Last updated 3 days ago by John Mayer</small>
                                            <div className="pt-form-tag purple">📋 Research</div>
                                        </div>
                                        <div className="pt-form-card border-left-cyan">
                                            <b>Bug Report for iOS</b>
                                            <small>Last updated last week by Marisa Robertson</small>
                                            <div className="pt-form-tag red">🐞 Bug</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {data.mockupType === 'approvals' && (
                            <>
                                <div className="pt-bg-decor getApprovals-decor1"></div>
                                <div className="pt-bg-decor getApprovals-decor2"></div>
                                <div className="pt-bg-decor getApprovals-decor3"></div>
                                <div className="pt-mockup-image approvals-mockup">
                                    <div className="pt-phone-header">
                                        <span className="pt-back">&lt;</span>
                                        <span className="pt-title">Marketing Team ▾</span>
                                        <span className="pt-dots">···</span>
                                    </div>
                                    <div className="pt-phone-tabs">
                                        <span>Summary</span><span>Board</span><span>Calendar</span><span className="active">Approvals</span>
                                    </div>
                                    <div className="pt-phone-content pt-approvals-list">
                                        <div className="pt-approval-card">
                                            <div className="pt-approval-status">
                                                <span className="pt-tag-box blue">IN REVIEW</span> → <span className="pt-tag-box green">DONE</span>
                                                <span className="pt-count">2/7 👥</span>
                                            </div>
                                            <b>Q4 strategy for billboards</b>
                                            <small>SPR-2731</small>
                                            <div className="pt-action-buttons">
                                                <button className="pt-mockup-btn green">✔ Approve</button>
                                                <button className="pt-mockup-btn red">✖ Decline</button>
                                            </div>
                                            <div className="pt-approver-list">
                                                <div className="pt-approver"><div className="pt-avatar">CS</div> <small>Cadence Smith (You)</small></div>
                                                <div className="pt-approver"><div className="pt-avatar">MS</div> <small>Martha Samuels</small></div>
                                                <div className="pt-approver"><div className="pt-avatar">RW</div> <small>Randy Wright</small></div>
                                                <div className="pt-more-approvers">⌄ 4 more approvers</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectTrackingSection;
