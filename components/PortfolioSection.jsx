import React, { useState, useEffect } from 'react';
import './PortfolioSection.css';

const PortfolioSection = () => {
    const [activeTextIndex, setActiveTextIndex] = useState(0);
    const words = ["AI FEATURE"];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTextIndex((prev) => (prev + 1) % words.length);
        }, 3000); // Change text every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const cards = [
        { title: "Intelligent Performance Scoring", subtitle: "See More", color: "linear-gradient(135deg, #FF00CC 0%, #333399 100%)" },
        { title: "Real-Time Productivity Monitoring", subtitle: "See More", color: "linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)" },
        { title: "Intelligent Task Allocation System", subtitle: "See More", color: "linear-gradient(135deg, #FC00FF 0%, #00DBDE 100%)" },
        { title: "Real-Time Productivity Monitoring", subtitle: "See More", color: "linear-gradient(135deg, #fce38a 0%, #f38181 100%)" },
        { title: "AI-Based Cost Estimation Engine", subtitle: "See More", color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
        { title: "Risk Detection & Early Warning System", subtitle: "See More", color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)" },
    ];

    return (
        <div className="portfolio-section">
            <div className="text-container">
                {words.map((word, index) => (
                    <h1
                        key={index}
                        className={`portfolio-title ${index === activeTextIndex ? 'active' : ''}`}
                    >
                        {word}
                    </h1>
                ))}
            </div>

            <div className="cards-container">
                <div className="orbit-system">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="orbit-card"
                            style={{
                                '--index': index,
                                '--total': cards.length,
                                '--card-gradient': card.color
                            }}
                        >
                            <div className="card-content">
                                <div className="card-bg"></div>
                                <h3>{card.title}</h3>
                                <button className="see-more-btn">
                                    {card.subtitle} <span className="play-icon">▶</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioSection;
