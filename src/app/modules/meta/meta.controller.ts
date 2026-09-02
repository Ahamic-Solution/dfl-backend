import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import MetaService from './meta.service';

const getDashboardMetaData = catchAsync(async (req, res) => {
    const result = await MetaService.getDashboardMetaData();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Dashboard meta data retrieved successfully',
        data: result,
    });
});

const getInquiryChart = catchAsync(async (req, res) => {
    const year = req.query.year
        ? Number(req.query.year)
        : new Date().getFullYear();
    const result = await MetaService.getInquiryChart(year);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Inquiry chart data retrieved successfully',
        data: result,
    });
});

const getCategoryChart = catchAsync(async (req, res) => {
    const year = req.query.year
        ? Number(req.query.year)
        : new Date().getFullYear();
    const result = await MetaService.getCategoryChart(year);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category chart data retrieved successfully',
        data: result,
    });
});

const MetaController = {
    getDashboardMetaData,
    getInquiryChart,
    getCategoryChart,
};

export default MetaController;
