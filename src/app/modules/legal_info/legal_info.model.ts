import { Schema, model } from 'mongoose';
import { ILegalInfo } from './legal_info.interface';

const LegalInfoSchema = new Schema<ILegalInfo>(
    {
        singletonKey: {
            type: String,
            default: 'platform',
            immutable: true,
            unique: true,
            select: false,
        },
        companyName: { type: String, required: true, trim: true },
        businessType: { type: String, required: true, trim: true },
        registeredAddress: { type: String, required: true, trim: true },
        contactEmail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        contactPhone: { type: String, required: true, trim: true },
        jurisdiction: { type: String, required: true, trim: true },
        officialWebsite: { type: String, required: true, trim: true },
        platformFeePercentage: {
            type: Number,
            default: 20,
        },
        freeCancellationHour: {
            type: Number,
            default: 24,
        },
    },
    { timestamps: true }
);

export const LegalInfo = model<ILegalInfo>('LegalInfo', LegalInfoSchema);
