import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import ContactController from './contact.controller';
import ContactValidation from './contact.validation';

const router = express.Router();

router.post(
    '/create',
    validateRequest(ContactValidation.createContactValidationSchema),
    ContactController.createContact
);

router.get(
    '/get-all',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    ContactController.getAllContact
);

router.get(
    '/get-single/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    ContactController.getSingleContact
);

router.patch(
    '/update/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(ContactValidation.updateContactValidationSchema),
    ContactController.updateContact
);

router.patch(
    '/update-status/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(ContactValidation.updateContactStatusValidationSchema),
    ContactController.updateContactStatus
);

router.delete(
    '/delete/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    ContactController.deleteContact
);

export const contactRoutes = router;
