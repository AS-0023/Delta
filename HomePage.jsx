import React from 'react';
import PlanAssignWorkSection from './components/PlanAssignWorkSection';
import AlignWorkGoalsSection from './components/AlignWorkGoalsSection';
import AllTemplatesSection from './components/AllTemplatesSection';
import AnimatedInputSection from './components/AnimatedInputSection';

import ChatbotAnimationSection from './components/ChatbotAnimationSection';
import ProjectTrackingSection from './components/ProjectTrackingSection';
import AIPoweredManagementSection from './components/AIPoweredManagementSection';
import RadiantDomeSection from './components/RadiantDomeSection';
import orangeImg from './assets/orange_image.png';

const HomePage = () => {
    return (
        <>
            {/* Hero Section */}
            <header className="hero">
                <div className="hero-content">
                    <div className="hero-text-start">
                        <h1>
                            Focus on <br />
                            <span className="highlight-text">OUTCOMES</span>, <br />
                            not admin
                        </h1>
                        <p className="subheadline">
                            AI-powered project management that removes the work around work.
                        </p>
                    </div>

                    <div className="auth-container">
                        <label className="input-label">Work email</label>
                        <input type="email" placeholder="you@company.com" className="email-input" />
                        <p className="helper-text">Using a work email helps find teammates and boost collaboration.</p>

                        <button className="btn-primary-large">Sign up</button>

                        <div className="divider">
                            <span>Or continue with</span>
                        </div>

                        <button className="btn-google">
                            <svg className="google-icon" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                            </svg>
                            Google
                        </button>
                    </div>
                </div>

                {/* Feature Cards Section */}
                <div className="cards-grid">
                    {/* Card 1: Software Development */}
                    <div className="card">
                        <div className="card-badge blue">PROJECT AND TASK TRACKING</div>
                        <h3>Software development</h3>
                        <div className="card-ui-mockup dark">
                            <div className="mockup-header">IN PROGRESS</div>

                            <div className="mockup-kanban-card">
                                <p>Optimize experience for mobile web</p>
                                <div className="mkc-badges">
                                    <span className="mkc-tag badge-feedback">FEEDBACK</span>
                                </div>
                                <div className="mkc-footer">
                                    <div className="mkc-issue">
                                        <div className="mkc-checkbox">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/event"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#4C9AFF" strokeWidth="2" /><path d="M7 12l3 3 7-7" stroke="#4C9AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </div>
                                        <span>NUC-335</span>
                                    </div>
                                    <div className="mkc-avatars">
                                        <div className="mkc-avatar hex-green" title="Idea">💡<span className="status-dot"></span></div>
                                        <div className="mkc-avatar hex-blue" title="Wrench">🔧<span className="status-dot"></span></div>
                                        <div className="mkc-avatar round-img" style={{ backgroundImage: "url('https://randomuser.me/api/portraits/women/44.jpg')" }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mockup-kanban-card">
                                <p>Bump version for new API</p>
                                <div className="mkc-badges">
                                    <span className="mkc-tag badge-forms">FORMS</span>
                                </div>
                                <div className="mkc-footer">
                                    <div className="mkc-issue">
                                        <div className="mkc-checkbox">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/event"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#4C9AFF" strokeWidth="2" /><path d="M7 12l3 3 7-7" stroke="#4C9AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        </div>
                                        <span>NUC-336</span>
                                    </div>
                                    <div className="mkc-avatars">
                                        <div className="mkc-avatar hex-blue-dark" title="Plugin">🧩<span className="status-dot"></span></div>
                                        <div className="mkc-avatar round-img purple-bg" style={{ backgroundImage: "url('https://randomuser.me/api/portraits/men/32.jpg')" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Marketing */}
                    <div className="card">
                        <div className="card-badge yellow">PLAN AND LAUNCH CAMPAIGNS</div>
                        <h3>Marketing</h3>
                        <div className="card-ui-mockup mk-calendar">
                            <div className="mk-cal-header">
                                <div className="mk-cal-col">MON</div>
                                <div className="mk-cal-col">TUE</div>
                            </div>
                            <div className="mk-cal-grid">
                                <div className="mk-cal-row">
                                    <div className="mk-cal-cell">
                                        <div className="mk-cal-date">28</div>
                                        <div className="mk-cal-event mk-purple">
                                            <span className="mk-icon">⚡</span> CRE-18 <b>Workshop video brief</b>
                                        </div>
                                    </div>
                                    <div className="mk-cal-cell">
                                        <div className="mk-cal-date">29</div>
                                        <div className="mk-cal-event mk-pink">
                                            <span className="mk-icon">⚡</span> ENG-39 <b>New Landing</b>
                                        </div>
                                        <div className="mk-cal-event mk-blue">
                                            <span className="mk-icon solid">■</span> MKT-24 <b>Message hou</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="mk-cal-row">
                                    <div className="mk-cal-cell">
                                        <div className="mk-cal-date">5</div>
                                    </div>
                                    <div className="mk-cal-cell">
                                        <div className="mk-cal-date">6</div>
                                        <div className="mk-cal-spacer"></div>
                                        <div className="mk-cal-event mk-blue">
                                            <span className="mk-icon solid">■</span> MKT-25 <b>Set up socia</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="mk-cal-row">
                                    <div className="mk-cal-cell" style={{ borderBottom: 'none' }}>
                                        <div className="mk-cal-date">12</div>
                                        <div className="mk-cal-event mk-blue">
                                            <span className="mk-icon solid">■</span> MKT-28 <b>Campaign QA</b>
                                        </div>
                                    </div>
                                    <div className="mk-cal-cell" style={{ borderBottom: 'none' }}>
                                        <div className="mk-cal-date">13</div>
                                        <div className="mk-cal-spacer"></div>
                                        <div className="mk-cal-event mk-pink">
                                            <span className="mk-icon">⚡</span> ENG-40 <b>Add widget</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Project Management */}
                    <div className="card">
                        <div className="card-badge purple">TURN IDEAS INTO DELIVERY</div>
                        <h3>Project management</h3>
                        <div className="card-ui-mockup pm-graph">
                            <div className="pm-sidebar">
                                <div className="pm-list-item"><span className="pm-icon orange">⚙️</span> Digital Transfo...</div>
                                <div className="pm-list-item"><span className="pm-icon green">🔬</span> Research and...</div>
                                <div className="pm-list-item"><span className="pm-icon orange">⚙️</span> Digital Transfo...</div>
                                <div className="pm-list-item border-none"><span className="pm-icon green">🔬</span> Data-Driven D...</div>
                            </div>
                            <div className="pm-timeline">
                                <div className="pm-bar pm-blue-bar" style={{ top: '15px', left: '10px', width: '100px' }}>🔗</div>
                                <div className="pm-bar pm-gray-bar" style={{ top: '165px', left: '10px', width: '80px' }}>🔗</div>
                                <div className="pm-bar pm-light-blue-bar" style={{ top: '215px', left: '0px', width: '60px' }}></div>

                                <svg className="pm-lines" viewBox="0 0 150 250">
                                    <path d="M 110 25 C 160 25, 140 175, 90 175" fill="none" stroke="#E15C56" strokeWidth="1.5" />
                                    <path d="M 60 225 C 130 225, 150 175, 90 175" fill="none" stroke="#E15C56" strokeWidth="1.5" />
                                </svg>

                                <div className="pm-popup">
                                    <div className="pm-popup-row">
                                        <div className="pm-checkbox">☑️</div>
                                        <span className="pm-text">DSC-78 Q4 Launch Microsite copy</span>
                                    </div>
                                    <div className="pm-popup-link-row">
                                        <div className="pm-link-badge">🔗</div>
                                        <span className="pm-text">blocks</span>
                                    </div>
                                    <div className="pm-popup-row">
                                        <div className="pm-icon purple">⚡</div>
                                        <span className="pm-text">VDT-45 Create Q4 Launch Microsite</span>
                                    </div>
                                    <div className="pm-popup-alert">
                                        <span className="pm-alert-icon">⚠️</span> Off track
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: IT */}
                    <div className="card">
                        <div className="card-badge">MANAGE AND TRACK REQUESTS</div>
                        <h3>IT</h3>
                        <div className="card-ui-mockup form" style={{ padding: 0, overflow: 'hidden' }}>
                            <img src={orangeImg} alt="IT Requests" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>
                </div>
            </header>


            <ChatbotAnimationSection />
            <ProjectTrackingSection />
            <AIPoweredManagementSection />
            <PlanAssignWorkSection />
            <AlignWorkGoalsSection />
            <AllTemplatesSection />
            <RadiantDomeSection />
            <AnimatedInputSection />
        </>
    );
};

export default HomePage;
