import React, { useEffect, useRef, useState } from 'react';
import './TypingEffectSection.css';

const TypingEffectSection = () => {
    const containerRef = useRef(null);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.querySelectorAll('.typing-effect');
        if (elements.length === 0) return;

        const textsToApplyEffect = Array.from(elements);

        const applyTypingEffect = (texts, onComplete = () => { }, currentText = 0) => {
            if (currentText >= texts.length) {
                onComplete();
                return;
            }

            const currentElement = texts[currentText];
            const fullText = currentElement.getAttribute('data-text');
            if (!fullText) {
                applyTypingEffect(texts, onComplete, currentText + 1);
                return;
            }

            currentElement.innerHTML = "";
            currentElement.style.display = "inline-block";

            typer(currentElement, fullText, 0, 420, () => {
                applyTypingEffect(texts, onComplete, currentText + 1);
            });
        };

        const typer = (element, text, pointer, time, onComplete = () => { }) => {
            const minimalTime = 20; // Reduced for faster reading
            const timeRandom = () => Math.random() * (time - minimalTime) + minimalTime;

            setTimeout(() => {
                element.innerHTML = text.slice(0, pointer + 1);

                if (pointer >= text.length - 1) {
                    onComplete();
                    return;
                }

                typer(element, text, pointer + 1, timeRandom(), onComplete);
            }, timeRandom());
        };

        applyTypingEffect(textsToApplyEffect, () => setComplete(true));
    }, []);

    return (
        <section className="typing-section-wrapper">
            <div className="typing-content" ref={containerRef}>
                <p className="typing-effect title-typing" data-text="Plan and Assign Work"></p>
                <p className="typing-effect" data-text="1️⃣ Set the Goal: Clearly define what needs to be achieved. The goal should be specific, measurable, and time-bound so the team understands the final outcome and expectations."></p>
                <p className="typing-effect" data-text="2️⃣ Break into Tasks: Divide the main goal into smaller, manageable tasks. Small tasks make work easier to handle, assign, track, and complete efficiently without confusion."></p>
                <p className="typing-effect" data-text="3️⃣ Assign Work: Give tasks to team members based on their skills and expertise, or allow them to choose tasks themselves in a self-organized system. Clear responsibility ensures accountability and faster progress."></p>
                <p className="typing-effect" data-text="4️⃣ Execute Tasks: Team members start working on assigned tasks step-by-step while maintaining quality and meeting deadlines."></p>
                <p className="typing-effect" data-text="5️⃣ Track Progress: Monitor the status of tasks using a workflow like To Do → In Progress → Done to ensure smooth progress and identify any delays."></p>
                <p className="typing-effect" data-text="6️⃣ Review & Complete: After finishing all tasks, review the final output, fix any issues, test properly, and deliver the completed work successfully."></p>
            </div>
        </section>
    );
};

export default TypingEffectSection;
