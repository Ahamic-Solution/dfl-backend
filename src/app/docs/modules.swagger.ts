const bearerAuth = [{ bearerAuth: [] }];

const idParameter = {
    in: 'path',
    name: 'id',
    required: true,
    schema: { type: 'string' },
};

const paginationParameters = [
    { in: 'query', name: 'page', schema: { type: 'number', example: 1 } },
    { in: 'query', name: 'limit', schema: { type: 'number', example: 10 } },
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
];

const okResponse = (message = 'Request successful') => ({
    '200': {
        description: message,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: message },
                        data: { type: 'object' },
                    },
                },
            },
        },
    },
});

const createdResponse = (message = 'Created successfully') => ({
    '201': {
        description: message,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: true },
                        message: { type: 'string', example: message },
                        data: { type: 'object' },
                    },
                },
            },
        },
    },
});

const jsonRequestBody = (example: Record<string, unknown>) => ({
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                example,
            },
        },
    },
});

const multipartWithDataAndImage = (
    dataExample: Record<string, unknown>,
    imageField = 'image'
) => ({
    required: true,
    content: {
        'multipart/form-data': {
            schema: {
                type: 'object',
                required: ['data'],
                properties: {
                    data: {
                        type: 'string',
                        description: 'JSON string payload.',
                        example: JSON.stringify(dataExample, null, 2),
                    },
                    [imageField]: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    },
});

export const moduleSwaggerPaths = {
    '/auth/login': {
        post: {
            tags: ['Auth'],
            summary: 'Login user',
            requestBody: jsonRequestBody({
                email: 'admin@example.com',
                password: 'password123',
            }),
            responses: okResponse('Login successful'),
        },
    },
    '/auth/change-password': {
        post: {
            tags: ['Auth'],
            summary: 'Change password',
            security: bearerAuth,
            requestBody: jsonRequestBody({
                oldPassword: 'oldPassword123',
                newPassword: 'newPassword123',
            }),
            responses: okResponse('Password changed successfully'),
        },
    },
    '/auth/refresh-token': {
        post: {
            tags: ['Auth'],
            summary: 'Refresh access token',
            requestBody: jsonRequestBody({
                refreshToken: 'jwt-refresh-token',
            }),
            responses: okResponse('Token refreshed successfully'),
        },
    },
    '/auth/forget-password': {
        post: {
            tags: ['Auth'],
            summary: 'Send reset password code',
            requestBody: jsonRequestBody({ email: 'user@example.com' }),
            responses: okResponse('Reset code sent successfully'),
        },
    },
    '/auth/verify-reset-otp': {
        post: {
            tags: ['Auth'],
            summary: 'Verify reset password OTP',
            requestBody: jsonRequestBody({
                email: 'user@example.com',
                otp: '123456',
            }),
            responses: okResponse('OTP verified successfully'),
        },
    },
    '/auth/reset-password': {
        post: {
            tags: ['Auth'],
            summary: 'Reset password',
            requestBody: jsonRequestBody({
                email: 'user@example.com',
                otp: '123456',
                newPassword: 'newPassword123',
            }),
            responses: okResponse('Password reset successfully'),
        },
    },
    '/auth/resend-reset-code': {
        post: {
            tags: ['Auth'],
            summary: 'Resend reset password code',
            requestBody: jsonRequestBody({ email: 'user@example.com' }),
            responses: okResponse('Reset code resent successfully'),
        },
    },
    '/auth/all-user': {
        get: {
            tags: ['Auth'],
            summary: 'Get all users',
            responses: okResponse('Users retrieved successfully'),
        },
    },

    '/user/verify-code': {
        post: {
            tags: ['User'],
            summary: 'Verify user account code',
            requestBody: jsonRequestBody({
                email: 'user@example.com',
                code: '123456',
            }),
            responses: okResponse('User verified successfully'),
        },
    },
    '/user/resend-verify-code': {
        post: {
            tags: ['User'],
            summary: 'Resend user verification code',
            requestBody: jsonRequestBody({ email: 'user@example.com' }),
            responses: okResponse('Verification code resent successfully'),
        },
    },
    '/user/get-my-profile': {
        get: {
            tags: ['User'],
            summary: 'Get logged-in user profile',
            security: bearerAuth,
            responses: okResponse('Profile retrieved successfully'),
        },
    },
    '/user/update-profile': {
        patch: {
            tags: ['User'],
            summary: 'Update logged-in user profile',
            security: bearerAuth,
            requestBody: multipartWithDataAndImage({
                name: 'John Doe',
                phone: '+1234567890',
            }),
            responses: okResponse('Profile updated successfully'),
        },
    },
    '/user/block-unblock/{id}': {
        patch: {
            tags: ['User'],
            summary: 'Block or unblock user',
            security: bearerAuth,
            parameters: [idParameter],
            responses: okResponse('User status updated successfully'),
        },
    },

    '/admin/create-admin': {
        post: {
            tags: ['Admin'],
            summary: 'Create admin',
            security: bearerAuth,
            requestBody: multipartWithDataAndImage({
                name: 'Admin User',
                email: 'admin@example.com',
                phone: '+1234567890',
            }),
            responses: createdResponse('Admin created successfully'),
        },
    },
    '/admin/update-admin': {
        patch: {
            tags: ['Admin'],
            summary: 'Update admin profile',
            security: bearerAuth,
            requestBody: multipartWithDataAndImage({
                name: 'Updated Admin',
                phone: '+1234567890',
            }),
            responses: okResponse('Admin updated successfully'),
        },
    },
    '/admin/delete-admin/{id}': {
        delete: {
            tags: ['Admin'],
            summary: 'Delete admin',
            security: bearerAuth,
            parameters: [idParameter],
            responses: okResponse('Admin deleted successfully'),
        },
    },
    '/admin/update-admin-status/{id}': {
        patch: {
            tags: ['Admin'],
            summary: 'Update admin status',
            security: bearerAuth,
            parameters: [idParameter],
            responses: okResponse('Admin status updated successfully'),
        },
    },
    '/admin/all-admins': {
        get: {
            tags: ['Admin'],
            summary: 'Get all admins',
            security: bearerAuth,
            parameters: paginationParameters,
            responses: okResponse('Admins retrieved successfully'),
        },
    },

    '/gallery/create': {
        post: {
            tags: ['Gallery'],
            summary: 'Create gallery item',
            security: bearerAuth,
            requestBody: multipartWithDataAndImage({
                location: 'Dhaka',
                imageAlt: 'Modern pool',
                category: 'Pools',
            }),
            responses: createdResponse('Gallery created successfully'),
        },
    },
    '/gallery/get-all': {
        get: {
            tags: ['Gallery'],
            summary: 'Get gallery items',
            parameters: [
                ...paginationParameters,
                {
                    in: 'query',
                    name: 'category',
                    schema: { type: 'string', enum: ['Pools', 'Landscaping'] },
                },
            ],
            responses: okResponse('Gallery retrieved successfully'),
        },
    },
    '/gallery/get-single/{id}': {
        get: {
            tags: ['Gallery'],
            summary: 'Get single gallery item',
            parameters: [idParameter],
            responses: okResponse('Gallery retrieved successfully'),
        },
    },
    '/gallery/update/{id}': {
        patch: {
            tags: ['Gallery'],
            summary: 'Update gallery item',
            security: bearerAuth,
            parameters: [idParameter],
            requestBody: multipartWithDataAndImage({
                location: 'Updated location',
                imageAlt: 'Updated image alt',
                category: 'Landscaping',
            }),
            responses: okResponse('Gallery updated successfully'),
        },
    },
    '/gallery/delete/{id}': {
        delete: {
            tags: ['Gallery'],
            summary: 'Delete gallery item',
            security: bearerAuth,
            parameters: [idParameter],
            responses: okResponse('Gallery deleted successfully'),
        },
    },

    '/testimonial/create': {
        post: {
            tags: ['Testimonial'],
            summary: 'Create testimonial',
            security: bearerAuth,
            requestBody: multipartWithDataAndImage({
                name: 'Jane Doe',
                roleOrLocation: 'Dhaka',
                quote: 'Excellent service.',
                rating: 5,
                status: 'Published',
            }),
            responses: createdResponse('Testimonial created successfully'),
        },
    },
    '/testimonial/get-all': {
        get: {
            tags: ['Testimonial'],
            summary: 'Get testimonials',
            parameters: paginationParameters,
            responses: okResponse('Testimonial retrieved successfully'),
        },
    },
    '/testimonial/get-single/{id}': {
        get: {
            tags: ['Testimonial'],
            summary: 'Get single testimonial',
            parameters: [idParameter],
            responses: okResponse('Testimonial retrieved successfully'),
        },
    },
    '/testimonial/update/{id}': {
        patch: {
            tags: ['Testimonial'],
            summary: 'Update testimonial',
            security: bearerAuth,
            parameters: [idParameter],
            requestBody: multipartWithDataAndImage({
                quote: 'Updated quote.',
                rating: 4,
                status: 'Draft',
            }),
            responses: okResponse('Testimonial updated successfully'),
        },
    },
    '/testimonial/delete/{id}': {
        delete: {
            tags: ['Testimonial'],
            summary: 'Delete testimonial',
            security: bearerAuth,
            parameters: [idParameter],
            responses: okResponse('Testimonial deleted successfully'),
        },
    },

    '/contact/create': {
        post: {
            tags: ['Contact'],
            summary: 'Create contact request',
            requestBody: jsonRequestBody({
                name: 'John Doe',
                email: 'john@example.com',
                phone: '+1234567890',
                interestedService: 'Pool Cleaning',
                message: 'I need a quote.',
            }),
            responses: createdResponse('Contact created successfully'),
        },
    },
    '/contact/get-all': {
        get: {
            tags: ['Contact'],
            summary: 'Get contact requests',
            security: bearerAuth,
            parameters: paginationParameters,
            responses: okResponse('Contact retrieved successfully'),
        },
    },
    '/contact/get-single/{id}': {
        get: {
            tags: ['Contact'],
            summary: 'Get single contact request',
            security: bearerAuth,
            parameters: [idParameter],
            responses: okResponse('Contact retrieved successfully'),
        },
    },
    '/contact/update/{id}': {
        patch: {
            tags: ['Contact'],
            summary: 'Update contact request',
            security: bearerAuth,
            parameters: [idParameter],
            requestBody: jsonRequestBody({
                message: 'Updated message',
            }),
            responses: okResponse('Contact updated successfully'),
        },
    },
    '/contact/update-status/{id}': {
        patch: {
            tags: ['Contact'],
            summary: 'Update contact request status',
            security: bearerAuth,
            parameters: [idParameter],
            requestBody: jsonRequestBody({ status: 'Resolved' }),
            responses: okResponse('Contact status updated successfully'),
        },
    },
    '/contact/delete/{id}': {
        delete: {
            tags: ['Contact'],
            summary: 'Delete contact request',
            security: bearerAuth,
            parameters: [idParameter],
            responses: okResponse('Contact deleted successfully'),
        },
    },

    '/legal-info/add-update': {
        post: {
            tags: ['Legal Info'],
            summary: 'Add or update platform legal information',
            security: bearerAuth,
            requestBody: jsonRequestBody({
                siteName: 'Careloss',
                tagline: 'Professional care services',
                companyName: 'Careloss LLC',
                businessType: 'Service',
                registeredAddress: '123 Main Street',
                contactEmail: 'support@example.com',
                contactPhone: '+1234567890',
                jurisdiction: 'United States',
                officialWebsite: 'https://example.com',
            }),
            responses: okResponse('Legal info updated successfully'),
        },
    },
    '/legal-info/get': {
        get: {
            tags: ['Legal Info'],
            summary: 'Get platform legal information',
            responses: okResponse('Legal info retrieved successfully'),
        },
    },

    '/meta/meta-data': {
        get: {
            tags: ['Meta'],
            summary: 'Get dashboard metadata',
            security: bearerAuth,
            responses: okResponse('Dashboard meta data retrieved successfully'),
        },
    },

    '/manage/add-about-us': {
        post: {
            tags: ['Manage Web'],
            summary: 'Add about us content',
            security: bearerAuth,
            requestBody: jsonRequestBody({ title: 'About us', content: '...' }),
            responses: createdResponse('About us created successfully'),
        },
    },
    '/manage/add-faq': {
        post: {
            tags: ['Manage Web'],
            summary: 'Add FAQ',
            security: bearerAuth,
            requestBody: jsonRequestBody({
                question: 'Question?',
                answer: 'Answer.',
            }),
            responses: createdResponse('FAQ created successfully'),
        },
    },
    '/manage/add-terms-conditions': {
        post: {
            tags: ['Manage Web'],
            summary: 'Add terms and conditions',
            security: bearerAuth,
            requestBody: jsonRequestBody({ title: 'Terms', content: '...' }),
            responses: createdResponse('Terms created successfully'),
        },
    },
    '/manage/add-partner': {
        post: {
            tags: ['Manage Web'],
            summary: 'Add partner',
            security: bearerAuth,
            requestBody: jsonRequestBody({ name: 'Partner', link: 'https://' }),
            responses: createdResponse('Partner created successfully'),
        },
    },
    '/manage/add-contact-us': {
        post: {
            tags: ['Manage Web'],
            summary: 'Add contact us content',
            security: bearerAuth,
            requestBody: jsonRequestBody({ title: 'Contact', content: '...' }),
            responses: createdResponse('Contact us created successfully'),
        },
    },
    '/manage/add-privacy-policy': {
        post: {
            tags: ['Manage Web'],
            summary: 'Add privacy policy',
            security: bearerAuth,
            requestBody: jsonRequestBody({ title: 'Privacy', content: '...' }),
            responses: createdResponse('Privacy policy created successfully'),
        },
    },
    '/manage/add-slider': {
        post: {
            tags: ['Manage Web'],
            summary: 'Add slider',
            security: bearerAuth,
            requestBody: multipartWithDataAndImage(
                { title: 'Slider title', description: 'Slider description' },
                'image'
            ),
            responses: createdResponse('Slider created successfully'),
        },
    },
    '/manage/get-privacy-policy': {
        get: {
            tags: ['Manage Web'],
            summary: 'Get privacy policy',
            responses: okResponse('Privacy policy retrieved successfully'),
        },
    },
    '/manage/get-partner': {
        get: {
            tags: ['Manage Web'],
            summary: 'Get partners',
            responses: okResponse('Partner retrieved successfully'),
        },
    },
    '/manage/get-slider': {
        get: {
            tags: ['Manage Web'],
            summary: 'Get sliders',
            responses: okResponse('Slider retrieved successfully'),
        },
    },
    '/manage/get-faq': {
        get: {
            tags: ['Manage Web'],
            summary: 'Get FAQs',
            responses: okResponse('FAQ retrieved successfully'),
        },
    },
    '/manage/get-about-us': {
        get: {
            tags: ['Manage Web'],
            summary: 'Get about us content',
            responses: okResponse('About us retrieved successfully'),
        },
    },
    '/manage/get-terms-conditions': {
        get: {
            tags: ['Manage Web'],
            summary: 'Get terms and conditions',
            responses: okResponse('Terms retrieved successfully'),
        },
    },
    '/manage/get-contact-us': {
        get: {
            tags: ['Manage Web'],
            summary: 'Get contact us content',
            responses: okResponse('Contact us retrieved successfully'),
        },
    },
    '/manage/edit-privacy-policy/{id}': {
        patch: {
            tags: ['Manage Web'],
            summary: 'Edit privacy policy',
            security: bearerAuth,
            parameters: [idParameter],
            requestBody: jsonRequestBody({ title: 'Privacy', content: '...' }),
            responses: okResponse('Privacy policy updated successfully'),
        },
    },
    '/manage/edit-partner/{id}': {
        patch: {
            tags: ['Manage Web'],
            summary: 'Edit partner',
            security: bearerAuth,
            parameters: [idParameter],
            requestBody: jsonRequestBody({ name: 'Partner', link: 'https://' }),
            responses: okResponse('Partner updated successfully'),
        },
    },
    '/manage/edit-slider/{id}': {
        patch: {
            tags: ['Manage Web'],
            summary: 'Edit slider',
            security: bearerAuth,
            parameters: [idParameter],
            requestBody: multipartWithDataAndImage({
                title: 'Updated slider',
                description: 'Updated description',
            }),
            responses: okResponse('Slider updated successfully'),
        },
    },
    '/manage/edit-faq/{id}': {
        patch: {
            tags: ['Manage Web'],
            summary: 'Edit FAQ',
            security: bearerAuth,
            parameters: [idParameter],
            requestBody: jsonRequestBody({
                question: 'Updated question?',
                answer: 'Updated answer.',
            }),
            responses: okResponse('FAQ updated successfully'),
        },
    },
    '/manage/edit-about-us/{id}': {
        patch: {
            tags: ['Manage Web'],
            summary: 'Edit about us content',
            security: bearerAuth,
            parameters: [idParameter],
            requestBody: jsonRequestBody({ title: 'About us', content: '...' }),
            responses: okResponse('About us updated successfully'),
        },
    },
    '/manage/edit-terms-conditions/{id}': {
        patch: {
            tags: ['Manage Web'],
            summary: 'Edit terms and conditions',
            security: bearerAuth,
            parameters: [idParameter],
            requestBody: jsonRequestBody({ title: 'Terms', content: '...' }),
            responses: okResponse('Terms updated successfully'),
        },
    },
    '/manage/edit-contact-us/{id}': {
        patch: {
            tags: ['Manage Web'],
            summary: 'Edit contact us content',
            security: bearerAuth,
            parameters: [idParameter],
            requestBody: jsonRequestBody({ title: 'Contact', content: '...' }),
            responses: okResponse('Contact us updated successfully'),
        },
    },
    '/manage/delete-about-us/{id}': {
        delete: {
            tags: ['Manage Web'],
            summary: 'Delete about us content',
            security: bearerAuth,
            parameters: [idParameter],
            responses: okResponse('About us deleted successfully'),
        },
    },
    '/manage/delete-slider/{id}': {
        delete: {
            tags: ['Manage Web'],
            summary: 'Delete slider',
            security: bearerAuth,
            parameters: [idParameter],
            responses: okResponse('Slider deleted successfully'),
        },
    },
    '/manage/delete-faq/{id}': {
        delete: {
            tags: ['Manage Web'],
            summary: 'Delete FAQ',
            security: bearerAuth,
            parameters: [idParameter],
            responses: okResponse('FAQ deleted successfully'),
        },
    },
    '/manage/delete-contact-us/{id}': {
        delete: {
            tags: ['Manage Web'],
            summary: 'Delete contact us content',
            security: bearerAuth,
            parameters: [idParameter],
            responses: okResponse('Contact us deleted successfully'),
        },
    },
    '/manage/delete-privacy-policy/{id}': {
        delete: {
            tags: ['Manage Web'],
            summary: 'Delete privacy policy',
            security: bearerAuth,
            parameters: [idParameter],
            responses: okResponse('Privacy policy deleted successfully'),
        },
    },
    '/manage/delete-partner/{id}': {
        delete: {
            tags: ['Manage Web'],
            summary: 'Delete partner',
            security: bearerAuth,
            parameters: [idParameter],
            responses: okResponse('Partner deleted successfully'),
        },
    },
    '/manage/delete-terms-conditions/{id}': {
        delete: {
            tags: ['Manage Web'],
            summary: 'Delete terms and conditions',
            security: bearerAuth,
            parameters: [idParameter],
            responses: okResponse('Terms deleted successfully'),
        },
    },
};
