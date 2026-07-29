import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import LegalInfoController from './legal_info.controller';
import LegalInfoValidation from './legal_info.validation';

const router = express.Router();

router.post(
    '/add-update',
    auth(USER_ROLE.superAdmin),
    validateRequest(LegalInfoValidation.legalInfoValidationSchema),
    LegalInfoController.addOrUpdateLegalInfo
);
router.get('/get', LegalInfoController.getPlatformLegalInfo);

export const legalInfoRoutes = router;
