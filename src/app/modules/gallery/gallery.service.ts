import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import AppError from '../../error/appError';
import calculatePagination from '../../helper/paginationHelper';
import { deleteUploadedFile } from '../../helper/deleteUploadedFile';
import {
    galleryFilterableFields,
    gallerySearchableFields,
} from './gallery.constant';
import { IGallery } from './gallery.interface';
import { Gallery } from './gallery.model';

const createGallery = async (payload: IGallery) => {
    const result = await Gallery.create(payload);
    return result;
};

const getAllGallery = async (query: Record<string, unknown>) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(query);
    const { searchTerm, ...filters } = query;

    const queryFilters: Record<string, unknown> = {};
    Object.keys(filters).forEach((key) => {
        if (
            galleryFilterableFields.includes(key) &&
            !['page', 'limit', 'sortBy', 'sortOrder'].includes(key)
        ) {
            queryFilters[key] = filters[key];
        }
    });

    const conditions = [];

    if (searchTerm) {
        conditions.push({
            $or: gallerySearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }

    if (Object.keys(queryFilters).length) {
        conditions.push({
            $and: Object.entries(queryFilters).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    const whereConditions = conditions.length ? { $and: conditions } : {};
    const sortConditions: Record<string, SortOrder> = {
        [sortBy]: sortOrder,
    };

    const result = await Gallery.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Gallery.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
        result,
    };
};

const getSingleGallery = async (id: string) => {
    const result = await Gallery.findById(id);

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Gallery not found');
    }

    return result;
};

const updateGallery = async (id: string, payload: Partial<IGallery>) => {
    const isExist = await Gallery.findById(id);

    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Gallery not found');
    }

    const result = await Gallery.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    if (payload.image && isExist.image) {
        await deleteUploadedFile(isExist.image);
    }

    return result;
};

const deleteGallery = async (id: string) => {
    const isExist = await Gallery.findById(id);

    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Gallery not found');
    }

    const result = await Gallery.findByIdAndDelete(id);

    if (isExist.image) {
        await deleteUploadedFile(isExist.image);
    }

    return result;
};

const GalleryService = {
    createGallery,
    getAllGallery,
    getSingleGallery,
    updateGallery,
    deleteGallery,
};

export default GalleryService;
