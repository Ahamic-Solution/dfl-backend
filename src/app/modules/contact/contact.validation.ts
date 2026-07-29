import { z } from 'zod';
import { CONTACT_STATUS } from './contact.constant';

const createContactValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }).min(1),
        email: z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email address' }),
        phone: z.string({ required_error: 'Phone is required' }).min(1),
        interestedCategory: z
            .string({ required_error: 'Interested category is required' })
            .min(1),
        interestedService: z
            .string({ required_error: 'Interested service is required' })
            .min(1),
        message: z.string({ required_error: 'Message is required' }).min(1),
        status: z
            .enum([
                CONTACT_STATUS.New,
                CONTACT_STATUS.Read,
                CONTACT_STATUS.Replied,
                CONTACT_STATUS.Archived,
            ])
            .optional()
            .default(CONTACT_STATUS.New),
    }),
});

const updateContactValidationSchema = z.object({
    body: z
        .object({
            name: z.string().min(1).optional(),
            email: z
                .string()
                .email({ message: 'Invalid email address' })
                .optional(),
            phone: z.string().min(1).optional(),
            interestedCategory: z.string().min(1).optional(),
            interestedService: z.string().min(1).optional(),
            message: z.string().min(1).optional(),
            status: z
                .enum([
                    CONTACT_STATUS.New,
                    CONTACT_STATUS.Read,
                    CONTACT_STATUS.Replied,
                    CONTACT_STATUS.Archived,
                ])
                .optional(),
        })
        .partial(),
});

const updateContactStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([
            CONTACT_STATUS.New,
            CONTACT_STATUS.Read,
            CONTACT_STATUS.Replied,
            CONTACT_STATUS.Archived,
        ]),
    }),
});

const ContactValidation = {
    createContactValidationSchema,
    updateContactValidationSchema,
    updateContactStatusValidationSchema,
};

export default ContactValidation;
