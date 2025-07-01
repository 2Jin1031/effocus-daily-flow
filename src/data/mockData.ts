
import { ScheduleItem, LocationTodo, TravelRecommendation } from '@/types';

export const todaySchedule: ScheduleItem[] = [
  {
    id: '1',
    title: '우아한테크코스 출근',
    startTime: '09:00',
    endTime: '10:00',
    location: '잠실역',
    category: 'course',
    icon: '🚶',
    color: 'bg-blue-500',
    distance: '도보 10분, 500m'
  },
  {
    id: '2',
    title: '[강의] 레벨3 오리엔테이션',
    startTime: '10:00',
    endTime: '10:30',
    location: '우아한테크코스',
    category: 'course',
    icon: '🎓',
    color: 'bg-orange-500'
  },
  {
    id: '3',
    title: '점심',
    startTime: '12:00',
    endTime: '13:00',
    location: '루터회관',
    category: 'meal',
    icon: '🍽️',
    color: 'bg-yellow-500'
  },
  {
    id: '4',
    title: '다이소',
    startTime: '16:00',
    endTime: '16:30',
    location: '다이소',
    category: 'shopping',
    icon: '🛒',
    color: 'bg-green-500'
  },
  {
    id: '5',
    title: '헬스장',
    startTime: '18:00',
    endTime: '19:30',
    location: '헬스장',
    category: 'fitness',
    icon: '💪',
    color: 'bg-purple-500'
  }
];

export const locationTodos: LocationTodo[] = [
  {
    id: '1',
    location: '다이소',
    task: '칫솔 사기',
    isCompleted: false,
    category: 'shopping'
  },
  {
    id: '2',
    location: '우테코',
    task: '페어룸 예약하기',
    isCompleted: false,
    category: 'course'
  }
];

export const travelRecommendation: TravelRecommendation = {
  destination: '우아한테크코스 캠퍼스',
  departureTime: '08:23',
  arrivalTime: '17:42',
  travelDuration: '35분',
  distance: '12.3km',
  route: '5분 → 20분 → 7분 → 3분'
};
