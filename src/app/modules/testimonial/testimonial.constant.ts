export const TESTIMONIAL_STATUS = {
    Draft: 'Draft',
    Published: 'Published',
} as const;

export const testimonialSearchableFields = ['name', 'roleOrLocation', 'quote'];

export const testimonialFilterableFields = [
    'searchTerm',
    'status',
    'page',
    'limit',
    'sortBy',
    'sortOrder',
];
