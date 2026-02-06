import { useTypewriter } from "../hooks/useTypewriter";

/**
 * Component that displays a message with typing effect
 * @param {string} content - The message content to display with typing effect
 * @param {number} speed - Typing speed in milliseconds per character
 * @param {boolean} animate - Whether to animate the text (default: true)
 */
const TypingMessage = ({ content, speed = 30, animate = true }) => {
  const displayedText = useTypewriter(content, speed, animate);

  return (
    <p className="message-text typing-animation">
      {displayedText}
      {animate && displayedText.length < content.length && (
        <span className="typing-cursor" aria-hidden="true" />
      )}
    </p>
  );
};

export default TypingMessage;
