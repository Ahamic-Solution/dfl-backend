export type ServiceCategory = 'Pools' | 'Landscaping';

export type ServiceBlockType =
    | 'hero_section'
    | 'rich_text_jodit'
    | 'features_grid'
    | 'gallery_grid'
    | 'faq_accordion'
    | 'cta_banner'
    | 'technical_specs'
    | 'contact_form';

export type ServiceLayoutStyle =
    | 'grid_2_col'
    | 'grid_3_col'
    | 'grid_4_col'
    | 'grid_6_col'
    | 'default'
    | 'full_width'
    | 'container_centered'
    | 'two_column_split'
    | 'card_grid'
    | 'accent_bg';

export interface IHeroContent {
    headline: string;
    subheadline?: string;
    bgImage: string;
    ctaText?: string;
    ctaLink?: string;
}

export interface IFeatureItem {
    title: string;
    description?: string;
    iconUrl?: string;
}

export interface IGalleryItem {
    imageUrl: string;
    caption?: string;
    altText?: string;
}

export interface IAccordionItem {
    question: string;
    answer: string;
}

export interface ICtaContent {
    title: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    phoneNumber?: string;
}

export interface IBlockContent {
    hero?: IHeroContent;
    richTextHtml?: string;
    features?: IFeatureItem[];
    gallery?: IGalleryItem[];
    accordionItems?: IAccordionItem[];
    cta?: ICtaContent;
}

export interface IServiceBlock {
    blockType: ServiceBlockType;
    order?: number;
    layoutStyle?: ServiceLayoutStyle;
    content: IBlockContent;
}

export interface IServiceSeo {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    canonicalUrl?: string;
    ogImage?: string;
}

export interface IService {
    title: string;
    slug: string;
    category: ServiceCategory;
    isPublished?: boolean;
    featuredImage: string;
    sections?: IServiceBlock[];
    seo?: IServiceSeo;
    createdAt?: Date;
    updatedAt?: Date;
}
