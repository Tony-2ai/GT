import React from 'react';

const MoodSelector = ({ fruit, currentMood, onMoodChange }) => {
  const moods = {
    apple: [
      { name: 'judgmental', emoji: '😏', color: 'bg-red-400', description: 'Critical and sophisticated' },
      { name: 'happy', emoji: '😊', color: 'bg-red-300', description: 'Pleased and approving' },
      { name: 'angry', emoji: '😤', color: 'bg-red-600', description: 'Indignant and upset' },
      { name: 'neutral', emoji: '🍎', color: 'bg-red-500', description: 'Calm and observant' }
    ],
    banana: [
      { name: 'dramatic', emoji: '🎭', color: 'bg-yellow-500', description: 'Over-the-top and theatrical' },
      { name: 'excited', emoji: '🤩', color: 'bg-yellow-400', description: 'Energetic and enthusiastic' },
      { name: 'sad', emoji: '😭', color: 'bg-yellow-600', description: 'Melancholy and browning' },
      { name: 'happy', emoji: '😄', color: 'bg-yellow-300', description: 'Joyful and golden' }
    ],
    mango: [
      { name: 'royal', emoji: '👑', color: 'bg-orange-500', description: 'Majestic and commanding' },
      { name: 'proud', emoji: '😤', color: 'bg-orange-400', description: 'Arrogant and superior' },
      { name: 'happy', emoji: '😊', color: 'bg-orange-300', description: 'Pleased with royal status' },
      { name: 'angry', emoji: '😠', color: 'bg-orange-600', description: 'Furious at disrespect' }
    ],
    pineapple: [
      { name: 'spiky', emoji: '😤', color: 'bg-yellow-600', description: 'Defensive and prickly' },
      { name: 'sweet', emoji: '😊', color: 'bg-yellow-400', description: 'Kind and gentle inside' },
      { name: 'sad', emoji: '🥺', color: 'bg-yellow-700', description: 'Hurt by misconceptions' },
      { name: 'excited', emoji: '😄', color: 'bg-yellow-300', description: 'Tropical and vibrant' }
    ],
    watermelon: [
      { name: 'chill', emoji: '😌', color: 'bg-green-400', description: 'Relaxed and laid-back' },
      { name: 'sleepy', emoji: '😴', color: 'bg-green-500', description: 'Drowsy and slow' },
      { name: 'happy', emoji: '😊', color: 'bg-green-300', description: 'Content and refreshing' },
      { name: 'neutral', emoji: '🍉', color: 'bg-green-500', description: 'Cool and composed' }
    ]
  };

  const fruitMoods = moods[fruit.name.toLowerCase()] || moods.apple;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">{fruit.emoji}</span>
        {fruit.name}'s Mood
      </h3>
      
      <div className="grid grid-cols-2 gap-2">
        {fruitMoods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => onMoodChange(mood.name)}
            className={`
              p-3 rounded-lg border-2 transition-all duration-300 transform hover:scale-105
              ${currentMood === mood.name 
                ? `${mood.color} border-gray-800 shadow-lg` 
                : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
              }
            `}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">{mood.emoji}</div>
              <div className="text-sm font-medium capitalize text-gray-800">
                {mood.name}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {mood.description}
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-gray-500 text-center">
        Current mood affects conversation style and voice tone
      </div>
    </div>
  );
};

export default MoodSelector;
