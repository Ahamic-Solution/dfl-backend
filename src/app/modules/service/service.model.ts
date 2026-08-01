import { model, Schema } from 'mongoose';
import {
    IAccordionItem,
    IBlockContent,
    ICtaContent,
    IFeatureItem,
    IGalleryItem,
    IHeroContent,
    IService,
    IServiceBlock,
    IServiceSeo,
} from './service.interface';

const heroContentSchema = new Schema<IHeroContent>(
    {
        headline: {
            type: String,
            required: true,
        },
        subheadline: String,
        bgImage: {
            type: String,
            required: true,
        },
        ctaText: {
            type: String,
            default: 'Get Free Quote',
        },
        ctaLink: {
            type: String,
            default: '/contact-us',
        },
    },
    { _id: false }
);

const featureItemSchema = new Schema<IFeatureItem>(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        iconUrl: String,
    },
    { _id: false }
);

const galleryItemSchema = new Schema<IGalleryItem>(
    {
        imageUrl: {
            type: String,
            required: true,
        },
        caption: String,
        altText: String,
    },
    { _id: false }
);

const accordionItemSchema = new Schema<IAccordionItem>(
    {
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const ctaContentSchema = new Schema<ICtaContent>(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        buttonText: {
            type: String,
            default: 'Contact Us',
        },
        buttonLink: {
            type: String,
            default: '/contact-us',
        },
        phoneNumber: String,
    },
    { _id: false }
);

const serviceSeoSchema = new Schema<IServiceSeo>(
    {
        metaTitle: String,
        metaDescription: String,
        keywords: [String],
        canonicalUrl: String,
        ogImage: String,
    },
    { _id: false }
);

const blockContentSchema = new Schema<IBlockContent>(
    {
        hero: heroContentSchema,
        richTextHtml: String,
        features: [featureItemSchema],
        gallery: [galleryItemSchema],
        accordionItems: [accordionItemSchema],
        cta: ctaContentSchema,
    },
    { _id: false }
);

const blockSchema = new Schema<IServiceBlock>(
    {
        blockType: {
            type: String,
            required: true,
            enum: [
                'hero_section',
                'rich_text_jodit',
                'features_grid',
                'gallery_grid',
                'faq_accordion',
                'cta_banner',
                'technical_specs',
                'contact_form',
            ],
        },

        order: {
            type: Number,
            default: 0,
        },

        layoutStyle: {
            type: String,
            enum: [
                'grid_2_col',
                'grid_3_col',
                'grid_4_col',
                'grid_6_col',
                'default',
                'full_width',
                'container_centered',
                'two_column_split',
                'card_grid',
                'accent_bg',
            ],
            default: 'grid_3_col',
        },

        content: {
            type: blockContentSchema,
            required: true,
        },
    },
    {
        _id: true,
    }
);

const serviceSchema = new Schema<IService>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        category: {
            type: String,
            required: true,
            enum: ['Pools', 'Landscaping'],
            default: 'Pools',
        },

        isPublished: {
            type: Boolean,
            default: false,
            index: true,
        },

        featuredImage: {
            type: String,
            required: true,
        },

        sections: [blockSchema],

        seo: serviceSeoSchema,
    },
    {
        timestamps: true,
    }
);

export const Service = model<IService>('Service', serviceSchema);
