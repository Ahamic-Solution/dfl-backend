/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { deleteUploadedFile } from '../../helper/deleteUploadedFile';
import { ISuperAdmin } from './superAdmin.interface';
import SuperAdmin from './superAdmin.model';

const updateSuperAdminProfile = async (
    id: string,
    payload: Partial<ISuperAdmin>
) => {
    if (payload.email) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'You can not change the email'
        );
    }
    const user = await SuperAdmin.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'Profile not found');
    }
    const result = await SuperAdmin.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    if (payload.profile_image && user.profile_image) {
        await deleteUploadedFile(user.profile_image);
    }
    return result;
};

const SuperAdminServices = {
    updateSuperAdminProfile,
};

export default SuperAdminServices;
