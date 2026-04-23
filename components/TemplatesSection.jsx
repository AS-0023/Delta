import React, { useEffect, useRef, useState } from 'react';
import './TemplatesSection.css';

const TemplatesSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const imagePath = "/images/dashboard.png";

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <section className="templates-section" ref={sectionRef}>
            <div className={`templates-container ${isVisible ? 'fade-in' : ''}`}>
                <div className="template-visual">
                    <div className="bg-blob"></div>
                    <div className="macbook-frame">
                        <div className="screen">
                            <img src={imagePath} alt="Project Planning Dashboard" className="dashboard-img" />
                        </div>
                    </div>
                </div>

                <div className="template-content">
                    <span className="eyebrow">PLANNING</span>
                    <h2 className="template-title">Complex campaigns?<br />No problem</h2>
                    <p className="template-description">
                        Break campaigns down into small, manageable pieces. With flexible views, your team can build campaigns with confidence, track every detail, and deliver on time.
                    </p>

                    <div className="feature-list">
                        <div className="feature-item">
                            <span className="check-icon">✓</span>
                            <span>Automated workflow triggers</span>
                        </div>
                        <div className="feature-item">
                            <span className="check-icon">✓</span>
                            <span>Real-time collaboration tools</span>
                        </div>
                        <div className="feature-item">
                            <span className="check-icon">✓</span>
                            <span>Customizable Kanban boards</span>
                        </div>
                    </div>

                    <button className="cta-button">
                        Explore Templates <span className="arrow">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TemplatesSection;
