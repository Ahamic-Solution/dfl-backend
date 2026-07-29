import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import AppError from '../../error/appError';
import calculatePagination from '../../helper/paginationHelper';
import {
    contactFilterableFields,
    contactSearchableFields,
} from './contact.constant';
import { IContact } from './contact.interface';
import { Contact } from './contact.model';

const createContact = async (payload: IContact) => {
    const result = await Contact.create(payload);
    return result;
};

const getAllContact = async (query: Record<string, unknown>) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(query);
    const { searchTerm, ...filters } = query;

    const queryFilters: Record<string, unknown> = {};
    Object.keys(filters).forEach((key) => {
        if (
            contactFilterableFields.includes(key) &&
            !['page', 'limit', 'sortBy', 'sortOrder'].includes(key)
        ) {
            queryFilters[key] = filters[key];
        }
    });

    const conditions = [];

    if (searchTerm) {
        conditions.push({
            $or: contactSearchableFields.map((field) => ({
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

    const result = await Contact.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Contact.countDocuments(whereConditions);

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

const getSingleContact = async (id: string) => {
    const result = await Contact.findById(id);

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Contact not found');
    }

    return result;
};

const updateContact = async (id: string, payload: Partial<IContact>) => {
    const isExist = await Contact.findById(id);

    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Contact not found');
    }

    const result = await Contact.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    return result;
};

const updateContactStatus = async (id: string, status: IContact['status']) => {
    const result = await updateContact(id, { status });
    return result;
};

const deleteContact = async (id: string) => {
    const isExist = await Contact.findById(id);

    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Contact not found');
    }

    const result = await Contact.findByIdAndDelete(id);
    return result;
};

const ContactService = {
    createContact,
    getAllContact,
    getSingleContact,
    updateContact,
    updateContactStatus,
    deleteContact,
};

export default ContactService;
