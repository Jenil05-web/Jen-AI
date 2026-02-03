import { useRef, useEffect } from "react";
import { User, Bot } from "lucide-react";

const MessageList = ({ messages, loading }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="messages-container">
      {messages.map((msg, idx) => (
        <div key={idx} className={`message-wrapper ${msg.role}`}>
          <div className={`message-avatar ${msg.role}`}>
            {msg.role === "user" ? (
              <User size={18} />
            ) : (
              <Bot size={18} />
            )}
          </div>
          <div className={`message-bubble ${msg.role}`}>
            <p className="message-text">{msg.content}</p>
          </div>
        </div>
      ))}

      {loading && (
        <div
          className="message-wrapper assistant"
          aria-live="polite"
          role="status"
        >
          <div className="message-avatar assistant">
            <Bot size={18} />
          </div>

          <div className="message-bubble assistant">
            <div className="thinking-container">
              <span>Thinking</span>
              <div className="thinking-dots" aria-hidden="true">
                <span className="thinking-dot" />
                <span className="thinking-dot" />
                <span className="thinking-dot" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
