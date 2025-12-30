import {Link} from "react-router"
import {useState} from "react"
import {Menu} from "lucide-react"
import { CATEGORIES } from "@/constant/categories"

// Menu categories với sub-items (có thể hardcode sub-items)
const menuCategories = [
    {
        name: "Tin tức",
        slug: "tin-tuc",
        items: [
            "Tin tức trong ngày",
            "Xã hội",
            "Tra cứu phường xã",
            "Đời sống - Dân sinh",
            "Giao thông - Đô thị",
            "Nóng trên mạng",
            "Dự báo thời tiết",
            "Lịch vạn niên",
        ],
    },
    {
        name: "Bóng đá",
        slug: "bong-da",
        items: [
            "Lịch thi đấu bóng đá",
            "Video highlight",
            "Tường thuật trực tiếp",
            "Bảng xếp hạng",
            "Ngoại hạng Anh",
            "Champions League",
            "Bóng đá Việt Nam",
            "Chuyển nhượng",
        ],
    },
    {
        name: "An ninh",
        slug: "an-ninh",
        items: [
            "An ninh trật tự",
            "Pháp luật",
            "Hình sự",
            "Điều tra",
            "Phòng chống tội phạm",
            "Giao thông",
        ],
    },
    {
        name: "Thời trang",
        slug: "thoi-trang",
        items: [
            "Xu hướng thời trang",
            "Thời trang sao",
            "Làm đẹp",
            "Phong cách",
            "Thời trang nam",
            "Thời trang nữ",
        ],
    },
    {
        name: "Hi-tech",
        slug: "hi-tech",
        items: [
            "Công nghệ AI",
            "Điện thoại",
            "Laptop",
            "Game",
            "Thời trang Hi-tech",
            "Khoa học",
            "Đánh giá sản phẩm",
        ],
    },
    {
        name: "Kinh doanh",
        slug: "kinh-doanh",
        items: [
            "Kinh tế thế giới",
            "Bất động sản",
            "Doanh nhân",
            "Khởi nghiệp",
            "Ngân hàng",
            "Giá vàng hôm nay",
            "Chứng khoán",
            "Doanh nghiệp",
        ],
    },
    {
        name: "Ẩm thực",
        slug: "am-thuc",
        items: [
            "Món ngon mỗi ngày",
            "Ẩm thực Việt",
            "Ẩm thực thế giới",
            "Công thức nấu ăn",
            "Nhà hàng",
            "Đặc sản vùng miền",
        ],
    },
    {
        name: "Làm đẹp",
        slug: "lam-dep",
        items: [
            "Chăm sóc da",
            "Trang điểm",
            "Chăm sóc tóc",
            "Spa & Massage",
            "Mỹ phẩm",
            "Làm đẹp tự nhiên",
        ],
    },
    {
        name: "Phim",
        slug: "phim",
        items: [
            "Phim chiếu rạp",
            "Phim Việt Nam",
            "Phim Hollywood",
            "Phim Hàn Quốc",
            "Review phim",
            "Lịch chiếu phim",
        ],
    },
    {
        name: "Giáo dục",
        slug: "giao-duc",
        items: [
            "Tin tức giáo dục",
            "Tuyển sinh",
            "Du học",
            "Học bổng",
            "Kỹ năng học tập",
            "Đào tạo nghề",
        ],
    },
    {
        name: "Bạn trẻ",
        slug: "ban-tre",
        items: [
            "Cuộc sống trẻ",
            "Tình yêu",
            "Học đường",
            "Công việc",
            "Giải trí",
            "Xu hướng giới trẻ",
        ],
    },
    {
        name: "Ca nhạc",
        slug: "ca-nhac",
        items: [
            "Nhạc Việt",
            "Nhạc quốc tế",
            "V-Pop",
            "K-Pop",
            "MV mới",
            "Liveshow",
        ],
    },
    {
        name: "Thể thao",
        slug: "the-thao",
        items: [
            "Tennis",
            "Pickleball",
            "Bóng chuyền",
            "Võ thuật - UFC",
            "Golf",
            "F1",
            "Billiards",
            "Cầu lông",
        ],
    },
    {
        name: "Phi thường",
        slug: "phi-thuong",
        items: [
            "Chuyện lạ",
            "Khám phá",
            "Bí ẩn",
            "Siêu nhiên",
            "Kỳ quặc",
        ],
    },
    {
        name: "Công nghệ",
        slug: "cong-nghe",
        items: [
            "Tin công nghệ",
            "AI & Machine Learning",
            "Blockchain",
            "Internet of Things",
            "Startup công nghệ",
            "Bảo mật",
        ],
    },
    {
        name: "Ô tô",
        slug: "o-to",
        items: [
            "Tin tức ô tô",
            "Bảng giá xe",
            "Tư vấn mua xe",
            "Xe xanh",
            "Đánh giá xe",
            "Xe máy",
            "Phụ kiện",
        ],
    },
    {
        name: "Thị trường",
        slug: "thi-truong",
        items: [
            "Thị trường tiêu dùng",
            "Giá cả",
            "Sản phẩm mới",
            "Khuyến mãi",
            "Xu hướng tiêu dùng",
        ],
    },
    {
        name: "Du lịch",
        slug: "du-lich",
        items: [
            "Điểm đến",
            "Du lịch Việt Nam",
            "Du lịch nước ngoài",
            "Kinh nghiệm du lịch",
            "Khách sạn",
            "Tour du lịch",
        ],
    },
    {
        name: "Sức khỏe",
        slug: "suc-khoe",
        items: [
            "Sức khỏe dinh dưỡng",
            "Tin tức sức khỏe",
            "Phát minh y học",
            "Bệnh thường gặp",
            "Chăm sóc sức khỏe",
            "Y học cổ truyền",
        ],
    },
    {
        name: "Cười",
        slug: "cuoi",
        items: [
            "Ảnh hài",
            "Video hài",
            "Truyện cười",
            "Hài kịch",
            "Giải trí",
        ],
    },
]

