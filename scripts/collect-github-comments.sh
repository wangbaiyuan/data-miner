#!/usr/bin/env bash
set -e
echo "Collecting comments from github issue..."
node ./src/services/githubService.js > "_data/github-comments.json"
