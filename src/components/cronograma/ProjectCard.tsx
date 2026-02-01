'use client';

import React from 'react';
import { Project } from '@/lib/types';
import { Archive, AlertCircle, Clock, CheckCircle, RotateCcw, Target, Layers, Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
  onArchive: (id: string) => void;
  onRestore?: (id: string) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onArchive, onRestore, onEdit, onDelete }) => {
  const dateObj = new Date(project.dueDate);
  const quarter = Math.floor((dateObj.getUTCMonth() + 3) / 3);
  const monthName = dateObj.toLocaleString('es-ES', { month: 'short', timeZone: 'UTC' }).toUpperCase();
  const year = dateObj.getUTCFullYear();
  
  const getStatusDisplay = () => {
    if (project.status === 'archived') return { label: 'Archivo', icon: <Archive size={10} />, classes: 'border-gray-200 text-gray-400' };
    if (project.status === 'urgent') return { label: 'Urgente', icon: <AlertCircle size={10} />, classes: 'border-red-600 text-red-600 bg-red-50' };
    if (project.status === 'completed') return { label: 'Éxito', icon: <CheckCircle size={10} />, classes: 'border-emerald-600 text-emerald-600 bg-emerald-50' };
    return { label: 'Activo', icon: <Clock size={10} />, classes: 'border-black text-black' };
  };

  const status = getStatusDisplay();
  const isArchived = project.status === 'archived';

  return (
    <div className={`group grid grid-cols-1 md:grid-cols-[200px_20px_1fr] transition-all duration-700 border-b border-gray-100 ${isArchived ? 'opacity-50' : 'opacity-100'}`}>
      
      <div className="hidden md:flex py-20 md:text-right flex-col items-end border-r border-transparent pr-4">
        <span className="text-6xl font-black tracking-tighter leading-none transition-all duration-500 group-hover:text-blue-600">
          Q{quarter}
        </span>
        <span className="text-2xl font-black uppercase text-black mt-1 tracking-tighter transition-all duration-500 group-hover:translate-x-[-4px]">
          {monthName}
        </span>
        <span className="text-[10px] font-black uppercase text-gray-300 mt-1 tracking-[0.2em]">{year}</span>
        
        <div className={`mt-8 text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 border-2 flex items-center gap-2 ${status.classes}`}>
          {status.icon}
          {status.label}
        </div>
      </div>

      
      <div className="hidden md:block w-full bg-gray-100 relative">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-100 group-hover:bg-black transition-colors duration-1000"></div>
        <div className={`absolute top-24 left-1/2 -translate-x-1/2 w-[14px] h-[14px] border-2 border-white z-10 transition-all duration-500 ${isArchived ? 'bg-gray-300' : 'bg-black group-hover:scale-[2] group-hover:bg-blue-600 group-hover:border-0 shadow-xl'}`}></div>
      </div>

      
      <div className="py-10 md:py-20 md:pl-8 pb-16 md:pb-24">
        <div className="flex flex-col xl:flex-row gap-12 items-start">
          
          <div className="w-full xl:w-[450px] flex-shrink-0">
            <div className="relative overflow-hidden border border-black bg-gray-50 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.03)] group-hover:shadow-[20px_20px_0px_0px_rgba(37,99,235,0.08)] transition-all duration-700 flex items-center justify-center">
              <Image 
                src={project.imageUrl} 
                alt={project.title}
                width={800}
                height={600}
                className="w-full h-auto block transition-transform duration-[2000ms] group-hover:scale-105 p-0.5"
                style={{ maxHeight: '70vh' }}
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 flex items-center gap-2 pointer-events-none">
                <Layers size={10} />
                Visual Asset v.1
              </div>
            </div>
            <p className="mt-4 text-[8px] font-bold text-gray-300 uppercase tracking-widest text-right">Escalamiento Dinámico de Asset</p>
          </div>

          <div className="flex-1 space-y-8 w-full">
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] group-hover:text-blue-600 transition-colors duration-500">
                {project.title}
              </h3>
              <div className="flex gap-2">
                {!isArchived && onEdit && (
                  <button 
                    onClick={() => onEdit(project)} 
                    title="Editar proyecto"
                    className="p-4 border border-gray-200 hover:bg-black hover:text-white transition-all text-gray-400"
                  >
                    <Edit2 size={20} />
                  </button>
                )}
                {isArchived ? (
                  <button onClick={() => onRestore?.(project.id)} title="Restaurar" className="p-4 border border-gray-200 hover:bg-black hover:text-white transition-all"><RotateCcw size={20} /></button>
                ) : (
                  <button onClick={() => onArchive(project.id)} title="Archivar" className="p-4 border border-gray-200 hover:bg-blue-600 hover:text-white transition-all text-gray-400"><Archive size={20} /></button>
                )}
                {onDelete && (
                <button 
                  onClick={() => onDelete?.(project.id)} 
                  title="Eliminar permanentemente"
                  className="p-4 border border-gray-200 hover:bg-red-600 hover:text-white transition-all text-gray-400"
                >
                  <Trash2 size={20} />
                </button>
                )}
              </div>
            </div>

            <p className="text-xl md:text-2xl leading-tight text-gray-600 font-light tracking-tight max-w-2xl border-l-2 border-gray-100 pl-6 md:pl-8">
              {project.description}
            </p>

            <div className="bg-black text-white p-10 relative overflow-hidden group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-700">
               <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                <Target size={120} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 block mb-6">Objetivo Estratégico</span>
              <p className="text-lg md:text-xl font-medium leading-snug italic relative z-10">
                "{project.reason}"
              </p>
            </div>

            <div className="flex items-center gap-8 md:gap-12 pt-6">
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase text-gray-300 tracking-widest mb-2">Plazo de Entrega</span>
                <span className="text-sm font-black border-b-2 border-black pb-1">
                  {new Date(project.dueDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase text-gray-300 tracking-widest mb-2">Identificador Único</span>
                <span className="text-sm font-bold text-gray-400">
                  ID-{project.id.slice(-6).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
