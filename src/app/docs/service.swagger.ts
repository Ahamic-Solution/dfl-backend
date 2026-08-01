const serviceDataExample = {
    title: 'Pool Cleaning',
    slug: 'pool-cleaning',
    category: 'Pools',
    sections: [
        {
            blockType: 'hero_section',
            order: 1,
            layoutStyle: 'full_width',
            content: {
                hero: {
                    headline: 'Professional Pool Cleaning',
                    subheadline: 'Clear water, clean tiles, better weekends.',
                    bgImage: 'https://example.com/hero.jpg',
                    ctaText: 'Get Free Quote',
                    ctaLink: '/contact-us',
                },
            },
        },
        {
            blockType: 'gallery_grid',
            order: 2,
            layoutStyle: 'grid_3_col',
            content: {
                gallery: [
                    {
                        uploadKey: 'gallery-1-img-1',
                        caption: 'Before cleaning',
                        altText: 'Pool before cleaning',
                    },
                    {
                        uploadKey: 'gallery-1-img-2',
                        caption: 'After cleaning',
                        altText: 'Pool after cleaning',
                    },
                ],
            },
        },
        {
            blockType: 'cta_banner',
            order: 3,
            layoutStyle: 'accent_bg',
            content: {
                cta: {
                    title: 'Ready for a cleaner pool?',
                    description: 'Book a visit today.',
                    buttonText: 'Contact Us',
                    buttonLink: '/contact-us',
                    phoneNumber: '+1234567890',
                },
            },
        },
    ],
    seo: {
        metaTitle: 'Pool Cleaning Service',
        metaDescription: 'Professional pool cleaning service.',
        keywords: ['pool', 'cleaning', 'maintenance'],
        canonicalUrl: '/services/pool-cleaning',
        ogImage: 'https://example.com/og.jpg',
    },
};

const galleryImageMapExample = [
    {
        uploadKey: 'gallery-1-img-1',
        fileIndex: 0,
    },
    {
        uploadKey: 'gallery-1-img-2',
        fileIndex: 1,
    },
];

const serviceMultipartRequestBody = {
    required: true,
    content: {
        'multipart/form-data': {
            schema: {
                type: 'object',
                required: ['data', 'service_image'],
                properties: {
                    data: {
                        type: 'string',
                        description:
                            'JSON string of the service payload. Gallery items that receive uploaded files should include a temporary uploadKey.',
                        example: JSON.stringify(serviceDataExample, null, 2),
                    },
                    service_image: {
                        type: 'string',
                        format: 'binary',
                        description:
                            'Featured image file. Backend saves its uploaded URL in featuredImage.',
                    },
                    gallery_images: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                        description:
                            'All new or replacement gallery image files. Append files in the same order used by galleryImageMap fileIndex.',
                    },
                    galleryImageMap: {
                        type: 'string',
                        description:
                            'JSON string array. Maps each uploaded gallery_images fileIndex to a gallery item uploadKey.',
                        example: JSON.stringify(galleryImageMapExample),
                    },
                },
            },
        },
    },
};

const serviceUpdateMultipartRequestBody = {
    required: true,
    content: {
        'multipart/form-data': {
            schema: {
                type: 'object',
                required: ['data'],
                properties: {
                    data: {
                        type: 'string',
                        description:
                            'JSON string of fields to update. For sections, send the full final sections array. Keep unchanged old images by keeping imageUrl. Add uploadKey for new/replacement files.',
                        example: JSON.stringify(
                            {
                                title: 'Pool Cleaning Updated',
                                sections: [
                                    {
                                        blockType: 'gallery_grid',
                                        order: 1,
                                        layoutStyle: 'grid_3_col',
                                        content: {
                                            gallery: [
                                                {
                                                    imageUrl:
                                                        'https://res.cloudinary.com/demo/old-keep.jpg',
                                                    caption: 'Keep this image',
                                                    altText: 'Kept image',
                                                },
                                                {
                                                    uploadKey: 'replace-img-1',
                                                    imageUrl:
                                                        'https://res.cloudinary.com/demo/old-replace.jpg',
                                                    caption:
                                                        'Replace this image',
                                                    altText:
                                                        'Replacement image',
                                                },
                                                {
                                                    uploadKey: 'new-img-1',
                                                    caption: 'New image',
                                                    altText: 'New image',
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                            null,
                            2
                        ),
                    },
                    service_image: {
                        type: 'string',
                        format: 'binary',
                        description:
                            'Optional new featured image. Old featured image is deleted only when replaced.',
                    },
                    gallery_images: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                        description:
                            'New or replacement gallery files only. Existing unchanged images should be sent as imageUrl in data.',
                    },
                    galleryImageMap: {
                        type: 'string',
                        description:
                            'Required only when gallery_images are uploaded. Maps uploadKey to fileIndex.',
                        example: JSON.stringify([
                            { uploadKey: 'replace-img-1', fileIndex: 0 },
                            { uploadKey: 'new-img-1', fileIndex: 1 },
                        ]),
                    },
                },
            },
        },
    },
};

const serviceListQueryParameters = [
    {
        in: 'query',
        name: 'page',
        schema: { type: 'number', example: 1 },
    },
    {
        in: 'query',
        name: 'limit',
        schema: { type: 'number', example: 10 },
    },
    {
        in: 'query',
        name: 'sortBy',
        schema: { type: 'string', example: 'createdAt' },
    },
    {
        in: 'query',
        name: 'sortOrder',
        schema: { type: 'string', enum: ['asc', 'desc'], example: 'desc' },
    },
    {
        in: 'query',
        name: 'searchTerm',
        schema: { type: 'string', example: 'pool' },
    },
    {
        in: 'query',
        name: 'category',
        schema: { type: 'string', enum: ['Pools', 'Landscaping'] },
    },
    {
        in: 'query',
        name: 'isPublished',
        schema: { type: 'boolean', example: true },
    },
];

const serviceResponse = (message: string) => ({
    '200': {
        description: message,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: message },
                        data: { $ref: '#/components/schemas/Service' },
                    },
                },
            },
        },
    },
    '400': {
        description: 'Bad request',
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
            },
        },
    },
    '401': {
        description: 'Unauthorized',
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
            },
        },
    },
    '404': {
        description: 'Service not found',
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
            },
        },
    },
    '409': {
        description: 'Duplicate service slug',
        content: {
            'application/json': {
                schema: { $ref: '#/components/schemas/ApiError' },
            },
        },
    },
});

