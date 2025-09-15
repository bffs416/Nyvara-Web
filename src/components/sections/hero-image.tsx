'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { motion } from "framer-motion";

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image')!;

export default function HeroImage() {
  return (
    <section className="py-12 md:py-20">
        <div className='container mx-auto px-6 flex justify-center items-center'>
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-xl border border-border/50 shadow-xl"
            >
                <Image 
                    src={heroImage.imageUrl} 
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    width={1200}
                    height={675}
                    className="object-cover"
                />
            </motion.div>
        </div>
    </section>
  );
};
