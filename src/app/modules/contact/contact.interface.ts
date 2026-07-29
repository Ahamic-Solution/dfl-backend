import { CONTACT_STATUS } from './contact.constant';

export interface IContact {
    name: string;
    email: string;
    phone: string;
    interestedCategory: string;
    interestedService: string;
    message: string;
    status: (typeof CONTACT_STATUS)[keyof typeof CONTACT_STATUS];
    createdAt?: Date;
    updatedAt?: Date;
}
