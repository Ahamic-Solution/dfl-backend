import { Router } from 'express';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { authRoutes } from '../modules/auth/auth.routes';

import { legalInfoRoutes } from '../modules/legal_info/legal_info.routes';
import { ManageRoutes } from '../modules/manage-web/manage.routes';
import { metaRoutes } from '../modules/meta/meta.routes';

import { userRoutes } from '../modules/user/user.routes';

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        router: authRoutes,
    },
    {
        path: '/user',
        router: userRoutes,
    },

    {
        path: '/manage',
        router: ManageRoutes,
    },

    {
        path: '/meta',
        router: metaRoutes,
    },

    {
        path: '/admin',
        router: AdminRoutes,
    },

    {
        path: '/legal-info',
        router: legalInfoRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
