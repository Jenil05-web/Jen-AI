import { Settings, Sun, Moon } from 'lucide-react';

const Navbar = ({ isDark, toggleTheme, onSettingsClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-container">
          <div className="logo">
            
          </div>
          <span className="app-name">JenAI</span>
        </div>
      </div>

      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="nav-button" onClick={onSettingsClick} title="About JenAI">
          <Settings size={16} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;