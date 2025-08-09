import React, { useState, useEffect, useRef } from 'react';
import { fruits, getRandomTask } from '../data/fruits';
import TypingIndicator from './TypingIndicator';
import TaskCard from './TaskCard';
import AIFeatures from './AIFeatures';
import MessageAnimation from './MessageAnimation';
import MoodSelector from './MoodSelector';
import VoiceControls from './VoiceControls';
import enhancedAiService from '../services/enhancedAiService';

// Helper functions for dynamic colors
const getFruitBackground = (fruitColor) => {
  const backgrounds = {
    'bg-red-500': 'bg-red-50',
    'bg-yellow-400': 'bg-yellow-50',
    'bg-orange-400': 'bg-orange-50',
    'bg-yellow-500': 'bg-yellow-50',
    'bg-green-500': 'bg-green-50'
  };
  return backgrounds[fruitColor] || 'bg-gray-50';
};

const getFruitBorder = (fruitColor) => {
  const borders = {
    'bg-red-500': 'border-red-200',
    'bg-yellow-400': 'border-yellow-200',
    'bg-orange-400': 'border-orange-200',
    'bg-yellow-500': 'border-yellow-200',
    'bg-green-500': 'border-green-200'
  };
  return borders[fruitColor] || 'border-gray-200';
};

const getFruitBubbleColor = (fruitColor, isUser) => {
  if (isUser) return 'bg-yellow-400 text-gray-800';
  
  const bubbleColors = {
    'bg-red-500': 'bg-red-300 text-gray-800',
    'bg-yellow-400': 'bg-yellow-300 text-gray-800',
    'bg-orange-400': 'bg-orange-300 text-gray-800',
    'bg-yellow-500': 'bg-yellow-300 text-gray-800',
    'bg-green-500': 'bg-green-300 text-gray-800'
  };
  return bubbleColors[fruitColor] || 'bg-pink-300 text-gray-800';
};

const getFruitInputFocus = (fruitColor) => {
  const focusColors = {
    'bg-red-500': 'border-red-300 focus:ring-red-300 focus:border-red-300',
    'bg-yellow-400': 'border-yellow-300 focus:ring-yellow-300 focus:border-yellow-300',
    'bg-orange-400': 'border-orange-300 focus:ring-orange-300 focus:border-orange-300',
    'bg-yellow-500': 'border-yellow-300 focus:ring-yellow-300 focus:border-yellow-300',
    'bg-green-500': 'border-green-300 focus:ring-green-300 focus:border-green-300'
  };
  return focusColors[fruitColor] || 'border-gray-300 focus:ring-pink-300 focus:border-transparent';
};

const getFruitButtonColor = (fruitColor) => {
  const buttonColors = {
    'bg-red-500': 'bg-red-500',
    'bg-yellow-400': 'bg-yellow-500',
    'bg-orange-400': 'bg-orange-500',
    'bg-yellow-500': 'bg-yellow-500',
    'bg-green-500': 'bg-green-500'
  };
  return buttonColors[fruitColor] || 'bg-pink-500';
};

