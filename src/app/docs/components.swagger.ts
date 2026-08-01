export const swaggerComponents = {
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
    },
    schemas: {
        ApiError: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: false },
                message: { type: 'string', example: 'Validation error' },
                errorSources: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            path: { type: 'string', example: 'title' },
                            message: {
                                type: 'string',
                                example: 'Title is required',
                            },
                        },
                    },
                },
            },
        },
        PaginationMeta: {
            type: 'object',
            properties: {
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 10 },
                total: { type: 'number', example: 32 },
                totalPage: { type: 'number', example: 4 },
            },
        },
        HeroContent: {
            type: 'object',
            required: ['headline', 'bgImage'],
            properties: {
                headline: {
                    type: 'string',
                    example: 'Professional Pool Cleaning',
                },
                subheadline: {
                    type: 'string',
                    example: 'Clear water, clean tiles, better weekends.',
                },
                bgImage: {
                    type: 'string',
                    example: 'https://example.com/hero.jpg',
                },
                ctaText: { type: 'string', example: 'Get Free Quote' },
                ctaLink: { type: 'string', example: '/contact-us' },
            },
        },
        FeatureItem: {
            type: 'object',
            required: ['title'],
            properties: {
                title: { type: 'string', example: 'Deep Cleaning' },
                description: {
                    type: 'string',
                    example: 'Complete pool surface and tile cleaning.',
                },
                iconUrl: {
                    type: 'string',
                    example: 'https://example.com/icon.svg',
                },
            },
        },
        GalleryItem: {
            type: 'object',
            required: ['imageUrl'],
            properties: {
                imageUrl: {
                    type: 'string',
                    example: 'https://res.cloudinary.com/demo/image.jpg',
                },
                caption: { type: 'string', example: 'Before cleaning' },
                altText: { type: 'string', example: 'Pool before cleaning' },
            },
        },
        GalleryItemUpload: {
            type: 'object',
            properties: {
                uploadKey: {
                    type: 'string',
                    description:
                        'Temporary frontend key used only for multipart image mapping. It is not saved.',
                    example: 'gallery-1-img-1',
                },
                imageUrl: {
                    type: 'string',
                    description:
                        'Existing image URL. Keep it on update when the image should remain unchanged.',
                    example: 'https://res.cloudinary.com/demo/old-image.jpg',
                },
                caption: { type: 'string', example: 'Before cleaning' },
                altText: { type: 'string', example: 'Pool before cleaning' },
            },
        },
        AccordionItem: {
            type: 'object',
            required: ['question', 'answer'],
            properties: {
                question: {
                    type: 'string',
                    example: 'How often should I clean my pool?',
                },
                answer: {
                    type: 'string',
                    example: 'Weekly cleaning is recommended for most pools.',
                },
            },
        },
        CtaContent: {
            type: 'object',
            required: ['title'],
            properties: {
                title: { type: 'string', example: 'Ready for a cleaner pool?' },
                description: { type: 'string', example: 'Book a visit today.' },
                buttonText: { type: 'string', example: 'Contact Us' },
                buttonLink: { type: 'string', example: '/contact-us' },
                phoneNumber: { type: 'string', example: '+1234567890' },
            },
        },
        BlockContent: {
            type: 'object',
            properties: {
                hero: { $ref: '#/components/schemas/HeroContent' },
                richTextHtml: {
                    type: 'string',
                    example: '<p>Professional service content.</p>',
                },
                features: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/FeatureItem' },
                },
                gallery: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/GalleryItem' },
                },
                accordionItems: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/AccordionItem' },
                },
                cta: { $ref: '#/components/schemas/CtaContent' },
            },
        },
        ServiceBlock: {
            type: 'object',
            required: ['blockType', 'content'],
            properties: {
                blockType: {
                    type: 'string',
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
                    example: 'gallery_grid',
                },
                order: { type: 'number', example: 3 },
                layoutStyle: {
                    type: 'string',
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
                    example: 'grid_3_col',
                },
                content: { $ref: '#/components/schemas/BlockContent' },
            },
        },
        ServiceSeo: {
            type: 'object',
            properties: {
                metaTitle: { type: 'string', example: 'Pool Cleaning Service' },
                metaDescription: {
                    type: 'string',
                    example: 'Professional pool cleaning service.',
                },
                keywords: {
                    type: 'array',
                    items: { type: 'string' },
                    example: ['pool', 'cleaning', 'maintenance'],
                },
                canonicalUrl: {
                    type: 'string',
                    example: '/services/pool-cleaning',
                },
                ogImage: {
                    type: 'string',
                    example: 'https://example.com/og.jpg',
                },
            },
        },
        Service: {
            type: 'object',
            properties: {
                _id: { type: 'string', example: '66b9d7e0c0a4f1a3d2e8f111' },
                title: { type: 'string', example: 'Pool Cleaning' },
                slug: { type: 'string', example: 'pool-cleaning' },
                category: {
                    type: 'string',
                    enum: ['Pools', 'Landscaping'],
                    example: 'Pools',
                },
                isPublished: { type: 'boolean', example: false },
                featuredImage: {
                    type: 'string',
                    example: 'https://res.cloudinary.com/demo/featured.jpg',
                },
                sections: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/ServiceBlock' },
                },
                seo: { $ref: '#/components/schemas/ServiceSeo' },
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                    example: '2026-08-01T09:30:00.000Z',
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time',
                    example: '2026-08-01T09:30:00.000Z',
                },
            },
        },
        GalleryImageMapItem: {
            type: 'object',
            required: ['uploadKey', 'fileIndex'],
            properties: {
                uploadKey: {
                    type: 'string',
                    example: 'gallery-1-img-1',
                },
                fileIndex: {
                    type: 'number',
                    example: 0,
                    description:
                        'Zero-based index of the uploaded gallery_images file.',
                },
            },
        },
    },
};
