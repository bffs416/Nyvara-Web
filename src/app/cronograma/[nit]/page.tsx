'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plus, LayoutGrid, Calendar, Archive, Loader2, ShieldAlert, Lock, Upload, Download, RotateCcw, ChevronDown } from 'lucide-react';
import { Project, Client } from '@/lib/types';
import { projectArraySchema } from '@/lib/schema';
import ProjectCard from '@/components/cronograma/ProjectCard';
import CalendarView from '@/components/cronograma/CalendarView';
import ProjectForm from '@/components/cronograma/ProjectForm';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { clients } from '@/lib/cronogramas';
import { fetchProjects, updateProjectStatus } from '@/app/cronograma/actions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { BriefForm } from '@/components/brief/BriefForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type PendingAction = {
  type: 'create' | 'edit' | 'delete' | 'export' | 'import';
  data?: any;
};

const CronogramaClientePage = () => {
  const router = useRouter();
  const params = useParams();
  const nit = params.nit as string;

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const client: Client | undefined = useMemo(() => clients.find(c => c.nit === nit), [nit]);

  const [projects, setProjects] = useState<Project[]>([]);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [showArchived, setShowArchived] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBriefFormOpen, setIsBriefFormOpen] = useState(false);

  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);

  const [isAccessCodeModalOpen, setIsAccessCodeModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [accessCodeError, setAccessCodeError] = useState('');

  const importFileRef = useRef<HTMLInputElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nit) {
      const hasAccess = localStorage.getItem(`cronograma_access_${nit}`) === 'true';
      if (hasAccess && client) {
        setIsAuthorized(true);
        let loadedProjects: Project[] = [];
        try {
          const savedProjectsKey = `cronograma_projects_${nit}`;
          const savedProjects = localStorage.getItem(savedProjectsKey);
          if (savedProjects) {
            loadedProjects = JSON.parse(savedProjects);
          } else {
            loadedProjects = client.projects;
          }

          // --- FETCH FROM SUPABASE ---
          fetchProjects(nit).then(supabaseProjects => {
            if (supabaseProjects && supabaseProjects.length > 0) {
              // Combine local/json projects with Supabase projects
              // Avoid duplicates based on ID
              const existingIds = new Set(loadedProjects.map(p => p.id));
              const newProjects = supabaseProjects.filter(p => !existingIds.has(p.id));

              if (newProjects.length > 0) {
                const combinedProjects = [...loadedProjects, ...newProjects];
                combinedProjects.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
                setProjects(combinedProjects);
              }
            }
          });
        } catch (error) {
          console.error("Failed to load projects from localStorage", error);
          loadedProjects = client.projects;
        }

        loadedProjects.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
        setProjects(loadedProjects);

      } else {
        setTimeout(() => {
          router.push('/cronograma');
        }, 2000);
      }
      setIsLoading(false);
    }
  }, [nit, router, client]);

  useEffect(() => {
    if (isAuthorized && nit) {
      try {
        const savedProjectsKey = `cronograma_projects_${nit}`;
        localStorage.setItem(savedProjectsKey, JSON.stringify(projects));
      } catch (error) {
        console.error("Failed to save projects to localStorage", error);
      }
    }
  }, [projects, isAuthorized, nit]);

  const handleAddOrUpdateProject = (project: Project) => {
    setProjects(currentProjects => {
      const existingIndex = currentProjects.findIndex(p => p.id === project.id);
      let updatedProjects;

      if (existingIndex > -1) {
        updatedProjects = [...currentProjects];
        updatedProjects[existingIndex] = project;
      } else {
        updatedProjects = [...currentProjects, project];
      }

      updatedProjects.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

      return updatedProjects;
    });
  };

  const handleBriefCreated = (project: Project) => {
    handleAddOrUpdateProject(project);
    setIsBriefFormOpen(false);
  };

  const handleArchiveProject = (id: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: 'archived' } : p));
  };

  const handleRestoreProject = (id: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: 'pending' } : p));
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    setIsGeneratingPDF(true);
    try {
      // Small delay to ensure any layout changes are settled
      await new Promise(resolve => setTimeout(resolve, 500));

      const element = printRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1280 // Force desktop-like responsive width for capture
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2] // Scale back to normal size
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`cronograma-${client?.clientName}-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Hubo un error al generar el PDF. Puedes intentar imprimir directamente (Ctrl+P) que ya está optimizado.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleToggleComplete = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';

    // Optimistic update
    setProjects(projects.map(p => p.id === id ? { ...p, status: newStatus as any } : p));

    // Server update
    const success = await updateProjectStatus(id, newStatus);

    if (!success) {
      // Revert if failed
      setProjects(projects.map(p => p.id === id ? { ...p, status: currentStatus as any } : p));
      console.error("Failed to update status");
    }
  };

  const requestDeleteProject = (id: string) => {
    setPendingAction({ type: 'delete', data: { id } });
    setIsAccessCodeModalOpen(true);
  };

  const requestExport = () => {
    setPendingAction({ type: 'export' });
    setIsAccessCodeModalOpen(true);
  };

  const requestImport = () => {
    setPendingAction({ type: 'import' });
    setIsAccessCodeModalOpen(true);
  };

  const openFormForEdit = (project: Project) => {
    setPendingAction({ type: 'edit', data: { project } });
    setIsAccessCodeModalOpen(true);
  };

  const openFormForNew = () => {
    setPendingAction({ type: 'create' });
    setIsAccessCodeModalOpen(true);
  };

  const closeAccessCodeModal = () => {
    setIsAccessCodeModalOpen(false);
    setAccessCodeInput('');
    setAccessCodeError('');
    setPendingAction(null);
  };

  const executeExport = () => {
    try {
      const projectsToExport = projects.map(({ imageUrl, ...rest }) => rest);
      const dataStr = JSON.stringify(projectsToExport, null, 2);
      const blob = new Blob([dataStr], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cronograma_${client?.nit}_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("No se pudo exportar el cronograma.");
    }
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsedData = JSON.parse(text);
        const validation = projectArraySchema.safeParse(parsedData);

        if (!validation.success) {
          console.error("Import validation error:", validation.error);
          throw new Error("El archivo no tiene el formato de proyectos esperado.");
        }

        if (window.confirm("¿Estás seguro de que quieres reemplazar el cronograma actual con los datos del archivo? Esta acción no se puede deshacer.")) {
          const projectsWithImages = validation.data.map(p => ({
            ...p,
            imageUrl: p.imageUrl || `https://picsum.photos/seed/${p.id}/800/600`,
          }));
          setProjects(projectsWithImages);
        }

      } catch (error) {
        console.error("Error importing data:", error);
        alert("Error al importar el archivo. Asegúrate de que sea un archivo de exportación válido.");
      }
    };
    reader.readAsText(file);
  };

  const handleAccessCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCodeInput === "1629") {
      switch (pendingAction?.type) {
        case 'create':
          setEditingProject(undefined);
          setIsFormOpen(true);
          break;
        case 'edit':
          setEditingProject(pendingAction.data.project);
          setIsFormOpen(true);
          break;
        case 'delete':
          if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto permanentemente?')) {
            setProjects(projects.filter(p => p.id !== pendingAction.data.id));
          }
          break;
        case 'export':
          executeExport();
          break;
        case 'import':
          importFileRef.current?.click();
          break;
      }
      closeAccessCodeModal();
    } else {
      setAccessCodeError("Código incorrecto. Inténtalo de nuevo.");
      setAccessCodeInput('');
    }
  };

  const activeProjects = projects.filter(p => p.status !== 'archived');
  const archivedProjects = projects.filter(p => p.status === 'archived');
  const monthlyKpiSummary = useMemo(() => {
    const inferContentType = (project: Project) => {
      const title = project.title.toUpperCase();
      if (title.includes('CARNET')) return 'carnet';
      if (title.includes('PDF')) return 'pdf';
      if (title.includes('HISTORIA')) return 'historia';
      if (title.includes('REEL')) return 'reel';
      if (title.includes('CARRUSEL')) return 'carrusel';
      if (title.includes('VIDEO')) return 'video';
      return 'post';
    };

    const extractLeadsFromNotes = (notes?: string) => {
      if (!notes) return undefined;
      const match = notes.match(/leads?\s*[:=]?\s*(\d+)/i);
      return match ? Number(match[1]) : undefined;
    };

    const grouped = new Map<string, {
      month: string;
      publications: number;
      reels: number;
      historias: number;
      videos: number;
      carruseles: number;
      internos: number;
      alcance: number;
      impresiones: number;
      interacciones: number;
      reproducciones: number;
      clics: number;
      comentarios: number;
      guardados: number;
      hasReportedLeads: boolean;
      reportedLeads: number;
      storyRows: Array<{ title: string; reach?: number; impressions?: number; interactions?: number; shares?: number; profileVisits?: number; }>;
      carouselRows: Array<{ title: string; views?: number; interactions?: number; likes?: number; saves?: number; shares?: number; comments?: number; profileVisits?: number; }>;
      reelRows: Array<{ title: string; views?: number; interactions?: number; likes?: number; shares?: number; comments?: number; saves?: number; }>;
    }>();

    const sortedProjects = [...activeProjects].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    for (const project of sortedProjects) {
      const month = project.kpis?.periodMonth || project.dueDate.slice(0, 7);
      const inferredType = inferContentType(project);
      const contentType = project.kpis?.contentType || inferredType;
      const key = month;
      const current = grouped.get(key) || {
        month,
        publications: 0,
        reels: 0,
        historias: 0,
        videos: 0,
        carruseles: 0,
        internos: 0,
        alcance: 0,
        impresiones: 0,
        interacciones: 0,
        reproducciones: 0,
        clics: 0,
        comentarios: 0,
        guardados: 0,
        hasReportedLeads: false,
        reportedLeads: 0,
        storyRows: [],
        carouselRows: [],
        reelRows: [],
      };

      current.publications += 1;
      if (contentType === 'reel') current.reels += 1;
      if (contentType === 'historia') current.historias += 1;
      if (contentType === 'video') current.videos += 1;
      if (contentType === 'carrusel') current.carruseles += 1;
      if (contentType === 'pdf' || contentType === 'carnet') current.internos += 1;
      current.alcance += project.kpis?.reach || 0;
      current.impresiones += project.kpis?.impressions || 0;
      current.interacciones += project.kpis?.interactions || 0;
      current.reproducciones += project.kpis?.plays || 0;
      current.clics += project.kpis?.linkClicks || 0;
      current.comentarios += project.kpis?.comments || 0;
      current.guardados += project.kpis?.saves || 0;
      const leads = extractLeadsFromNotes(project.kpis?.notes);
      if (leads !== undefined) {
        current.hasReportedLeads = true;
        current.reportedLeads += leads;
      }

      if (contentType === 'historia') {
        current.storyRows.push({
          title: project.title,
          reach: project.kpis?.reach,
          impressions: project.kpis?.impressions,
          interactions: project.kpis?.interactions,
          shares: project.kpis?.shares,
          profileVisits: project.kpis?.profileVisits,
        });
      }
      if (contentType === 'carrusel' || contentType === 'post') {
        current.carouselRows.push({
          title: project.title,
          views: project.kpis?.plays ?? project.kpis?.impressions,
          interactions: project.kpis?.interactions,
          likes: project.kpis?.likes,
          saves: project.kpis?.saves,
          shares: project.kpis?.shares,
          comments: project.kpis?.comments,
          profileVisits: project.kpis?.profileVisits,
        });
      }
      if (contentType === 'reel' || contentType === 'video') {
        current.reelRows.push({
          title: project.title,
          views: project.kpis?.plays ?? project.kpis?.impressions,
          interactions: project.kpis?.interactions,
          likes: project.kpis?.likes,
          shares: project.kpis?.shares,
          comments: project.kpis?.comments,
          saves: project.kpis?.saves,
        });
      }

      grouped.set(key, current);
    }

    return Array.from(grouped.values()).sort((a, b) => a.month.localeCompare(b.month)).map(item => {
      const engagementRate = item.alcance > 0 ? (item.interacciones / item.alcance) * 100 : 0;
      const ctr = item.impresiones > 0 ? (item.clics / item.impresiones) * 100 : 0;
      const expertSummary =
        engagementRate >= 5
          ? 'Mes con rendimiento sobresaliente. Se recomienda escalar formatos y creatividades ganadoras con pauta ligera.'
          : engagementRate >= 2
            ? 'Mes con desempeño saludable. Conviene iterar hooks y CTA para mejorar interacción y clics.'
            : 'Mes con oportunidad de optimización. Priorizar pruebas A/B en apertura, copy y segmentación de audiencia.';

      return {
        ...item,
        engagementRate,
        ctr,
        expertSummary,
        reportedLeads: item.hasReportedLeads ? item.reportedLeads : undefined,
      };
    });
  }, [activeProjects]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-black">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Verificando acceso al cronograma...</h1>
        </div>
      </div>
    );
  }

  if (!isAuthorized || !client) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground text-center p-6">
        <ShieldAlert className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-destructive">Acceso Denegado</h1>
        <p className="text-muted-foreground mt-2 max-w-sm">
          No tienes permiso para ver este cronograma o no existe. Serás redirigido a la página de acceso.
        </p>
        <Button variant="link" onClick={() => router.push('/cronograma')} className="mt-4">
          Ir a la página de acceso
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen font-body">
      <Header />
      <main className="px-2 sm:px-4 lg:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b-4 border-black pb-8 mb-12 no-print">
            <div>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Cronograma</h1>
              <p className="text-xl text-gray-500 mt-2 max-w-2xl">
                Portal de Proyectos para: <strong className="text-blue-600">{client.clientName}</strong>
              </p>
            </div>
            <div className="flex items-start gap-2 flex-shrink-0">
              <div className="grid grid-cols-2 gap-2">
                <button onClick={openFormForNew} className="px-6 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-colors">
                  <Plus size={16} />
                  Nuevo Proyecto
                </button>
                <Dialog open={isBriefFormOpen} onOpenChange={setIsBriefFormOpen}>
                  <DialogTrigger asChild>
                    <button className="px-6 py-4 bg-gray-700 text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors">
                      <Plus size={16} />
                      Nuevo Brief
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl h-[90vh] bg-white text-black">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-gray-900">Protocolo de Registro de Activos Creativos</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-full pr-6">
                      <BriefForm
                        onBriefCreated={handleBriefCreated}
                        onClose={() => setIsBriefFormOpen(false)}
                        nit={nit}
                        clientName={client?.clientName}
                      />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                <button onClick={requestImport} className="px-6 py-3 bg-gray-200 text-black text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors">
                  <Upload size={14} /> Importar
                </button>
                <button onClick={requestExport} className="px-6 py-3 bg-gray-200 text-black text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors">
                  <Download size={14} /> Exportar
                </button>
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="col-span-2 px-6 py-3 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isGeneratingPDF ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                  {isGeneratingPDF ? 'Generando...' : 'Descargar PDF Professional'}
                </button>
              </div>

              <div className="flex flex-col gap-2">

                <button onClick={() => {
                  if (window.confirm('¿Quieres sincronizar con los últimos cambios de la nube? Esto borrará cualquier cambio no guardado que hayas hecho localmente.')) {
                    localStorage.removeItem(`cronograma_projects_${nit}`);
                    window.location.reload();
                  }
                }} className={`p-4 border border-black hover:bg-blue-50 transition-colors text-blue-600`} title="Sincronizar con la Nube"><RotateCcw size={20} /></button>
                <button onClick={() => setView('list')} className={`p-4 border border-black transition-colors ${view === 'list' ? 'bg-black text-white' : 'hover:bg-gray-100'}`} title="Vista de Lista"><LayoutGrid size={20} /></button>
                <button onClick={() => setView('calendar')} className={`p-4 border border-black transition-colors ${view === 'calendar' ? 'bg-black text-white' : 'hover:bg-gray-100'}`} title="Vista de Calendario"><Calendar size={20} /></button>
                {view === 'list' && (
                  <button
                    onClick={() => setShowArchived(!showArchived)}
                    disabled={archivedProjects.length === 0}
                    className={`p-4 border border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${showArchived
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-100'
                      }`}
                    title={showArchived ? 'Ocultar Archivo' : `Mostrar Archivo (${archivedProjects.length})`}
                  >
                    <Archive size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <input type="file" ref={importFileRef} onChange={handleFileSelected} accept=".txt,application/json" className="hidden" />

          <div ref={printRef} className="print-container">
            {/* Header for PDF report */}
            <div className="hidden print:block mb-10 border-b-8 border-black pb-6">
              <h1 className="text-7xl font-black uppercase tracking-tighter">Cronograma de Proyectos</h1>
              <div className="flex justify-between items-end mt-4">
                <p className="text-2xl text-gray-500 font-bold uppercase italic">
                  Cliente: <span className="text-blue-600">{client.clientName}</span>
                </p>
                <p className="text-sm font-black text-gray-400">FECHA DE EMISIÓN: {new Date().toLocaleDateString('es-ES')}</p>
              </div>
            </div>

            {view === 'list' && (
              <div>
                {monthlyKpiSummary.length > 0 && (
                  <Collapsible className="mb-14 border-2 border-black bg-white" defaultOpen={false}>
                    <CollapsibleTrigger asChild>
                      <button className="w-full p-6 md:p-8 flex flex-wrap items-center justify-between gap-3 text-left hover:bg-gray-50 transition-colors">
                        <div>
                          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">KPI Mensual Consolidado</h2>
                          <p className="text-sm text-gray-500 mt-2">Resumen experto por mes para publicaciones del cronograma de {client.clientName}.</p>
                        </div>
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-600">
                          Desplegar <ChevronDown size={16} />
                        </span>
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-6 md:px-8 pb-6 md:pb-8">
                      <div className="space-y-5">
                        {monthlyKpiSummary.map(item => (
                          <article key={item.month} className="border border-black/15 p-4 md:p-5 bg-gray-50">
                            <div className="flex flex-wrap items-center gap-3 justify-between">
                              <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">{item.month}</h3>
                              <p className="text-[11px] uppercase tracking-widest font-bold text-gray-500">
                                {item.publications} publicaciones · {item.reels} reels · {item.videos} videos · {item.carruseles} carruseles · {item.historias} historias · {item.internos} internos
                              </p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-4">
                              <div className="bg-white border border-black/10 p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Alcance</p><p className="font-black text-lg">{item.alcance}</p></div>
                              <div className="bg-white border border-black/10 p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Impresiones</p><p className="font-black text-lg">{item.impresiones}</p></div>
                              <div className="bg-white border border-black/10 p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Interacciones</p><p className="font-black text-lg">{item.interacciones}</p></div>
                              <div className="bg-white border border-black/10 p-3"><p className="text-[9px] uppercase text-gray-400 font-bold">Reproducciones</p><p className="font-black text-lg">{item.reproducciones}</p></div>
                              <div className="bg-white border border-blue-200 p-3"><p className="text-[9px] uppercase text-blue-600 font-bold">Engagement</p><p className="font-black text-lg text-blue-700">{item.engagementRate.toFixed(2)}%</p></div>
                              <div className="bg-white border border-emerald-200 p-3"><p className="text-[9px] uppercase text-emerald-600 font-bold">CTR</p><p className="font-black text-lg text-emerald-700">{item.ctr.toFixed(2)}%</p></div>
                            </div>
                            <p className="mt-4 text-sm text-gray-700 border-l-2 border-blue-500 pl-3">
                              <span className="font-bold">Resumen experto:</span> {item.expertSummary}
                            </p>
                            <div className="mt-4 space-y-4">
                              {item.storyRows.length > 0 && (
                                <div className="overflow-x-auto border border-black/10 bg-white">
                                  <table className="w-full text-xs">
                                    <thead className="bg-gray-100">
                                      <tr className="text-left">
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Historias</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Alcance</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Impresiones</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Acciones</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Compartidos</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Visitas perfil</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item.storyRows.map((row, index) => (
                                        <tr key={`${item.month}-story-${index}`} className="border-t border-black/10">
                                          <td className="p-2 font-semibold">{row.title}</td>
                                          <td className="p-2">{row.reach ?? '-'}</td>
                                          <td className="p-2">{row.impressions ?? '-'}</td>
                                          <td className="p-2">{row.interactions ?? '-'}</td>
                                          <td className="p-2">{row.shares ?? '-'}</td>
                                          <td className="p-2">{row.profileVisits ?? '-'}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}

                              {item.carouselRows.length > 0 && (
                                <div className="overflow-x-auto border border-black/10 bg-white">
                                  <table className="w-full text-xs">
                                    <thead className="bg-gray-100">
                                      <tr className="text-left">
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Carruseles / Post</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Visualizaciones</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Interacciones</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Me gusta</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Guardados</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Compartidos</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Comentarios</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Visitas perfil</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item.carouselRows.map((row, index) => (
                                        <tr key={`${item.month}-carousel-${index}`} className="border-t border-black/10">
                                          <td className="p-2 font-semibold">{row.title}</td>
                                          <td className="p-2">{row.views ?? '-'}</td>
                                          <td className="p-2">{row.interactions ?? '-'}</td>
                                          <td className="p-2">{row.likes ?? '-'}</td>
                                          <td className="p-2">{row.saves ?? '-'}</td>
                                          <td className="p-2">{row.shares ?? '-'}</td>
                                          <td className="p-2">{row.comments ?? '-'}</td>
                                          <td className="p-2">{row.profileVisits ?? '-'}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}

                              {item.reelRows.length > 0 && (
                                <div className="overflow-x-auto border border-black/10 bg-white">
                                  <table className="w-full text-xs">
                                    <thead className="bg-gray-100">
                                      <tr className="text-left">
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Reels / Videos</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Visualizaciones</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Interacciones</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Me gusta</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Compartidos</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Guardados</th>
                                        <th className="p-2 font-black uppercase tracking-widest text-[10px]">Comentarios</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item.reelRows.map((row, index) => (
                                        <tr key={`${item.month}-reel-${index}`} className="border-t border-black/10">
                                          <td className="p-2 font-semibold">{row.title}</td>
                                          <td className="p-2">{row.views ?? '-'}</td>
                                          <td className="p-2">{row.interactions ?? '-'}</td>
                                          <td className="p-2">{row.likes ?? '-'}</td>
                                          <td className="p-2">{row.shares ?? '-'}</td>
                                          <td className="p-2">{row.saves ?? '-'}</td>
                                          <td className="p-2">{row.comments ?? '-'}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}

                              <div className="overflow-x-auto border border-black/10 bg-white">
                                <table className="w-full text-xs">
                                  <thead className="bg-gray-100">
                                    <tr className="text-left">
                                      <th className="p-2 font-black uppercase tracking-widest text-[10px]">Leads (Instagram/DM)</th>
                                      <th className="p-2 font-black uppercase tracking-widest text-[10px]">Resultado</th>
                                      <th className="p-2 font-black uppercase tracking-widest text-[10px]">Fuente</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-t border-black/10">
                                      <td className="p-2 font-semibold">Leads registrados</td>
                                      <td className="p-2">{item.reportedLeads ?? 'Sin dato cargado'}</td>
                                      <td className="p-2 text-gray-500">Notas KPI del mes</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}

                {(() => {
                  const getCategory = (project: Project) => {
                    if (client.clientName === 'MILDRED MORENO') {
                      const rawTitle = project.title.toUpperCase();
                      // Espera títulos tipo: "Nombre de pieza _ Historia"
                      const parts = rawTitle.split('_');
                      const suffix = parts[parts.length - 1].trim();

                      if (suffix === 'HISTORIA') return 'Historia';
                      if (suffix === 'REEL' || suffix === 'VIDEO') return 'Reel';
                      if (suffix === 'POST') return 'Post';
                      if (suffix === 'CARRUSEL' || suffix === 'CARRUSEL ') return 'Carrusel';
                      if (suffix === 'PIEZA' || suffix === 'PDF' || suffix === 'CARNET') return 'Pieza';

                      // Fallback suave si el sufijo no viene bien formateado
                      if (rawTitle.includes('HISTORIA')) return 'Historia';
                      if (rawTitle.includes('REEL') || rawTitle.includes('VIDEO')) return 'Reel';
                      if (rawTitle.includes('CARRUSEL')) return 'Carrusel';
                      if (rawTitle.includes('POST')) return 'Post';
                      return 'Pieza';
                    }

                    const title = project.title.toUpperCase();
                    if (title.includes('KLARDIE')) return 'Klardie';
                    if (title.includes('MINT')) return 'Mint';
                    if (title.includes('LION')) return 'Lion';
                    return 'Otros';
                  };

                  const categories =
                    client.clientName === 'MILDRED MORENO'
                      ? ['Historia', 'Reel', 'Post', 'Carrusel', 'Pieza']
                      : ['Klardie', 'Mint', 'Lion', 'Otros'];
                  const categorizedProjects = activeProjects.reduce((acc, project) => {
                    const category = getCategory(project);
                    if (!acc[category]) acc[category] = [];
                    acc[category].push(project);
                    return acc;
                  }, {} as Record<string, typeof activeProjects>);

                  return categories.map(category => {
                    const categoryProjects = categorizedProjects[category];
                    if (!categoryProjects || categoryProjects.length === 0) return null;

                    return (
                      <div key={category} className="mb-12">
                        <div className="flex items-center gap-4 mb-6 border-b-2 border-black/10 pb-2">
                          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black/80">
                            {category}
                          </h2>
                          <span className="text-sm font-bold bg-black text-white px-2 py-1 rounded-full">
                            {categoryProjects.length}
                          </span>
                        </div>
                        <div className="flex flex-col gap-4">
                          {categoryProjects.map(p => (
                            <ProjectCard
                              key={p.id}
                              project={p}
                              onArchive={handleArchiveProject}
                              onEdit={openFormForEdit}
                              onDelete={requestDeleteProject}
                              onToggleComplete={handleToggleComplete}
                            />
                          ))}
                        </div>
                      </div> // Close category div
                    );
                  });
                })()}

                {showArchived && archivedProjects.length > 0 && (
                  <div className="animate-in fade-in duration-500 no-print">
                    <div className="my-12 text-center border-y-2 border-dashed py-4">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Proyectos Archivados</h3>
                    </div>
                    {archivedProjects.map(p => (
                      <ProjectCard
                        key={p.id}
                        project={p}
                        onArchive={handleArchiveProject}
                        onRestore={handleRestoreProject}
                        onDelete={requestDeleteProject}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {view === 'calendar' && <CalendarView projects={projects} onEditProject={openFormForEdit} onDeleteProject={requestDeleteProject} />}
          </div>
        </div>

        {isFormOpen && (
          <ProjectForm
            onAdd={handleAddOrUpdateProject}
            onClose={() => setIsFormOpen(false)}
            initialData={editingProject}
          />
        )}

        <Dialog open={isAccessCodeModalOpen} onOpenChange={(isOpen) => !isOpen && closeAccessCodeModal()}>
          <DialogContent className="sm:max-w-md bg-white text-black border-2 border-black">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl font-black uppercase tracking-tighter">
                <Lock className="text-blue-600" />
                Verificación de Acceso
              </DialogTitle>
              <DialogDescription className="text-gray-600 pt-2">
                Para realizar esta acción, introduce el código de seguridad.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAccessCodeSubmit} className="space-y-4 pt-4">
              <Input
                id="accessCode"
                type="password"
                value={accessCodeInput}
                onChange={(e) => setAccessCodeInput(e.target.value)}
                placeholder="Código de Acceso"
                autoFocus
                className="h-12 text-center text-lg font-bold tracking-widest border-2 border-black focus:ring-4 focus:ring-blue-100"
              />
              {accessCodeError && <p className="text-sm text-red-600 text-center">{accessCodeError}</p>}
              <DialogFooter className="!mt-8 gap-2 sm:!gap-0">
                <Button type="button" variant="outline" onClick={closeAccessCodeModal} className="border-2 border-black font-bold uppercase tracking-widest hover:bg-gray-100">Cancelar</Button>
                <Button type="submit" className="bg-black text-white font-bold uppercase tracking-widest hover:bg-blue-600">Confirmar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

      </main>
      <Footer />
    </div>
  );
};

export default CronogramaClientePage;
