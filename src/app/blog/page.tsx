'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { BLOG_CATEGORIES, blogPosts } from '@/lib/blog-data';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Todas");

  const filteredPosts = activeCategory === "Todas" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen relative bg-black overflow-hidden">
      {/* Glow Effects */}
      <div className="glow-sphere" />
      <div className="glow-sphere-2" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <Header />
      <main className="flex-1 relative z-10 py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-white mb-6">El Blog de <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Nyvara</span></h1>
             <p className="text-xl text-gray-300">Estrategias, análisis y reflexiones sobre cinematografía, marketing de datos y desarrollo tecnológico.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {BLOG_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 border ${
                  activeCategory === category 
                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`} className="block h-full group">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10">
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image 
                        src={post.imageUrl} 
                        alt={post.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={60}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="text-sm text-gray-400 font-bold mb-3 uppercase tracking-wider">{post.date}</div>
                      <h2 className="font-headline text-2xl font-bold text-white mb-4 line-clamp-3 group-hover:text-gray-200 transition-colors">{post.title}</h2>
                      <p className="text-gray-400 mb-6 line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="mt-auto flex items-center text-white font-bold text-sm uppercase tracking-widest group-hover:pl-2 transition-all duration-300">
                        Leer Artículo <span className="ml-2">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
