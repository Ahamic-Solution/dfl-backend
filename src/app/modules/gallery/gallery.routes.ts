/* eslint-disable no-undef */
import express from 'express';
import { getUploadedFileUrl, uploadFile } from '../../helper/fileUploader';
import auth from '../../middlewares/auth';
import parseJsonBody from '../../middlewares/parseJsonBody';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import GalleryController from './gallery.controller';
import GalleryValidation from './gallery.validation';

const router = express.Router();

const addUploadedImageToBody = (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
) => {
    const files = req.files as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;
    const file = files?.image?.[0];

    if (file) {
        req.body.image = getUploadedFileUrl(file.path);
    }

    next();
};

router.post(
    '/create',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    uploadFile(),
    parseJsonBody(),
    addUploadedImageToBody,
    validateRequest(GalleryValidation.createGalleryValidationSchema),
    GalleryController.createGallery
);

router.get('/get-all', GalleryController.getAllGallery);

router.get('/get-single/:id', GalleryController.getSingleGallery);

router.patch(
    '/update/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    uploadFile(),
    parseJsonBody(),
    addUploadedImageToBody,
    validateRequest(GalleryValidation.updateGalleryValidationSchema),
    GalleryController.updateGallery
);

router.delete(
    '/delete/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    GalleryController.deleteGallery
);

export const galleryRoutes = router;
