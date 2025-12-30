import {NewsPreview} from "../news/news-preview.tsx"

interface RelatedNewsGridProps {
    category: string
}

export function RelatedNewsGrid({category}: RelatedNewsGridProps) {
    const relatedNews = [
        {
            title: "Thị trường bất động sản TP.HCM bắt đầu phục hồi sau giai đoạn trầm lắng",
            sapo: "Số lượng giao dịch bất động sản tại TP.HCM tăng 25% trong quý IV/2024, báo hiệu thị trường đang dần phục hồi sau 2 năm trầm lắng.",
            image: "/real-estate-market-recovery.jpg",
            href: "/bai-viet/bat-dong-san-phuc-hoi",
            publishedAt: "1 giờ trước",
        },
        {
            title: "Startup công nghệ Việt Nam huy động được 200 triệu USD từ quỹ đầu tư",
            sapo: "Công ty công nghệ tài chính VietFintech thành công huy động vòng Series C từ các quỹ đầu tư quốc tế hàng đầu.",
            image: "/startup-funding-tech.jpg",
            href: "/bai-viet/startup-huy-dong-von",
            publishedAt: "2 giờ trước",
        },
        {
            title: "Samsung công bố kế hoạch đầu tư thêm 5 tỷ USD vào Việt Nam",
            sapo: "Tập đoàn Samsung sẽ đầu tư xây dựng thêm 2 nhà máy sản xuất linh kiện điện tử tại Bắc Ninh và Thái Nguyên.",
            image: "/samsung-factory-investment.jpg",
            href: "/bai-viet/samsung-dau-tu-viet-nam",
            publishedAt: "3 giờ trước",
        },
        {
            title: "Giá cà phê Việt Nam đạt mức cao nhất trong 10 năm",
            sapo: "Giá cà phê robusta xuất khẩu đạt 4,500 USD/tấn do nguồn cung toàn cầu giảm mạnh và nhu cầu từ châu Âu tăng cao.",
            image: "/coffee-plantation-harvest.jpg",
            href: "/bai-viet/gia-ca-phe-tang",
            publishedAt: "4 giờ trước",
        },
    ]

    return (
        <div className="mt-12 border-t-2 border-primary pt-8">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
                Tin cùng chuyên mục: <span className="text-primary">{category}</span>
            </h2>
            <div className="space-y-0">
                {relatedNews.map((news, index) => (
                    <article key={index} className="py-4 first:pt-0 last:border-0">
                        <NewsPreview
                            article={{
                                title: news.title,
                                slug: news.href.replace("/bai-viet/", ""),
                                thumbnail: news.image,
                                publishedAt: news.publishedAt,
                                sapo: news.sapo,
                            }}
                        />
                    </article>
                ))}
            </div>
        </div>
    )
}


