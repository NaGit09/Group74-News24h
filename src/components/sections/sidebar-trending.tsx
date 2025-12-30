import {Link} from "react-router"
import {useState} from "react"


interface TrendingItem {
    title: string
    sapo?: string
    image: string
    href: string
    views: string
}

interface SidebarTrendingProps {
    items: TrendingItem[]
}

function TrendingItemCard({item, index}: { item: TrendingItem; index: number }) {
    const [imgError, setImgError] = useState(false)

    return (
        <Link key={index} to={item.href} className="flex gap-2 p-2 transition-colors hover:bg-primary/5">
            <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-muted">
                <img
                    src={imgError ? "/placeholder.svg" : item.image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                    onError={() => setImgError(true)}
                />
            </div>
            <div className="flex-1 min-w-0">
                <h5 className="text-xs font-semibold leading-tight text-foreground line-clamp-2 mb-1">{item.title}</h5>
                {item.sapo && (
                    <p className="text-[10px] leading-tight text-muted-foreground line-clamp-1 mb-1">{item.sapo}</p>
                )}
                <span className="text-[10px] text-muted-foreground">{item.views} lượt xem</span>
            </div>
        </Link>
    )
}

export function SidebarTrending({items}: SidebarTrendingProps) {
    return (
        <div className="border border-border overflow-hidden">
            <h4 className="border-b-2 border-primary bg-primary/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground">
                Đọc nhiều nhất
            </h4>
            <div className="divide-y divide-border">
                {items.map((item, index) => (
                    <TrendingItemCard key={index} item={item} index={index}/>
                ))}
            </div>
        </div>
    )
}


