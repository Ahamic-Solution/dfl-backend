/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';
import cloudinary from '../utilities/cloudinary';

const rootFolder = process.env.CLOUDINARY_ROOT_FOLDER || 'careloss';

const uploadFolders: Record<string, string> = {
    image: 'images/image',
    profile_image: 'images/profile',
    category_image: 'images/category',
    product_image: 'images/product',
    league_image: 'images/league_image',
    team_logo: 'images/team_logo',
    team_bg_image: 'images/team_bg_image',
    player_image: 'images/player_image',
    player_bg_image: 'images/player_bg_image',
    reward_image: 'images/reward_image',
    video: 'videos',
    thumbnail: 'images/thumbnail',
    task_attachments: 'images/task_attachments',
    service_image: 'images/service_image',
    gallery_images: 'images/service_gallery',
    question_image: 'images/question_image',
    reject_evidence: 'images/reject_evidence',
    conversation_pdf: 'documents/conversation_pdf',
    conversation_image: 'images/conversation_image',
    identification_document: 'documents/identification_document',
    beforeImages: 'images/task_images/beforeImages',
    afterImages: 'images/task_images/afterImages',
    report_evidence: 'images/report_evidence',
};

const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
    'video/mp4',
    'video/mov',
    'video/quicktime',
    'video/mpeg',
    'video/ogg',
    'video/webm',
    'video/x-msvideo',
    'video/x-flv',
    'video/3gpp',
    'video/3gpp2',
    'video/x-matroska',
    'application/pdf',
];

const getResourceType = (mimetype: string) => {
    if (mimetype.startsWith('video/')) {
        return 'video';
    }

    if (mimetype === 'application/pdf') {
        return 'raw';
    }

    return 'image';
};

const sanitizeFilename = (filename: string) => {
    const parsedName = path.parse(filename).name;

    return parsedName.replace(/\s+/g, '_').replace(/[^\w-]+/g, '');
};

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req: Request, file: Express.Multer.File) => {
        const folder = uploadFolders[file.fieldname] || 'misc';

        return {
            folder: `${rootFolder}/${folder}`,
            public_id: `${Date.now()}-${sanitizeFilename(file.originalname)}`,
            resource_type: getResourceType(file.mimetype),
            transformation: file.mimetype.startsWith('image/')
                ? [{ quality: 'auto', fetch_format: 'auto' }]
                : undefined,
        };
    },
});

// Patch the upload method to handle stream errors and prevent unhandled promise rejections
(storage as any).upload = function (opts: any, file: any) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(opts, (err, response) => {
            if (err != null) return reject(err);
            return resolve(response);
        });

        stream.on('error', (err) => {
            reject(err);
        });

        if (file.stream) {
            file.stream.on('error', (err: any) => {
                reject(err);
            });
        }

        file.stream.pipe(stream);
    });
};

export const getUploadedFileUrl = (filePath: string): string => {
    return filePath;
};

export const uploadFile = () => {
    const fileFilter = (req: Request, file: any, cb: any) => {
        const allowedFieldnames = Object.keys(uploadFolders);

        if (!allowedFieldnames.includes(file.fieldname)) {
            return cb(new Error('Invalid fieldname'));
        }

        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type'));
        }

        cb(null, true);
    };

    return multer({
        storage,
        fileFilter,
        limits: {
            fileSize: 50 * 1024 * 1024,
        },
    }).fields([
        { name: 'image', maxCount: 1 },
        { name: 'profile_image', maxCount: 1 },
        { name: 'category_image', maxCount: 2 },
        { name: 'product_image', maxCount: 1 },
        { name: 'question_image', maxCount: 2 },
        { name: 'reject_evidence', maxCount: 2 },
        { name: 'task_attachments', maxCount: 5 },
        { name: 'service_image', maxCount: 5 },
        { name: 'gallery_images', maxCount: 50 },
        { name: 'conversation_image', maxCount: 5 },
        { name: 'conversation_pdf', maxCount: 2 },
        { name: 'identification_document', maxCount: 1 },
        { name: 'beforeImages', maxCount: 8 },
        { name: 'report_evidence', maxCount: 8 },
        { name: 'afterImages', maxCount: 8 },
        { name: 'league_image', maxCount: 5 },
        { name: 'team_logo', maxCount: 1 },
        { name: 'team_bg_image', maxCount: 1 },
        { name: 'player_image', maxCount: 1 },
        { name: 'player_bg_image', maxCount: 1 },
        { name: 'reward_image', maxCount: 1 },
        { name: 'video', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
    ]);
};
