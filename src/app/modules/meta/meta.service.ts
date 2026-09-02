import { CONTACT_STATUS } from '../contact/contact.constant';
import { Contact } from '../contact/contact.model';
import { Gallery } from '../gallery/gallery.model';
import { Service } from '../service/service.model';
import { Testimonial } from '../testimonial/testimonial.model';
import {
    CategoryChartItem,
    DashboardMetaData,
    InquiryChartItem,
} from './meta.interface';

const MONTH_NAMES = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

const getDashboardMetaData = async (): Promise<DashboardMetaData> => {
    const [totalServices, totalGallery, totalNewMessages, totalTestimonial] =
        await Promise.all([
            Service.countDocuments(),
            Gallery.countDocuments(),
            Contact.countDocuments({ status: CONTACT_STATUS.New }),
            Testimonial.countDocuments(),
        ]);

    return {
        totalServices,
        totalGallery,
        totalNewMessages,
        totalTestimonial,
    };
};

const getInquiryChart = async (year: number): Promise<InquiryChartItem[]> => {
    const targetYear =
        Number.isInteger(year) && year > 1970 && year < 3000
            ? year
            : new Date().getFullYear();

    const startDate = new Date(Date.UTC(targetYear, 0, 1, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(targetYear, 11, 31, 23, 59, 59, 999));

    const inquiries = await Contact.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
            },
        },
        {
            $group: {
                _id: { $month: '$createdAt' },
                count: { $sum: 1 },
            },
        },
    ]);

    const monthlyCounts = new Map<number, number>();
    inquiries.forEach((item: { _id: number; count: number }) => {
        monthlyCounts.set(item._id, item.count);
    });

    return MONTH_NAMES.map((month, index) => ({
        month,
        inquiryCount: monthlyCounts.get(index + 1) || 0,
    }));
};

const getCategoryChart = async (year: number): Promise<CategoryChartItem[]> => {
    const targetYear =
        Number.isInteger(year) && year > 1970 && year < 3000
            ? year
            : new Date().getFullYear();

    const startDate = new Date(Date.UTC(targetYear, 0, 1, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(targetYear, 11, 31, 23, 59, 59, 999));

    const categoryData = await Contact.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
            },
        },
        {
            $group: {
                _id: {
                    month: { $month: '$createdAt' },
                    category: '$interestedCategory',
                },
                count: { $sum: 1 },
            },
        },
    ]);

    const chartData: CategoryChartItem[] = MONTH_NAMES.map((month) => ({
        month,
        Pools: 0,
        Landscaping: 0,
    }));

    categoryData.forEach(
        (item: { _id: { month: number; category: string }; count: number }) => {
            const monthIndex = item._id.month - 1;
            const category = item._id.category;
            if (monthIndex >= 0 && monthIndex < 12 && category) {
                chartData[monthIndex][category] =
                    ((chartData[monthIndex][category] as number) || 0) +
                    item.count;
            }
        }
    );

    return chartData;
};

const MetaService = {
    getDashboardMetaData,
    getInquiryChart,
    getCategoryChart,
};

export default MetaService;
