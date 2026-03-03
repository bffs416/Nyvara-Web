'use client';

import React, { useState } from 'react';
import { Project } from '@/lib/types';
import { ChevronLeft, ChevronRight, Edit2, Trash2, Paperclip } from 'lucide-react';

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
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const monthName = monthNames[currentDate.getMonth()].toUpperCase();

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
      <div className="flex justify-between items-end py-10 px-4 group/calheader">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 block mb-2">Cronograma Mensual</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black flex items-baseline gap-4">
            {monthName} <span className="text-gray-200 italic font-light">{year}</span>
          </h2>
        </div>
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
                className={`p-4 border-r border-b border-black min-h-[140px] h-auto transition-all hover:bg-gray-50 flex flex-col gap-2 relative ${isToday ? 'bg-blue-50/20' : ''}`}
              >
                <span className={`text-sm font-black ${isToday ? 'text-blue-600 underline underline-offset-8' : 'text-gray-300'}`}>
                  {day.toString().padStart(2, '0')}
                </span>

                <div className="flex flex-col gap-1.5 flex-1">
                  {dayProjects.map(p => (
                    <div
                      key={p.id}
                      title={p.title}
                      className="group/item cursor-pointer rounded-sm text-[10px] font-bold p-1.5 bg-black text-white flex items-start justify-between gap-2 shadow-sm hover:bg-blue-600 transition-colors"
                    >
                      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        {(() => {
                          const parts = p.title.split(':');
                          if (parts.length > 1) {
                            return (
                              <>
                                <span className="text-[7px] uppercase tracking-widest text-blue-300 font-black mb-0.5">{parts[0]}</span>
                                <span className="leading-tight break-words">{parts.slice(1).join(':').trim()}</span>
                              </>
                            );
                          }
                          return <span className="leading-tight break-words">{p.title}</span>
                        })()}
                        {(p.attachmentUrl || (p.attachments && p.attachments.length > 0)) && (
                          <div className="mt-1 flex items-center gap-1">
                            <Paperclip size={8} className="text-blue-300" />
                            <span className="text-[7px] text-blue-300 uppercase font-bold">Adjunto</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
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
