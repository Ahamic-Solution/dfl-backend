import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import MetaController from './meta.controller';

const router = express.Router();

router.get(
    '/meta-data',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    MetaController.getDashboardMetaData
);

export const metaRoutes = router;
