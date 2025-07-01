
import React from 'react';

const Header = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full transform rotate-45"></div>
        </div>
        <h1 className="text-xl font-bold text-gray-900">effocus</h1>
      </div>
    </div>
  );
};

export default Header;
