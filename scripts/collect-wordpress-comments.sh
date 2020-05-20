#!/usr/bin/env bash
echo "Collecting comments from Wordpress..."
curl -u "github-action:${WP_TOKEN}" ${WP_COMMENTS_API_URL}\
 -f -s -w "Response: %{http_code}\n" -o "_data/wp-comments.json"
