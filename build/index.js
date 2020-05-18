"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rssClient_1 = require("./clients/rssClient");
const file_1 = require("./utils/file");
const Rss2WpPost_1 = require("./mapper/Rss2WpPost");
const urls = [
    'https://martinfowler.com/feed.atom',
    'https://rss.huxiu.com',
    'https://36kr.com/feed',
];
const getContent = (url) => rssClient_1.getFeeds(url).then(content => {
    return content.items.splice(0, 10)
        .map(Rss2WpPost_1.toPost)
        .map((post) => Rss2WpPost_1.mergeRootInfoToPost(post, content));
}).catch(error => {
    console.error(`Get content from ${url} error: `, error.message);
    return Promise.resolve(undefined);
});
(async () => {
    Promise.all(urls.map(getContent)).then(postLists => postLists
        .filter((postList) => !!postList)
        .reduce((prev, current) => (prev.concat(current)), [])).then(posts => {
        file_1.save(JSON.stringify(posts), `news.json`);
    });
})();
