'use client';

import React, { useState, useEffect } from 'react';
import { Plus, LayoutGrid, Calendar, Archive } from 'lucide-react';
import { Project } from '@/lib/types';
import ProjectCard from '@/components/cronograma/ProjectCard';
import CalendarView from '@/components/cronograma/CalendarView';
import ProjectForm from '@/components/cronograma/ProjectForm';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

// Dummy data for initial state
const initialProjects: Project[] = [
  {
    id: '1',
    title: 'LANZAMIENTO COLECCIÓN Q3',
    description: 'Coordinar la campaña de marketing digital y el evento de lanzamiento para la nueva colección de productos del tercer trimestre.',
    reason: 'Aumentar la visibilidad de la marca en un 25% y generar un 15% más de ventas en el primer mes post-lanzamiento.',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800',
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 15).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: '2',
    title: 'DESARROLLO APP MÓVIL',
    description: 'Creación de la aplicación móvil para iOS y Android, incluyendo diseño UI/UX, desarrollo de backend y publicación en tiendas.',
    reason: 'Mejorar la experiencia del cliente y abrir un nuevo canal de ventas directas, esperando un aumento del 10% en la retención.',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800',
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
   {
    id: '3',
    title: 'REDISEÑO SITIO WEB',
    description: 'Actualización completa del sitio web corporativo, migrando a una nueva plataforma tecnológica y renovando el diseño visual.',
    reason: 'Mejorar los tiempos de carga, optimizar para SEO y aumentar la tasa de conversión en un 20%.',
    imageUrl: 'https://images.unsplash.com/photo-1583339597195-22b36b5acd27?q=80&w=800',
    dueDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 20).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    status: 'completed',
  },
];

const CronogramaPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [showArchived, setShowArchived] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem('cronograma_projects');
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      } else {
        setProjects(initialProjects);
      }
    } catch (error) {
        console.error("Failed to load projects from localStorage", error);
        setProjects(initialProjects);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if(hydrated) {
        try {
            localStorage.setItem('cronograma_projects', JSON.stringify(projects));
        } catch (error) {
            console.error("Failed to save projects to localStorage", error);
        }
    }
  }, [projects, hydrated]);

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

  if (!hydrated) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-white text-black">
              <div className="text-center">
                <h1 className="text-4xl font-bold">Cargando Cronograma...</h1>
              </div>
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
                Visualización y gestión de la línea de tiempo de proyectos estratégicos.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={openFormForNew} className="px-6 py-4 bg-black text-white text-sm font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-colors">
                <Plus size={16} />
                Nuevo Proyecto
              </button>
              
              <button onClick={() => setView('list')} className={`p-4 border border-black transition-colors ${view === 'list' ? 'bg-black text-white' : 'hover:bg-gray-100'}`} title="Vista de Lista"><LayoutGrid size={20}/></button>
              <button onClick={() => setView('calendar')} className={`p-4 border border-black transition-colors ${view === 'calendar' ? 'bg-black text-white' : 'hover:bg-gray-100'}`} title="Vista de Calendario"><Calendar size={20}/></button>
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

export default CronogramaPage;
