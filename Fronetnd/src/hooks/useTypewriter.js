import { useState, useEffect } from "react";

/**
 * Custom hook for creating a typewriter effect
 * @param {string} text - The text to animate
 * @param {number} speed - Typing speed in milliseconds per character (default: 30ms)
 * @param {boolean} isActive - Whether to trigger the animation (default: true)
 * @returns {string} The animated text
 */
export const useTypewriter = (text, speed = 30, isActive = true) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isActive) return;

    // Reset displayed text when input text changes
    setDisplayedText("");
    let currentIndex = 0;
    let timeoutId;

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;

        // Variable typing speed for natural feel (randomize between 70-130% of base speed)
        const randomSpeed = speed * (0.7 + Math.random() * 0.6);
        timeoutId = setTimeout(typeNextCharacter, randomSpeed);
      }
    };

    // Small delay before typing starts
    const startDelay = setTimeout(typeNextCharacter, 50);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeoutId);
    };
  }, [text, speed, isActive]);

  return displayedText;
};
