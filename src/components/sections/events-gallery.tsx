import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const eventImages = [
  PlaceHolderImages.find(img => img.id === 'event-1')!,
  PlaceHolderImages.find(img => img.id === 'event-2')!,
  PlaceHolderImages.find(img => img.id === 'event-3')!,
  PlaceHolderImages.find(img => img.id === 'event-4')!,
];

export default function EventsGallery() {
  return (
    <section id="events" className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Corporate Events Gallery</h2>
          <p className="mt-4 max-w-2xl mx-auto text-foreground/80">
            Creating moments that matter.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {eventImages.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg group border border-border/50">
              <Image
                src={image.imageUrl}
                alt={image.description}
                data-ai-hint={image.imageHint}
                width={600}
                height={400}
                className="w-full h-full object-cover aspect-square md:aspect-video transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
