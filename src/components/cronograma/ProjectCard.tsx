'use client';

import React from 'react';
import { Project } from '@/lib/types';
import { Archive, AlertCircle, Clock, CheckCircle, RotateCcw, Target, Layers, Edit2, Trash2, ChevronDown, Paperclip } from 'lucide-react';
import Image from 'next/image';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ProjectCardProps {
  project: Project;
  onArchive: (id: string) => void;
  onRestore?: (id: string) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
  onToggleComplete?: (id: string, currentStatus: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onArchive, onRestore, onEdit, onDelete, onToggleComplete }) => {
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
  const isCompleted = project.status === 'completed';
  const inferredContentType = (() => {
    const title = project.title.toUpperCase();
    if (title.includes('CARNET')) return 'carnet';
    if (title.includes('PDF')) return 'pdf';
    if (title.includes('HISTORIA')) return 'historia';
    if (title.includes('REEL')) return 'reel';
    if (title.includes('CARRUSEL')) return 'carrusel';
    if (title.includes('VIDEO')) return 'video';
    return 'post';
  })();
  const kpis = project.kpis ?? {
    contentType: inferredContentType,
    platform: 'Instagram',
    periodMonth: project.dueDate.slice(0, 7),
  };
  const hasKpiData =
    kpis.reach !== undefined ||
    kpis.impressions !== undefined ||
    kpis.interactions !== undefined ||
    kpis.plays !== undefined ||
    kpis.profileVisits !== undefined ||
    kpis.linkClicks !== undefined ||
    kpis.comments !== undefined ||
    kpis.saves !== undefined;
  const formatPercent = (value: number) => `${value.toFixed(2)}%`;
  const engagementRate = kpis?.interactions && kpis?.reach
    ? (kpis.interactions / kpis.reach) * 100
    : undefined;
  const ctr = kpis?.linkClicks && kpis?.impressions
    ? (kpis.linkClicks / kpis.impressions) * 100
    : undefined;
  const isSocialFormat = ['historia', 'reel', 'video', 'carrusel', 'post'].includes(kpis.contentType);
  const isRetentionFormat = ['reel', 'video'].includes(kpis.contentType);
  const isCarouselFormat = kpis.contentType === 'carrusel';
  const isStoryFormat = kpis.contentType === 'historia';
  const isInternalFormat = ['pdf', 'carnet'].includes(kpis.contentType);
  const monthlySummary = (() => {
    if (!hasKpiData) return 'Pendiente de carga de métricas. Cuando registres datos, aquí verás el diagnóstico experto del rendimiento.';
    if ((engagementRate ?? 0) >= 5) {
      return 'Excelente respuesta de audiencia para este formato; conviene replicar la narrativa visual y el timing.';
    }
    if ((engagementRate ?? 0) >= 2) {
      return 'Rendimiento estable; se recomienda probar variaciones de hook y CTA para escalar interacción.';
    }
    return 'Rendimiento por optimizar; sugerimos ajustar gancho inicial, primer frame y llamada a la acción.';
  })();

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
            <div className="relative w-full overflow-hidden border border-black bg-gray-50 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.03)] group-hover:shadow-[20px_20px_0px_0px_rgba(37,99,235,0.08)] transition-all duration-700">
              {project.imageUrl && (project.imageUrl.endsWith('.mp4') || project.imageUrl.endsWith('.webm') || project.imageUrl.endsWith('.ogg')) ? (
                <video
                  src={project.imageUrl}
                  className="w-full h-auto block"
                  controls
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto block transition-transform duration-[2000ms] group-hover:scale-105"
                />
              )}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 flex items-center gap-2 pointer-events-none">
                <Layers size={10} />
                Visual Asset v.1
              </div>
            </div>
            <p className="mt-4 text-[8px] font-bold text-gray-300 uppercase tracking-widest text-right">Escalamiento Dinámico de Asset</p>
          </div>

          <div className="flex-1 space-y-8 w-full min-w-0">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 w-full">
              <div className="flex-1 min-w-0">
                {(() => {
                  const parts = project.title.split(':');
                  if (parts.length > 1) {
                    const prefix = parts[0].trim();
                    const main = parts.slice(1).join(':').trim();
                    return (
                      <>
                        <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-2 md:mb-3">
                          {prefix}
                        </span>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-[1.05] md:leading-[0.95] group-hover:text-blue-600 transition-colors duration-500 break-words text-left">
                          {main}
                        </h3>
                      </>
                    );
                  }
                  return (
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-[1.05] md:leading-[0.95] group-hover:text-blue-600 transition-colors duration-500 break-words text-left">
                      {project.title}
                    </h3>
                  );
                })()}
              </div>
              <div className="flex flex-wrap gap-2 self-end md:self-auto shrink-0 mt-4 md:mt-0">
                {!isArchived && onEdit && (
                  <button
                    onClick={() => onEdit(project)}
                    title="Editar proyecto"
                    className="p-4 border border-gray-200 hover:bg-black hover:text-white transition-all text-gray-400"
                  >
                    <Edit2 size={20} />
                  </button>
                )}

                {!isArchived && onToggleComplete && (
                  <button
                    onClick={() => onToggleComplete(project.id, project.status)}
                    title={isCompleted ? "Marcar como pendiente" : "Marcar como completado"}
                    className={`p-4 border border-gray-200 transition-all ${isCompleted ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'hover:bg-emerald-600 hover:text-white text-gray-400'}`}
                  >
                    <CheckCircle size={20} />
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

            <p className="text-base sm:text-lg md:text-2xl leading-tight text-gray-600 font-light tracking-tight max-w-2xl border-l-2 border-gray-100 pl-4 md:pl-8 text-left">
              {project.description}
            </p>

            <div className="bg-black text-white p-10 relative overflow-hidden md:group-hover:translate-x-4 transition-transform duration-700">
              <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
                <Target size={120} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 block mb-6">Objetivo Estratégico</span>
              <p className="text-lg md:text-xl font-medium leading-snug italic relative z-10">
                "{project.reason}"
              </p>
            </div>

            <div className="flex flex-wrap items-start gap-5 md:gap-12 pt-6">
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase text-gray-300 tracking-widest mb-2">Plazo de Entrega</span>
                <span className="text-sm font-black border-b-2 border-black pb-1">
                  {new Date(project.dueDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).toUpperCase()}
                </span>
              </div>
              {project.publishTime && (
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase text-gray-300 tracking-widest mb-2">Hora de Publicación</span>
                  <span className="text-sm font-black border-b-2 border-black pb-1">
                    {project.publishTime}
                  </span>
                </div>
              )}
              <div className="flex flex-col min-w-[140px]">
                <span className="text-[9px] font-black uppercase text-gray-300 tracking-widest mb-2">Identificador Único</span>
                <span className="text-sm font-bold text-gray-400">
                  ID-{project.id}
                </span>
              </div>
              {project.attachmentUrl && (
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase text-blue-400 tracking-widest mb-2">Archivo Adjunto</span>
                  <a
                    href={project.attachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-black border-b-2 border-blue-600 pb-1 text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Paperclip size={14} />
                    {project.attachmentName || 'Ver archivo'}
                  </a>
                </div>
              )}
            </div>

            <Collapsible className="border-2 border-black bg-gray-50" defaultOpen={false}>
              <CollapsibleTrigger asChild>
                <button className="w-full p-6 flex flex-wrap items-center justify-between gap-3 text-left hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600">
                      KPI por Publicación
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-2">
                      {kpis.platform || 'Red social'} · {kpis.contentType.toUpperCase()} {kpis.periodMonth ? `· ${kpis.periodMonth}` : ''}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-600">
                    Desplegar <ChevronDown size={16} />
                  </span>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6">
                {isSocialFormat && (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Alcance</p><p className="font-black text-lg">{kpis.reach ?? '-'}</p></div>
                      <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Impresiones</p><p className="font-black text-lg">{kpis.impressions ?? '-'}</p></div>
                      <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Interacciones</p><p className="font-black text-lg">{kpis.interactions ?? '-'}</p></div>
                      <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Reproducciones</p><p className="font-black text-lg">{kpis.plays ?? '-'}</p></div>
                      <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Visitas perfil</p><p className="font-black text-lg">{kpis.profileVisits ?? '-'}</p></div>
                      <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Clics enlace</p><p className="font-black text-lg">{kpis.linkClicks ?? '-'}</p></div>
                      <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Comentarios</p><p className="font-black text-lg">{kpis.comments ?? '-'}</p></div>
                      <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Guardados</p><p className="font-black text-lg">{kpis.saves ?? '-'}</p></div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Me gusta</p><p className="font-black text-lg">{kpis.likes ?? '-'}</p></div>
                      <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Reposts</p><p className="font-black text-lg">{kpis.reposts ?? '-'}</p></div>
                      <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Nuevos seguidores</p><p className="font-black text-lg">{kpis.newFollowers ?? '-'}</p></div>
                      <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Prom. reproducción</p><p className="font-black text-lg">{kpis.avgWatchTimeSec !== undefined ? `${kpis.avgWatchTimeSec}s` : '-'}</p></div>
                    </div>
                    {isStoryFormat && (
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                        <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Respuestas</p><p className="font-black text-lg">{kpis.storyReplies ?? '-'}</p></div>
                        <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Navegación total</p><p className="font-black text-lg">{kpis.storyNavigation ?? '-'}</p></div>
                        <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Retrocesos</p><p className="font-black text-lg">{kpis.storyBacks ?? '-'}</p></div>
                        <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Avances</p><p className="font-black text-lg">{kpis.storyForwards ?? '-'}</p></div>
                        <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Siguiente historia</p><p className="font-black text-lg">{kpis.storyNextStory ?? '-'}</p></div>
                        <div className="border border-black/10 bg-white p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Abandonos</p><p className="font-black text-lg">{kpis.storyExits ?? '-'}</p></div>
                      </div>
                    )}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="border border-blue-200 bg-blue-50 p-3">
                        <p className="text-[9px] uppercase tracking-widest font-bold text-blue-700">Engagement Rate</p>
                        <p className="font-black text-lg text-blue-700">{engagementRate !== undefined ? formatPercent(engagementRate) : '-'}</p>
                      </div>
                      <div className="border border-emerald-200 bg-emerald-50 p-3">
                        <p className="text-[9px] uppercase tracking-widest font-bold text-emerald-700">CTR</p>
                        <p className="font-black text-lg text-emerald-700">{ctr !== undefined ? formatPercent(ctr) : '-'}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="border border-black/10 bg-white p-3">
                        <p className="text-[9px] uppercase tracking-widest font-bold text-gray-500">Distribución Audiencia</p>
                        <p className="font-semibold text-sm mt-1">Seguidores: {kpis.followerViewsPercent !== undefined ? `${kpis.followerViewsPercent}%` : '-'}</p>
                        <p className="font-semibold text-sm">No seguidores: {kpis.nonFollowerViewsPercent !== undefined ? `${kpis.nonFollowerViewsPercent}%` : '-'}</p>
                      </div>
                      {(isRetentionFormat || isStoryFormat) && (
                        <div className="border border-black/10 bg-white p-3">
                          <p className="text-[9px] uppercase tracking-widest font-bold text-gray-500">Retención</p>
                          <p className="font-semibold text-sm mt-1">Duración: {kpis.videoDurationSec !== undefined ? `${kpis.videoDurationSec}s` : '-'}</p>
                          <p className="font-semibold text-sm">Omisión: {kpis.skipRatePercent !== undefined ? `${kpis.skipRatePercent}%` : '-'} (habitual {kpis.usualSkipRatePercent !== undefined ? `${kpis.usualSkipRatePercent}%` : '-'})</p>
                        </div>
                      )}
                    </div>
                    {(isRetentionFormat || isCarouselFormat || isStoryFormat) && (
                      <div className="mt-4 border border-black/10 bg-white p-3 text-xs">
                        <p className="text-[9px] uppercase tracking-widest font-bold text-gray-500">Origen de visualizaciones</p>
                        <p className="mt-1 text-sm font-semibold">
                          Feed {kpis.feedViewsPercent !== undefined ? `${kpis.feedViewsPercent}%` : '-'} · Reels {kpis.reelsTabViewsPercent !== undefined ? `${kpis.reelsTabViewsPercent}%` : '-'} · Perfil {kpis.profileViewsPercent !== undefined ? `${kpis.profileViewsPercent}%` : '-'} · Historias {kpis.storiesViewsPercent !== undefined ? `${kpis.storiesViewsPercent}%` : '-'}
                        </p>
                      </div>
                    )}
                  </>
                )}
                {isInternalFormat && (
                  <div className="border border-black/10 bg-white p-4 text-sm text-gray-700">
                    <p className="font-black uppercase tracking-widest text-[10px] text-gray-500 mb-2">KPI de Proyecto Interno</p>
                    <p>Este tipo de activo ({kpis.contentType.toUpperCase()}) se evalua por calidad de entrega, aprobacion y utilidad comercial interna. Puedes documentar resultados y observaciones en las notas.</p>
                  </div>
                )}
                <p className="mt-4 text-sm leading-snug text-gray-700 border-l-2 border-blue-500 pl-3">
                  <span className="font-bold">Resumen experto:</span> {kpis.strategicSummary || monthlySummary}
                </p>
                {kpis.notes && (
                  <p className="mt-2 text-xs text-gray-500 italic">Nota: {kpis.notes}</p>
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
