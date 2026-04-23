import React, { useState, useEffect } from 'react';
import './AnimatedInputSection.css';

const AnimatedInputSection = () => {
    const [text, setText] = useState('');

    const sentences = [
        "How many roads must a man walk down before you call him a man?",
        "How many seas must a white dove sail before she sleeps in the sand?",
        "The answer, my friend, is blowin' in the wind"
    ];

    useEffect(() => {
        let currentSentenceIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let timeoutId;

        const handleType = () => {
            const currentSentence = sentences[currentSentenceIndex];

            // Update text based on whether we are deleting or typing
            if (isDeleting) {
                setText(currentSentence.substring(0, currentCharIndex - 1));
                currentCharIndex--;
            } else {
                setText(currentSentence.substring(0, currentCharIndex + 1));
                currentCharIndex++;
            }

            // Determine typing speed
            let typeSpeed = isDeleting ? 25 : 50;

            // Pause logics
            if (!isDeleting && currentCharIndex === currentSentence.length) {
                // Done typing the sentence, pause before deleting
                typeSpeed = 2500;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                // Done deleting the sentence, move to next and pause before starting
                isDeleting = false;
                currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
                typeSpeed = 600;
            }

            // Schedule next tick
            timeoutId = setTimeout(handleType, typeSpeed);
        };

        // Start the loop
        timeoutId = setTimeout(handleType, 1000);

        // Cleanup
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <section className="animated-input-section">
            <div className="input-field-wrapper">
                <input
                    type="text"
                    className="animated-input"
                    aria-label="Ask us anything"
                    placeholder=" " /* The space is necessary for the :not(:placeholder-shown) CSS rule */
                />
                <span className="animated-placeholder">
                    {text}<span className="blink-caret"></span>
                </span>
            </div>
        </section>
    );
};

export default AnimatedInputSection;
