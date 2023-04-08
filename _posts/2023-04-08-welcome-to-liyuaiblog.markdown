---
layout: post
title:  "如何部署 Jekyll 部落格"
date:   2023-04-08 13:03:00 +0800
categories: AI應用
---

本文將指導您如何使用 Jekyll 部署一個靜態部落格網站。

#步驟1 : 安裝jekyll
首先，您需要在您的電腦上安裝 Jekyll。請遵循 [Jekyll 官方文檔](https://jekyllrb.com/docs/installation/) 中的說明進行操作。

#步驟2 : 創建jekyll部落格
在終端中運行以下命令，創建一個名為 `my-blog` 的新 Jekyll 部落格：
{% highlight ruby %}
jekyll new my-blog
{% endhighlight %}

#步驟3: 本地運行 Jekyll 部落格
進入新創建的部落格文件夾，然後運行以下命令在本地運行 Jekyll 部落格：
{% highlight ruby %}
cd my-blog
{% endhighlight %}

{% highlight ruby %}
bundle exec jekyll serve
{% endhighlight %}
在瀏覽器中訪問 http://localhost:4000 以查看您的 Jekyll 部落格。

#步驟4 : 將Jekyll 部落格推送到 GitHub
1.在 GitHub 上創建一個新存儲庫。
2.初始化本地的 Git 存儲庫：
{% highlight ruby %}
git init
{% endhighlight %}
3.添加並提交文件：
{% highlight ruby %}
git add .
git commit -m "Initial commit"
{% endhighlight %}
4.將本地存儲庫與 GitHub 存儲庫關聯：
{% highlight ruby %}
git remote add origin https://github.com/yourusername/your-repo-name.git
{% endhighlight %}
請將 yourusername 和 your-repo-name 替換為實際的 GitHub 用戶名和存儲庫名稱。
5.將更改推送到 GitHub 存儲庫：
{% highlight ruby %}
git push origin main
{% endhighlight %}
後續輸入username及password即可

#步驟5 : 使用 GitHub Pages 部署 Jekyll 部落格

1.轉到您的 GitHub 存儲庫的設置頁面。

2.在 "GitHub Pages" 部分中，選擇用於部署 GitHub Pages 的分支（通常為 main 或 master）。

3.等待部署完成，然後訪問您的 GitHub Pages 網站。

恭喜

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
