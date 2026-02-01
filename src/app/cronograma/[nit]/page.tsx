'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plus, LayoutGrid, Calendar, Archive, Loader2, ShieldAlert } from 'lucide-react';
import { Project, Client } from '@/lib/types';
import ProjectCard from '@/components/cronograma/ProjectCard';
import CalendarView from '@/components/cronograma/CalendarView';
import ProjectForm from '@/components/cronograma/ProjectForm';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { clients } from '@/lib/cronogramas';
import { Button } from '@/components/ui/button';

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
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  
  useEffect(() => {
    if (nit) {
      const hasAccess = localStorage.getItem(`cronograma_access_${nit}`) === 'true';
      if (hasAccess && client) {
        setIsAuthorized(true);
        try {
          const savedProjectsKey = `cronograma_projects_${nit}`;
          const savedProjects = localStorage.getItem(savedProjectsKey);
          if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
          } else {
            setProjects(client.projects);
          }
        } catch (error) {
            console.error("Failed to load projects from localStorage", error);
            setProjects(client.projects);
        }
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
    const existingIndex = projects.findIndex(p => p.id === project.id);
    if (existingIndex > -1) {
      const updatedProjects = [...projects];
      updatedProjects[existingIndex] = project;
      setProjects(updatedProjects);
    } else {
      setProjects([project, ...projects]);
    }
  };

  const handleArchiveProject = (id: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: 'archived' } : p));
  };

  const handleRestoreProject = (id: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: 'pending' } : p));
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto permanentemente?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const openFormForEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const openFormForNew = () => {
    setEditingProject(undefined);
    setIsFormOpen(true);
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
      <style jsx global>{`
          .swiss-grid {
            display: grid;
            grid-template-columns: 200px 20px 1fr;
            border-bottom: 1px solid #f0f0f0;
          }
          .vertical-line {
            width: 2px;
          }
          .kerning-tight {
            letter-spacing: -0.05em;
          }
          @media (max-width: 768px) {
              .swiss-grid {
                  grid-template-columns: 1fr;
              }
              .vertical-line,
              .swiss-grid > div:first-child {
                  display: none;
              }
          }
      `}</style>
      <Header />
      <main className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b-4 border-black pb-8 mb-12">
            <div>
              <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Cronograma</h1>
              <p className="text-xl text-gray-500 mt-2 max-w-2xl">
                Portal de Proyectos para: <strong className="text-blue-600">{client.clientName}</strong>
              </p>
            </div>
            <div className="flex items-start gap-2 flex-shrink-0">
              <div className="flex flex-col gap-2">
                <button onClick={openFormForNew} className="px-6 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-colors">
                  <Plus size={16} />
                  Nuevo Proyecto
                </button>
                <button onClick={() => router.push('/diagnostico?sector=health')} className="px-6 py-4 bg-gray-700 text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors">
                  <Plus size={16} />
                  Nuevo Brief
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <button onClick={() => setView('list')} className={`p-4 border border-black transition-colors ${view === 'list' ? 'bg-black text-white' : 'hover:bg-gray-100'}`} title="Vista de Lista"><LayoutGrid size={20}/></button>
                <button onClick={() => setView('calendar')} className={`p-4 border border-black transition-colors ${view === 'calendar' ? 'bg-black text-white' : 'hover:bg-gray-100'}`} title="Vista de Calendario"><Calendar size={20}/></button>
              </div>
            </div>
          </div>
          
          {view === 'list' && (
              <div>
                  {activeProjects.map(p => (
                      <ProjectCard 
                          key={p.id} 
                          project={p} 
                          onArchive={handleArchiveProject} 
                          onEdit={openFormForEdit}
                          onDelete={handleDeleteProject}
                      />
                  ))}
                  
                  <div className="my-16 text-center">
                      <button onClick={() => setShowArchived(!showArchived)} className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black flex items-center gap-3 mx-auto">
                          <Archive size={16} />
                          {showArchived ? 'Ocultar Archivo' : `Mostrar Archivo (${archivedProjects.length})`}
                      </button>
                  </div>

                  {showArchived && (
                      <div className="animate-in fade-in duration-500">
                         {archivedProjects.map(p => (
                            <ProjectCard 
                                key={p.id} 
                                project={p} 
                                onArchive={handleArchiveProject}
                                onRestore={handleRestoreProject}
                                onDelete={handleDeleteProject}
                            />
                         ))}
                      </div>
                  )}
              </div>
          )}

          {view === 'calendar' && <CalendarView projects={projects} onEditProject={openFormForEdit} onDeleteProject={handleDeleteProject} />}
        </div>
        
        {isFormOpen && (
          <ProjectForm 
            onAdd={handleAddOrUpdateProject} 
            onClose={() => setIsFormOpen(false)} 
            initialData={editingProject} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CronogramaClientePage;
