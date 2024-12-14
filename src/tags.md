---
layout: 'layouts/bsa-list.html'
pagination:
  data: collections
  size: 1
  reverse: true
  alias: tag
eleventyComputed:
    title: "#{{ tag }}"
permalink: '/tag/{{ tag | slug }}/'
---
