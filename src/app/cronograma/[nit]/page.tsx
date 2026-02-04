'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plus, LayoutGrid, Calendar, Archive, Loader2, ShieldAlert, Lock, Upload, Download, RotateCcw } from 'lucide-react';
import { Project, Client } from '@/lib/types';
import { projectArraySchema } from '@/lib/schema';
import ProjectCard from '@/components/cronograma/ProjectCard';
import CalendarView from '@/components/cronograma/CalendarView';
import ProjectForm from '@/components/cronograma/ProjectForm';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { clients } from '@/lib/cronogramas';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { BriefForm } from '@/components/brief/BriefForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b-4 border-black pb-8 mb-12">
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
              </div>

              <div className="flex flex-col gap-2">

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

          {view === 'list' && (
            <div>
              {activeProjects.map(p => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onArchive={handleArchiveProject}
                  onEdit={openFormForEdit}
                  onDelete={requestDeleteProject}
                />
              ))}

              {showArchived && archivedProjects.length > 0 && (
                <div className="animate-in fade-in duration-500">
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