export function MegaMenu() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [showAllCategories, setShowAllCategories] = useState(false)

    return (
        <div className="bg-muted/30 relative">
            <div className="container mx-auto px-4">
                <nav className="hidden lg:flex items-center gap-1 h-11 text-sm font-medium overflow-visible">
                    <Link to="/"
                          className="flex items-center gap-0.5 mr-4 pr-4 border-r border-border/50 hover:opacity-80 transition-opacity"
                    >
                        <span className="text-xl font-bold text-primary">24H</span>
                        <span className="text-base font-medium tracking-tight whitespace-nowrap ml-1.5">TIN TỨC</span>
                    </Link>

                    {/* Dropdown "Danh mục" - Hiển thị TẤT CẢ categories từ CATEGORIES */}
                    <div
                        className="relative"
                        onMouseEnter={() => setShowAllCategories(true)}
                        onMouseLeave={() => setShowAllCategories(false)}
                    >
                        <button
                            className="flex items-center gap-1.5 px-3 py-2 hover:text-primary transition-all duration-300 whitespace-nowrap relative group">
                            <Menu className="h-4 w-4"/>
                            Danh mục
                            <span
                                className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/>
                        </button>

                        {showAllCategories && (
                            <div
                                className="absolute top-full left-0 pt-1 z-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="w-[1000px] bg-background border border-border shadow-2xl rounded-sm">
                                    <div className="grid grid-cols-4 gap-6 p-6">
                                        {menuCategories.map((category) => (
                                            <div key={category.slug} className="space-y-2">
                                                <h3 className="font-bold text-sm text-primary border-b border-border pb-1.5">
                                                    <Link to={`/danh-muc/${category.slug}`} className="hover:underline">
                                                        {category.name}
                                                    </Link>
                                                </h3>
                                                <ul className="space-y-1.5">
                                                    {category.items.map((item) => (
                                                        <li key={item}>
                                                            <Link
                                                                to={`/danh-muc/${category.slug}`}
                                                                className="text-sm hover:text-primary transition-all duration-300 block relative group pl-2"
                                                            >
                                                                {item}
                                                                <span
                                                                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation bar - Hiển thị nhiều categories hơn cho màn hình lớn */}
                    {CATEGORIES.slice(0, 15).map((category) => (
                        <div
                            key={category.slug}
                            className="relative"
                            onMouseEnter={() => setActiveMenu(category.slug)}
                            onMouseLeave={() => setActiveMenu(null)}
                        >
                            <Link to={`/danh-muc/${category.slug}`}
                                  className="px-3 py-2 hover:text-primary transition-all duration-300 whitespace-nowrap relative group block"
                            >
                                {category.name}
                                <span
                                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/>
                            </Link>

                            {/* Dropdown cho category có sub-items */}
                            {activeMenu === category.slug && menuCategories.find(c => c.slug === category.slug) && (
                                <div
                                    className="absolute top-full left-0 pt-1 z-100 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="w-56 bg-background border border-border shadow-2xl rounded-sm">
                                        <div className="py-1">
                                            {menuCategories.find(c => c.slug === category.slug)?.items.map((item) => (
                                                <Link
                                                    key={item}
                                                    to={`/danh-muc/${category.slug}`}
                                                    className="block px-4 py-2.5 text-sm hover:text-primary transition-all duration-300 relative group"
                                                >
                                                    {item}
                                                    <span
                                                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"/>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    )
}


