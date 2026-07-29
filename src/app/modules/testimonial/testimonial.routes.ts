/* eslint-disable no-undef */
import express from 'express';
import { getUploadedFileUrl, uploadFile } from '../../helper/fileUploader';
import auth from '../../middlewares/auth';
import parseJsonBody from '../../middlewares/parseJsonBody';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import TestimonialController from './testimonial.controller';
import TestimonialValidation from './testimonial.validation';

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

const parseRating = (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
) => {
    if (req.body.rating !== undefined) {
        req.body.rating = Number(req.body.rating);
    }

    next();
};

router.post(
    '/create',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    uploadFile(),
    parseJsonBody(),
    addUploadedImageToBody,
    parseRating,
    validateRequest(TestimonialValidation.createTestimonialValidationSchema),
    TestimonialController.createTestimonial
);

router.get('/get-all', TestimonialController.getAllTestimonial);

router.get('/get-single/:id', TestimonialController.getSingleTestimonial);

router.patch(
    '/update/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    uploadFile(),
    parseJsonBody(),
    addUploadedImageToBody,
    parseRating,
    validateRequest(TestimonialValidation.updateTestimonialValidationSchema),
    TestimonialController.updateTestimonial
);

router.delete(
    '/delete/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    TestimonialController.deleteTestimonial
);

export const testimonialRoutes = router;
