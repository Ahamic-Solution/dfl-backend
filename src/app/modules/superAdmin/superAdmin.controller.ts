/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { getUploadedFileUrl } from '../../helper/fileUploader';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import SuperAdminServices from './superAdmin.services';

const updateUserProfile = catchAsync(async (req, res) => {
    const file: any = req.files?.profile_image;
    if (req.files?.profile_image) {
        req.body.profile_image = getUploadedFileUrl(file[0].path);
    }
    const result = await SuperAdminServices.updateSuperAdminProfile(
        req.user.profileId,
        req.body
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile updated successfully',
        data: result,
    });
});

const SuperAdminController = {
    updateUserProfile,
};

export default SuperAdminController;
