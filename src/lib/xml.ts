import type { Article } from '@/types/news';
import type { RawArticle, RawChannel } from '@/types/raw';
import { XMLParser } from 'fast-xml-parser';

// parse xml to json
const xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    processEntities: true,
    trimValues: true,
});

// extract slug from url
export function extractSlug(url: string): string {
    const match = url.match(/\/([^/]+)\.(html|chn)$/);
    return match?.[1] || url.split("/").filter(Boolean).pop() || "";
}

// parse xml to json
export const parseXml = (xmlText: string) => {

    const result = xmlParser.parse(xmlText);

    const channel = result.rss?.channel as RawChannel | undefined;

    if (!channel) return null;

    const rawItems = channel.item;
    
    const items: RawArticle[] = Array.isArray(rawItems)
        ? rawItems
        : rawItems ? [rawItems] : [];

    const articles: Article[] = items
        .filter((i): i is RawArticle & { title: string } => typeof i?.title === 'string')
        .map((item) => {
            const rawDesc = typeof item.description === 'object'
                ? item.description['#text']
                : (item.description || '');

            const imgMatch = rawDesc.match(/<img[^>]+src=['"]?([^'"\s>]+)/i);

            return {
                title: item.title,
                link: item.link || '',
                description: rawDesc.replace(/<[^>]*>/g, '').trim(),
                pubDate: item.pubDate || new Date().toISOString(),
                category: channel.title,
                image: imgMatch ? imgMatch[1] : '/placeholder.svg',
                guid: extractSlug(item.link || ''),
            };
        });
    return {channel,articles};
}
