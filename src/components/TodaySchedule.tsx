
import React, { useState } from 'react';
import { ScheduleItem } from '@/types';
import { locationTodos } from '@/data/mockData';

interface TodayScheduleProps {
  schedules: ScheduleItem[];
}

const TodaySchedule = ({ schedules }: TodayScheduleProps) => {
  const [toggledTodos, setToggledTodos] = useState<{[key: string]: boolean}>({});
  
  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };
  
  const isTimePassed = (timeString: string) => {
    const currentTime = getCurrentTime();
    return timeString < currentTime;
  };
  
  const getRelatedTodos = (location?: string) => {
    if (!location) return [];
    return locationTodos.filter(todo => 
      todo.location.toLowerCase() === location.toLowerCase()
    );
  };
  
  const toggleTodos = (scheduleId: string) => {
    setToggledTodos(prev => ({
      ...prev,
      [scheduleId]: !prev[scheduleId]
    }));
  };

  return (
    <div className="px-6 py-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">오늘의 일정</h2>
      <div className="space-y-3">
        {schedules.map((schedule, index) => {
          const relatedTodos = getRelatedTodos(schedule.location);
          const isPast = isTimePassed(schedule.endTime);
          const showTodos = toggledTodos[schedule.id];
          
          return (
            <div key={schedule.id} className={`${isPast ? 'opacity-50' : ''}`}>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 ${schedule.color} rounded-full flex items-center justify-center text-white text-lg shadow-md ${isPast ? 'grayscale' : ''}`}>
                    {schedule.icon}
                  </div>
                  {index < schedules.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-semibold ${isPast ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {schedule.title}
                      </h3>
                      {isPast && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">완료</span>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${isPast ? 'text-gray-400' : 'text-gray-500'}`}>
                        {schedule.startTime}~{schedule.endTime}
                      </span>
                      {relatedTodos.length > 0 && (
                        <button
                          onClick={() => toggleTodos(schedule.id)}
                          className="text-blue-500 text-sm hover:text-blue-700"
                        >
                          TODO ({relatedTodos.length})
                        </button>
                      )}
                    </div>
                  </div>
                  {schedule.distance && (
                    <p className={`text-sm mt-1 ${isPast ? 'text-gray-400' : 'text-gray-600'}`}>
                      {schedule.distance}
                    </p>
                  )}
                </div>
              </div>
              
              {showTodos && relatedTodos.length > 0 && (
                <div className="ml-16 mt-2 space-y-2">
                  {relatedTodos.map((todo) => (
                    <div key={todo.id} className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-700 text-sm">{todo.task}</span>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          todo.isCompleted 
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-blue-300'
                        }`}>
                          {todo.isCompleted && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodaySchedule;
