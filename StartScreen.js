import React from 'react';
import { fruits, getRandomFruit } from '../data/fruits';

const StartScreen = ({ onFruitSelect }) => {
  const handleSurpriseMe = () => {
    const randomFruit = getRandomFruit();
    onFruitSelect(randomFruit);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold text-gray-800 mb-4 animate-bounce-slow">
          FruityTalk
        </h1>
        <p className="text-xl text-gray-600 max-w-md">
          Chat with emotionally unstable fruits and complete silly tasks!
        </p>
      </div>

      {/* Fruit Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full mb-8">
        {Object.entries(fruits).map(([key, fruit]) => (
          <div
            key={key}
            onClick={() => onFruitSelect(key)}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-2"
          >
            <div className={`${fruit.color} rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:animate-wiggle`}>
              <div className="text-6xl mb-4 animate-blink">
                {fruit.emoji}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {fruit.name}
              </h3>
              <p className="text-sm text-white opacity-90">
                {fruit.personality}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Surprise Me Button */}
      <button
        onClick={handleSurpriseMe}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:rotate-1"
      >
        🎲 Surprise Me!
      </button>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500">
        <p className="text-sm">
          Click any fruit to start chatting, or let us pick one for you!
        </p>
      </div>
    </div>
  );
};

export default StartScreen;
