import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import './FloatingMenuButton.css';

interface FloatingMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const buttonVariants = {
  open: {
    opacity: 0,
    filter: 'blur(5px)',
    transition: { duration: 0.3 }, // Removed ease property
    pointerEvents: 'none', // Disable interaction when blurred out
  },
  closed: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.3 }, // Removed ease property
    pointerEvents: 'auto', // Enable interaction when visible
  },
};

const FloatingMenuButton: React.FC<FloatingMenuButtonProps> = ({ isOpen, onClick }) => {
  return (
    <AnimatePresence>
      {!isOpen && ( // Render only when sidebar is NOT open
        <motion.button
          className="floating-menu-button"
          onClick={onClick}
          variants={buttonVariants}
          initial="closed" // Start visible
          animate="closed" // Stay visible
          exit="open" // Animate to hidden (blurred out) when sidebar opens
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingMenuButton;
