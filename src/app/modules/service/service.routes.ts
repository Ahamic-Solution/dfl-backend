/* eslint-disable no-undef */
import express from 'express';
import { getUploadedFileUrl, uploadFile } from '../../helper/fileUploader';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import ServiceController from './service.controller';
import ServiceValidation from './service.validation';

const router = express.Router();

type UploadedFiles = { [fieldname: string]: Express.Multer.File[] } | undefined;

type GalleryImageMapItem = {
    uploadKey: string;
    fileIndex: number;
};

type GalleryItemWithUploadKey = {
    uploadKey?: string;
    imageUrl?: string;
    caption?: string;
    altText?: string;
};

type ServiceSectionWithGallery = {
    content?: {
        gallery?: GalleryItemWithUploadKey[];
        [key: string]: unknown;
    };
    [key: string]: unknown;
};

const parseServiceJsonBody = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const rawGalleryImageMap = req.body.galleryImageMap;

    if (req.body.data) {
        try {
            req.body = JSON.parse(req.body.data);
        } catch (error) {
            return res.status(400).json({ message: 'data is not valid JSON' });
        }
    }

    if (rawGalleryImageMap) {
        try {
            req.body.galleryImageMap =
                typeof rawGalleryImageMap === 'string'
                    ? JSON.parse(rawGalleryImageMap)
                    : rawGalleryImageMap;
        } catch (error) {
            return res
                .status(400)
                .json({ message: 'galleryImageMap is not valid JSON' });
        }
    }

    next();
};

const addUploadedServiceImagesToBody = (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
) => {
    const files = req.files as UploadedFiles;
    const featuredImage = files?.service_image?.[0];

    if (featuredImage) {
        req.body.featuredImage = getUploadedFileUrl(featuredImage.path);
    }

    const galleryImages = files?.gallery_images || [];
    const galleryImageMap = Array.isArray(req.body.galleryImageMap)
        ? (req.body.galleryImageMap as GalleryImageMapItem[])
        : [];

    const uploadKeyToImageUrl = new Map<string, string>();

    galleryImageMap.forEach(({ uploadKey, fileIndex }) => {
        const file = galleryImages[fileIndex];

        if (uploadKey && file) {
            uploadKeyToImageUrl.set(uploadKey, getUploadedFileUrl(file.path));
        }
    });

    if (Array.isArray(req.body.sections)) {
        req.body.sections = (
            req.body.sections as ServiceSectionWithGallery[]
        ).map((section) => {
            const gallery = section.content?.gallery;

            if (!Array.isArray(gallery)) {
                return section;
            }

            return {
                ...section,
                content: {
                    ...section.content,
                    gallery: gallery.map((galleryItem) => ({
                        imageUrl:
                            (galleryItem.uploadKey &&
                                uploadKeyToImageUrl.get(
                                    galleryItem.uploadKey
                                )) ||
                            galleryItem.imageUrl,
                        caption: galleryItem.caption,
                        altText: galleryItem.altText,
                    })),
                },
            };
        });
    }

    delete req.body.galleryImageMap;

    next();
};

router.post(
    '/create',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    uploadFile(),
    parseServiceJsonBody,
    addUploadedServiceImagesToBody,
    validateRequest(ServiceValidation.createServiceValidationSchema),
    ServiceController.createService
);

router.post(
    '/create-draft',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    uploadFile(),
    parseServiceJsonBody,
    addUploadedServiceImagesToBody,
    validateRequest(ServiceValidation.createServiceValidationSchema),
    ServiceController.createDraftService
);

router.post(
    '/create-published',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    uploadFile(),
    parseServiceJsonBody,
    addUploadedServiceImagesToBody,
    validateRequest(ServiceValidation.createServiceValidationSchema),
    ServiceController.createPublishedService
);

router.get('/get-all', ServiceController.getAllServices);

router.get('/get-published', ServiceController.getPublishedServices);

router.get('/get-single/:id', ServiceController.getSingleService);

router.get('/get-by-slug/:slug', ServiceController.getServiceBySlug);

router.patch(
    '/update/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    uploadFile(),
    parseServiceJsonBody,
    addUploadedServiceImagesToBody,
    validateRequest(ServiceValidation.updateServiceValidationSchema),
    ServiceController.updateService
);

router.patch(
    '/save-draft/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    ServiceController.saveServiceAsDraft
);

router.patch(
    '/publish/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    ServiceController.publishService
);

router.delete(
    '/delete/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    ServiceController.deleteService
);

export const serviceRoutes = router;
