export interface CategoryChartItem {
    month: string;
    Pools?: number;
    Landscaping?: number;
    [category: string]: string | number | undefined;
}

export interface InquiryChartItem {
    month: string;
    inquiryCount: number;
}

export interface DashboardMetaData {
    totalServices: number;
    totalGallery: number;
    totalNewMessages: number;
    totalTestimonial: number;
}
