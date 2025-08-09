import React, { useState } from 'react';

const AIFeatures = ({ isVisible, onClose }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Context Awareness",
      description: "AI understands conversation context and responds accordingly",
      examples: [
        "Greetings: 'Hi' → Fruit-specific welcome",
        "Questions: 'How are you?' → Personality-based responses",
        "Compliments: 'You're beautiful' → Character-appropriate reactions"
      ]
    },
    {
      title: "Sentiment Analysis",
      description: "AI detects user emotions and responds appropriately",
      examples: [
        "Positive: 'I love you' → Warm, appreciative responses",
        "Negative: 'I hate you' → Defensive or dramatic reactions",
        "Neutral: 'What's up?' → Casual, friendly replies"
      ]
    },
    {
      title: "Personality Consistency",
      description: "Each fruit maintains their unique personality throughout the conversation",
      examples: [
        "Apple: Judgmental and sophisticated",
        "Banana: Dramatic and emotional",
        "Mango: Royal and pompous",
        "Pineapple: Defensive but sweet",
        "Watermelon: Chill and relaxed"
      ]
    },
    {
      title: "Real-time Processing",
      description: "AI processes messages instantly with natural delays",
      examples: [
        "Typing indicators show AI is thinking",
        "Responses feel natural and conversational",
        "Context-aware follow-up questions"
      ]
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🤖 AI Conversation Features</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <div className="flex space-x-2 mb-4">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFeature === index
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {feature.title}
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {features[activeFeature].title}
            </h3>
            <p className="text-gray-600 mb-4">
              {features[activeFeature].description}
            </p>
            <div className="space-y-2">
              {features[activeFeature].examples.map((example, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-pink-500 text-sm">•</span>
                  <span className="text-sm text-gray-700">{example}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-bold text-blue-800 mb-2">💡 Try These AI Features:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Ask "How are you?" to see personality-based responses</li>
            <li>• Compliment or insult the fruit to see emotional reactions</li>
            <li>• Mention colors like "red" or "yellow" for color-specific replies</li>
            <li>• Ask about food to see how each fruit feels about being eaten</li>
            <li>• Use greetings like "Hi" or "Hello" for character-specific welcomes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIFeatures;
