import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import TestimonialService from './testimonial.service';

const createTestimonial = catchAsync(async (req, res) => {
    const result = await TestimonialService.createTestimonial(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Testimonial created successfully',
        data: result,
    });
});

const getAllTestimonial = catchAsync(async (req, res) => {
    const result = await TestimonialService.getAllTestimonial(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Testimonial retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
});

const getSingleTestimonial = catchAsync(async (req, res) => {
    const result = await TestimonialService.getSingleTestimonial(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Testimonial retrieved successfully',
        data: result,
    });
});

const updateTestimonial = catchAsync(async (req, res) => {
    const result = await TestimonialService.updateTestimonial(
        req.params.id,
        req.body
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Testimonial updated successfully',
        data: result,
    });
});

const deleteTestimonial = catchAsync(async (req, res) => {
    const result = await TestimonialService.deleteTestimonial(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Testimonial deleted successfully',
        data: result,
    });
});

const TestimonialController = {
    createTestimonial,
    getAllTestimonial,
    getSingleTestimonial,
    updateTestimonial,
    deleteTestimonial,
};

export default TestimonialController;