const ChatScreen = ({ selectedFruit, onBackToStart, onSwitchFruit }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showAIFeatures, setShowAIFeatures] = useState(false);
  const fruit = fruits[selectedFruit];
  const [currentMood, setCurrentMood] = useState(fruit.mood.toLowerCase());
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [showVoiceControls, setShowVoiceControls] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize Enhanced AI service with fruit context and mood
    enhancedAiService.initializeFruitContext(selectedFruit, fruit, currentMood);
    enhancedAiService.clearHistory();
    
    // Add welcome message
    const welcomeMessage = {
      id: Date.now(),
      text: `Hey there! I'm ${fruit.name}! ${fruit.personality} What's on your mind?`,
      sender: 'fruit',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [selectedFruit, fruit, currentMood]);

  // Handle mood changes
  const handleMoodChange = (newMood) => {
    setCurrentMood(newMood);
    enhancedAiService.updateMood(newMood);
    
    // Add mood change message
    const moodMessage = {
      id: Date.now(),
      text: `*mood shifts to ${newMood}* How interesting... I feel quite different now!`,
      sender: 'fruit',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, moodMessage]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Decide if to send a task or use AI for intelligent reply
    const shouldSendTask = Math.random() < 0.25 && !currentTask;
    
    if (shouldSendTask) {
      const task = getRandomTask(selectedFruit);
      setCurrentTask(task);
      const taskMessage = {
        id: Date.now() + 1,
        text: "I have a fun task for you!",
        sender: 'fruit',
        timestamp: new Date(),
        isTask: true,
        task: task
      };
      setMessages(prev => [...prev, taskMessage]);
    } else {
      // Use Enhanced AI service for intelligent, contextual responses
      const aiReply = await enhancedAiService.processMessage(inputMessage, selectedFruit);
      const fruitMessage = {
        id: Date.now() + 1,
        text: aiReply,
        sender: 'fruit',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fruitMessage]);
    }

    setIsTyping(false);
  };

  const handleTaskComplete = () => {
    if (!currentTask) return;

    const reactionMessage = {
      id: Date.now(),
      text: currentTask.reaction,
      sender: 'fruit',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, reactionMessage]);
    setCurrentTask(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`h-screen flex flex-col transition-all duration-500 ${getFruitBackground(fruit.color)}`}>
      {/* Header */}
      <div className={`bg-white shadow-sm border-b border-gray-200 p-4 transition-all duration-500 ${getFruitBorder(fruit.color)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToStart}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              ← Back
            </button>
            <div className="flex items-center space-x-3">
              <div className={`${fruit.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl transform transition-all duration-300 hover:scale-110 animate-pulse`}>
                {fruit.emoji}
              </div>
              <div>
                <h2 className="font-bold text-lg">{fruit.name}</h2>
                <div className="flex items-center space-x-2">
                  <span className={`${fruit.moodColor} px-2 py-1 rounded-full text-xs font-medium`}>
                    {fruit.mood}
                  </span>
                </div>
              </div>
            </div>
          </div>
                      <div className="flex space-x-2">
              <button
                onClick={() => setShowMoodSelector(!showMoodSelector)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showMoodSelector 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                😊 Mood
              </button>
              <button
                onClick={() => setShowVoiceControls(!showVoiceControls)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showVoiceControls 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                🎵 Voice
              </button>
              <button
                onClick={() => setShowAIFeatures(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:from-blue-600 hover:to-purple-600"
              >
                🤖 AI
              </button>
              <button
                onClick={onBackToStart}
                className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                🔄 Switch
              </button>
            </div>
        </div>
      </div>

              {/* Controls Panel */}
        <div className="p-4 space-y-4">
          {showMoodSelector && (
            <MoodSelector 
              fruit={fruit} 
              currentMood={currentMood} 
              onMoodChange={handleMoodChange} 
            />
          )}
          
          {showVoiceControls && (
            <VoiceControls 
              fruit={fruit} 
              currentMood={currentMood} 
            />
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar">
        {messages.map((message, index) => (
          <MessageAnimation key={message.id} delay={index * 100}>
            <div
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl transform transition-all duration-300 hover:scale-105 ${
                getFruitBubbleColor(fruit.color, message.sender === 'user')
              }`}>
                {message.isTask ? (
                  <TaskCard task={message.task} onComplete={handleTaskComplete} />
                ) : (
                  <p className="text-sm">{message.text}</p>
                )}
              </div>
            </div>
          </MessageAnimation>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className={`px-4 py-2 rounded-2xl transform transition-all duration-300 ${getFruitBubbleColor(fruit.color, false)}`}>
              <TypingIndicator />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`bg-white border-t p-4 transition-all duration-500 ${getFruitBorder(fruit.color)}`}>
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className={`flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 transition-all duration-300 ${getFruitInputFocus(fruit.color)}`}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim()}
            className={`${getFruitButtonColor(fruit.color)} hover:opacity-80 disabled:bg-gray-300 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-105`}
          >
            Send
          </button>
        </div>
      </div>
      
      {/* AI Features Modal */}
      <AIFeatures 
        isVisible={showAIFeatures} 
        onClose={() => setShowAIFeatures(false)} 
      />
    </div>
  );
};

export default ChatScreen;
