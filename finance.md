---
layout: page
title: 財經
permalink: /categories/財經/
---

{% for post in site.posts %}
  {% if post.categories contains '財經' %}
    <h2><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>
    <p>{{ post.date | date: "%Y-%m-%d" }}</p>
  {% endif %}
{% endfor %}
