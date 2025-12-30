import {Link} from "react-router"
import {useEffect, useState} from "react"
import {Clock, TrendingUp} from "lucide-react"

interface RelatedNewsSidebarProps {
    category: string
}

export function RelatedNewsSidebar({category}: RelatedNewsSidebarProps) {
    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 200)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const relatedNews = [
        {
            title: "Giá USD tăng mạnh, tác động đến thị trường vàng trong nước",
            href: "/kinh-doanh/gia-usd",
            publishedAt: "30 phút trước",
        },
        {
            title: "NHNN cảnh báo về tình trạng buôn lậu vàng qua biên giới",
            href: "/kinh-doanh/buon-lau-vang",
            publishedAt: "1 giờ trước",
        },
        {
            title: "Dự báo giá vàng thế giới có thể chạm mốc 2,100 USD/ounce",
            href: "/kinh-doanh/du-bao-vang",
            publishedAt: "2 giờ trước",
        },
        {
            title: "Chuyên gia khuyên không nên mua vàng ở thời điểm này",
            href: "/kinh-doanh/chuyen-gia-vang",
            publishedAt: "3 giờ trước",
        },
    ]

    const mostRead = [
        {
            title: "Chính phủ công bố gói hỗ trợ 50 nghìn tỷ đồng cho doanh nghiệp",
            href: "/kinh-doanh/ho-tro-doanh-nghiep",
            views: "125K",
        },
        {
            title: "VN-Index vượt mốc 1,300 điểm sau 3 phiên tăng liên tiếp",
            href: "/kinh-doanh/vn-index",
            views: "98K",
        },
        {
            title: "Giá xăng dầu dự kiến tăng mạnh trong kỳ điều chỉnh tiếp theo",
            href: "/kinh-doanh/gia-xang-dau",
            views: "87K",
        },
    ]

    return (
        <div className={`space-y-8 ${isSticky ? "lg:sticky lg:top-20" : ""}`}>
            {/* Tin liên quan */}
            <div className="border-t-2 border-primary pt-4">
                <h3 className="mb-4 flex items-center text-sm font-bold uppercase tracking-wider text-foreground">
                    <Clock className="mr-2 h-4 w-4"/>
                    Tin liên quan
                </h3>
                <div className="space-y-3">
                    {relatedNews.map((news, index) => (
                        <Link key={index} to={news.href}
                              className="group block border-b border-border pb-3 last:border-0">
                            <h4 className="mb-1 line-clamp-3 text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                                {news.title}
                            </h4>
                            <span className="text-xs text-muted-foreground">{news.publishedAt}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Đọc nhiều nhất */}
            <div className="border-t-2 border-primary pt-4">
                <h3 className="mb-4 flex items-center text-sm font-bold uppercase tracking-wider text-foreground">
                    <TrendingUp className="mr-2 h-4 w-4"/>
                    Đọc nhiều nhất
                </h3>
                <div className="space-y-3">
                    {mostRead.map((news, index) => (
                        <Link key={index} to={news.href}
                              className="group block border-b border-border pb-3 last:border-0">
                            <div className="flex gap-3">
                <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </span>
                                <div className="flex-1">
                                    <h4 className="mb-1 line-clamp-2 text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                                        {news.title}
                                    </h4>
                                    <span className="text-xs text-muted-foreground">{news.views} lượt xem</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}


