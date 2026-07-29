import { model, Schema } from 'mongoose';
import { TESTIMONIAL_STATUS } from './testimonial.constant';
import { ITestimonial } from './testimonial.interface';

const testimonialSchema = new Schema<ITestimonial>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        roleOrLocation: {
            type: String,
            required: true,
            trim: true,
        },
        quote: {
            type: String,
            required: true,
            trim: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
        status: {
            type: String,
            enum: Object.values(TESTIMONIAL_STATUS),
            default: TESTIMONIAL_STATUS.Draft,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Testimonial = model<ITestimonial>(
    'Testimonial',
    testimonialSchema
);
