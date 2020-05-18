import Parser from 'rss-parser';

export interface Post {
  title?: string;
  author?: string;
  link?: string;
  excerpt?: string;
  content?: string;
  date?: string;
  categories?: string[];
  icon?: string;
}

export const toPost = (rssItem: Parser.Item): Post => {
  return ({
    title: rssItem.title,
    author: rssItem.creator,
    link: rssItem.link,
    excerpt: rssItem.contentSnippet,
    content: rssItem.content,
    date: rssItem.pubDate,
    categories: rssItem.categories,
  });
};

export const mergeRootInfoToPost = (post: any, content: Parser.Output): Post => (
  {
    ...post,
    author: content.title,
    icon: content.image && content.image.url
  }
);
