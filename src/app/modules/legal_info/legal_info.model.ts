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
        siteName: { type: String, required: true, trim: true },
        tagline: { type: String, required: true, trim: true },
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
        officialWebsite: { type: String, trim: true, default: '' },
        facebookLink: { type: String, trim: true, default: '' },
        instagramLink: { type: String, trim: true, default: '' },
        linkedinLink: { type: String, trim: true, default: '' },
    },
    { timestamps: true }
);

export const LegalInfo = model<ILegalInfo>('LegalInfo', LegalInfoSchema);
