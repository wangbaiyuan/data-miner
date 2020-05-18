import moment from 'moment';

import {getFeeds} from './clients/rssClient';
import {save} from './utils/file';
import {mergeRootInfoToPost, Post, toPost} from './mapper/Rss2WpPost';

const urls = [
  'https://martinfowler.com/feed.atom',
  'https://rss.huxiu.com',
  'https://36kr.com/feed',
];


const getContent = (url: string) => getFeeds(url).then(content => {
  const items = content.items!;
  return items.slice(0, Math.min(items.length, 5))
    .map(toPost)
    .map((post) => mergeRootInfoToPost(post, content));
}).catch(error => {
  console.error(`Get content from ${url} error: `, error.message);
  return Promise.resolve(undefined)
});

(async () => {
  Promise.all(urls.map(getContent)).then(
    postLists => postLists
      .filter((postList) => !!postList)
      .reduce((prev, current) => {
        return prev!.concat(current!)
      }, [])!
      .sort((p1: Post, p2: Post) => (moment(p2.date).toDate().getTime() - moment(p1.date).toDate().getTime()))
  ).then(posts => {
    console.info('Posts count:', posts.length)
    save(JSON.stringify(posts), `news.json`);
  })
})();
