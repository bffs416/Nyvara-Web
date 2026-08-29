import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { blogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Extract params logic in Server Component if needed, but since it's Next 15 it might require `await params`
  // Actually, standard usage expects synchronous access or awaited access depending on version. We'll await just in case, but standard signature works.
  const resolvedParams = await params;
  
  let post = blogPosts.find((p) => p.slug === resolvedParams.slug);
  let htmlContent = post?.content || '';

  // 1. Intentar cargar el artículo desde Markdown (.md)
  const markdownPath = path.join(process.cwd(), 'src', 'content', 'blogs', `${resolvedParams.slug}.md`);
  if (fs.existsSync(markdownPath)) {
    const fileContents = fs.readFileSync(markdownPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Parse markdown to HTML
    const processedContent = await remark().use(html).process(content);
    htmlContent = processedContent.toString();
    
    // Override post metadata if defined in the markdown frontmatter
    post = {
      id: data.id || post?.id || '',
      slug: resolvedParams.slug,
      title: data.title || post?.title || '',
      category: data.category || post?.category || '',
      date: data.date || post?.date || '',
      excerpt: data.excerpt || post?.excerpt || '',
      content: htmlContent,
      imageUrl: data.imageUrl || post?.imageUrl || '',
    };
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-black overflow-hidden selection:bg-yellow-300 selection:text-black">
      {/* Glow Effects para el fondo oscuro */}
      <div className="glow-sphere" />
      <div className="glow-sphere-2" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <Header />
      <main className="flex-1 relative z-10">
        {/* Hero Section Oscuro y Premium */}
        <section className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center">
            <div className="absolute inset-0 z-0">
                <Image 
                    src={post.imageUrl} 
                    alt={post.title} 
                    fill 
                    className="object-cover opacity-50"
                    priority
                />
                {/* Degradado para transición suave hacia el contenido */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            </div>
            <div className="container relative z-10 px-4 sm:px-6 pt-20 text-center max-w-5xl mx-auto">
                <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-bold px-5 py-2.5 rounded-full uppercase tracking-widest mb-8">
                    {post.category}
                </div>
                <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight drop-shadow-lg">
                    {post.title}
                </h1>
                <div className="flex items-center justify-center gap-4 text-gray-300 font-bold uppercase tracking-widest text-sm">
                    <span className="text-white">Nyvara Insights</span>
                    <span className="text-white/30">•</span>
                    <span>{post.date}</span>
                </div>
            </div>
        </section>

        {/* Content Section - Diseño "Cuaderno" (Brutalista/Editorial) */}
        <section 
            className="py-24 relative z-10 bg-[#f4f4f5]" 
            style={{ backgroundImage: 'radial-gradient(#d4d4d8 2px, transparent 0)', backgroundSize: '30px 30px' }}
        >
            <div className="container px-4 sm:px-6 mx-auto flex justify-center relative">
                
                <div className="w-full max-w-3xl bg-white border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] p-6 sm:p-10 md:p-16 relative z-10">
                    
                    {/* Línea roja vertical estilo cuaderno (visible en desktop) */}
                    <div className="absolute top-0 bottom-0 left-12 w-[2px] bg-red-400/30 hidden md:block z-0 pointer-events-none"></div>

                    <div className="mb-16 relative z-10 flex items-center justify-between border-b-4 border-black pb-6">
                         <Link href="/blog" className="inline-flex items-center text-black hover:text-yellow-500 transition-all font-bold uppercase tracking-widest text-xs bg-black text-white hover:bg-yellow-400 hover:text-black px-4 py-2 rounded-sm border-2 border-black">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                         </Link>
                         <span className="font-headline font-bold text-sm tracking-widest uppercase">Nyvara Insights</span>
                    </div>

                    {/* Excerpt como Entradilla */}
                    <p className="relative z-10 text-2xl md:text-3xl text-black leading-snug font-headline font-extrabold mb-16 p-6 bg-yellow-300 border-4 border-black transform -rotate-1 shadow-[6px_6px_0px_rgba(0,0,0,1)] text-left">
                        {post.excerpt}
                    </p>

                    {/* Contenido Inyectado con Estilos Arbitrarios para el Cuaderno */}
                    <div 
                        className="
                            relative z-10
                            text-black 
                            
                            /* Párrafos: Distribución perfecta, ancho de lectura óptimo (aprox 75 caracteres) */
                            [&_p]:text-left [&_p]:text-lg md:[&_p]:text-xl [&_p]:leading-[1.9] [&_p]:mb-8 [&_p]:font-medium [&_p]:text-gray-900
                            
                            /* Drop Cap (Letra capital brutalista) */
                            [&>p:first-of-type]:first-letter:text-6xl [&>p:first-of-type]:first-letter:font-headline [&>p:first-of-type]:first-letter:font-black [&>p:first-of-type]:first-letter:bg-black [&>p:first-of-type]:first-letter:text-white [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:mr-4 [&>p:first-of-type]:first-letter:px-3 [&>p:first-of-type]:first-letter:py-1 [&>p:first-of-type]:first-letter:mt-1
                            
                            /* Títulos H3: Subrayados, gruesos, impactantes */
                            [&_h3]:text-2xl md:[&_h3]:text-4xl [&_h3]:font-headline [&_h3]:font-black [&_h3]:mt-16 [&_h3]:mb-6 [&_h3]:text-black [&_h3]:tracking-tighter [&_h3]:text-left [&_h3]:border-b-4 [&_h3]:border-black [&_h3]:pb-2 [&_h3]:inline-block
                            
                            /* Textos Importantes (Strong): Estilo resaltador de texto real */
                            [&_strong]:font-black [&_strong]:text-black [&_strong]:bg-yellow-300 [&_strong]:px-1
                            
                            /* Listas: Estilo cuaderno ordenado */
                            [&_ul]:list-none [&_ul]:pl-0 [&_ul]:mb-12 [&_ul]:mt-8 [&_ul]:text-left
                            [&_li]:relative [&_li]:pl-10 [&_li]:mb-6 [&_li]:text-lg md:[&_li]:text-xl [&_li]:leading-relaxed [&_li]:font-medium [&_li]:text-gray-900 [&_li]:text-left
                            [&_li]:before:content-['X'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[4px] [&_li]:before:font-headline [&_li]:before:font-black [&_li]:before:text-xl
                            
                            /* Énfasis y Citas */
                            [&_em]:text-gray-600 [&_em]:italic [&_em]:font-serif
                            
                            /* Enlaces Normales */
                            [&_p>a]:text-blue-700 [&_p>a]:underline [&_p>a]:decoration-4 [&_p>a]:decoration-blue-300 hover:[&_p>a]:bg-blue-300 hover:[&_p>a]:text-black [&_p>a]:transition-all
                            
                            /* Botón CTA de Diagnóstico */
                            [&_a[href*='wa.me']]:inline-flex [&_a[href*='wa.me']]:items-center [&_a[href*='wa.me']]:justify-center [&_a[href*='wa.me']]:px-8 [&_a[href*='wa.me']]:py-4 [&_a[href*='wa.me']]:bg-yellow-400 [&_a[href*='wa.me']]:text-black [&_a[href*='wa.me']]:font-black [&_a[href*='wa.me']]:uppercase [&_a[href*='wa.me']]:tracking-[0.1em] [&_a[href*='wa.me']]:!no-underline [&_a[href*='wa.me']]:border-4 [&_a[href*='wa.me']]:border-black [&_a[href*='wa.me']]:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:[&_a[href*='wa.me']]:-translate-y-1 hover:[&_a[href*='wa.me']]:shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:[&_a[href*='wa.me']]:bg-black hover:[&_a[href*='wa.me']]:text-white [&_a[href*='wa.me']]:transition-all [&_a[href*='wa.me']]:mt-4 [&_a[href*='wa.me']]:text-center
                        "
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="mt-24 pt-12 border-t-4 border-black flex justify-center items-center relative z-10">
                         <Link href="/blog" className="inline-flex items-center justify-center px-10 py-5 bg-black text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-yellow-400 hover:text-black hover:-translate-y-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] border-2 border-transparent hover:border-black transition-all">
                            <ArrowLeft className="mr-3 h-5 w-5" /> 
                            Explorar más artículos
                         </Link>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
