import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ClassPlan } from '../types';

interface ClassPlanCalendarProps {
  plans: ClassPlan[];
  onDateClick?: (date: Date) => void;
}

const ClassPlanCalendar: React.FC<ClassPlanCalendarProps> = ({ plans, onDateClick }) => {
  const hasClassPlan = (date: Date) => {
    return plans.some(plan => {
      const planDate = new Date(plan.classDate);
      return (
        planDate.getDate() === date.getDate() &&
        planDate.getMonth() === date.getMonth() &&
        planDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Agenda de aulas</h2>
      <Calendar
        locale="pt-BR"
        className="rounded-lg border-none"
        tileClassName={({ date }) =>
          hasClassPlan(date) ? 'has-class-plan font-semibold' : ''
        }
        tileContent={({ date, view }) =>
          view === 'month' && hasClassPlan(date) ? (
            <div className="flex justify-center mt-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            </div>
          ) : null
        }
        onClickDay={(value) => onDateClick?.(value)}
      />
    </div>
  );
};

export default ClassPlanCalendar;
