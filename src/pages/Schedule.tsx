
import React, { useState } from 'react';
import { ScheduleItem } from '@/types';
import { todaySchedule as initialSchedule } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';

const Schedule = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(initialSchedule);
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    startTime: '',
    endTime: '',
    location: '',
    category: 'other' as const,
    date: new Date().toISOString().split('T')[0]
  });

  const addSchedule = () => {
    if (!newSchedule.title.trim() || !newSchedule.startTime || !newSchedule.endTime) return;
    
    const getBlockColor = (category: string) => {
      switch(category) {
        case 'course': return 'bg-orange-400';
        case 'meal': return 'bg-green-400';
        case 'shopping': return 'bg-green-500';
        case 'fitness': return 'bg-purple-400';
        case 'travel': return 'bg-gray-300';
        default: return 'bg-purple-400';
      }
    };

    const newScheduleItem: ScheduleItem = {
      id: Date.now().toString(),
      title: newSchedule.title.trim(),
      startTime: newSchedule.startTime,
      endTime: newSchedule.endTime,
      location: newSchedule.location.trim() || undefined,
      category: newSchedule.category,
      icon: '',
      color: getBlockColor(newSchedule.category),
      isAutoGenerated: false
    };
    
    setSchedules([...schedules, newScheduleItem].sort((a, b) => a.startTime.localeCompare(b.startTime)));
    setNewSchedule({
      title: '',
      startTime: '',
      endTime: '',
      location: '',
      category: 'other',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };

  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays();
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="flex">
        {/* Time column */}
        <div className="w-16 flex-shrink-0">
          <div className="h-12 border-b border-gray-200"></div>
          {hours.map(hour => (
            <div key={hour} className="h-16 border-b border-gray-100 text-xs text-gray-400 px-2 py-1">
              {String(hour).padStart(2, '0')}:00
            </div>
          ))}
        </div>

        {/* Days columns */}
        <div className="flex-1 flex">
          {weekDays.map((day, dayIndex) => (
            <div key={dayIndex} className="flex-1 border-r border-gray-200">
              {/* Day header */}
              <div className="h-12 border-b border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs text-gray-500">
                    {day.toLocaleDateString('ko-KR', { weekday: 'short' })}
                  </div>
                  <div className={`text-sm font-medium ${
                    day.toDateString() === new Date().toDateString() 
                      ? 'text-blue-600' 
                      : 'text-gray-900'
                  }`}>
                    {day.getDate()}
                  </div>
                </div>
              </div>

              {/* Hour slots */}
              <div className="relative">
                {hours.map(hour => (
                  <div 
                    key={hour} 
                    className="h-16 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setNewSchedule({
                        ...newSchedule,
                        startTime: `${String(hour).padStart(2, '0')}:00`,
                        endTime: `${String(hour + 1).padStart(2, '0')}:00`,
                        date: day.toISOString().split('T')[0]
                      });
                      setShowAddForm(true);
                    }}
                  />
                ))}

                {/* Schedule blocks for this day */}
                {schedules
                  .filter(schedule => {
                    // For demo, show all schedules on today
                    return day.toDateString() === new Date().toDateString();
                  })
                  .map(schedule => {
                    const [startHour, startMin] = schedule.startTime.split(':').map(Number);
                    const [endHour, endMin] = schedule.endTime.split(':').map(Number);
                    const top = (startHour + startMin/60) * 64;
                    const height = ((endHour + endMin/60) - (startHour + startMin/60)) * 64;
                    
                    const getBlockColor = (category: string) => {
                      switch(category) {
                        case 'course': return 'bg-orange-400';
                        case 'meal': return 'bg-green-400';
                        case 'shopping': return 'bg-green-500';
                        case 'fitness': return 'bg-purple-400';
                        case 'travel': return 'bg-gray-300';
                        default: return 'bg-purple-400';
                      }
                    };

                    const isTravel = schedule.category === 'travel';

                    return (
                      <div
                        key={schedule.id}
                        className={`absolute left-1 right-1 rounded p-2 text-white text-xs shadow-sm ${
                          getBlockColor(schedule.category)
                        } ${isTravel ? 'h-6 py-1' : ''}`}
                        style={{ 
                          top: `${top}px`, 
                          height: isTravel ? '24px' : `${Math.max(height, 40)}px`,
                          zIndex: isTravel ? 1 : 2
                        }}
                      >
                        <div className={`font-medium truncate ${isTravel ? 'text-xs' : ''}`}>
                          {schedule.title}
                        </div>
                        {!isTravel && (
                          <div className="text-xs opacity-90">
                            {schedule.startTime}-{schedule.endTime}
                          </div>
                        )}
                      </div>
                    );
                  })
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">일정 관리</h1>
          
          <div className="flex items-center space-x-4">
            {/* View mode toggle */}
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 text-sm ${
                  viewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                주간
              </button>
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 text-sm ${
                  viewMode === 'month' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                월간
              </button>
            </div>

            {/* Date navigation */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setDate(newDate.getDate() - 7);
                  setCurrentDate(newDate);
                }}
              >
                <ChevronLeft size={16} />
              </Button>
              
              <span className="font-medium">
                {currentDate.toLocaleDateString('ko-KR', { 
                  year: 'numeric', 
                  month: 'long',
                  ...(viewMode === 'week' && { day: 'numeric' })
                })}
              </span>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setDate(newDate.getDate() + 7);
                  setCurrentDate(newDate);
                }}
              >
                <ChevronRight size={16} />
              </Button>
            </div>

            <Button onClick={() => setShowAddForm(true)}>
              <Plus size={16} className="mr-2" />
              일정 추가
            </Button>
          </div>
        </div>

        {/* Calendar view */}
        <div className="overflow-auto" style={{ height: 'calc(100vh - 180px)' }}>
          {viewMode === 'week' ? renderWeekView() : (
            <div className="p-6 text-center text-gray-500">
              월간 뷰는 준비 중입니다
            </div>
          )}
        </div>

        {/* Add schedule modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">새 일정 추가</h3>
              
              <div className="space-y-4">
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
                
                <div className="flex space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1"
                  >
                    취소
                  </Button>
                  <Button
                    onClick={addSchedule}
                    className="flex-1"
                  >
                    추가
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Schedule;
