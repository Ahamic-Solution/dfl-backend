import { model, Schema } from 'mongoose';
import { GALLERY_CATEGORY } from './gallery.constant';
import { IGallery } from './gallery.interface';

const gallerySchema = new Schema<IGallery>(
    {
        location: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        imageAlt: {
            type: String,
            default: '',
            trim: true,
        },
        category: {
            type: String,
            enum: Object.values(GALLERY_CATEGORY),
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Gallery = model<IGallery>('Gallery', gallerySchema);
