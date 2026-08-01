import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { openApiSpec } from './openapi';

const router = Router();

const swaggerUiOptions = {
    customSiteTitle: 'DLF Docs',
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'none',
        filter: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
    },
};

router.get('/json', (_req, res) => {
    res.status(200).json(openApiSpec);
});

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(openApiSpec, swaggerUiOptions));

export const swaggerRoutes = router;
