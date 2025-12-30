export interface CategoryConfig {
    name: string;
    slug: string;
    rssUrl: string;
    description?: string;
}

export const CATEGORIES: CategoryConfig[] = [
    {name: "Tin tức", slug: "tin-tuc", rssUrl: "/api/rss/tintuctrongngay.rss"},
    {name: "Bóng đá", slug: "bong-da", rssUrl: "/api/rss/bongda.rss"},
    {name: "An ninh", slug: "an-ninh", rssUrl: "/api/rss/anninhhinhsu.rss"},
    {name: "Thời trang", slug: "thoi-trang", rssUrl: "/api/rss/thoitrang.rss"},
    {name: "Hi-tech", slug: "hi-tech", rssUrl: "/api/rss/thoitranghitech.rss"},
    {name: "Kinh doanh", slug: "kinh-doanh", rssUrl: "/api/rss/taichinhbatdongsan.rss"},
    {name: "Ẩm thực", slug: "am-thuc", rssUrl: "/api/rss/amthuc.rss"},
    {name: "Làm đẹp", slug: "lam-dep", rssUrl: "/api/rss/lamdep.rss"},
    {name: "Phim", slug: "phim", rssUrl: "/api/rss/phim.rss"},
    {name: "Giáo dục", slug: "giao-duc", rssUrl: "/api/rss/giaoducduhoc.rss"},
    {name: "Bạn trẻ", slug: "ban-tre", rssUrl: "/api/rss/bantrecuocsong.rss"},
    {name: "Ca nhạc", slug: "ca-nhac", rssUrl: "/api/rss/canhacmtv.rss"},
    {name: "Thể thao", slug: "the-thao", rssUrl: "/api/rss/thethao.rss"},
    {name: "Phi thường", slug: "phi-thuong", rssUrl: "/api/rss/phithuongkyquac.rss"},
    {name: "Công nghệ", slug: "cong-nghe", rssUrl: "/api/rss/congnghethongtin.rss"},
    {name: "Ô tô", slug: "o-to", rssUrl: "/api/rss/oto.rss"},
    {name: "Thị trường", slug: "thi-truong", rssUrl: "/api/rss/thitruongtieudung.rss"},
    {name: "Du lịch", slug: "du-lich", rssUrl: "/api/rss/dulich.rss"},
    {name: "Sức khỏe", slug: "suc-khoe", rssUrl: "/api/rss/suckhoedoisong.rss"},
    {name: "Cười", slug: "cuoi", rssUrl: "/api/rss/cuoi24h.rss"},
];

export const CATEGORY_BY_SLUG = new Map<string, CategoryConfig>(
    CATEGORIES.map(cat => [cat.slug, cat])
);

export const CATEGORY_BY_NAME = new Map<string, CategoryConfig>(
    CATEGORIES.map(cat => [cat.name, cat])
);

export const CATEGORY_URL_MAP: Record<string, string> = Object.fromEntries(
    CATEGORIES.map(cat => [cat.name, cat.rssUrl])
);

export const RSS_CATEGORIES = CATEGORIES.map(cat => ({
    url: cat.rssUrl,
    category: cat.name
}));

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
    return CATEGORY_BY_SLUG.get(slug);
}

export function getCategoryByName(name: string): CategoryConfig | undefined {
    return CATEGORY_BY_NAME.get(name);
}

export function getCategoryName(slug: string): string | null {
    return CATEGORY_BY_SLUG.get(slug)?.name || null;
}

export function getRssUrl(categoryName: string): string | null {
    return CATEGORY_BY_NAME.get(categoryName)?.rssUrl || null;
}

export function getCategorySlug(name: string): string {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

export function isValidCategorySlug(slug: string): boolean {
    return CATEGORY_BY_SLUG.has(slug);
}

export function getAllCategoryNames(): string[] {
    return CATEGORIES.map(cat => cat.name);
}

export function getAllCategorySlugs(): string[] {
    return CATEGORIES.map(cat => cat.slug);
}
