import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import ServiceService from './service.service';

const createService = catchAsync(async (req, res) => {
    const result = await ServiceService.createService(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Service created successfully',
        data: result,
    });
});

const createDraftService = catchAsync(async (req, res) => {
    const result = await ServiceService.createDraftService(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Service draft saved successfully',
        data: result,
    });
});

const createPublishedService = catchAsync(async (req, res) => {
    const result = await ServiceService.createPublishedService(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Service published successfully',
        data: result,
    });
});

const getAllServices = catchAsync(async (req, res) => {
    const result = await ServiceService.getAllServices(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Services retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getPublishedServices = catchAsync(async (req, res) => {
    const result = await ServiceService.getPublishedServices(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Published services retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getSingleService = catchAsync(async (req, res) => {
    const result = await ServiceService.getSingleService(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service retrieved successfully',
        data: result,
    });
});

const getServiceBySlug = catchAsync(async (req, res) => {
    const result = await ServiceService.getServiceBySlug(req.params.slug);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service retrieved successfully',
        data: result,
    });
});

const updateService = catchAsync(async (req, res) => {
    const result = await ServiceService.updateService(req.params.id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service updated successfully',
        data: result,
    });
});

const saveServiceAsDraft = catchAsync(async (req, res) => {
    const result = await ServiceService.saveServiceAsDraft(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service saved as draft successfully',
        data: result,
    });
});

const publishService = catchAsync(async (req, res) => {
    const result = await ServiceService.publishService(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service published successfully',
        data: result,
    });
});

const deleteService = catchAsync(async (req, res) => {
    const result = await ServiceService.deleteService(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service deleted successfully',
        data: result,
    });
});

const ServiceController = {
    createService,
    createDraftService,
    createPublishedService,
    getAllServices,
    getPublishedServices,
    getSingleService,
    getServiceBySlug,
    updateService,
    saveServiceAsDraft,
    publishService,
    deleteService,
};

export default ServiceController;
