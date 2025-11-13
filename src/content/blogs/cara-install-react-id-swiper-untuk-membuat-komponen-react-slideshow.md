---
title: "Cara Install React ID Swiper untuk Membuat Komponen React Slideshow"
slug: cara-install-react-id-swiper-untuk-membuat-komponen-react-slideshow
description: "Sebelumnya, saya menggunakan library React Slick untuk membuat komponen slideshow pada beberapa proyek sebelumnya. Namun, saya merasa sedikit ada masalah ketika"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2020-11-02
image: "https://images.unsplash.com/photo-1450609283058-0ec52fa7eac4?ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;fm&#x3D;jpg&amp;crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;w&#x3D;2000&amp;fit&#x3D;max&amp;ixid&#x3D;eyJhcHBfaWQiOjExNzczfQ"
canonical: "http://blog.faldi.xyz/cara-install-react-id-swiper-untuk-membuat-komponen-slideshow/"
---

### #Pranala

Sebelumnya, saya menggunakan library React Slick untuk membuat komponen slideshow pada beberapa proyek sebelumnya. Namun, saya merasa sedikit ada masalah ketika mencoba mencoba untuk memanipulasi beberapa element HTML dan merubah styling pada pustaka tersebut sehingga mencoba alternatif lain. Akhirnya, saya menemukan yang namanya React ID Swiper.

Hal ini bisa terjadi saat saya mencari mana saja pustaka slideshow yang bisa bekerja bareng TailwindCSS dan menemukan Tweet dari Adam Wathan.

> What's the best carousel package out there these days? Bonus points if you've used it with [@tailwindcss](https://twitter.com/tailwindcss?ref_src=twsrc%5Etfw&ref=blog.faldi.xyz) and it was easy 👍🏻 [https://t.co/dHOkuNhuaT](https://t.co/dHOkuNhuaT?ref=blog.faldi.xyz)
> 
> — Adam Wathan (@adamwathan) [April 4, 2019](https://twitter.com/adamwathan/status/1113799119447814145?ref_src=twsrc%5Etfw&ref=blog.faldi.xyz)

### #Cara Install

Menggunakan NPM

`npm install [[email protected]](/cdn-cgi/l/email-protection) [[email protected]](/cdn-cgi/l/email-protection)`

Menggunakan Yarn

`yarn add [[email protected]](/cdn-cgi/l/email-protection) [[email protected]](/cdn-cgi/l/email-protection)`

Mengapa menggunakan versi tersebut? Karena, saat tulisan ini dibuat ( 1 November 2020) React ID Swiper belum memperbaiki / memperbarui sumber css pada Swiper 6.1 . Karena pada versi Swiper JS tersebut, pustaka tersebut merubah lokasi file cssnya. Bisa dilihat pada tulisan saya berikut :

[

Mengatasi Error Module not found: Can’t resolve ‘swiper/swiper.css’ di React ID Swiper

React ID Swiper adalah salah satu library yang saya gunakan untuk membuatslideshow. Library ini saat saya membacanya sangat mudah dokumentasinya. Tautanlibrary ini bisa teman-teman lihat pada situs berikut : React ID Swiper : https://react-id-swiper.ashernguyen.site Saat saya melakukan install…

![Image](https://blog.cerita-faldi.xyz/favicon.ico)Cerita FaldiFaldi

![Image](https://images.unsplash.com/photo-1541742410245-c2653591f8d3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ)

](https://blog.faldi.xyz/mengatasi-error-css-react-id-swiper/)

### #Import CSS Swiper

Import CSS Swiper bisa pada Index.js atau komponen Slideshow. Saya lebih menyarankan pada komponen Slideshow. Karena css ini hanya digunakan saat komponen tersebut diload.

`import 'swiper/css/swiper.css';`

### #Kode Awal

Secara basis awal, bisa menggunakan kode seperti ini :

```javascript
import React from 'react';
  import Swiper from 'react-id-swiper';
  import 'swiper/css/swiper.css';

  const Navigation = () => {
    const params = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }

    return (
      <Swiper {...params}>
        <div>Slide #1</div>
        <div>Slide #2</div>
        <div>Slide #3</div>
        <div>Slide #4</div>
        <div>Slide #5</div>
      </Swiper>
    )
  };

  export default Navigation;
```

Hasilnya nanti kurang lebih seperti ini :

![Image](https://blog.faldi.xyz/content/images/2020/11/Screen-Shot-2020-11-02-at-11.58.50.png)

Navigation

### #Dokumentasi dan Dukungan Komunitas

Sejujurnya, dokumentasi React ID Swiper sudah cukup bagus. Maksudnya, sangat mudah  untuk melakukan kustomisasi dan perubahan sesuai dengan yang kita inginkan. Masalahnya adalah dukungan komunitas yang terbatas (saat melihat chat spectrum) atau melihat repository github React ID Swiper, ada banyak issues dan pull request yang belum ditanggapi.

Terkahir, juli 2020 pemilik melakukan commit pada branch master. Jadi balik lagi, pilihan mau menggunakan React ID Swiper atau yang lain. Malah, tetap menggunakan React Slick juga tidak ada masalah.

Semoga Membantu!

Bagikan[](https://twitter.com/share?text=Cara Install React ID Swiper untuk Membuat Komponen React Slideshow&url=http://blog.faldi.xyz/cara-install-react-id-swiper-untuk-membuat-komponen-slideshow/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/cara-install-react-id-swiper-untuk-membuat-komponen-slideshow/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/cara-install-react-id-swiper-untuk-membuat-komponen-slideshow//&title=Cara Install React ID Swiper untuk Membuat Komponen React Slideshow "LinkedIn")[](/cdn-cgi/l/email-protection#06397573646c6365723b45677467264f687572676a6a265463676572264f422655716f76637426736872736d264b636b64736772264d696b766968636826546367657226556a6f6263756e697120676b763d6469627f3b6e7272763c2929646a69612860676a626f287e7f7c29656774672b6f687572676a6a2b74636765722b6f622b75716f7663742b736872736d2b6b636b647367722b6d696b76696863682b756a6f6263756e697129 "Email")

Topik [ReactJS](/tag/reactjs/) [Tutorial](/tag/tutorial/)

[

## Cara Setup Tailwind CSS + React Create App (CRA)

Pada kesempatan kali ini, saya mencoba untuk membuat tutorial bagaimana setup / melakukan…

08 Nov 2020



](/cara-setup-tailwind-css-react-create-app-cra/)[

## Mengatasi Error Module not found: Can't resolve 'swiper/swiper.css' di React ID Swiper

React ID Swiper adalah salah satu library yang saya gunakan untuk membuat…

01 Nov 2020



](/mengatasi-error-css-react-id-swiper/)