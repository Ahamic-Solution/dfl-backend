import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import AppError from '../../error/appError';
import { deleteUploadedFile } from '../../helper/deleteUploadedFile';
import calculatePagination from '../../helper/paginationHelper';
import {
    serviceFilterableFields,
    serviceSearchableFields,
} from './service.constant';
import { IService, IServiceBlock } from './service.interface';
import { Service } from './service.model';

const normalizeSlug = (slug: string) => slug.trim().toLowerCase();

const getGalleryImageUrls = (sections?: IServiceBlock[]) => {
    if (!Array.isArray(sections)) {
        return [];
    }

    return sections.flatMap((section) => {
        const gallery = section.content?.gallery;

        if (!Array.isArray(gallery)) {
            return [];
        }

        return gallery
            .map((item) => item.imageUrl)
            .filter((imageUrl): imageUrl is string => Boolean(imageUrl));
    });
};

const deleteUploadedFiles = async (fileUrls: string[]) => {
    await Promise.all(
        Array.from(new Set(fileUrls)).map((fileUrl) =>
            deleteUploadedFile(fileUrl)
        )
    );
};

const getRemovedGalleryImageUrls = (
    oldSections?: IServiceBlock[],
    newSections?: IServiceBlock[]
) => {
    const oldGalleryImageUrls = getGalleryImageUrls(oldSections);
    const newGalleryImageUrls = new Set(getGalleryImageUrls(newSections));

    return oldGalleryImageUrls.filter(
        (imageUrl) => !newGalleryImageUrls.has(imageUrl)
    );
};

const ensureUniqueSlug = async (slug: string, excludeId?: string) => {
    const query = excludeId
        ? { slug: normalizeSlug(slug), _id: { $ne: excludeId } }
        : { slug: normalizeSlug(slug) };

    const isExist = await Service.findOne(query);

    if (isExist) {
        throw new AppError(httpStatus.CONFLICT, 'Service slug already exists');
    }
};

const createService = async (payload: IService) => {
    await ensureUniqueSlug(payload.slug);

    const result = await Service.create({
        ...payload,
        slug: normalizeSlug(payload.slug),
    });

    return result;
};

const createDraftService = async (payload: IService) => {
    return createService({ ...payload, isPublished: false });
};

const createPublishedService = async (payload: IService) => {
    return createService({ ...payload, isPublished: true });
};

const buildServiceConditions = (query: Record<string, unknown>) => {
    const { searchTerm, ...filters } = query;
    const queryFilters: Record<string, unknown> = {};

    Object.keys(filters).forEach((key) => {
        if (
            serviceFilterableFields.includes(key) &&
            !['page', 'limit', 'sortBy', 'sortOrder'].includes(key)
        ) {
            if (key === 'isPublished') {
                queryFilters[key] = filters[key] === 'true';
            } else {
                queryFilters[key] = filters[key];
            }
        }
    });

    const conditions = [];

    if (searchTerm) {
        conditions.push({
            $or: serviceSearchableFields.map((field) => ({
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

    return conditions.length ? { $and: conditions } : {};
};

const getAllServices = async (query: Record<string, unknown>) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(query);
    const whereConditions = buildServiceConditions(query);
    const sortConditions: Record<string, SortOrder> = {
        [sortBy]: sortOrder,
    };

    const result = await Service.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Service.countDocuments(whereConditions);

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

const getPublishedServices = async (query: Record<string, unknown>) => {
    return getAllServices({ ...query, isPublished: 'true' });
};

const getSingleService = async (id: string) => {
    const result = await Service.findById(id);

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
    }

    return result;
};

const getServiceBySlug = async (slug: string) => {
    const result = await Service.findOne({ slug: normalizeSlug(slug) });

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
    }

    return result;
};

const updateService = async (id: string, payload: Partial<IService>) => {
    const isExist = await Service.findById(id);

    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
    }

    if (payload.slug) {
        await ensureUniqueSlug(payload.slug, id);
        payload.slug = normalizeSlug(payload.slug);
    }

    const result = await Service.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    if (
        payload.featuredImage &&
        isExist.featuredImage &&
        payload.featuredImage !== isExist.featuredImage
    ) {
        await deleteUploadedFile(isExist.featuredImage);
    }

    if (payload.sections) {
        await deleteUploadedFiles(
            getRemovedGalleryImageUrls(isExist.sections, payload.sections)
        );
    }

    return result;
};

const saveServiceAsDraft = async (id: string) => {
    return updateService(id, { isPublished: false });
};

const publishService = async (id: string) => {
    return updateService(id, { isPublished: true });
};

const deleteService = async (id: string) => {
    const isExist = await Service.findById(id);

    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
    }

    const result = await Service.findByIdAndDelete(id);

    if (isExist.featuredImage) {
        await deleteUploadedFile(isExist.featuredImage);
    }

    await deleteUploadedFiles(getGalleryImageUrls(isExist.sections));

    return result;
};

const ServiceService = {
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

export default ServiceService;
