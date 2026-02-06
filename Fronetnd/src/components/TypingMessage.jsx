import { useTypewriter } from "../hooks/useTypewriter";

/**
 * Component that displays a message with typing effect
 * @param {string} content - The message content to display with typing effect
 * @param {number} speed - Typing speed in milliseconds per character
 */
const TypingMessage = ({ content, speed = 30 }) => {
  const displayedText = useTypewriter(content, speed, true);

  return (
    <p className="message-text typing-animation">
      {displayedText}
      {displayedText.length < content.length && (
        <span className="typing-cursor" aria-hidden="true" />
      )}
    </p>
  );
};

export default TypingMessage;
