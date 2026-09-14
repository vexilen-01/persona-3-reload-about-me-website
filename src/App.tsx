import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IntroScreen } from './components/IntroScreen';
import { MainInterface } from './components/MainInterface';
import { CustomCursor } from './components/CustomCursor';

export const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="w-full h-screen bg-[#020713] font-body overflow-hidden select-none">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <IntroScreen onStart={() => setHasEntered(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <MainInterface />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;