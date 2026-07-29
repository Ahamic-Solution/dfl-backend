import path from 'path';
import cloudinary from '../utilities/cloudinary';

const versionPattern = /^v\d+$/;
const videoExtensions = new Set([
    '.mp4',
    '.mov',
    '.mpeg',
    '.ogg',
    '.webm',
    '.avi',
    '.flv',
    '.3gp',
    '.3g2',
    '.mkv',
]);

const getResourceType = (pathname: string) => {
    const extension = path.extname(pathname).toLowerCase();

    if (extension === '.pdf') {
        return 'raw';
    }

    if (videoExtensions.has(extension)) {
        return 'video';
    }

    return 'image';
};

const getPublicIdFromUrl = (fileUrl: string) => {
    const { pathname } = new URL(fileUrl);
    const uploadIndex = pathname.indexOf('/upload/');

    if (uploadIndex === -1) {
        return null;
    }

    const uploadPath = pathname.slice(uploadIndex + '/upload/'.length);
    const parts = uploadPath.split('/').filter(Boolean);
    const versionIndex = parts.findIndex((part) => versionPattern.test(part));

    if (versionIndex !== -1) {
        parts.splice(0, versionIndex + 1);
    }

    const publicIdWithExtension = parts.join('/');

    return publicIdWithExtension.replace(/\.[^/.]+$/, '');
};

export const deleteUploadedFile = async (fileUrl: string) => {
    if (!fileUrl || !fileUrl.startsWith('http')) {
        return;
    }

    const publicId = getPublicIdFromUrl(fileUrl);

    if (!publicId) {
        return;
    }

    try {
        await cloudinary.uploader.destroy(publicId, {
            invalidate: true,
            resource_type: getResourceType(new URL(fileUrl).pathname),
        });
    } catch (error) {
        console.error('Error deleting Cloudinary file:', error);
    }
};
