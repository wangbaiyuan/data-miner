const {GraphQLClient} = require('graphql-request');

const name = 'blog';
const owner = 'wangbaiyuan';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
})
const queryAllGHIssueComments = `
query queryAllGHIssueComments($name: String!,$owner: String!){
  repository(name: $name, owner: $owner) {
    issues(labels: "Gitalk", last: 100, states: OPEN) {
      nodes {
        labels(last: 5) {
          nodes {
            name
          }
        }
        comments(last: 10) {
          nodes {
            bodyHTML
            author {
              login
              ... on User {
                email
                name
                avatarUrl(size: 50)
              }
            }
            updatedAt
            createdAt
          }
          totalCount
        }
      }
    }
  }
}
`

const getAllGHIssueComments = async () => {
    const comments = await client.request(queryAllGHIssueComments, {name, owner})
        .then(data => (
            data.repository.issues.nodes
                .filter(issue => issue.comments.totalCount > 0)
                .map(issue => {
                    const comment_post_hashID = issue.labels.nodes.filter(label => label.name !== 'Gitalk')[0].name;
                    return issue.comments.nodes.map(comment => ({
                            comment_content: comment.bodyHTML,
                            comment_date_gmt: comment.updatedAt,
                            comment_author: comment.author.name,
                            comment_post_hashID,
                        }
                    ))
                })
        ));
    return comments.flat();
}

getAllGHIssueComments()
    .then(comments => console.log(JSON.stringify(comments)))
    .catch(error => {
        console.error(error);
        process.exit(1)
    });
