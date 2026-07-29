import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import GalleryService from './gallery.service';

const createGallery = catchAsync(async (req, res) => {
    const result = await GalleryService.createGallery(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Gallery created successfully',
        data: result,
    });
});

const getAllGallery = catchAsync(async (req, res) => {
    const result = await GalleryService.getAllGallery(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Gallery retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getSingleGallery = catchAsync(async (req, res) => {
    const result = await GalleryService.getSingleGallery(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Gallery retrieved successfully',
        data: result,
    });
});

const updateGallery = catchAsync(async (req, res) => {
    const result = await GalleryService.updateGallery(req.params.id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Gallery updated successfully',
        data: result,
    });
});

const deleteGallery = catchAsync(async (req, res) => {
    const result = await GalleryService.deleteGallery(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Gallery deleted successfully',
        data: result,
    });
});

const GalleryController = {
    createGallery,
    getAllGallery,
    getSingleGallery,
    updateGallery,
    deleteGallery,
};

export default GalleryController;
