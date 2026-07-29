import { GALLERY_CATEGORY } from './gallery.constant';

export interface IGallery {
    location: string;
    image: string;
    imageAlt?: string;
    category: (typeof GALLERY_CATEGORY)[keyof typeof GALLERY_CATEGORY];
    createdAt?: Date;
    updatedAt?: Date;
}
