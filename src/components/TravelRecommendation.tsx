
import React from 'react';
import { TravelRecommendation } from '@/types';

interface TravelRecommendationProps {
  recommendation: TravelRecommendation;
}

const TravelRecommendation = ({ recommendation }: TravelRecommendationProps) => {
  return (
    <div className="px-6 py-4 bg-gray-50">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">🏠</span>
        </div>
        <h2 className="text-lg font-bold text-gray-900">{recommendation.destination}</h2>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="text-sm text-gray-600 mb-2">예상 거리: {recommendation.distance}</div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-1">
            {['5분', '20분', '7분', '3분'].map((time, index) => (
              <div key={index} className={`px-3 py-1 rounded-full text-sm ${
                index === 2 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {time}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {recommendation.travelDuration}
          </div>
          <div className="text-sm text-gray-600">
            지금 출발하면 {recommendation.arrivalTime} 도착
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelRecommendation;
