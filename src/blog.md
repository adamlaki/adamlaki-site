---
title: 'Blog'
layout: 'layouts/posts.html'
pagination:
  data: collections.blog
  size: 1
  reverse: true
  alias: posts
permalink: 'blog{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
---
