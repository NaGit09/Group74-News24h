export function SkeletonNewsCardFeatured() {
    return (
        <div className="animate-pulse">
            <div className="relative aspect-video bg-muted mb-2"/>
            <div className="space-y-2">
                <div className="h-6 bg-muted rounded w-3/4"/>
                <div className="h-4 bg-muted rounded w-full"/>
                <div className="h-3 bg-muted rounded w-24"/>
            </div>
        </div>
    )
}

export function SkeletonNewsCardSmall() {
    return (
        <div className="flex gap-3 py-3 border-b border-border/50 animate-pulse">
            <div className="h-20 w-28 shrink-0 bg-muted"/>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-full"/>
                <div className="h-3 bg-muted rounded w-3/4"/>
                <div className="h-3 bg-muted rounded w-20"/>
            </div>
        </div>
    )
}


