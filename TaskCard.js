import React from 'react';

const TaskCard = ({ task, onComplete }) => {
  return (
    <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-4 text-white shadow-lg">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-lg">🎯</span>
        <h3 className="font-bold text-sm">Silly Task!</h3>
      </div>
      <p className="text-sm mb-4 leading-relaxed">
        {task.text}
      </p>
      <button
        onClick={onComplete}
        className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors shadow-md"
      >
        ✅ Complete Task
      </button>
    </div>
  );
};

export default TaskCard;
