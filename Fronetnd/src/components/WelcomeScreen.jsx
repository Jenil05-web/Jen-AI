import { Bot } from 'lucide-react';

const WelcomeScreen = () => {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="welcome-icon">
          <Bot size={32} color="#6b7280" />
        </div>
        <h1 className="welcome-title">Welcome back!</h1>
        <p className="welcome-subtitle">
          How can I help you today? Start a conversation and let's explore what we can create together.
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;