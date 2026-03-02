'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ContentType, Project } from '@/lib/types';
import { Wand2, X, Calendar as CalendarIcon, Info, Image as ImageIcon, Upload, Sparkles, Target, Save } from 'lucide-react';
import { enhanceProjectWithAI } from '@/services/gemini';

const parseMetric = (value: string) => {
  const normalized = value.replace(/[^0-9]/g, '');
  if (!normalized) return undefined;
  const parsed = Number(normalized);
  return Number.isNaN(parsed) ? undefined : parsed;
};

interface ProjectFormProps {
  onAdd: (project: Project) => void;
  onClose: () => void;
  initialData?: Project;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onAdd, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    reason: initialData?.reason || '',
    imageUrl: initialData?.imageUrl || '',
    dueDate: initialData?.dueDate || '',
    publishTime: initialData?.publishTime || '',
  });
  const [kpisData, setKpisData] = useState({
    contentType: initialData?.kpis?.contentType || 'reel',
    platform: initialData?.kpis?.platform || 'Instagram',
    periodMonth: initialData?.kpis?.periodMonth || (initialData?.dueDate ? initialData.dueDate.slice(0, 7) : ''),
    reach: initialData?.kpis?.reach?.toString() || '',
    impressions: initialData?.kpis?.impressions?.toString() || '',
    interactions: initialData?.kpis?.interactions?.toString() || '',
    plays: initialData?.kpis?.plays?.toString() || '',
    likes: initialData?.kpis?.likes?.toString() || '',
    reposts: initialData?.kpis?.reposts?.toString() || '',
    profileVisits: initialData?.kpis?.profileVisits?.toString() || '',
    linkClicks: initialData?.kpis?.linkClicks?.toString() || '',
    shares: initialData?.kpis?.shares?.toString() || '',
    comments: initialData?.kpis?.comments?.toString() || '',
    saves: initialData?.kpis?.saves?.toString() || '',
    newFollowers: initialData?.kpis?.newFollowers?.toString() || '',
    followerViewsPercent: initialData?.kpis?.followerViewsPercent?.toString() || '',
    nonFollowerViewsPercent: initialData?.kpis?.nonFollowerViewsPercent?.toString() || '',
    avgWatchTimeSec: initialData?.kpis?.avgWatchTimeSec?.toString() || '',
    videoDurationSec: initialData?.kpis?.videoDurationSec?.toString() || '',
    skipRatePercent: initialData?.kpis?.skipRatePercent?.toString() || '',
    usualSkipRatePercent: initialData?.kpis?.usualSkipRatePercent?.toString() || '',
    feedViewsPercent: initialData?.kpis?.feedViewsPercent?.toString() || '',
    reelsTabViewsPercent: initialData?.kpis?.reelsTabViewsPercent?.toString() || '',
    profileViewsPercent: initialData?.kpis?.profileViewsPercent?.toString() || '',
    storiesViewsPercent: initialData?.kpis?.storiesViewsPercent?.toString() || '',
    strategicSummary: initialData?.kpis?.strategicSummary || '',
    notes: initialData?.kpis?.notes || '',
  });
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        reason: initialData.reason,
        imageUrl: initialData.imageUrl,
        dueDate: initialData.dueDate,
        publishTime: initialData.publishTime || '',
      });
      setKpisData({
        contentType: initialData.kpis?.contentType || 'reel',
        platform: initialData.kpis?.platform || 'Instagram',
        periodMonth: initialData.kpis?.periodMonth || (initialData.dueDate ? initialData.dueDate.slice(0, 7) : ''),
        reach: initialData.kpis?.reach?.toString() || '',
        impressions: initialData.kpis?.impressions?.toString() || '',
        interactions: initialData.kpis?.interactions?.toString() || '',
        plays: initialData.kpis?.plays?.toString() || '',
        likes: initialData.kpis?.likes?.toString() || '',
        reposts: initialData.kpis?.reposts?.toString() || '',
        profileVisits: initialData.kpis?.profileVisits?.toString() || '',
        linkClicks: initialData.kpis?.linkClicks?.toString() || '',
        shares: initialData.kpis?.shares?.toString() || '',
        comments: initialData.kpis?.comments?.toString() || '',
        saves: initialData.kpis?.saves?.toString() || '',
        newFollowers: initialData.kpis?.newFollowers?.toString() || '',
        followerViewsPercent: initialData.kpis?.followerViewsPercent?.toString() || '',
        nonFollowerViewsPercent: initialData.kpis?.nonFollowerViewsPercent?.toString() || '',
        avgWatchTimeSec: initialData.kpis?.avgWatchTimeSec?.toString() || '',
        videoDurationSec: initialData.kpis?.videoDurationSec?.toString() || '',
        skipRatePercent: initialData.kpis?.skipRatePercent?.toString() || '',
        usualSkipRatePercent: initialData.kpis?.usualSkipRatePercent?.toString() || '',
        feedViewsPercent: initialData.kpis?.feedViewsPercent?.toString() || '',
        reelsTabViewsPercent: initialData.kpis?.reelsTabViewsPercent?.toString() || '',
        profileViewsPercent: initialData.kpis?.profileViewsPercent?.toString() || '',
        storiesViewsPercent: initialData.kpis?.storiesViewsPercent?.toString() || '',
        strategicSummary: initialData.kpis?.strategicSummary || '',
        notes: initialData.kpis?.notes || '',
      });
      setImagePreview(initialData.imageUrl);
    }
  }, [initialData]);

  const handleAI = async () => {
    if (!formData.title) return alert('Define un título para iniciar el análisis.');
    setIsEnhancing(true);
    try {
      const currentImage = imagePreview || formData.imageUrl;
      const result = await enhanceProjectWithAI(formData.title, currentImage || undefined);
      setFormData(prev => ({
        ...prev,
        description: result.description,
        reason: result.reason,
      }));

      if (!imagePreview && !formData.imageUrl) {
        const fallback = `https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800`;
        setFormData(prev => ({ ...prev, imageUrl: fallback }));
        setImagePreview(fallback);
      }
    } catch (error) {
      console.error(error);
      alert('Error en el servicio de IA.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        alert("El archivo original es demasiado pesado (Máx 20MB).");
        return;
      }

      setIsProcessing(true);
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          setImagePreview(base64);
          setFormData(prev => ({ ...prev, imageUrl: base64 }));
          setIsProcessing(false);
        };
        reader.onerror = () => {
          setIsProcessing(false);
          alert("No se pudo leer el archivo.");
        };
      } catch (err) {
        console.error("Error al procesar imagen:", err);
        alert("No se pudo procesar la imagen.");
        setIsProcessing(false);
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  const handleUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, imageUrl: url }));
    setImagePreview(url || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate) return;

    const finalImageUrl = imagePreview || formData.imageUrl || `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800`;

    const projectData: Project = {
      id: initialData?.id || Date.now().toString(),
      title: formData.title.toUpperCase(),
      description: formData.description,
      reason: formData.reason,
      imageUrl: finalImageUrl,
      dueDate: formData.dueDate,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      status: initialData?.status || 'pending',
      publishTime: formData.publishTime || undefined,
      kpis: {
        contentType: kpisData.contentType as ContentType,
        platform: kpisData.platform || undefined,
        periodMonth: kpisData.periodMonth || undefined,
        reach: parseMetric(kpisData.reach),
        impressions: parseMetric(kpisData.impressions),
        interactions: parseMetric(kpisData.interactions),
        plays: parseMetric(kpisData.plays),
        likes: parseMetric(kpisData.likes),
        reposts: parseMetric(kpisData.reposts),
        profileVisits: parseMetric(kpisData.profileVisits),
        linkClicks: parseMetric(kpisData.linkClicks),
        shares: parseMetric(kpisData.shares),
        comments: parseMetric(kpisData.comments),
        saves: parseMetric(kpisData.saves),
        newFollowers: parseMetric(kpisData.newFollowers),
        followerViewsPercent: parseMetric(kpisData.followerViewsPercent),
        nonFollowerViewsPercent: parseMetric(kpisData.nonFollowerViewsPercent),
        avgWatchTimeSec: parseMetric(kpisData.avgWatchTimeSec),
        videoDurationSec: parseMetric(kpisData.videoDurationSec),
        skipRatePercent: parseMetric(kpisData.skipRatePercent),
        usualSkipRatePercent: parseMetric(kpisData.usualSkipRatePercent),
        feedViewsPercent: parseMetric(kpisData.feedViewsPercent),
        reelsTabViewsPercent: parseMetric(kpisData.reelsTabViewsPercent),
        profileViewsPercent: parseMetric(kpisData.profileViewsPercent),
        storiesViewsPercent: parseMetric(kpisData.storiesViewsPercent),
        strategicSummary: kpisData.strategicSummary || undefined,
        notes: kpisData.notes || undefined,
      },
    };

    onAdd(projectData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white border-4 border-black w-full max-w-5xl shadow-[30px_30px_0px_0px_rgba(37,99,235,0.2)] animate-in fade-in zoom-in duration-500 my-4 sm:my-8 max-h-[90vh] overflow-y-auto">
        <div className="border-b-4 border-black px-5 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-10 flex justify-between items-center gap-3 bg-gray-50">
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight">
              {initialData ? 'Actualizar Registro' : 'Crear Secuencia'}
            </h2>
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.4em] mt-2 sm:mt-3 text-blue-600">Protocolo de Registro HANSBIOMED SAS</p>
          </div>
          <button onClick={onClose} className="p-2 sm:p-3 lg:p-4 border-2 border-black hover:bg-black hover:text-white transition-all shrink-0">
            <X size={22} className="sm:hidden" />
            <X size={28} className="hidden sm:block lg:hidden" />
            <X size={32} className="hidden lg:block" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-8 lg:p-12 space-y-8 sm:space-y-10 lg:space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">

            <div className="col-span-full">
              <label className="block text-[11px] font-black uppercase tracking-widest mb-4">Título del Proyecto</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  placeholder="NOMBRE DEL PROYECTO..."
                  className="w-full px-0 py-4 sm:py-5 lg:py-6 bg-transparent border-b-4 border-gray-100 focus:border-black outline-none transition-all text-2xl sm:text-3xl lg:text-4xl font-black uppercase placeholder:text-gray-100"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
                <button
                  type="button"
                  onClick={handleAI}
                  disabled={isEnhancing}
                  className="absolute right-0 bottom-2 sm:bottom-3 lg:bottom-4 flex items-center gap-2 sm:gap-3 px-3 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-black text-white text-[9px] sm:text-[10px] lg:text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 disabled:opacity-20 transition-all shadow-2xl"
                >
                  {isEnhancing ? <Sparkles size={16} className="animate-spin" /> : <Wand2 size={16} />}
                  Optimizar con IA
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <CalendarIcon size={14} /> Fecha Límite
              </label>
              <input
                required
                type="date"
                className="w-full px-6 py-5 bg-gray-50 border-2 border-black font-black uppercase text-sm focus:bg-white outline-none"
                value={formData.dueDate}
                onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest mb-4">Hora de Publicación</label>
              <input
                type="time"
                className="w-full px-6 py-5 bg-gray-50 border-2 border-black font-black uppercase text-sm focus:bg-white outline-none"
                value={formData.publishTime}
                onChange={e => setFormData({ ...formData, publishTime: e.target.value })}
              />
            </div>

            <div className="col-span-full border-2 border-black p-4 sm:p-6 lg:p-8 bg-gray-50">
              <label className="block text-[11px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <ImageIcon size={14} /> Componente Visual / Multimedia
                {formData.imageUrl && (
                  <span className="ml-auto text-blue-600 font-bold lowercase">
                    {formData.imageUrl.split('/').pop()}
                  </span>
                )}
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                <div className="space-y-6">
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="PEGAR URL DE IMAGEN..."
                      className="w-full px-6 py-4 bg-white border-2 border-black font-bold uppercase text-[10px] outline-none focus:ring-4 focus:ring-blue-100"
                      value={formData.imageUrl.startsWith('data:') ? '' : formData.imageUrl}
                      onChange={e => handleUrlChange(e.target.value)}
                    />
                    <div className="flex items-center gap-4">
                      <div className="h-[2px] flex-1 bg-gray-200"></div>
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">O Subir Archivo Pesado</span>
                      <div className="h-[2px] flex-1 bg-gray-200"></div>
                    </div>
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-3 sm:py-4 border-2 border-black font-black uppercase text-[10px] sm:text-[11px] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isProcessing ? <Sparkles size={18} className="animate-spin" /> : <Upload size={18} />}
                      {isProcessing ? 'Procesando Activo...' : 'Seleccionar de Equipo'}
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="aspect-video border-4 border-black bg-white flex items-center justify-center overflow-hidden relative shadow-inner min-h-[180px]">
                  {imagePreview ? (
                    imagePreview.startsWith('data:video/') || imagePreview.endsWith('.mp4') || imagePreview.endsWith('.webm') || imagePreview.endsWith('.ogg') ? (
                      <video
                        src={imagePreview}
                        className="max-w-full max-h-full object-contain p-2"
                        controls
                        muted
                      />
                    ) : (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain p-2"
                      />
                    )
                  ) : (
                    <div className="text-gray-200 flex flex-col items-center gap-4">
                      <ImageIcon size={64} />
                      <span className="text-[10px] font-black uppercase tracking-[0.5em]">Sin Previsualización</span>
                    </div>
                  )}
                  {imagePreview && !isProcessing && (
                    <button
                      type="button"
                      onClick={() => { setImagePreview(null); setFormData(p => ({ ...p, imageUrl: '' })); }}
                      className="absolute top-2 right-2 p-1 bg-black text-white hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-full space-y-12">
              <div className="border-2 border-black p-4 sm:p-6 lg:p-8 bg-white">
                <h3 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tighter mb-2">
                  KPI por Publicación
                </h3>
                <p className="text-[11px] text-gray-500 mb-4 sm:mb-6">
                  Completa solo lo que aplique. Los campos están agrupados en secciones desplegables para que el formulario sea más cómodo en pantallas pequeñas.
                </p>

                <div className="space-y-4">
                  <details open className="border border-black/10">
                    <summary className="cursor-pointer px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 text-[11px] font-black uppercase tracking-widest flex items-center justify-between">
                      Datos básicos de la publicación
                      <span className="text-[10px] font-bold text-gray-400">Formato, plataforma y mes</span>
                    </summary>
                    <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Tipo de Contenido</label>
                        <select
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold uppercase text-xs outline-none"
                          value={kpisData.contentType}
                          onChange={e => setKpisData(prev => ({ ...prev, contentType: e.target.value as ContentType }))}
                        >
                          <option value="reel">Reel</option>
                          <option value="historia">Historia</option>
                          <option value="carrusel">Carrusel</option>
                          <option value="video">Video</option>
                          <option value="post">Post</option>
                          <option value="pdf">PDF</option>
                          <option value="carnet">Carnet</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Plataforma</label>
                        <input
                          type="text"
                          placeholder="Instagram"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.platform}
                          onChange={e => setKpisData(prev => ({ ...prev, platform: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Mes KPI (YYYY-MM)</label>
                        <input
                          type="month"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.periodMonth}
                          onChange={e => setKpisData(prev => ({ ...prev, periodMonth: e.target.value }))}
                        />
                      </div>
                    </div>
                  </details>

                  <details className="border border-black/10">
                    <summary className="cursor-pointer px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 text-[11px] font-black uppercase tracking-widest flex items-center justify-between">
                      Alcance e interacción
                      <span className="text-[10px] font-bold text-gray-400">Alcance, impresiones y acciones</span>
                    </summary>
                    <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Alcance</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.reach}
                          onChange={e => setKpisData(prev => ({ ...prev, reach: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Impresiones / Visualizaciones</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.impressions}
                          onChange={e => setKpisData(prev => ({ ...prev, impressions: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Interacciones totales</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.interactions}
                          onChange={e => setKpisData(prev => ({ ...prev, interactions: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Me gusta</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.likes}
                          onChange={e => setKpisData(prev => ({ ...prev, likes: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Reposts</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.reposts}
                          onChange={e => setKpisData(prev => ({ ...prev, reposts: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Visualizaciones / Reproducciones</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.plays}
                          onChange={e => setKpisData(prev => ({ ...prev, plays: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Visitas al perfil</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.profileVisits}
                          onChange={e => setKpisData(prev => ({ ...prev, profileVisits: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Clics en enlace</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.linkClicks}
                          onChange={e => setKpisData(prev => ({ ...prev, linkClicks: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Compartidos</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.shares}
                          onChange={e => setKpisData(prev => ({ ...prev, shares: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Comentarios</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.comments}
                          onChange={e => setKpisData(prev => ({ ...prev, comments: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Guardados</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.saves}
                          onChange={e => setKpisData(prev => ({ ...prev, saves: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Nuevos seguidores</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.newFollowers}
                          onChange={e => setKpisData(prev => ({ ...prev, newFollowers: e.target.value }))}
                        />
                      </div>
                    </div>
                  </details>

                  <details className="border border-black/10">
                    <summary className="cursor-pointer px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 text-[11px] font-black uppercase tracking-widest flex items-center justify-between">
                      Distribución, retención y análisis experto
                      <span className="text-[10px] font-bold text-gray-400">% vistas, retención y notas</span>
                    </summary>
                    <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">% Visualizaciones Seguidores</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.followerViewsPercent}
                          onChange={e => setKpisData(prev => ({ ...prev, followerViewsPercent: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">% Visualizaciones No Seguidores</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.nonFollowerViewsPercent}
                          onChange={e => setKpisData(prev => ({ ...prev, nonFollowerViewsPercent: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Tiempo promedio (seg)</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.avgWatchTimeSec}
                          onChange={e => setKpisData(prev => ({ ...prev, avgWatchTimeSec: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Duración video (seg)</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.videoDurationSec}
                          onChange={e => setKpisData(prev => ({ ...prev, videoDurationSec: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">% Omisión reel</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.skipRatePercent}
                          onChange={e => setKpisData(prev => ({ ...prev, skipRatePercent: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">% Omisión habitual</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.usualSkipRatePercent}
                          onChange={e => setKpisData(prev => ({ ...prev, usualSkipRatePercent: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">% Feed</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.feedViewsPercent}
                          onChange={e => setKpisData(prev => ({ ...prev, feedViewsPercent: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">% Pestaña Reels</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.reelsTabViewsPercent}
                          onChange={e => setKpisData(prev => ({ ...prev, reelsTabViewsPercent: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">% Perfil</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.profileViewsPercent}
                          onChange={e => setKpisData(prev => ({ ...prev, profileViewsPercent: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">% Historias</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-bold text-sm outline-none"
                          value={kpisData.storiesViewsPercent}
                          onChange={e => setKpisData(prev => ({ ...prev, storiesViewsPercent: e.target.value }))}
                        />
                      </div>
                      <div className="sm:col-span-2 xl:col-span-3">
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Resumen estratégico</label>
                        <textarea
                          rows={2}
                          placeholder="Diagnóstico e hipótesis de mejora..."
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-medium text-sm outline-none resize-none"
                          value={kpisData.strategicSummary}
                          onChange={e => setKpisData(prev => ({ ...prev, strategicSummary: e.target.value }))}
                        />
                      </div>
                      <div className="sm:col-span-2 xl:col-span-3">
                        <label className="block text-[11px] font-black uppercase tracking-widest mb-2">Notas de análisis</label>
                        <textarea
                          rows={2}
                          placeholder="Insight, aprendizaje o contexto de la publicación..."
                          className="w-full min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-black font-medium text-sm outline-none resize-none"
                          value={kpisData.notes}
                          onChange={e => setKpisData(prev => ({ ...prev, notes: e.target.value }))}
                        />
                      </div>
                    </div>
                  </details>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Info size={14} /> Memoria Descriptiva
                </label>
                <textarea
                  rows={3}
                  placeholder="ESPECIFICACIONES TÉCNICAS Y ALCANCE..."
                  className="w-full px-8 py-6 bg-gray-50 border-2 border-black font-medium text-lg outline-none resize-none leading-tight focus:bg-white"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Target size={14} /> Misión y Propósito
                </label>
                <textarea
                  rows={2}
                  placeholder="VALOR ESTRATÉGICO PARA HANSBIOMED SAS..."
                  className="w-full px-8 py-6 bg-gray-50 border-2 border-black font-medium italic text-lg outline-none resize-none leading-tight focus:bg-white"
                  value={formData.reason}
                  onChange={e => setFormData({ ...formData, reason: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="pt-8 sm:pt-10 lg:pt-12 border-t-4 border-black flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
            <button
              type="button"
              onClick={onClose}
              className="px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 border-2 border-black text-[12px] sm:text-[13px] lg:text-[14px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] hover:bg-gray-100 transition-all"
            >
              Cerrar
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 py-4 sm:py-5 lg:py-6 bg-black text-white text-[12px] sm:text-[13px] lg:text-[14px] font-black uppercase tracking-[0.15em] sm:tracking-[0.3em] hover:bg-blue-600 transition-all shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-2 active:shadow-none disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <Save size={20} />
              {initialData ? 'Actualizar Registro Corporativo' : 'Publicar en Cronología'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
