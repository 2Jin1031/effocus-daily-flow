
import React, { useState } from 'react';
import { ScheduleItem } from '@/types';
import { todaySchedule as initialSchedule } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Plus, Clock, MapPin, Link as LinkIcon } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

const Schedule = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(initialSchedule);
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    startTime: '',
    endTime: '',
    location: '',
    category: 'other' as const,
    link: '',
    todo: ''
  });
  
  const addSchedule = () => {
    if (!newSchedule.title.trim() || !newSchedule.startTime || !newSchedule.endTime) return;
    
    const categoryIcons = {
      course: '🎓',
      meal: '🍽️',
      shopping: '🛒',
      fitness: '💪',
      other: '📝'
    };
    
    const categoryColors = {
      course: 'bg-orange-500',
      meal: 'bg-yellow-500',
      shopping: 'bg-green-500',
      fitness: 'bg-purple-500',
      other: 'bg-gray-500'
    };
    
    const newScheduleItem: ScheduleItem = {
      id: Date.now().toString(),
      title: newSchedule.title.trim(),
      startTime: newSchedule.startTime,
      endTime: newSchedule.endTime,
      location: newSchedule.location.trim() || undefined,
      category: newSchedule.category,
      icon: categoryIcons[newSchedule.category],
      color: categoryColors[newSchedule.category]
    };
    
    setSchedules([...schedules, newScheduleItem].sort((a, b) => a.startTime.localeCompare(b.startTime)));
    setNewSchedule({
      title: '',
      startTime: '',
      endTime: '',
      location: '',
      category: 'other',
      link: '',
      todo: ''
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto bg-white shadow-lg">
        <div className="px-6 py-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">일정 관리</h1>
        </div>
        
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="space-y-3">
            <Input
              value={newSchedule.title}
              onChange={(e) => setNewSchedule({...newSchedule, title: e.target.value})}
              placeholder="일정 제목"
            />
            
            <div className="flex space-x-2">
              <Input
                type="time"
                value={newSchedule.startTime}
                onChange={(e) => setNewSchedule({...newSchedule, startTime: e.target.value})}
                className="flex-1"
              />
              <span className="self-center text-gray-500">~</span>
              <Input
                type="time"
                value={newSchedule.endTime}
                onChange={(e) => setNewSchedule({...newSchedule, endTime: e.target.value})}
                className="flex-1"
              />
            </div>
            
            <Input
              value={newSchedule.location}
              onChange={(e) => setNewSchedule({...newSchedule, location: e.target.value})}
              placeholder="장소 (선택사항)"
            />
            
            <select
              value={newSchedule.category}
              onChange={(e) => setNewSchedule({...newSchedule, category: e.target.value as any})}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="course">강의/수업</option>
              <option value="meal">식사</option>
              <option value="shopping">쇼핑</option>
              <option value="fitness">운동</option>
              <option value="other">기타</option>
            </select>
            
            <Input
              value={newSchedule.link}
              onChange={(e) => setNewSchedule({...newSchedule, link: e.target.value})}
              placeholder="링크 (선택사항)"
            />
            
            <Input
              value={newSchedule.todo}
              onChange={(e) => setNewSchedule({...newSchedule, todo: e.target.value})}
              placeholder="관련 TODO (선택사항)"
            />
            
            <button
              onClick={addSchedule}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex items-center justify-center space-x-2"
            >
              <Plus size={20} />
              <span>일정 추가</span>
            </button>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">등록된 일정</h2>
          <div className="space-y-3">
            {schedules.map((schedule, index) => (
              <div key={schedule.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 ${schedule.color} rounded-full flex items-center justify-center text-white text-sm`}>
                  {schedule.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{schedule.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{schedule.startTime}~{schedule.endTime}</span>
                    </div>
                    {schedule.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin size={12} />
                        <span>{schedule.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Schedule;
