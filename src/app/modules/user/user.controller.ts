/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { getUploadedFileUrl } from '../../helper/fileUploader';
import catchAsync from '../../utilities/catchasync';
import sendResponse from '../../utilities/sendResponse';
import { USER_ROLE } from './user.constant';
import userServices from './user.services';

const verifyCode = catchAsync(async (req, res) => {
    const result = await userServices.verifyCode(
        req?.body?.email,
        req?.body?.verifyCode
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully verified your account with email',
        data: result,
    });
});
const resendVerifyCode = catchAsync(async (req, res) => {
    const result = await userServices.resendVerifyCode(req?.body?.email);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Verify code send to your email inbox',
        data: result,
    });
});

const getMyProfile = catchAsync(async (req, res) => {
    const result = await userServices.getMyProfile(req.user);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully retrieved your data',
        data: result,
    });
});

const updateUserProfile = catchAsync(async (req, res) => {
    const file: any = req.files?.profile_image;
    if (req.files?.profile_image) {
        req.body.profile_image = getUploadedFileUrl(file[0].path);
    }

    const result = await userServices.updateUserProfile(req.user, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile updated successfully',
        data: result,
    });
});
const changeUserStatus = catchAsync(async (req, res) => {
    const result = await userServices.changeUserStatus(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `${
            result?.role == USER_ROLE.customer ? 'Customer' : 'Provider'
        } is ${result?.isBlocked ? 'Blocked' : 'Unblocked'}`,
        data: result,
    });
});

const userController = {
    verifyCode,
    resendVerifyCode,
    getMyProfile,
    changeUserStatus,
    updateUserProfile,
};
export default userController;
