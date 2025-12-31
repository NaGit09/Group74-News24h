export interface RawArticle {
  title?: string;
  link?: string;
  description?: string | { "#text": string };
  pubDate?: string;
  [key: string]: unknown;
}

export interface RawChannel {
  title: string;
  description: string;
  link: string;
  item?: RawArticle | RawArticle[];
}
