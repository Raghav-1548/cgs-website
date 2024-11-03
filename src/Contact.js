import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, Phone, MapPin, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactIcon = ({ icon: Icon, text, link }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 0 15px rgba(0, 255, 100, 0.5)'
      }}
      className="flex items-center gap-4 p-6 bg-black rounded-xl backdrop-blur-sm border border-purple-500/20 transition-all duration-300 hover:border-green-300/50"
    >
      <div className="p-4 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-lg transition-all duration-300 group-hover:bg-green-500/20">
        <Icon className="w-6 h-6 text-white transition-colors duration-300 group-hover:text-green-300" />
      </div>
      <div>
        <p className="text-gray-300 transition-colors duration-300 group-hover:text-green-300">{text}</p>
      </div>
    </motion.a>
  );
};

const Notification = ({ isVisible, onClose, status, message }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black border ${
            status === 'success' ? 'border-[#00ff9d]/30' : 'border-red-500/30'
          } rounded-xl p-6 shadow-2xl ${
            status === 'success' ? 'shadow-[#00ff9d]/20' : 'shadow-red-500/20'
          } z-50 min-w-[300px]`}
        >
          <div className="flex items-center gap-4">
            <div className={`rounded-full ${
              status === 'success' ? 'bg-[#00ff9d]/20' : 'bg-red-500/20'
            } p-2`}>
              {status === 'success' ? (
                <CheckCircle className="w-6 h-6 text-[#00ff9d]" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-500" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">
                {status === 'success' ? 'Message Sent!' : 'Error'}
              </h3>
              <p className="text-gray-400 text-sm">{message}</p>
            </div>
          </div>
          <motion.button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ×
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ModernButton = ({ children, isLoading, ...props }) => {
  return (
    <motion.button
      {...props}
      disabled={isLoading}
      className="relative w-full py-4 px-6 rounded-xl bg-black text-[#00ff9d] border border-[#00ff9d]/30 font-bold overflow-hidden group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 bg-[#00ff9d] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      <div className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors duration-300">
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          children
        )}
      </div>
    </motion.button>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-6">
      <div className="max-w-6xl mx-auto text-center text-gray-400">
        <p>© 2024 Chavi Global. All rights reserved.</p>
      </div>
    </footer>
  );
};

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    status: 'success',
    message: ''
  });
  const formRef = useRef();

  useEffect(() => {
    emailjs.init("FTkwRmFM8qWbDZHR3");  // Your public key
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await emailjs.sendForm(
        'service_zdldvbr',     // Your service ID
        'template_k4u9l0g',    // Your template ID
        formRef.current,
        "FTkwRmFM8qWbDZHR3"   // Your public key
      );

      console.log("EmailJS Response:", result);

      if (result.status === 200) {
        setNotification({
          show: true,
          status: 'success',
          message: "We'll get back to you soon!"
        });
        formRef.current.reset();
      } else {
        throw new Error(`Failed to send message. Status: ${result.status}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setNotification({
        show: true,
        status: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 5000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black pt-32"
    >
      <Notification 
        isVisible={notification.show}
        status={notification.status}
        message={notification.message}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />

      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-center mb-16"
        >
          <h1 
            className="text-6xl font-bold mb-6"
            style={{
              background: 'linear-gradient(to right, #00ff9d 30%, #4ade80 60%, #22c55e 90%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 20px rgba(0, 255, 157, 0.4)'
            }}
          >
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We're here to help and answer any questions you might have.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            <ContactIcon
              icon={Phone}
              text="+91 9243109916"
              link="tel:+919243109916"
            />
            <ContactIcon
              icon={Mail}
              text="chaviglobalsolutions@gmail.com"
              link="mailto:chaviglobalsolutions@gmail.com"
            />
            <ContactIcon
              icon={Linkedin}
              text="Follow us on LinkedIn"
              link="https://linkedin.com/company/chavi-global"
            />
            <ContactIcon
              icon={MapPin}
              text="G2-408, Shriram Shreyas Apartments, Telecom Layout, Kodigehalli, Bengaluru-560097"
              link="https://www.google.com/maps/place/Shriram+Shreyas+Appartments"
            />
          </div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-black rounded-xl p-8 backdrop-blur-sm border border-purple-500/20"
          >
            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="from_name">
                  Name
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  className="w-full p-3 rounded-lg bg-black text-gray-300 border border-purple-500/20 focus:outline-none focus:border-[#00ff9d]/50 hover:border-[#00ff9d]/30 transition-all duration-300"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="reply_to">
                  Email
                </label>
                <input
                  type="email"
                  id="reply_to"
                  name="reply_to"
                  className="w-full p-3 rounded-lg bg-black text-gray-300 border border-purple-500/20 focus:outline-none focus:border-[#00ff9d]/50 hover:border-[#00ff9d]/30 transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full p-3 rounded-lg bg-black text-gray-300 border border-purple-500/20 focus:outline-none focus:border-[#00ff9d]/50 hover:border-[#00ff9d]/30 transition-all duration-300"
                  placeholder="Enter your message"
                  required
                />
              </div>
              <ModernButton type="submit" isLoading={isLoading}>
                Send Message
              </ModernButton>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}

export default Contact;