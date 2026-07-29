import { z } from 'zod';
import { TESTIMONIAL_STATUS } from './testimonial.constant';

const createTestimonialValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }).min(1),
        image: z.string({ required_error: 'Image is required' }).url(),
        roleOrLocation: z
            .string({ required_error: 'Role or location is required' })
            .min(1),
        quote: z.string({ required_error: 'Quote is required' }).min(1),
        rating: z
            .number({ required_error: 'Rating is required' })
            .min(0)
            .max(5),
        status: z
            .enum([TESTIMONIAL_STATUS.Draft, TESTIMONIAL_STATUS.Published])
            .optional()
            .default(TESTIMONIAL_STATUS.Draft),
    }),
});

const updateTestimonialValidationSchema = z.object({
    body: z
        .object({
            name: z.string().min(1).optional(),
            image: z.string().url().optional(),
            roleOrLocation: z.string().min(1).optional(),
            quote: z.string().min(1).optional(),
            rating: z.number().min(0).max(5).optional(),
            status: z
                .enum([TESTIMONIAL_STATUS.Draft, TESTIMONIAL_STATUS.Published])
                .optional(),
        })
        .partial(),
});

const TestimonialValidation = {
    createTestimonialValidationSchema,
    updateTestimonialValidationSchema,
};

export default TestimonialValidation;
