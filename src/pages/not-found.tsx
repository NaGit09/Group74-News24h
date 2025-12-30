
import { Link } from "react-router"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold text-primary">404</h1>

        {/* Error Message */}
        <h2 className="mt-4 text-3xl font-bold text-foreground">Không tìm thấy trang</h2>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Vui lòng kiểm tra lại đường dẫn.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/"
            className="inline-flex items-center gap-2 rounded bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Home className="h-5 w-5" />
            Về trang chủ
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded border border-border bg-background px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
            Quay lại
          </button>
        </div>

        {/* Popular Links */}
        <div className="mt-12 border-t border-border pt-8">
          <h3 className="text-sm font-semibold text-foreground mb-4">Có thể bạn quan tâm:</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/tin-tuc" className="text-sm text-primary hover:underline">
              Tin tức
            </Link>
            <Link to="/bong-da" className="text-sm text-primary hover:underline">
              Bóng đá
            </Link>
            <Link to="/kinh-doanh" className="text-sm text-primary hover:underline">
              Kinh doanh
            </Link>
            <Link to="/giai-tri" className="text-sm text-primary hover:underline">
              Giải trí
            </Link>
            <Link to="/gia-vang" className="text-sm text-primary hover:underline">
              Giá vàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


