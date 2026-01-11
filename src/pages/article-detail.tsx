import {useParams} from "react-router";
import {Breadcrumbs} from "@/components/layout/breadcrumbs.tsx";

import {ArticleMeta} from "@/components/article/article-meta.tsx";
import {ArticleContent} from "@/components/article/article-content.tsx";
import {ArticleDisclaimer} from "@/components/article/article-disclaimer.tsx";
import {ArticleTags} from "@/components/article/article-tags.tsx";
import {ArticleComments} from "@/components/article/article-comments.tsx";
import {AuthorProfileCard} from "@/components/article/author-profile-card.tsx";
import {PrintHeader} from "@/components/article/print-header.tsx";

import {RelatedNewsSidebar} from "@/components/sections/related-news-sidebar.tsx";
import {RelatedNewsGrid} from "@/components/sections/related-news-grid.tsx";
import {CategorySuggestions} from "@/components/sections/category-suggestions.tsx";

import {NewsletterSubscription} from "@/components/widgets/newsletter-subscription.tsx";
import {TableOfContents} from "@/components/article/table-of-contents.tsx";
import {
    ReadingHistory,
    useTrackReading,
} from "@/components/widgets/reading-history.tsx";

<<<<<<< HEAD
import { useRSSFeeds } from "@/hooks/use-rss";
import { useArticle } from "@/hooks/use-article";
import { useViewCounter } from "@/hooks/use-view-counter";
import { useEffect, useState } from "react";
import type { Article } from "@/types/news";
import { authorInfo } from "@/constant/author";
import LoadingSpinner from "@/components/common/LoadingSpinner";
=======
import {useRSSFeeds} from "@/hooks/use-rss";
import {useArticle} from "@/hooks/use-article";
import {useViewCounter} from "@/hooks/use-view-counter";
import {useEffect, useState} from "react";
import type {Article} from "@/types/news";
import {authorInfo} from "@/constant/author";
import Loading from "@/components/common/Loading";
>>>>>>> a85375b (remove junk feature)
import NotFound from "./not-found";
import {cleanArticleContent} from "@/lib/clean";

