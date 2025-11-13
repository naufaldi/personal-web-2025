---
title: "Seputar Custom Scrollbar CSS pada Firefox dan Chrome"
slug: seputar-custom-scrollbar-css-pada-firefox-dan-chrome
description: "Desainer merekomendasikan untuk melakukan custom scrollbar pada salah satu desain di page. Custom scrollbar merubah tidak hanya warna scroll pada browser melain"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2020-11-23
image: "https://images.unsplash.com/photo-1602525653218-cac7c9e38807?ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;fm&#x3D;jpg&amp;crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;w&#x3D;2000&amp;fit&#x3D;max&amp;ixid&#x3D;eyJhcHBfaWQiOjExNzczfQ"
canonical: "http://blog.faldi.xyz/seputar-custom-scrollbar/"
---

## Problem

Desainer merekomendasikan untuk melakukan custom scrollbar pada salah satu desain di page. Custom scrollbar merubah tidak hanya warna scroll pada browser melainkan juga meliputi ukuran scrollbar.

## Pranala

Saat saya mencoba untuk mencari tahu pseudo class dari scrollbar, sangat disayangkan ternyata custom scrollbar tidak disupport pada Firefox dan Edge. Termasuk pada Firefox terbaru yang saat ini saya gunakan yaitu versi 84. Bahkan saat saya menuju halaman MDN Firefox, disebutkan bahwa pseudo class ini bukan versi standard

![Image](https://blog.faldi.xyz/content/images/2020/11/Screen-Shot-2020-11-23-at-10.14.32.png)

Versi Non Standard

[

::-webkit-scrollbar

The ::-webkit-scrollbar CSS pseudo-element affects the style of the scrollbar of an element.

![Image](https://developer.mozilla.org/static/img/favicon144.e7e21ca263ca.png)MDN Web Docs

![Image](https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png)

](https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar?ref=blog.faldi.xyz)

Lantas bagaimana dengan `prefix` firefox? Bukankah ada? Sayangnya saat mencoba untuk mencarinya, saya tidak menemukan banyak artikel yang membantu. Bahkan di [stackoverflow](https://stackoverflow.com/questions/6165472/custom-css-scrollbar-for-firefox?ref=blog.faldi.xyz) disebutkan, tidak ada alternative(?) untuk prefix firefox.

Bagaimana dengan Chrome? Tentu saja Chrome support pseudoclass untuk melakukan custom pada scrollbar.

![Image](https://blog.faldi.xyz/content/images/2020/11/Screen-Shot-2020-11-23-at-10.19.13.png)

Scrollbar Custom pada Chrome

![Image](https://blog.faldi.xyz/content/images/2020/11/Screen-Shot-2020-11-23-at-10.19.56.png)

Scrollbar Custom pada Firefox

Jadi ya baiknya nanti ketika user menggunakan Firefox katakanlah untuk menggantinya dan menggunakan Chrome untuk performance maksimal.

## Solusi

Salah satu solusi yang bisa saya sarankan adalah dengan menggunakan vanilla Javascript untuk mengganti Scroll yang ada dengan menggunakan pustaka [SimpleBar](http://grsmto.github.io/simplebar/?ref=blog.faldi.xyz)

![Image](https://blog.faldi.xyz/content/images/2020/11/Screen-Shot-2020-11-23-at-10.22.34.png)

Custom Scroll berfungsi dengan baik di Firefox

[

Home

SimpleBar does only one thing: replace the browser’s default scrollbar with a custom CSS-styled one without losing performances. For React, Vue, Angular or VanillaJS!

![Image](http://grsmto.github.io/simplebar/icons/icon-512x512.png?v=b051ec857fe1d96071e085d070e14967)SimpleBar · Custom scrollbars made simple.

![Image](http://grsmto.github.io/simplebar/static/logo-b9548eb4e7099f8133fd4d039b2dff43.svg)

](http://grsmto.github.io/simplebar/?ref=blog.faldi.xyz)

Bisa pula menggunakan pustaka kalau teman-teman menggunakan ReactJS dengan [React Custom Scroll](https://www.npmjs.com/package/react-custom-scroll?ref=blog.faldi.xyz)

![Image](https://blog.faldi.xyz/content/images/2020/11/Screen-Shot-2020-11-23-at-10.25.32.png)

Custom Scroll berfungsi dengan baik di Firefox

**Sumber Pustaka di Github :**

[

rommguy/react-custom-scroll

Easily customize the browser scroll bar with native OS scroll behavior - rommguy/react-custom-scroll

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubrommguy

![Image](https://avatars3.githubusercontent.com/u/3725593?s=400&v=4)

](https://github.com/rommguy/react-custom-scroll?ref=blog.faldi.xyz#readme)

Solusi lain adalah bilang saja ke desainernya untuk tidak menggunakan custom scrollbar.

* * *

Semoga terjawab ya mengenai custom scrollbar ini :)

Apalagi untuk teman-teman yang mencari cara untuk merubah scrollbar. Walaupun saya tidak begitu tahu, untuk apa kita merubah scrollbar ? Seberapa urgent dalam merubah scrollbar pada situs kita? Mungkin bisa dibicarakan dengan desainer atau tim produknya.

Bagikan[](https://twitter.com/share?text=Seputar Custom Scrollbar CSS pada Firefox dan Chrome&url=http://blog.faldi.xyz/seputar-custom-scrollbar/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/seputar-custom-scrollbar/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/seputar-custom-scrollbar//&title=Seputar Custom Scrollbar CSS pada Firefox dan Chrome "LinkedIn")[](/cdn-cgi/l/email-protection#96a9e5e3f4fcf3f5e2abc5f3e6e3e2f7e4b6d5e3e5e2f9fbb6c5f5e4f9fafaf4f7e4b6d5c5c5b6e6f7f2f7b6d0ffe4f3f0f9eeb6f2f7f8b6d5fee4f9fbf3b0f7fbe6adf4f9f2efabfee2e2e6acb9b9f4faf9f1b8f0f7faf2ffb8eeefecb9e5f3e6e3e2f7e4bbf5e3e5e2f9fbbbe5f5e4f9fafaf4f7e4b9 "Email")

Topik [ReactJS](/tag/reactjs/) [Tutorial](/tag/tutorial/) [Insight](/tag/insight/) [CSS](/tag/css/)

[

## Membandingkan TailwindCSS dengan Framework Lain

Pranala TailwindCSS merupakan sebuah Framework CSS yang dibuat oleh Adam Wathan. Tidak…

24 Nov 2020



](/membandingkan-tailwindcss-dengan-framework-lain/)[

## Cara Import SVG di NextJS

Permasalahan Sebenarnya, untuk import SVG,JPG, Webp dan extension image lain, secara…

15 Nov 2020



](/cara-import-svg-di-nextjs/)