export const serviceSwaggerPaths = {
    '/service/create-draft': {
        post: {
            tags: ['Service'],
            summary: 'Create service draft',
            description:
                'Creates a service and always saves it as draft with isPublished false. Use multipart/form-data for featured and gallery images.',
            security: [{ bearerAuth: [] }],
            requestBody: serviceMultipartRequestBody,
            responses: {
                ...serviceResponse('Service draft saved successfully'),
                '201': serviceResponse('Service draft saved successfully')[200],
            },
        },
    },
    '/service/create-published': {
        post: {
            tags: ['Service'],
            summary: 'Create and publish service',
            description:
                'Creates a service and always saves it as published with isPublished true.',
            security: [{ bearerAuth: [] }],
            requestBody: serviceMultipartRequestBody,
            responses: {
                ...serviceResponse('Service published successfully'),
                '201': serviceResponse('Service published successfully')[200],
            },
        },
    },
    '/service/update/{id}': {
        patch: {
            tags: ['Service'],
            summary: 'Update service',
            description:
                'Updates service data. When sections are sent, send the full final sections array. Backend deletes Cloudinary gallery images that existed before but are no longer present after mapping.',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            requestBody: serviceUpdateMultipartRequestBody,
            responses: serviceResponse('Service updated successfully'),
        },
    },
    '/service/save-draft/{id}': {
        patch: {
            tags: ['Service'],
            summary: 'Save existing service as draft',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: serviceResponse('Service saved as draft successfully'),
        },
    },
    '/service/publish/{id}': {
        patch: {
            tags: ['Service'],
            summary: 'Publish existing service',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: serviceResponse('Service published successfully'),
        },
    },
    '/service/delete/{id}': {
        delete: {
            tags: ['Service'],
            summary: 'Delete service',
            description:
                'Deletes the service and removes its featured image and gallery images from Cloudinary.',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: serviceResponse('Service deleted successfully'),
        },
    },
    '/service/get-all': {
        get: {
            tags: ['Service'],
            summary: 'Get all services',
            parameters: serviceListQueryParameters,
            responses: {
                '200': {
                    description: 'Services retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: true },
                                    message: {
                                        type: 'string',
                                        example:
                                            'Services retrieved successfully',
                                    },
                                    meta: {
                                        $ref: '#/components/schemas/PaginationMeta',
                                    },
                                    data: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Service',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/service/get-published': {
        get: {
            tags: ['Service'],
            summary: 'Get published services',
            parameters: serviceListQueryParameters.filter(
                (parameter) => parameter.name !== 'isPublished'
            ),
            responses: {
                '200': {
                    description: 'Published services retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'boolean', example: true },
                                    message: {
                                        type: 'string',
                                        example:
                                            'Published services retrieved successfully',
                                    },
                                    meta: {
                                        $ref: '#/components/schemas/PaginationMeta',
                                    },
                                    data: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/Service',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/service/get-single/{id}': {
        get: {
            tags: ['Service'],
            summary: 'Get single service by id',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: { type: 'string' },
                },
            ],
            responses: serviceResponse('Service retrieved successfully'),
        },
    },
    '/service/get-by-slug/{slug}': {
        get: {
            tags: ['Service'],
            summary: 'Get single service by slug',
            parameters: [
                {
                    in: 'path',
                    name: 'slug',
                    required: true,
                    schema: { type: 'string', example: 'pool-cleaning' },
                },
            ],
            responses: serviceResponse('Service retrieved successfully'),
        },
    },
};
