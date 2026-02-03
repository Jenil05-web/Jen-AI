import { Send } from 'lucide-react';

const MessageInput = ({ value, onChange, onSend, disabled }) => {
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="input-area">
      <div className="input-container">
        <div className="input-wrapper">
          <div className="textarea-container">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Message Jen_AI..."
              className="message-textarea"
              rows="1"
              disabled={disabled}
            />
          </div>
          <button
            onClick={onSend}
            disabled={!value.trim() || disabled}
            className="send-btn"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="input-hint">
          Press Enter to send, Shift + Enter for new line
        </p>
        <p className="disclaimer">
          JenAI can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  );
};

export default MessageInput;