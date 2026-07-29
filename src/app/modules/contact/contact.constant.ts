export const CONTACT_STATUS = {
    New: 'New',
    Read: 'Read',
    Replied: 'Replied',
    Archived: 'Archived',
} as const;

export const contactSearchableFields = [
    'name',
    'email',
    'phone',
    'interestedCategory',
    'interestedService',
    'message',
];

export const contactFilterableFields = [
    'searchTerm',
    'status',
    'interestedCategory',
    'interestedService',
    'page',
    'limit',
    'sortBy',
    'sortOrder',
];
