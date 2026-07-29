export const GALLERY_CATEGORY = {
    Pools: 'Pools',
    Landscaping: 'Landscaping',
} as const;

export const gallerySearchableFields = ['location'];

export const galleryFilterableFields = [
    'searchTerm',
    'category',
    'page',
    'limit',
    'sortBy',
    'sortOrder',
];
