
import React from 'react';
import Header from '@/components/Header';
import TodaySchedule from '@/components/TodaySchedule';
import TravelRecommendation from '@/components/TravelRecommendation';
import BottomNavigation from '@/components/BottomNavigation';
import { todaySchedule, travelRecommendation } from '@/data/mockData';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <div className="max-w-md mx-auto bg-white shadow-lg">
        <TodaySchedule schedules={todaySchedule} />
        
        <div className="border-t border-gray-100">
          <TravelRecommendation recommendation={travelRecommendation} />
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
