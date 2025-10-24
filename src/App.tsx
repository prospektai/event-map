import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { Transition } from 'framer-motion';
import Navbar from './components/Navbar';
import MapPage from './pages/MapPage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage'; // Import EventsPage
import TrackedEventsPage from './pages/TrackedEventsPage'; // Import TrackedEventsPage
import { events } from './data/events'; // Import events data
import preloadImages from './utils/imagePreloader'; // Import image preloader utility
import './App.css';
import { TrackedEventsProvider } from './context/TrackedEventsContext'; // Import the provider

const pageVariants = {
  initial: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  in: {
    opacity: 1,
    filter: 'blur(0px)',
  },
  out: {
    opacity: 0,
    filter: 'blur(10px)',
  },
};

const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              className="page-container"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <MapPage />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              className="page-container"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <AboutPage />
            </motion.div>
          }
        />
        <Route
          path="/events"
          element={
            <motion.div
              className="page-container"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <EventsPage />
            </motion.div>
          }
        />
        <Route
          path="/tracked-events"
          element={
            <motion.div
              className="page-container"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <TrackedEventsPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  useEffect(() => {
    const imageUrls = events.map((event) => event.imageUrl).filter(Boolean) as string[];
    preloadImages(imageUrls);
  }, []);

  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <TrackedEventsProvider> {/* Wrap AnimatedRoutes with the provider */}
          <AnimatedRoutes />
        </TrackedEventsProvider>
      </main>
    </Router>
  );
}

export default App;
