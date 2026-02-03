import { Plus, MessageSquare, Trash2 } from 'lucide-react';

const Sidebar = ({ 
  isOpen, 
  threads, 
  currentThreadId, 
  onNewChat, 
  onSelectThread, 
  onDeleteThread 
}) => {
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`sidebar ${!isOpen ? 'closed' : ''}`}>
      <div className="sidebar-header">
        <button onClick={onNewChat} className="new-chat-btn">
          <Plus size={18} />
          New Chat
        </button>
      </div>

      <div className="threads-list">
        {threads.map((thread) => (
          <div
            key={thread.threadId}
            onClick={() => onSelectThread(thread.threadId)}
            className={`thread-item ${currentThreadId === thread.threadId ? 'active' : ''}`}
          >
            <div className="thread-content">
              <MessageSquare size={16} className="thread-icon" />
              <div className="thread-info">
                <p className="thread-title">{thread.title}</p>
                <p className="thread-time">{formatTime(thread.updatedAt)}</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteThread(thread.threadId);
              }}
              className="delete-btn"
            >
              <Trash2 size={16} className="delete-icon" />
            </button>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <p>JenAI © 2025</p>
      </div>
    </div>
  );
};

export default Sidebar;