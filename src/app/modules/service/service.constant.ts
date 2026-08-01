export const SERVICE_CATEGORY = {
    Pools: 'Pools',
    Landscaping: 'Landscaping',
} as const;

export const SERVICE_BLOCK_TYPE = {
    HeroSection: 'hero_section',
    RichTextJodit: 'rich_text_jodit',
    FeaturesGrid: 'features_grid',
    GalleryGrid: 'gallery_grid',
    FaqAccordion: 'faq_accordion',
    CtaBanner: 'cta_banner',
    TechnicalSpecs: 'technical_specs',
    ContactForm: 'contact_form',
} as const;

export const SERVICE_LAYOUT_STYLE = {
    Grid2Col: 'grid_2_col',
    Grid3Col: 'grid_3_col',
    Grid4Col: 'grid_4_col',
    Grid6Col: 'grid_6_col',
    Default: 'default',
    FullWidth: 'full_width',
    ContainerCentered: 'container_centered',
    TwoColumnSplit: 'two_column_split',
    CardGrid: 'card_grid',
    AccentBg: 'accent_bg',
} as const;

export const serviceSearchableFields = [
    'title',
    'slug',
    'category',
    'seo.metaTitle',
    'seo.metaDescription',
];

export const serviceFilterableFields = [
    'searchTerm',
    'category',
    'isPublished',
    'page',
    'limit',
    'sortBy',
    'sortOrder',
];
