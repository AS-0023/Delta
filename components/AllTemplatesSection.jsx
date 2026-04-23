import React from 'react';
import './AllTemplatesSection.css';
import { Target, Search, MoreHorizontal, Filter, Plus, ChevronDown, CheckSquare, Sparkles } from 'lucide-react';
import backlogImg from '../assets/template1.png';
import boardImg from '../assets/template2.png';
import issuesImg from '../assets/template3.png';
import timelineImg from '../assets/template4.png';
import formImg from '../assets/template5.png';
import darkBoardImg from '../assets/template6.png';
import itsmImg from '../assets/template7.png';
import analyticsImg from '../assets/template8.png';
import recruitmentImg from '../assets/template9.png';

const AllTemplatesSection = () => {
    return (
        <div className="all-templates-wrapper">
            <section className="all-templates-section">
                <div className="at-header">
                    <h2 className="at-title">All TEMPLATES</h2>
                    <p className="at-subtitle">
                        Let Rovo handle the work around your work so your team can focus on what matters.
                    </p>
                </div>

                <div className="at-cards-container">

                    {/* Card 1 */}
                    <div className="at-card mock-card-1" style={{ backgroundColor: '#f4f5f7', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <img src={backlogImg} alt="Scrum" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                        <div className="at-card-content">
                            <h3 className="at-card-title">Scrum</h3>
                            <p className="at-card-desc">Visualize, track, and manage your work easily from sprint to sprint.</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="at-card mock-card-2" style={{ backgroundColor: '#f4f5f7', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <img src={boardImg} alt="Kanban" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                        <div className="at-card-content">
                            <h3 className="at-card-title">Kanban</h3>
                            <p className="at-card-desc">Manage a continuous delivery of work on a powerful board.</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="at-card mock-card-3" style={{ backgroundColor: '#f4f5f7', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <img src={issuesImg} alt="Bug tracking" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                        <div className="at-card-content">
                            <h3 className="at-card-title">Bug tracking</h3>
                            <p className="at-card-desc">Capture, track, and resolve bugs quickly.</p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="at-card mock-card-4" style={{ backgroundColor: '#f4f5f7', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <img src={timelineImg} alt="Project management" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                        <div className="at-card-content">
                            <h3 className="at-card-title">Project management</h3>
                            <p className="at-card-desc">Manage activities for completing a business project.</p>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div className="at-card mock-card-5" style={{ backgroundColor: '#f4f5f7', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <img src={formImg} alt="Procurement" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                        <div className="at-card-content">
                            <h3 className="at-card-title">Procurement</h3>
                            <p className="at-card-desc">Track all purchases from request to receipt.</p>
                        </div>
                    </div>

                    {/* Card 6 */}
                    <div className="at-card mock-card-6" style={{ backgroundColor: '#f4f5f7', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <img src={darkBoardImg} alt="Event planning" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                        <div className="at-card-content">
                            <h3 className="at-card-title">Event planning</h3>
                            <p className="at-card-desc">Plan your next event and simplify all the details.</p>
                        </div>
                    </div>

                    {/* Card 7 */}
                    <div className="at-card mock-card-7" style={{ backgroundColor: '#f4f5f7', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <img src={itsmImg} alt="IT service management" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                        <div className="at-card-content">
                            <h3 className="at-card-title">IT service management</h3>
                            <p className="at-card-desc">Intake requests, set up alerts, raise incidents, and fix issues quickly.</p>
                        </div>
                    </div>

                    {/* Card 8 */}
                    <div className="at-card mock-card-8" style={{ backgroundColor: '#f4f5f7', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <img src={analyticsImg} alt="Analytics service management" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                        <div className="at-card-content">
                            <h3 className="at-card-title">Analytics service management</h3>
                            <p className="at-card-desc">Manage employee requests for the data and insights they need.</p>
                        </div>
                    </div>

                    {/* Card 9 */}
                    <div className="at-card mock-card-9" style={{ backgroundColor: '#f4f5f7', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <img src={recruitmentImg} alt="Recruitment" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                        <div className="at-card-content">
                            <h3 className="at-card-title">Recruitment</h3>
                            <p className="at-card-desc">Track candidates from application to offer.</p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default AllTemplatesSection;
