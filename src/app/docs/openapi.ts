import config from '../config';
import { swaggerComponents } from './components.swagger';
import { moduleSwaggerPaths } from './modules.swagger';
import { serviceSwaggerPaths } from './service.swagger';

const apiBasePath = '/api/v1';
const localServerUrl = `http://localhost:${config.port || 5000}${apiBasePath}`;
const configuredServerUrl = config.base_url
    ? `${config.base_url.replace(/\/$/, '')}${apiBasePath}`
    : localServerUrl;

export const openApiSpec = {
    openapi: '3.0.3',
    info: {
        title: 'Dream Landscaping Floor Backend API',
        version: '1.0.0',
        description:
            'Production API documentation for Careloss backend services. Use Bearer token auth for protected admin endpoints.',
    },
    servers: [
        {
            url: configuredServerUrl,
            description: 'Configured server',
        },
        {
            url: localServerUrl,
            description: 'Local development server',
        },
    ],
    tags: [
        { name: 'Auth', description: 'Authentication and password recovery.' },
        { name: 'User', description: 'User profile and account actions.' },
        { name: 'Admin', description: 'Admin management APIs.' },
        {
            name: 'Service',
            description:
                'Service page builder APIs with draft/publish workflow and multipart image upload support.',
        },
        { name: 'Gallery', description: 'Gallery management APIs.' },
        {
            name: 'Testimonial',
            description: 'Customer testimonial management APIs.',
        },
        { name: 'Contact', description: 'Contact request APIs.' },
        {
            name: 'Legal Info',
            description: 'Platform legal and business profile APIs.',
        },
        { name: 'Manage Web', description: 'Website content management APIs.' },
        { name: 'Meta', description: 'Dashboard metadata APIs.' },
    ],
    components: swaggerComponents,
    paths: {
        ...moduleSwaggerPaths,
        ...serviceSwaggerPaths,
    },
};
