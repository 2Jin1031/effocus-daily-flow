
export interface ScheduleItem {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  location?: string;
  category: 'course' | 'meal' | 'shopping' | 'fitness' | 'other';
  icon: string;
  color: string;
  distance?: string;
}

export interface LocationTodo {
  id: string;
  location: string;
  task: string;
  isCompleted: boolean;
  category: 'shopping' | 'course' | 'other';
}

export interface TravelRecommendation {
  destination: string;
  departureTime: string;
  arrivalTime: string;
  travelDuration: string;
  distance: string;
  route: string;
}
