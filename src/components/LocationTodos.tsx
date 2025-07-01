
import React from 'react';
import { LocationTodo } from '@/types';

interface LocationTodosProps {
  todos: LocationTodo[];
}

const LocationTodos = ({ todos }: LocationTodosProps) => {
  return (
    <div className="px-6 py-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">장소 기반 TODO</h2>
      <div className="space-y-3">
        {todos.map((todo) => (
          <div key={todo.id} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-900">{todo.location}</h3>
                <p className="text-blue-700 text-sm mt-1">{todo.task}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ${
                todo.isCompleted 
                  ? 'bg-blue-500 border-blue-500' 
                  : 'border-blue-300'
              }`}>
                {todo.isCompleted && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationTodos;
