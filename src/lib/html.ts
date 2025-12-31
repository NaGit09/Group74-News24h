import * as cheerio from "cheerio";

export const parseHtml = (html: string) => {
  const $ = cheerio.load(html);

    const title = $("#article_title").text().trim();
    
    const sapo = $("#article_sapo").text().trim();
    
    const articleContainer = $(".cate-24h-foot-arti-deta-info");
    
    articleContainer.find("script, style, iframe, .bv-lq, .view-more").remove();

    articleContainer.find("img").each(function () {
    const $img = $(this);
    let src = $img.attr("data-original") || $img.attr("src");

    if (src && src.includes("in-image-close.svg")) {
      $img.remove();
      return;
    }

    if (src?.startsWith("/")) src = `https://cdn.24h.com.vn${src}`;
    $img
      .attr("src", src || "")
      .attr("class", "img-fluid rounded my-3 d-block mx-auto");
  });
  return {
    title,
    sapo,
    content: articleContainer.html() || "",
  };
};

export function cleanHtmlContent(html: string): string {
    const $ = cheerio.load(html, null, false);

    $("*").each(function () {
        const $el = $(this);
        const keep = ["src", "alt", "class", "href"];
        const currentAttrs = $el.attr();
        if (currentAttrs) {
            Object.keys(currentAttrs).forEach((attrName) => {
                if (!keep.includes(attrName)) $el.removeAttr(attrName);
            });
        }
    });

    return $.html()
        .replace(/<(div|span|section|article)[^>]*>/gi, "")
        .replace(/<\/(div|span|section|article)>/gi, "")
        .trim();
}