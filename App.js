import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import ChatScreen from './components/ChatScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [selectedFruit, setSelectedFruit] = useState(null);

  const handleFruitSelect = (fruitName) => {
    setSelectedFruit(fruitName);
    setCurrentScreen('chat');
  };

  const handleBackToStart = () => {
    setCurrentScreen('start');
    setSelectedFruit(null);
  };

  return (
    <div className="App h-screen w-screen overflow-hidden">
      {currentScreen === 'start' ? (
        <StartScreen onFruitSelect={handleFruitSelect} />
      ) : (
        <ChatScreen 
          selectedFruit={selectedFruit} 
          onBackToStart={handleBackToStart}
          onSwitchFruit={handleFruitSelect}
        />
      )}
    </div>
  );
}

export default App;
