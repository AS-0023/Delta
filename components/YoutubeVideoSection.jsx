import React from 'react';
import './YoutubeVideoSection.css';

const YoutubeVideoSection = () => {
    return (
        <section className="youtube-video-section">
            <div className="youtube-video-wrapper">
                <div className="video-responsive">
                    <iframe
                        src="https://www.youtube.com/embed/JVhgN5gOXUc"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        </section>
    );
};

export default YoutubeVideoSection;
