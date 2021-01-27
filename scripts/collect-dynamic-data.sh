#!/usr/bin/env bash
set +e
yarn start
./scripts/collect-github-comments.sh
# ./scripts/collect-wordpress-comments.sh
