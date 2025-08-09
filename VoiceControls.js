import React, { useState, useEffect } from 'react';
import voiceService from '../services/voiceService';

const VoiceControls = ({ fruit, currentMood }) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(voiceService.isSupported());
  }, []);

  const toggleVoice = () => {
    const newState = voiceService.toggle();
    setIsVoiceEnabled(newState);
  };

  const testVoice = () => {
    const testMessages = {
      apple: "Hello there, I hope you're not planning to eat me!",
      banana: "Hi! I'm so excited to chat with you!",
      mango: "Greetings, mortal. I, the king of fruits, welcome you.",
      pineapple: "Hey there! I'm not as spiky as I look, promise!",
      watermelon: "Hey... what's up? Just chillin' like a watermelon..."
    };

    const message = testMessages[fruit.name.toLowerCase()] || testMessages.apple;
    voiceService.speak(message, currentMood, fruit.name);
  };

  if (!isSupported) {
    return (
      <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
        <div className="text-red-700 text-sm">
          🚫 Voice synthesis not supported in this browser
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        🎵 Voice Settings
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-700">Text-to-Speech</div>
            <div className="text-sm text-gray-500">
              Hear {fruit.name}'s voice in {currentMood} mood
            </div>
          </div>
          <button
            onClick={toggleVoice}
            className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors
              ${isVoiceEnabled ? 'bg-green-500' : 'bg-gray-300'}
            `}
          >
            <span
              className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition
                ${isVoiceEnabled ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>

        {isVoiceEnabled && (
          <div className="border-t pt-3">
            <button
              onClick={testVoice}
              className={`
                w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105
                ${fruit.color} text-white hover:opacity-80
              `}
            >
              🔊 Test Voice ({currentMood} mood)
            </button>
            
            <div className="mt-2 text-xs text-gray-500 text-center">
              Voice changes pitch, speed, and tone based on mood
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceControls;
