import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import AppError from '../../error/appError';
import { deleteUploadedFile } from '../../helper/deleteUploadedFile';
import calculatePagination from '../../helper/paginationHelper';
import {
    testimonialFilterableFields,
    testimonialSearchableFields,
} from './testimonial.constant';
import { ITestimonial } from './testimonial.interface';
import { Testimonial } from './testimonial.model';

const createTestimonial = async (payload: ITestimonial) => {
    const result = await Testimonial.create(payload);
    return result;
};

const getAllTestimonial = async (query: Record<string, unknown>) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(query);
    const { searchTerm, ...filters } = query;

    const queryFilters: Record<string, unknown> = {};
    Object.keys(filters).forEach((key) => {
        if (
            testimonialFilterableFields.includes(key) &&
            !['page', 'limit', 'sortBy', 'sortOrder'].includes(key)
        ) {
            queryFilters[key] = filters[key];
        }
    });

    const conditions = [];

    if (searchTerm) {
        conditions.push({
            $or: testimonialSearchableFields.map((field) => ({
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

    const result = await Testimonial.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Testimonial.countDocuments(whereConditions);

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

const getSingleTestimonial = async (id: string) => {
    const result = await Testimonial.findById(id);

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Testimonial not found');
    }

    return result;
};

const updateTestimonial = async (
    id: string,
    payload: Partial<ITestimonial>
) => {
    const isExist = await Testimonial.findById(id);

    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Testimonial not found');
    }

    const result = await Testimonial.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    if (payload.image && isExist.image) {
        await deleteUploadedFile(isExist.image);
    }

    return result;
};

const deleteTestimonial = async (id: string) => {
    const isExist = await Testimonial.findById(id);

    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Testimonial not found');
    }

    const result = await Testimonial.findByIdAndDelete(id);

    if (isExist.image) {
        await deleteUploadedFile(isExist.image);
    }

    return result;
};

const TestimonialService = {
    createTestimonial,
    getAllTestimonial,
    getSingleTestimonial,
    updateTestimonial,
    deleteTestimonial,
};

export default TestimonialService;
