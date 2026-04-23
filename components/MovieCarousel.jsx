import React, { useState } from 'react';
import './MovieCarousel.css';

const movies = [
    {
        id: 1,
        title: 'AI-Based Performance Analysis',
        year: '2024',
        duration: 'Live',
        rating: '9.8',
        image: '/images/carousel-1.png',
        platform: 'ANORYX'
    },
    {
        id: 2,
        title: 'Productivity Monitoring with AI',
        year: '2024',
        duration: 'Active',
        rating: '9.5',
        image: '/images/carousel-2.png',
        platform: 'ANORYX'
    },
    {
        id: 3,
        title: 'Performance Prediction',
        year: '2024',
        duration: 'Forecast',
        rating: '9.9',
        image: '/images/carousel-3.png',
        platform: 'ANORYX'
    },
    {
        id: 4,
        title: 'Automated Performance Scoring',
        year: '2024',
        duration: 'Auto',
        rating: '9.4',
        image: '/images/carousel-4.png',
        platform: 'ANORYX'
    },
    {
        id: 5,
        title: 'Real-Time Analytics Dashboard',
        year: '2024',
        duration: 'Live',
        rating: '9.7',
        image: '/images/carousel-5.png',
        platform: 'ANORYX'
    },
    {
        id: 6,
        title: 'AI-Based Project Cost Prediction',
        year: '2024',
        duration: 'Forecast',
        rating: '9.6',
        image: '/images/carousel-6.png',
        platform: 'ANORYX'
    }
];

const MovieCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(2);
    const [selectedFeature, setSelectedFeature] = useState(null); // Modal state

    const handleCardClick = (index) => {
        if (activeIndex === index) {
            setSelectedFeature(movies[index]);
        } else {
            setActiveIndex(index);
        }
    };

    const getCardClass = (index) => {
        const total = movies.length;
        // Find shortest path in circular array for a generic approach
        let diff = index - activeIndex;
        // If difference is more than half the array, wrap it around
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;

        if (diff === 0) return 'carousel-card active';
        if (diff === -1) return 'carousel-card prev-1';
        if (diff === 1) return 'carousel-card next-1';
        if (diff === -2) return 'carousel-card prev-2';
        if (diff === 2) return 'carousel-card next-2';
        return 'carousel-card hidden';
    };

    return (
        <section className="movie-carousel-section">
            <div className="carousel-header">
                <h2>AI FEATURE</h2>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '20px', position: 'relative', zIndex: 10 }}>
                    <iframe
                        width="800"
                        height="450"
                        src="https://www.youtube.com/embed/Jj1-zb38Yfw?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=Jj1-zb38Yfw"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        style={{ borderRadius: '16px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
                    ></iframe>
                </div>
            </div>
            <div className="carousel-glow-bg"></div>
            <div className="carousel-container">
                {movies.map((movie, index) => (
                    <div
                        key={movie.id}
                        className={getCardClass(index)}
                        onClick={() => handleCardClick(index)}
                    >
                        <img src={movie.image} alt={movie.title} className="card-bg-image" />
                        <div className="card-overlay"></div>

                        <div className="card-bottom">
                            <h3>{movie.title}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {selectedFeature && (
                <div className="ai-modal-overlay" onClick={() => setSelectedFeature(null)}>
                    <div className="ai-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="ai-modal-close" onClick={() => setSelectedFeature(null)}>×</button>
                        <div className="ai-modal-left">
                            <img src={selectedFeature.image} alt={selectedFeature.title} />
                        </div>
                        <div className="ai-modal-right">
                            <h3>{selectedFeature.title}</h3>
                            <p>Dive deep into our advanced {selectedFeature.title.toLowerCase()} capabilities. Uncover insights, boost productivity, and streamline your entire workflow with cutting-edge artificial intelligence tailored specifically for your organization.</p>
                            <p>Experience seamless integration, intelligent forecasts, and real-time updates that keep you ahead of the curve in a fast-paced environment.</p>
                            <button className="ai-modal-button">Explore Feature</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MovieCarousel;
