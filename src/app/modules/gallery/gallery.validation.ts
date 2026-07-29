import { z } from 'zod';
import { GALLERY_CATEGORY } from './gallery.constant';

const createGalleryValidationSchema = z.object({
    body: z.object({
        location: z.string({ required_error: 'Location is required' }).min(1),
        image: z.string({ required_error: 'Image is required' }).url(),
        imageAlt: z.string().min(1).optional(),
        category: z.enum([
            GALLERY_CATEGORY.Pools,
            GALLERY_CATEGORY.Landscaping,
        ]),
    }),
});

const updateGalleryValidationSchema = z.object({
    body: z
        .object({
            location: z.string().min(1).optional(),
            image: z.string().optional(),
            imageAlt: z.string().min(1).optional(),
            category: z
                .enum([GALLERY_CATEGORY.Pools, GALLERY_CATEGORY.Landscaping])
                .optional(),
        })
        .partial(),
});

const GalleryValidation = {
    createGalleryValidationSchema,
    updateGalleryValidationSchema,
};

export default GalleryValidation;
