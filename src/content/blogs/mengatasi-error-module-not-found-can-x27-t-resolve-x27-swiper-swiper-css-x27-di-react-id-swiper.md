---
title: "Mengatasi Error Module not found: Can&#x27;t resolve &#x27;swiper/swiper.css&#x27; di React ID Swiper"
slug: mengatasi-error-module-not-found-can-x27-t-resolve-x27-swiper-swiper-css-x27-di-react-id-swiper
description: "React ID Swiper adalah salah satu library yang saya gunakan untuk membuat slideshow. Library ini saat saya membacanya sangat mudah dokumentasinya. Tautan librar"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2020-11-01
image: "https://images.unsplash.com/photo-1541742410245-c2653591f8d3?ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;fm&#x3D;jpg&amp;crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;w&#x3D;2000&amp;fit&#x3D;max&amp;ixid&#x3D;eyJhcHBfaWQiOjExNzczfQ"
canonical: "http://blog.faldi.xyz/mengatasi-error-css-react-id-swiper/"
---


React ID Swiper adalah salah satu library yang saya gunakan untuk membuat slideshow. Library ini saat saya membacanya sangat mudah dokumentasinya. Tautan library ini bisa teman-teman lihat pada situs berikut :

React ID Swiper : [https://react-id-swiper.ashernguyen.site](https://react-id-swiper.ashernguyen.site/?ref=blog.faldi.xyz)

Saat saya melakukan install, tidak ada masalah sama sekali. Namun, saat melakukan import css. Muncullah sebuah masalah yaitu

\``Module not found: Can't resolve 'swiper/swiper.css'`\`

Ternyata, permasalah tersebut terjadi karena React ID Swiper yang menggunakan library Swiper Js versi 6.1.1 memindahkan file cssnya ke

```
import 'swiper/swiper-bundle.min.css';
```

Akhirnya css dari Swiper bisa kita import ke file ReactJS kita. Masalahnya, ternyata hal itu membuat Arrow component tidak berfungsi.

Maka, ada beberapa cara untuk menyelesaikan masalah ini.

### Downgrade Swiper ke versi 5.4

Kenapa perlu downgrade? Karena versi 5.4, versi aman yang bisa dipakai dan CSS Swiper masih berada pada direktori yang sama / tidak berubah. \`import from 'swiper/css/swiper.css' .

Bahkan di bagian example dari React ID Swiper, masih menggunakan versi 5.4, makanya saya beranggapan bahwa hal itu tidak masalah ketika kita downgrade Swiper ke versi 5.4.

Tautan Codesanbox : [https://codesandbox.io/s/auto-play-example-44urp](https://codesandbox.io/s/auto-play-example-44urp?ref=blog.faldi.xyz)

![Image](https://blog.faldi.xyz/content/images/2020/11/Screen-Shot-2020-11-01-at-16.36.44.png)

Contoh React ID Swiper masih menggunakan versi Swiper 5.4

Simple ya? Iya begitu. Tapi ketika awal mula saya menemukannya, tidak ada yang membahasnya. Hanya di github saja pembahasan ini ada.  Nanti sudah bisa untuk Slideshownya. Semoga membantu!

Diskusi di React ID Swiper Github : [https://github.com/kidjp85/react-id-swiper/issues/464](https://github.com/kidjp85/react-id-swiper/issues/464?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Mengatasi Error Module not found: Can't resolve 'swiper/swiper.css' di React ID Swiper&url=http://blog.faldi.xyz/mengatasi-error-css-react-id-swiper/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/mengatasi-error-css-react-id-swiper/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/mengatasi-error-css-react-id-swiper//&title=Mengatasi Error Module not found: Can't resolve 'swiper/swiper.css' di React ID Swiper "LinkedIn")[](/cdn-cgi/l/email-protection#516e2224333b3432256c1c343f363025302238711423233e23711c3e35243d34713f3e2571373e243f356b7112303f77722963666a25712334223e3d27347177722963666a2226382134237e2226382134237f32222277722963666a7135387103343032257118157102263821342377303c216a333e35286c392525216b7e7e333d3e367f37303d35387f29282b7e3c343f3630253022387c3423233e237c3222227c23343032257c38357c2226382134237e "Email")

Topik [Tutorial](/tag/tutorial/) [ReactJS](/tag/reactjs/)

[

## Cara Install React ID Swiper untuk Membuat Komponen React Slideshow

Namun, saya merasa sedikit ada masalah ketika mencoba mencoba untuk memanipulasi beberapa element HTML dan merubah styling pada pustaka tersebut sehingga mencoba alternatif lain. Akhirnya, saya menemukan yang namanya React ID Swiper.…

02 Nov 2020



](/cara-install-react-id-swiper-untuk-membuat-komponen-slideshow/)[

## Pelajaran yang Saya Dapatkan Saat Memberikan Mentorship Frontend

Mentorship Frontend Developer…

16 Okt 2020



](/pelajaran-yang-saya-dapatkan-saat-melakukan-mentorship/)