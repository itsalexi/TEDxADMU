'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SteppedProgress = ({ numSteps, stepsComplete }) => {
  return (
    <div className="w-full">
      <Steps numSteps={numSteps} stepsComplete={stepsComplete} />
    </div>
  );
};

const Steps = ({ numSteps, stepsComplete }) => {
  const stepArray = Array.from(Array(numSteps).keys());

  return (
    <div className="flex items-center justify-between gap-3">
      {stepArray.map((num) => {
        const stepNum = num + 1;
        const isActive = stepNum <= stepsComplete;
        const isPrevious = stepNum < stepsComplete;
        return (
          <React.Fragment key={stepNum}>
            <Step num={stepNum} isActive={isActive} isPrevious={isPrevious} />
            {stepNum !== stepArray.length && (
              <div className="w-full h-1.5 rounded-full bg-gray-800 relative">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-[#eb0028] rounded-full"
                  animate={{ width: isActive ? '100%' : 0 }}
                  transition={{ ease: 'easeIn', duration: 0.3 }}
                />  
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Step = ({ num, isActive, isPrevious }) => {
  return (
    <div className="relative">
      <div
        className={`w-14 h-14 flex items-center justify-center shrink-0 border-2 rounded-full font-semibold text-base relative z-10 transition-colors duration-300 ${
          isActive
            ? 'border-[#eb0028] bg-[#eb0028] text-white'
            : 'border-gray-700 text-gray-500'
        }`}
      >
        <AnimatePresence mode="wait">
          {isPrevious ? (
            <motion.svg
              key="icon-marker-check"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              height="1.6em"
              width="1.6em"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.125 }}
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
            </motion.svg>
          ) : (
            <motion.span
              key="icon-marker-num"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.125 }}
            >
              {num}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {isActive && (
        <div className="absolute z-0 -inset-2 bg-[#eb0028]/50 rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default SteppedProgress;
