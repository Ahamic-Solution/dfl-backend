import { z } from 'zod';

const legalInfoValidationSchema = z.object({
    body: z.object({
        siteName: z.string({ required_error: 'Site name is required' }).min(1),
        tagline: z.string({ required_error: 'Tagline is required' }).min(1),
        companyName: z
            .string({ required_error: 'Company name is required' })
            .min(1),
        businessType: z
            .string({ required_error: 'Business type is required' })
            .min(1),
        registeredAddress: z
            .string({ required_error: 'Registered address is required' })
            .min(1),
        contactEmail: z
            .string({ required_error: 'Contact email is required' })
            .email({ message: 'Invalid contact email' }),
        contactPhone: z
            .string({ required_error: 'Contact phone is required' })
            .min(1),
        jurisdiction: z
            .string({ required_error: 'Jurisdiction is required' })
            .min(1),
        officialWebsite: z.string().url().optional().or(z.literal('')),
        facebookLink: z.string().url().optional().or(z.literal('')),
        instagramLink: z.string().url().optional().or(z.literal('')),
        linkedinLink: z.string().url().optional().or(z.literal('')),
    }),
});

const LegalInfoValidation = {
    legalInfoValidationSchema,
};

export default LegalInfoValidation;
