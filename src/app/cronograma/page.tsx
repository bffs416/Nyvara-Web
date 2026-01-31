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
    id: '205620',
    title: 'PDF INFORMATIVO CARACTERISTICAS DE D+ & R+ PARA LOS EJECUTIVOS',
    description: 'Información estilo brochure con características de los productos, en cuanto a sus componentes y beneficios.',
    reason: 'Para que el Equipo tenga claras las características técnicas de material, con el fin de comercializar el producto a los especialista',
    imageUrl: 'https://picsum.photos/seed/205620/800/600',
    dueDate: '2026-01-30',
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: '478242',
    title: 'HISTORIA: CAPACITACIÓN D2D MINT™ & KLARDIE (CALI 2026)',
    description: 'Creación de Flyer Vertical (Formato Historia/Reel) para difusión en WhatsApp y redes sociales, optimizado para móviles. Adaptación de identidad para folletería impresa o posts cuadrados (Feed). Integración de Branding: Fusión de la identidad corporativa de Hansbiomed, MINT™ y Klardie con la marca personal de la Dra. Virginia Escobar, manteniendo coherencia visual y jerarquía de logotipos.',
    reason: 'Maximizar la atracción de nuevos prospectos (médicos estéticos) hacia los talleres educativos de Hansbiomed e impulsar la conversión de ventas inmediata, comunicando visualmente una oferta de valor premium que motive la adquisición de la promoción vigente.',
    imageUrl: 'https://picsum.photos/seed/478242/800/600',
    dueDate: '2026-01-30',
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: '1',
    title: 'HISTORIA: UPGRADE D+',
    description: 'Mostrar el cambio de la imagen. Mostrar la mayor cantidad de componentes que tienen adicionales. Mostrar un comparativo entre lo que era Dia y la versión mejorada que es D+',
    reason: 'Hacer una visual del Upgrade que tiene D+ vs Dia en comparativa, para que los médicos conozcan el producto y sepan que tiene mejores componentes que sirven para sus procedimientos.',
    imageUrl: 'https://picsum.photos/seed/1/800/600',
    dueDate: '2026-02-02',
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: '895552',
    title: 'HISTORIA: UPGRADE R+',
    description: 'Mostrar el cambio de la imagen. Mostrar la mayor cantidad de componentes que tienen adicionales. Mostrar un comparativo entre lo que era Dia y la versión mejorada que es R+',
    reason: 'Hacer una visual del Upgrade que tiene R+ vs Dia en comparativa, para que los médicos conozcan el producto y sepan que tiene mejores componentes que sirven para sus procedimientos.',
    imageUrl: 'https://picsum.photos/seed/895552/800/600',
    dueDate: '2026-02-03',
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: '421790',
    title: 'CARRUSEL INFORMATIVO: KLARDIE D+ (LANZAMIENTO DE PRODUCTO)',
    description: 'Primeras imágenes serían hablar un poco de las características del producto y de la presentación. Las siguientes imágenes del carrusel serían de aplicación del producto.',
    reason: 'Brindar información amplia del nuevo producto a los clientes. ',
    imageUrl: 'https://picsum.photos/seed/421790/800/600',
    dueDate: '2026-02-05',
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: '517116',
    title: 'CARRUSEL INFORMATIVO: KLARDIE R+ (LANZAMIENTO DE PRODUCTO)',
    description: 'Primeras imágenes serían hablar un poco de las características del producto y de la presentación. Las siguientes imágenes del carrusel serían de aplicación del producto.',
    reason: 'Brindar información amplia del nuevo producto a los clientes. ',
    imageUrl: 'https://picsum.photos/seed/517116/800/600',
    dueDate: '2026-02-09',
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: '150255',
    title: 'HISTORIA: PRE- CARNAVAL DE BARRANQUILLA',
    description: 'Pieza publicitaria para hacer énfasis al cuidado de la piel antes de las fiestas de Barranquilla que van desde el 14 al 18 de febrero, haciendo conciencia de que las personas deben cuidarse la piel.',
    reason: 'La idea con esto es impulsar la venta del producto Fusi-Ket, que está diseñado para pieles sensibles. Apto específicamente para la promoción del carnaval de Barranquilla, por el cuidado que deben de tener antes la piel y la protección debido a la exposición a los rayos solares. ',
    imageUrl: 'https://picsum.photos/seed/150255/800/600',
    dueDate: '2026-02-13',
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: '064633',
    title: 'HISTORIA: SAN VALENTIN',
    description: 'La idea central es la analogía entre la fusión física del producto y el sentimiento de la fecha de San Valentín.',
    reason: 'Busca transmitir: amor propio, tecnología con propósito, seguridad y respaldo de la marca.',
    imageUrl: 'https://picsum.photos/seed/064633/800/600',
    dueDate: '2026-02-14',
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: '983180',
    title: 'HISTORIA: LION + KLARDIE / PROMOCION',
    description: 'Pieza Publicitaria, para Promocionar el producto de estimulación Capilar e implante capilar, ya que juntos para la practica medica, funcionan mejor.',
    reason: 'El objetivo es brindar la información a los médicos para que asocien la combinación de ambos productos ',
    imageUrl: 'https://picsum.photos/seed/983180/800/600',
    dueDate: '2026-02-17',
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: '090467',
    title: 'HISTORIA: CUIDADO POST CARNAVALES',
    description: 'Una pieza publicitaria que haga referencia al evento que hay en Barranquilla del Carnaval, en el cual le digamos al usuario que utilice el producto después de deshidratación, exposición al sol, y aquí tenemos el producto Fusicare',
    reason: 'El objetivo o el propósito básicamente es que los usuarios, población normal que desea cuidarse la piel, conozca el producto Fusicare, que es para pieles sensibles, irritadas, que necesita cuidado post incluso en ambientes que tienen mucho impacto solar.',
    imageUrl: 'https://picsum.photos/seed/090467/800/600',
    dueDate: '2026-02-17',
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: '474488',
    title: 'VIDEO: PROTOCOLO KLARDIE D+& R+CON MONOFILAMENTO EN CUERO CABELLUDO',
    description: 'Un video desechando el uso combinado de los hilos monofilamento con el bioestimulador KLARDIE. Combinacion de productos.',
    reason: 'Mostrar la efectividad de los dos productos combinados para estimulación capilar.',
    imageUrl: 'https://picsum.photos/seed/474488/800/600',
    dueDate: '2026-02-19',
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: '184466',
    title: 'VIDEO POTCAST # 3 : SIN HILOS EN LA LENGUA',
    description: 'Video para apoyar el concepto de los hilos tensores, con base en la experiencia de dos médicos expertos en la materia, para desinformar las redes y el concepto de los hilos.',
    reason: 'Generar confianza en los clientes finales y los clientes directos, con el fin de que se incrementen las ventas para Hansbiomed.',
    imageUrl: 'https://picsum.photos/seed/184466/800/600',
    dueDate: '2026-02-24',
    createdAt: new Date().toISOString(),
    status: 'pending',
  },
  {
    id: '606687',
    title: 'HISTORIA: HILOS TENSORES',
    description: 'Generar tanto deseo como confianza para el paciente y médico.',
    reason: 'Desmentificar el procedimiento de hilos tensores, mostrándolo no como una cirugía agresiva, sino como una intervención de alta precisión tecnológica.',
    imageUrl: 'https://picsum.photos/seed/606687/800/600',
    dueDate: '2026-02-25',
    createdAt: new Date().toISOString(),
    status: 'pending',
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
