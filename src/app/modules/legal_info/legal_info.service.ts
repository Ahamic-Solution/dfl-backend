/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILegalInfo } from './legal_info.interface';
import { LegalInfo } from './legal_info.model';

const addOrUpdateLegalInfo = async (legalInfoData: ILegalInfo) => {
    const payload = { ...legalInfoData };
    delete payload.singletonKey;

    const result = await LegalInfo.findOneAndUpdate(
        { singletonKey: 'platform' },
        {
            $set: payload,
            $setOnInsert: { singletonKey: 'platform' },
        },
        {
            new: true,
            upsert: true,
            runValidators: true,
        }
    );

    return result;
};

const getPlatformLegalInfo = async () => {
    const legalInfo = await LegalInfo.findOne({ singletonKey: 'platform' });
    return legalInfo;
};

const LegalInfoService = {
    addOrUpdateLegalInfo,
    getPlatformLegalInfo,
};

export default LegalInfoService;
