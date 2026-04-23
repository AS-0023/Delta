import React, { useEffect, useRef, useState } from 'react';
import './FeaturesGrid.css';

const FeaturesGrid = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const features = [
        {
            id: 1,
            image: "/images/feature_goals.png",
            icon: "⬈", // Unicode arrow for now, or lucide icon
            title: "Align work to goals",
            desc: "Focus on work that will deliver impact and find cross-functional partners working towards the same goal.",
            color: "#0052CC" // Blue accent
        },
        {
            id: 2,
            image: "/images/feature_planning.png",
            icon: "✓", // Check icon
            title: "Plan and Assign Work",
            desc: "Breakdown big ideas into actionable tasks and automatically assign them to the right person with Rovo AI.",
            color: "#36B37E" // Green accent
        },
        {
            id: 3,
            image: "/images/feature_integration.png",
            icon: "⚡", // Lightning bolt
            title: "Track work where you work",
            desc: "Keep work up-to-date by tracking progress from your favorite tools like Slack, Figma and Gmail powered by an AI-assist.",
            color: "#FFAB00" // Yellow accent
        },
        {
            id: 4,
            image: "/images/feature_monitor.png",
            icon: "◔", // Pie chart
            title: "Monitor progress",
            desc: "Stay up-to-date on the work's progress using the view you like: boards, lists, timeline, or calendars.",
            color: "#6554C0" // Purple accent
        }
    ];

    return (
        <section className="features-grid-section" ref={sectionRef}>
            <div className={`grid-container ${isVisible ? 'animate-in' : ''}`}>
                {features.map((feature, index) => (
                    <div
                        key={feature.id}
                        className="feature-grid-card"
                        style={{ '--delay': `${index * 0.1}s` }}
                        onMouseMove={(e) => {
                            const card = e.currentTarget;
                            const rect = card.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            const centerX = rect.width / 2;
                            const centerY = rect.height / 2;
                            const rotateX = ((y - centerY) / centerY) * -10;
                            const rotateY = ((x - centerX) / centerX) * 10;
                            card.style.setProperty('--rotateX', `${rotateX}deg`);
                            card.style.setProperty('--rotateY', `${rotateY}deg`);
                        }}
                        onMouseLeave={(e) => {
                            const card = e.currentTarget;
                            card.style.setProperty('--rotateX', '0deg');
                            card.style.setProperty('--rotateY', '0deg');
                        }}
                    >
                        {/* Top Image Area */}
                        <div className="card-image-wrapper">
                            <div className="image-overlay"></div>
                            <img src={feature.image} alt={feature.title} className="card-image" />
                        </div>

                        {/* Bottom Content Area */}
                        <div className="card-text-content">
                            <div className="icon-box" style={{ color: feature.color }}>
                                {feature.icon}
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesGrid;
