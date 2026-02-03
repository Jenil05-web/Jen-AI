import { Menu, X } from "lucide-react";
import WelcomeScreen from "./WelcomeScreen";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatArea = ({
  sidebarOpen,
  toggleSidebar,
  currentThread,
  message,
  setMessage,
  loading,
  onSendMessage,
}) => {
  // Check if there are any messages to display
  const hasMessages =
    currentThread &&
    currentThread.messages &&
    currentThread.messages.length > 0;

  return (
    <div className="chat-area">
      <div className="chat-header">
        <button onClick={toggleSidebar} className="menu-btn">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <h1 className="chat-title">{currentThread?.title || "New Chat"}</h1>
      </div>

      <div className="messages-area">
        {!hasMessages ? (
          <WelcomeScreen />
        ) : (
          <MessageList messages={currentThread.messages} loading={loading} />
        )}
      </div>

      <MessageInput
        value={message}
        onChange={setMessage}
        onSend={onSendMessage}
        disabled={loading}
      />
    </div>
  );
};

export default ChatArea;
