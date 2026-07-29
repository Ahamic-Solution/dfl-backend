import { model, Schema } from 'mongoose';
import { CONTACT_STATUS } from './contact.constant';
import { IContact } from './contact.interface';

const contactSchema = new Schema<IContact>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        interestedCategory: {
            type: String,
            required: true,
            trim: true,
        },
        interestedService: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: Object.values(CONTACT_STATUS),
            default: CONTACT_STATUS.New,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Contact = model<IContact>('Contact', contactSchema);
