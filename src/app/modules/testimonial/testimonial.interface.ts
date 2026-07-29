import { TESTIMONIAL_STATUS } from './testimonial.constant';

export interface ITestimonial {
    name: string;
    image: string;
    roleOrLocation: string;
    quote: string;
    rating: number;
    status: (typeof TESTIMONIAL_STATUS)[keyof typeof TESTIMONIAL_STATUS];
    createdAt?: Date;
    updatedAt?: Date;
}