export default function ArticlePage() {
    const {articles, loading: rssLoading} = useRSSFeeds();
    const {slug} = useParams<{ slug: string }>();
    const [rssArticle, setRssArticle] = useState<Article | null>(null);
    const [minimumLoading, setMinimumLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinimumLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

<<<<<<< HEAD
  useEffect(() => {
    if (articles.length > 0 && slug) {
      const cleanSlug = slug.replace(/\.(html|chn)$/, "");

      const foundArticle = articles.find((a) => {
        const cleanGuid = a.guid.replace(/\.(html|chn)$/, "");
        return cleanGuid === cleanSlug;
      });

      if (foundArticle) {
        setRssArticle(foundArticle);
      }
=======
    useEffect(() => {
        if (articles.length > 0 && slug) {
            const foundArticle = articles.find((a) => a.guid === slug);
            if (foundArticle) {
                setRssArticle(foundArticle);
            }
        }
    }, [articles, slug]);

    const {
        article: fullArticle,
        loading: articleLoading,
        error: articleError,
    } = useArticle(rssArticle?.link);

    useTrackReading({
        slug: slug || "",
        title: rssArticle?.title || "",
        category: rssArticle?.category || "",
    });

    const localViewCount = useViewCounter(slug || "");

    const loading = rssLoading || articleLoading || minimumLoading;

    if (loading) {
        return <Loading/>;
>>>>>>> a85375b (remove junk feature)
    }

    if (articleError || !rssArticle || !fullArticle) {
        return <NotFound/>;
    }

    const breadcrumbs = [
        {label: "Trang chủ", href: "/"},
        {
            label: rssArticle.category || "Tin tức",
            href: `/danh-muc/${rssArticle.category
                ?.toLowerCase()
                .replace(/\s+/g, "-")}`,
        },
    ];

    const {articleTitle, articleSapo, articleContent, plainTextContent} =
        cleanArticleContent(rssArticle, fullArticle);

    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 py-6">
                <div className="grid gap-8 lg:grid-cols-12 xl:grid-cols-10">
                    <div className="lg:col-span-9 xl:col-span-7">
                        <Breadcrumbs items={breadcrumbs}/>

<<<<<<< HEAD
  if (loading) {
    return <LoadingSpinner />;
  }
=======
                        <PrintHeader
                            title={articleTitle}
                            author={authorInfo.name}
                            publishedAt={new Date(rssArticle.pubDate).toLocaleString("vi-VN")}
                            url={window.location.href}
                        />
>>>>>>> a85375b (remove junk feature)

                        <article className="mt-4">
                            <h1 className="text-pretty text-3xl font-extrabold leading-tight text-foreground lg:text-4xl">
                                {articleTitle}
                            </h1>

                            <ArticleMeta
                                author={authorInfo.name}
                                publishedAt={new Date(rssArticle.pubDate).toLocaleString(
                                    "vi-VN",
                                    {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}
                                articleContent={plainTextContent}
                                viewCount={localViewCount}
                            />

                            <div className="my-6 border-l-4 border-primary bg-muted/30 py-4 pl-6 pr-4">
                                <p className="text-pretty text-base font-semibold leading-relaxed text-foreground/90 lg:text-lg">
                                    {articleSapo}
                                </p>
                            </div>
                            <ArticleContent content={articleContent}/>

                            <div className="my-6 p-4 bg-muted/30 rounded">
                                <p className="text-sm text-muted-foreground">
                                    Nguồn:{" "}
                                    <a
                                        href={rssArticle.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline font-medium"
                                    >
                                        24h.com.vn
                                    </a>
                                </p>
                            </div>

                            <AuthorProfileCard {...authorInfo} />

                            <NewsletterSubscription/>

                            <ArticleDisclaimer/>

<<<<<<< HEAD
              <div className="my-8 rounded-lg border-l-4 border-primary bg-primary/5 p-6 shadow-inner">
                <p className="font-sans text-lg font-medium leading-relaxed text-foreground/90 lg:text-xl">
                  {articleSapo}
                </p>
              </div>
=======
                            <ArticleTags tags={[rssArticle.category || "Tin tức"]}/>
>>>>>>> a85375b (remove junk feature)

                            <ArticleComments/>
                        </article>
                    </div>

                    <aside className="lg:col-span-3 xl:col-span-3">
                        <div className="sticky top-24 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
                            <TableOfContents content={articleContent}/>

<<<<<<< HEAD
              <div className="mt-8 flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 p-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Nguồn:{" "}
                  <a
                    href={rssArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary transition-colors hover:text-primary/80 hover:underline"
                  >
                    24h.com.vn
                  </a>
                </p>
              </div>

              <div className="mt-10 border-t pt-8">
                <AuthorProfileCard {...authorInfo} />
              </div>

              <div className="mt-8">
                <NewsletterSubscription />
              </div>

              <ArticleDisclaimer />

              <div className="mt-8">
                <ArticleTags tags={[rssArticle.category || "Tin tức"]} />
              </div>

              <div className="mt-10">
                <ArticleComments />
              </div>
            </article>

            <RelatedNewsGrid category={rssArticle.category || "Tin tức"} />
          </main>

          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-border/50 bg-card shadow-sm">
                <div className="p-4 font-semibold border-b">Mục lục</div>
                <div className="max-h-[60vh] overflow-y-auto p-2">
                  <TableOfContents content={articleContent} />
                </div>
              </div>

              <RelatedNewsSidebar category={rssArticle.category || "Tin tức"} />

              <ReadingHistory />
=======
                            <RelatedNewsSidebar category={rssArticle.category || "Tin tức"}/>

                            <ReadingHistory/>
                        </div>
                    </aside>
                </div>

                <RelatedNewsGrid category={rssArticle.category || "Tin tức"}/>

                <CategorySuggestions/>
>>>>>>> a85375b (remove junk feature)
            </div>
        </div>
<<<<<<< HEAD

        <div className="mt-12">
          <CategorySuggestions />
        </div>
      </div>
    </div>
  );
=======
    );
>>>>>>> a85375b (remove junk feature)
}
