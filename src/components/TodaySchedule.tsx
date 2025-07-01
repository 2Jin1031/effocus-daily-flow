
import React from 'react';
import { ScheduleItem } from '@/types';

interface TodayScheduleProps {
  schedules: ScheduleItem[];
}

const TodaySchedule = ({ schedules }: TodayScheduleProps) => {
  return (
    <div className="px-6 py-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">오늘의 일정</h2>
      <div className="space-y-3">
        {schedules.map((schedule, index) => (
          <div key={schedule.id} className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 ${schedule.color} rounded-full flex items-center justify-center text-white text-lg shadow-md`}>
                {schedule.icon}
              </div>
              {index < schedules.length - 1 && (
                <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{schedule.title}</h3>
                <span className="text-sm text-gray-500">
                  {schedule.startTime}~{schedule.endTime}
                </span>
              </div>
              {schedule.distance && (
                <p className="text-sm text-gray-600 mt-1">{schedule.distance}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySchedule;
