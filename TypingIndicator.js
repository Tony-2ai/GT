import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-gray-600 rounded-full animate-typing"></div>
      <div className="w-2 h-2 bg-gray-600 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-2 h-2 bg-gray-600 rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );
};

export default TypingIndicator;
