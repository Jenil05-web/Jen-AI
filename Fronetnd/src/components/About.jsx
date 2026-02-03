import { X, Heart } from 'lucide-react';

const About = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="about-overlay" onClick={onClose}>
      <div className="about-modal" onClick={(e) => e.stopPropagation()}>
        <div className="about-header">
          <h2 className="about-title">About JenAI</h2>
          <button className="about-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="about-content">
          <div className="about-logo-section">
            <div className="about-icon">
              <div className="about-bot-icon">✨</div>
            </div>
            <h3 className="about-app-name">JenAI</h3>
            <p className="about-version">v1.0.0</p>
          </div>

          <div className="about-description">
            <p>
              JenAI is an intelligent chat assistant powered by advanced AI technology. 
              Have natural conversations, ask questions, and get helpful responses.
            </p>
          </div>

          <div className="about-separator"></div>

          <div className="about-credits">
            <h4 className="about-section-title">Made with <Heart size={14} className="heart-icon" /> by</h4>
            <p className="about-creator">Jenil</p>
            <p className="about-tagline">Building conversational AI experiences</p>
          </div>

          <div className="about-separator"></div>

          <div className="about-features">
            <h4 className="about-section-title">Features</h4>
            <ul className="about-list">
              <li>Intelligent conversations</li>
              <li>Dark mode support</li>
              <li>Mobile responsive</li>
              <li>Chat history</li>
              <li>Thread management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
