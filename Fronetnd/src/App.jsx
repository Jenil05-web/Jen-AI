import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import About from "./components/About";
import {
  getAllThreads,
  getThreadById,
  sendChatMessage,
  deleteThreadById,
} from "./utils/api";

function App() {
  const [threads, setThreads] = useState([]);
  const [currentThreadId, setCurrentThreadId] = useState(null);
  const [currentThread, setCurrentThread] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 480);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // Handle window resize for responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 480) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    loadThreads();
  }, []);

  useEffect(() => {
    if (currentThreadId) {
      loadThread(currentThreadId);
    } else {
      setCurrentThread(null);
    }
  }, [currentThreadId]);

  const loadThreads = async () => {
    try {
      const data = await getAllThreads();
      setThreads(data);
    } catch (err) {
      console.error("Failed to load threads:", err);
    }
  };

  const loadThread = async (threadId) => {
    try {
      const data = await getThreadById(threadId);
      setCurrentThread(data);
    } catch (err) {
      console.error("Failed to load thread:", err);
    }
  };

  const handleNewChat = () => {
    setCurrentThreadId(null);
    setCurrentThread(null);
    setMessage("");
    // Close sidebar on mobile after creating new chat
    if (window.innerWidth <= 480) {
      setSidebarOpen(false);
    }
  };

  const handleSelectThread = (threadId) => {
    setCurrentThreadId(threadId);
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 480) {
      setSidebarOpen(false);
    }
  };

  const handleDeleteThread = async (threadId) => {
    try {
      await deleteThreadById(threadId);

      if (currentThreadId === threadId) {
        handleNewChat();
      }

      loadThreads();
    } catch (err) {
      console.error("Failed to delete thread:", err);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMsg = message;
    setMessage("");
    setLoading(true);

    const threadId = currentThreadId || `thread_${Date.now()}`;

    try {
      // Create a temporary thread object with the user message immediately shown
      const tempThread = currentThread
        ? {
            ...currentThread,
            messages: [
              ...(currentThread.messages || []),
              { role: "user", content: userMsg },
            ],
          }
        : {
            threadId,
            title: userMsg.substring(0, 30),
            messages: [{ role: "user", content: userMsg }],
            updatedAt: new Date().toISOString(),
          };

      // Show the user message immediately
      setCurrentThread(tempThread);
      if (!currentThreadId) {
        setCurrentThreadId(threadId);
      }

      // Make the API call to get the response
      const data = await sendChatMessage(threadId, userMsg);

      setCurrentThread(data);
      loadThreads();
    } catch (err) {
      console.error("Failed to send message:", err);
      setMessage(userMsg);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark" : ""}`}>
      <Navbar 
        isDark={isDarkMode} 
        toggleTheme={toggleTheme} 
        onSettingsClick={() => setAboutOpen(true)}
      />

      <div className="main-content">
        <Sidebar
          isOpen={sidebarOpen}
          threads={threads}
          currentThreadId={currentThreadId}
          onNewChat={handleNewChat}
          onSelectThread={handleSelectThread}
          onDeleteThread={handleDeleteThread}
        />

        <ChatArea
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          currentThread={currentThread}
          message={message}
          setMessage={setMessage}
          loading={loading}
          onSendMessage={handleSendMessage}
        />
      </div>

      <About isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}

export default App;
