import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Image Imports
import HBM from './assets/HBM.png';
import TOM from './assets/TOM.png';
import CPM from './assets/CPM.png';
import RDM from './assets/RDM.png';
import BBM from './assets/BBM.png';
import HydroBM from './assets/HydroBM.png';
import HDPE from './assets/HDPE.png';
import Bento from './assets/Bento.png';
import TapeWrap from './assets/TapeWrap.png';
import TW from './assets/TW.jpg';

// Define color palette with neon effects
const colors = {
  primary: '#3498db',     // Primary color
  hover: '#2ecc71',       // Light green hover color
  background: '#000000',  // Background color set to complete black
  textPrimary: '#ffffff', // Primary text color
  textSecondary: '#b0b0b0' // Secondary text color
};

// ProductCard component
const ProductCard = ({ title, description, imageSrc }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: `0 0 15px ${colors.hover}` }}
      style={{
        background: 'none', // No background color
        borderColor: `${colors.primary}33`,
      }}
      className="rounded-xl overflow-hidden border"
    >
      <div className="aspect-video">
        <img
          src={imageSrc || "/api/placeholder/400/300"} // Placeholder image if imageSrc is not provided
          alt={title}
          className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>
      <div className="p-6">
        <h3
          style={{
            backgroundImage: `linear-gradient(to right, #FF9933, #FFFFFF, #138808)`, // Tricolor gradient
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
          className="text-xl font-semibold mb-2"
        >
          {title}
        </h3>
        <p style={{ color: colors.textSecondary }} className="mb-4">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer style={{ backgroundColor: colors.background, color: colors.textPrimary }} className="mt-16 p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-center md:text-left mb-4 md:mb-0">
          © 2024 Chavi Global Solutions. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            Facebook
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            Twitter
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            Instagram
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

// Scroll Indicator Component
const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.1) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20 
      }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer"
      onClick={handleScrollDown}
    >
      <motion.div 
        animate={{ 
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center"
      >
        <ChevronDown 
          size={48} 
          color="#ffffff" 
          className="animate-bounce"
        />
        <p className="text-white text-sm mt-2">Scroll Down</p>
      </motion.div>
    </motion.div>
  );
};

// Main Services component
const Services = () => {
  const products = [
    {
      title: 'Tape Wrapping Machine',
      description: 'Tape Wrapping Machine for ductile iron and carbon steel pipes',
      imageSrc: TW,
    },
    {
      title: 'Transformer Oil Filtration Machine',
      description: 'State-of-the-art filtration system for maintaining transformer oil quality.',
      imageSrc: TOM,
    },
    {
      title: 'Rock Drilling Machine',
      description: 'Powerful drilling equipment for mining and construction projects.',
      imageSrc: RDM,
    },
    {
      title: 'Cable Pulling Winch',
      description: 'Heavy-duty winch system for efficient cable installation.',
      imageSrc: CPM,
    },
    {
      title: 'Construction Bar Bending Machine',
      description: 'Precise bending solutions for construction reinforcement bars.',
      imageSrc: BBM,
    },
    {
      title: 'HDPE Pipes for Cable Laying',
      description: 'High-quality HDPE pipes for secure cable infrastructure.',
      imageSrc: HDPE,
    },
    {
      title: 'Hydraulic Bar Bending Machine',
      description: 'Hydraulic powered bar bending machine for construction reinforcement bars',
      imageSrc: HydroBM,
    },
    {
      title: 'Hydro Blasting Machine',
      description: 'High-pressure cleaning solution for industrial applications with advanced control systems.',
      imageSrc: HBM, 
    },
    {
      title: 'Bentonite',
      description: 'High quality fine bentonite for drilling machine',
      imageSrc: Bento,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ backgroundColor: colors.background, color: colors.textPrimary }}
      className="min-h-screen pt-32 relative"
    >
      {/* Scroll Indicator */}
      <ScrollIndicator />

      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">
            <span style={{ color: '#FF9933' }}>Our</span>
            <span
              style={{
                backgroundImage: `linear-gradient(to right, #FF9933, #138808)`, // Gradient from Orange to Green
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {' Products & Services'}
            </span>
          </h1>
          <p style={{ color: colors.textSecondary }} className="text-xl max-w-2xl mx-auto">
            Discover our range of innovative industrial solutions designed for excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Services;