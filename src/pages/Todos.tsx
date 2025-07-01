
import React, { useState } from 'react';
import { LocationTodo } from '@/types';
import { locationTodos as initialTodos } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Plus, MapPin } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

const Todos = () => {
  const [todos, setTodos] = useState<LocationTodo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  
  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const todoText = newTodo.trim();
    let location = '기타';
    let task = todoText;
    
    // Check if it starts with # for location tagging
    if (todoText.startsWith('#')) {
      const parts = todoText.substring(1).split(' - ');
      if (parts.length >= 2) {
        location = parts[0].trim();
        task = parts.slice(1).join(' - ').trim();
      }
    }
    
    const newTodoItem: LocationTodo = {
      id: Date.now().toString(),
      location,
      task,
      isCompleted: false,
      category: 'other'
    };
    
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };
  
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };
  
  const groupedTodos = todos.reduce((groups, todo) => {
    const location = todo.location;
    if (!groups[location]) {
      groups[location] = [];
    }
    groups[location].push(todo);
    return groups;
  }, {} as Record<string, LocationTodo[]>);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto bg-white shadow-lg">
        <div className="px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">TODO 관리</h1>
        </div>
        
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex space-x-2">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="새 TODO 추가 (예: #다이소 - 칫솔 사기)"
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className="flex-1"
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              <Plus size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            팁: #장소명 - 할일 형식으로 입력하면 장소별로 분류됩니다
          </p>
        </div>
        
        <div className="px-6 py-4">
          {Object.entries(groupedTodos).map(([location, locationTodos]) => (
            <div key={location} className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <MapPin size={16} className="text-blue-500" />
                <h3 className="font-semibold text-gray-900">{location}</h3>
                <span className="text-sm text-gray-500">({locationTodos.length})</span>
              </div>
              
              <div className="space-y-2 ml-6">
                {locationTodos.map((todo) => (
                  <div 
                    key={todo.id}
                    className="bg-blue-50 p-3 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-100"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-blue-700 text-sm ${todo.isCompleted ? 'line-through opacity-60' : ''}`}>
                        {todo.task}
                      </span>
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
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Todos;
