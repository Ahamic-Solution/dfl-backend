import { z } from 'zod';
import {
    SERVICE_BLOCK_TYPE,
    SERVICE_CATEGORY,
    SERVICE_LAYOUT_STYLE,
} from './service.constant';

const heroContentSchema = z.object({
    headline: z.string().min(1),
    subheadline: z.string().min(1).optional(),
    bgImage: z.string().min(1),
    ctaText: z.string().min(1).optional(),
    ctaLink: z.string().min(1).optional(),
});

const featureItemSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1).optional(),
    iconUrl: z.string().min(1).optional(),
});

const galleryItemSchema = z.object({
    imageUrl: z.string().min(1),
    caption: z.string().min(1).optional(),
    altText: z.string().min(1).optional(),
});

const accordionItemSchema = z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
});

const ctaContentSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1).optional(),
    buttonText: z.string().min(1).optional(),
    buttonLink: z.string().min(1).optional(),
    phoneNumber: z.string().min(1).optional(),
});

const blockContentSchema = z.object({
    hero: heroContentSchema.optional(),
    richTextHtml: z.string().min(1).optional(),
    features: z.array(featureItemSchema).optional(),
    gallery: z.array(galleryItemSchema).optional(),
    accordionItems: z.array(accordionItemSchema).optional(),
    cta: ctaContentSchema.optional(),
});

const serviceBlockSchema = z.object({
    _id: z.string().optional(),
    blockType: z.enum([
        SERVICE_BLOCK_TYPE.HeroSection,
        SERVICE_BLOCK_TYPE.RichTextJodit,
        SERVICE_BLOCK_TYPE.FeaturesGrid,
        SERVICE_BLOCK_TYPE.GalleryGrid,
        SERVICE_BLOCK_TYPE.FaqAccordion,
        SERVICE_BLOCK_TYPE.CtaBanner,
        SERVICE_BLOCK_TYPE.TechnicalSpecs,
        SERVICE_BLOCK_TYPE.ContactForm,
    ]),
    order: z.number().optional(),
    layoutStyle: z
        .enum([
            SERVICE_LAYOUT_STYLE.Grid2Col,
            SERVICE_LAYOUT_STYLE.Grid3Col,
            SERVICE_LAYOUT_STYLE.Grid4Col,
            SERVICE_LAYOUT_STYLE.Grid6Col,
            SERVICE_LAYOUT_STYLE.Default,
            SERVICE_LAYOUT_STYLE.FullWidth,
            SERVICE_LAYOUT_STYLE.ContainerCentered,
            SERVICE_LAYOUT_STYLE.TwoColumnSplit,
            SERVICE_LAYOUT_STYLE.CardGrid,
            SERVICE_LAYOUT_STYLE.AccentBg,
        ])
        .optional(),
    content: blockContentSchema,
});

const seoSchema = z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    canonicalUrl: z.string().optional(),
    ogImage: z.string().optional(),
});

const createServiceValidationSchema = z.object({
    body: z.object({
        title: z.string({ required_error: 'Title is required' }).min(1),
        slug: z.string({ required_error: 'Slug is required' }).min(1),
        category: z.enum([
            SERVICE_CATEGORY.Pools,
            SERVICE_CATEGORY.Landscaping,
        ]),
        isPublished: z.boolean().optional(),
        featuredImage: z
            .string({ required_error: 'Featured image is required' })
            .min(1),
        sections: z.array(serviceBlockSchema).optional(),
        seo: seoSchema.optional(),
    }),
});

const updateServiceValidationSchema = z.object({
    body: z
        .object({
            title: z.string().min(1).optional(),
            slug: z.string().min(1).optional(),
            category: z
                .enum([SERVICE_CATEGORY.Pools, SERVICE_CATEGORY.Landscaping])
                .optional(),
            isPublished: z.boolean().optional(),
            featuredImage: z.string().min(1).optional(),
            sections: z.array(serviceBlockSchema).optional(),
            seo: seoSchema.optional(),
        })
        .partial(),
});

const ServiceValidation = {
    createServiceValidationSchema,
    updateServiceValidationSchema,
};

export default ServiceValidation;
