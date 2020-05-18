import Parser from 'rss-parser';

let parser = new Parser();
export const getFeeds =  (rssUrl: string) => {
  return parser.parseURL(rssUrl)
};
