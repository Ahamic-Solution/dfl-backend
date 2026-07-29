import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import LegalInfoService from './legal_info.service';

const addOrUpdateLegalInfo = catchAsync(async (req, res) => {
    const legalInfoData = req.body;

    const result = await LegalInfoService.addOrUpdateLegalInfo(legalInfoData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Legal info updated successfully',
        data: result,
    });
});
const getPlatformLegalInfo = catchAsync(async (req, res) => {
    const result = await LegalInfoService.getPlatformLegalInfo();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Legal info retrieved successfully',
        data: result,
    });
});

const LegalInfoController = {
    addOrUpdateLegalInfo,
    getPlatformLegalInfo,
};

export default LegalInfoController;
