
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, CheckSquare, Calendar } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: '홈' },
    { path: '/todos', icon: CheckSquare, label: 'TODO' },
    { path: '/schedule', icon: Calendar, label: '일정' }
  ];
  
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 shadow-lg">
      <div className="flex">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 ${
                isActive 
                  ? 'text-blue-500 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
