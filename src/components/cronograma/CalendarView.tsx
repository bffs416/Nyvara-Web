'use client';

import React, { useState } from 'react';
import { Project } from '@/lib/types';
import { ChevronLeft, ChevronRight, Edit2, Trash2 } from 'lucide-react';

interface CalendarViewProps {
  projects: Project[];
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (id: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ projects, onEditProject, onDeleteProject }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('es-ES', { month: 'long' }).toUpperCase();

  const days = Array.from({ length: daysInMonth(year, month) }, (_, i) => i + 1);
  const padding = Array.from({ length: (startDayOfMonth(year, month) + 6) % 7 }, (_, i) => i); 

  const dayNames = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];

  const getProjectsForDay = (day: number) => {
    return projects.filter(p => {
      const d = new Date(p.dueDate);
      // Adjust for timezone differences by comparing UTC dates
      return d.getUTCDate() === day && d.getUTCMonth() === month && d.getUTCFullYear() === year;
    });
  };

  return (
    <div className="border-t border-black animate-in fade-in duration-500">
      <div className="flex justify-between items-center py-8">
        <h2 className="text-4xl font-black uppercase tracking-tighter">
          {monthName} <span className="text-gray-300 italic">{year}</span>
        </h2>
        <div className="flex gap-4">
          <button onClick={prevMonth} title="Mes anterior" className="p-2 border border-black hover:bg-black hover:text-white transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextMonth} title="Siguiente mes" className="p-2 border border-black hover:bg-black hover:text-white transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 border-l border-t border-black min-w-[840px]">
          {dayNames.map(d => (
            <div key={d} className="p-4 border-r border-b border-black text-[10px] font-bold tracking-widest text-center bg-gray-50">
              {d}
            </div>
          ))}
          
          {padding.map(i => (
            <div key={`pad-${i}`} className="p-4 border-r border-b border-black min-h-[140px] bg-gray-50/50"></div>
          ))}

          {days.map(day => {
            const dayProjects = getProjectsForDay(day);
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
            
            return (
              <div 
                key={day} 
                className={`p-4 border-r border-b border-black min-h-[160px] h-auto transition-all hover:bg-gray-50 flex flex-col gap-2 relative ${isToday ? 'bg-blue-50/30' : ''}`}
              >
                <span className={`text-sm font-black ${isToday ? 'text-blue-600 underline underline-offset-8' : 'text-gray-300'}`}>
                  {day.toString().padStart(2, '0')}
                </span>
                
                <div className="flex flex-col gap-1.5 flex-1 overflow-visible">
                  {dayProjects.map(p => (
                    <div
                      key={p.id}
                      title={p.title}
                      className="group/item cursor-pointer rounded-sm text-[10px] font-bold p-1.5 bg-black text-white flex items-start justify-between gap-2 shadow-sm hover:bg-blue-600 transition-colors"
                    >
                      <span className="flex-1 break-words">{p.title}</span>
                      <div className="flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditProject?.(p);
                          }}
                          className="p-0.5 hover:text-yellow-400"
                          title="Editar"
                        >
                          <Edit2 size={10} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteProject?.(p.id);
                          }}
                          className="p-0.5 hover:text-red-400"
                          title="Eliminar"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {dayProjects.length > 3 && (
                  <span className="text-[7px] font-bold text-gray-400 uppercase text-right">
                    + {dayProjects.length - 3} adicionales
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="py-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">
        * Las celdas se expanden verticalmente según la densidad de proyectos.
      </div>
    </div>
  );
};

export default CalendarView;
