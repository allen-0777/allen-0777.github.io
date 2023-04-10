---
layout: page
title: AI 應用
permalink: /categories/AI應用/
---

{% for post in site.posts %}
  {% if post.categories contains 'AI應用' %}
    <h2><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>
    <p>{{ post.date | date: "%Y-%m-%d" }}</p>
  {% endif %}
{% endfor %}
