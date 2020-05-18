#!/usr/bin/env bash
set -e
./scripts/collect-github-comments.sh
./scripts/collect-wordpress-comments.sh
yarn start
