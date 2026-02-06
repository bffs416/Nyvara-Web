'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Project } from '@/lib/types';
import { Wand2, X, Calendar as CalendarIcon, Info, Image as ImageIcon, Upload, Sparkles, Target, Save } from 'lucide-react';
import { enhanceProjectWithAI } from '@/services/gemini';

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
      status: initialData?.status || 'pending'
    };

    onAdd(projectData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-4 border-black w-full max-w-4xl shadow-[30px_30px_0px_0px_rgba(37,99,235,0.2)] animate-in fade-in zoom-in duration-500 my-8">
        <div className="border-b-4 border-black px-12 py-10 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tighter">
              {initialData ? 'Actualizar Registro' : 'Crear Secuencia'}
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] mt-3 text-blue-600">Protocolo de Registro HANSBIOMED SAS</p>
          </div>
          <button onClick={onClose} className="p-4 border-2 border-black hover:bg-black hover:text-white transition-all">
            <X size={32} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            <div className="col-span-full">
              <label className="block text-[11px] font-black uppercase tracking-widest mb-4">Título del Proyecto</label>
              <div className="relative">
                <input
                  required
                  type="text"
                  placeholder="NOMBRE DEL PROYECTO..."
                  className="w-full px-0 py-6 bg-transparent border-b-4 border-gray-100 focus:border-black outline-none transition-all text-4xl font-black uppercase placeholder:text-gray-100"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
                <button
                  type="button"
                  onClick={handleAI}
                  disabled={isEnhancing}
                  className="absolute right-0 bottom-4 flex items-center gap-3 px-6 py-3 bg-black text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 disabled:opacity-20 transition-all shadow-2xl"
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

            <div className="col-span-full border-2 border-black p-8 bg-gray-50">
              <label className="block text-[11px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                <ImageIcon size={14} /> Componente Visual / Multimedia
                {formData.imageUrl && (
                  <span className="ml-auto text-blue-600 font-bold lowercase">
                    {formData.imageUrl.split('/').pop()}
                  </span>
                )}
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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
                      className="w-full py-4 border-2 border-black font-black uppercase text-[11px] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
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

                <div className="aspect-video border-4 border-black bg-white flex items-center justify-center overflow-hidden relative shadow-inner">
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

          <div className="pt-12 border-t-4 border-black flex gap-8">
            <button
              type="button"
              onClick={onClose}
              className="px-12 py-6 border-2 border-black text-[14px] font-black uppercase tracking-[0.2em] hover:bg-gray-100 transition-all"
            >
              Cerrar
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 py-6 bg-black text-white text-[14px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-2 active:shadow-none disabled:opacity-50 flex items-center justify-center gap-3"
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
