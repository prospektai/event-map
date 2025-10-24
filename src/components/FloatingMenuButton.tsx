import React from 'react';
import './FloatingMenuButton.css';

interface FloatingMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const FloatingMenuButton: React.FC<FloatingMenuButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button className={`floating-menu-button ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </button>
  );
};

export default FloatingMenuButton;
