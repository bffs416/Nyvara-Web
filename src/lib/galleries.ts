
import data from './galleries.json';

export interface GalleryImage {
  url: string;
  alt?: string;
}

export interface Gallery {
  id: string;
  name: string;
  description: string;
  accessCode: string;
  images: GalleryImage[];
}

export const galleries: Gallery[] = data.galleries;
