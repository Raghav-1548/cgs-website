import React, { useState, useEffect,useRef, useMemo, useCallback  } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Services from './Services';
import Contact from './Contact';
import chaviLogo from './assets/chavilogo.png';
import Performance from './assets/Performance.png';
import Perf2 from './assets/Perf2.png';
import FIEO from './assets/FIEO.jpg';
import Kt from './assets/Kt.png';
import CGS from './assets/CGS.png';
import cgstheme from './assets/cgstheme.mp3';
import { Music, Volume2, VolumeX } from 'lucide-react';
import * as THREE from 'three';

const NavBar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-xl z-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 py-3 sm:py-5">
        <div className="flex justify-between items-center w-full lg:w-auto">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-24 sm:w-32 h-12 sm:h-16"
            >
              <img
                src={chaviLogo}
                alt="Chavi Global Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-white"
            >
              Chavi Global Solutions
            </motion.div>
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-center gap-6 lg:gap-12 w-full lg:w-auto mt-4 lg:mt-0`}>
          {['Home', 'Services', 'Contact'].map((item) => (
            <Link 
              key={item} 
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="text-lg font-medium text-white/90 transition-colors duration-300">
                {item}
              </span>
              {hoveredItem === item && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.3, 
          ease: "easeInOut" 
        }}
        className="bg-black min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const FooterMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // Set to true by default

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
        }
      } catch (error) {
        console.error("Autoplay error:", error);
        setIsPlaying(false);
      }
    };

    // Attempt to play immediately when component mounts
    playAudio();
  }, []); 

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Play failed:", error);
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="footer-music-player fixed bottom-4 right-4 z-50">
      <audio 
        ref={audioRef} 
        src={cgstheme} 
        loop
      >
        Your browser does not support the audio tag.
      </audio>

      <button 
        onClick={togglePlay} 
        className="bg-primary text-white rounded-full p-3 shadow-lg hover:bg-primary-dark transition-all flex items-center justify-center"
      >
        {isPlaying ? (
          <Volume2 className="w-8 h-8" />
        ) : (
          <VolumeX className="w-8 h-8" />
        )}
        <span className="ml-2 text-sm">
          {isPlaying ? "Music On" : "Music Off"}
        </span>
      </button>
    </div>
  );
};

//3d background


//ends here//

const ImagePopup = ({ image, title, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.9 }}
      className="relative max-w-3xl mx-auto bg-white rounded-lg shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute -top-3 -right-3 bg-white rounded-full p-1 text-black hover:bg-gray-200 transition-colors shadow-lg z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-[60vh] object-contain rounded-t-lg"
        />
      </div>
      <div className="p-4 bg-white rounded-b-lg">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
    </motion.div>
  </motion.div>
);

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const scrollSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    scrollSound.volume = 0.2;
    
    const handleWheel = (e) => {
      e.preventDefault();
      
      if (isScrolling) return;

      setIsScrolling(true);
      
      if (e.deltaY > 0 && currentSection < 2) {
        setCurrentSection(prev => prev + 1);
        scrollSound.play().catch(console.warn);
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
        scrollSound.play().catch(console.warn);
      }
      
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, isScrolling]);

  const achievements = [
    {
      title: "AL-KOOHEJI Performance Certificate",
      subtitle: "Global Certification",
      image: Performance
    },
    {
      title: "ALMOAYYED Performance Certificate",
      subtitle: "International Certification",
      image: Perf2
    },
    {
      title: "FIEO Registered",
      subtitle: "Federation Of Indian Export Organisations",
      image: FIEO
    },
    {
      title: "Expand India's Exports",
      subtitle: "Kuwait Times",
      image: Kt
    },
    {
      title: "Indian Diaspora at Kuwait",
      subtitle: "CGS Info",
      image: CGS
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-[#FF9933]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-[#138808]/5 rounded-full blur-[150px]" />
      </div>

      <AnimatePresence>
        {selectedImage && (
          <ImagePopup 
            image={selectedImage.image} 
            title={selectedImage.title}
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>

      <motion.div 
        className="transition-transform duration-1000 ease-in-out h-screen"
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
      >
        {/* Hero Section */}
        <div className="h-screen flex items-center justify-center pt-20 relative">
          <div className="text-center px-4 sm:px-6">
            <motion.h1 
              className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="block bg-gradient-to-r from-[#FF9933] to-white bg-clip-text text-transparent">
                Namaste
              </span>
              <span className="block text-white mt-2">
                from
              </span>
              <span className="block bg-gradient-to-r from-white to-[#138808] bg-clip-text text-transparent mt-2">
                Bharat
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Bringing Indian Excellence to Global Markets
            </motion.p>
          </div>
          <motion.div 
            className="absolute bottom-10 animate-bounce cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <div className="h-screen flex flex-col items-center justify-center pt-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-10">Our Achievements</h2>
          <div className="relative overflow-hidden py-6 sm:py-10 px-2 sm:px-4 -mx-4 w-full">
            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-4 sm:gap-8"
            >
              {achievements.concat(achievements).map((achievement, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-64 sm:w-80 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden group cursor-pointer"
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedImage(achievement)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-full h-36 sm:h-48 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#FF9933] transition-colors duration-300">
                      {achievement.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {achievement.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Vision and Mission Section */}
        <div className="h-screen flex items-center justify-center pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <section className="mb-20 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Our Vision
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto leading-relaxed">
              Our vision is to supply exceptional products that exceed customer expectations. We prioritize understanding unique needs, delivering quality and service, and fostering loyalty. We aim to innovate and continuously improve to support our clients' success.
              </p>
            </section>

            <section className="text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto leading-relaxed">
              At CGS, our mission is to manufacture and supply top engineering products for construction, electrical, and water lines. As merchant exporters and liaison agents, we collaborate with the best Indian companies to meet customer requirements and enhance their operations in India.
              </p>
            </section>
          </div>
        </div>
      </motion.div>
      
      <footer className="fixed bottom-0 w-full bg-black py-4 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Chavi Global Solutions. All rights reserved.
        </p>
      </footer>
    </motion.div>
  );
};



const App = () => {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-black">
          <NavBar />
          <div className="flex-grow">
            <Routes>
              <Route 
                path="/" 
                element={
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                } 
              />
              <Route 
                path="/services" 
                element={
                  <PageWrapper>
                    <Services />
                  </PageWrapper>
                } 
              />
              <Route 
                path="/contact" 
                element={
                  <PageWrapper>
                    <Contact />
                  </PageWrapper>
                } 
              />
            </Routes>
          </div>
          <FooterMusic />
        </div>
    </BrowserRouter>
  );
};

export default App;