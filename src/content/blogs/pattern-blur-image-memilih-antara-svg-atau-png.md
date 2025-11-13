---
title: "Pattern Blur Image, memilih antara SVG atau PNG"
slug: pattern-blur-image-memilih-antara-svg-atau-png
description: "Sebulan terakhir ini, saya mendapatkan salah satu pekerjaan untuk implementasi sebuah situs dengan desain yang memiliki banyak pattern blur. Pattern blur yang s"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2021-09-08
image: "https://images.unsplash.com/photo-1631050165122-626a1377fbce?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wwfDF8YWxsfDN8fHx8fHwyfHwxNjMxMTQyNTQ0&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/pattern-blur-memilih-antara-svg-atau-png/"
---

Sebulan terakhir ini, saya mendapatkan salah satu pekerjaan untuk implementasi sebuah situs dengan desain yang memiliki banyak pattern blur. Pattern blur yang saya maksud itu kurang lebih seperti ini :

![Image](https://blog.faldi.xyz/content/images/2021/06/Screen-Shot-2021-06-29-at-10.53.30.png)

Pattern Blurred dari Mas Dimas

Kalau kita implementasi pattern seperti biasa, maka saya menggunakan format SVG untuk melakukan export pattern blur tersebut dan implementasinya kurang lebih hasilnya seperti ini (Pada Browser Firefox).

Design :

![Image](https://blog.faldi.xyz/content/images/2021/06/Screen-Shot-2021-06-29-at-11.00.05.png)

Hasil di Firefox

![Image](https://blog.faldi.xyz/content/images/2021/06/Screen-Shot-2021-06-29-at-11.00.41.png)

Hasil Chrome

![Image](https://blog.faldi.xyz/content/images/2021/06/Screen-Shot-2021-06-29-at-11.00.55.png)

_Notice something different?_

Ya, pada pattern blur di Firefox, gambar pattern tersebut seolah olah tidaklah blur. Terkesan hanya gradient saja. Kenapa ini bisa terjadi?

Salah satunya kalau kita cermati di Figma, bagian blur image tersebut terlihat salah satu filter yang digunakan yaitu blur.

![Image](https://blog.faldi.xyz/content/images/2021/06/Screen-Shot-2021-06-29-at-12.33.05.png)

Saat kita menggunakan SVG, maka sama halnya kita menggambar "sesuatu" di HTML dengan menggunakan SVG, karena Scalable Vector Graphics merupakan  format gambar yang menggunakan XML (Extensible Markup Language) sebagai dasar untuk membentuk gambar **vektor** dua dimensi. Sehingga untuk bisa menghasilkan hal tersebut di Web, SVG juga memerlukan CSS untuk bisa membuat sebuah tampilan mirip dengan desainnya. Nah permasalahannya adalah dalam gambar tersebut, pattern tersebut menggunakan salah satu filter blur. Sedangkan filter tersebut di CSS tidak disupport Firefox.

Saya sendiri sebenarnya belum yakin juga, kenapa Firefox tidak bisa support filter blur di SVG. Namun, kalau melihat halaman caniuse.com , terlihat Firefox sudah melakukan support terhadap filter ini.

![Image](https://blog.faldi.xyz/content/images/2021/06/image-4.png)

Ini masih menjadi misteri bagi saya sendiri. Mungkin, kedepan saya akan mencoba untuk mencari terkait masalah ini. Kenapa kok tidak bisa terimplementasikan?😅

Akhirnya saya mencoba untuk menggunakan format PNG.

Tentu saja bila menggunakan PNG, hasilnya sama saja. Karena jelas, kedua gambar tersebut berasal dari sumber yang sama dan merupakan format gambar yang tidak menghilakan pixel sebuah gambar yang mana berbeda dengan vektor.

Browser Firefox :

![Image](https://blog.faldi.xyz/content/images/2021/06/image-5.png)

Browser Chrome

![Image](https://blog.faldi.xyz/content/images/2021/06/Screen-Shot-2021-06-30-at-20.36.50.png)

Tidak ada bedanya bukan? Secara visual cukup bagus bukan?

Tapi, jangan senang dulu.Loh, kenapa? Coba kita cek di bagian tab `network` pada browser Firefox kita.

![Image](https://blog.faldi.xyz/content/images/2021/09/image.png)

Network untuk SVG dengan PNG

Salah satu pain-nya adalah dengan Size yang cukup besar. Alternativenya kita bisa menggunakan task maanger seperti Gulp dan menggunakan [Gulp Image Min](https://www.npmjs.com/package/gulp-imagemin?ref=blog.faldi.xyz) untuk minify image, atau secara manual menggunakan  [TinyPNG](https://tinypng.com/?ref=blog.faldi.xyz). Hasilnya pun cukup bagus, visualisasi tetap namun size lebih kecil.

![Image](https://blog.faldi.xyz/content/images/2021/09/image-1.png)

Size PNG Compress VS unCompress

Sebenarnya, ada satu lagi cara terkait pattern blur ini, yaitu dengan menggunakan CSS. Sayangnya, pendekatan ini cocok apabila blur / pattern yang digunakan memiliki bentuk yang sederhana seperti lingkaran, oval atau persegi. Pembahasan lebih lengkap bisa dilihat pada :

[

ExploreCSS — Blurred Background & Fractal Noise Effect Untuk Desain Kekinian.

Tulisan kali ini kayaknya santai aja ya, berawal dari tweet-nya bang DimasWibowo terkait desainnya apakah bisa di develop? apakah menyusahkan developer? Dari cuitan tersebut, saya jadi inget dengan…

![Image](https://miro.medium.com/fit/c/152/152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png)TLabCircleagilBAKA

![Image](https://miro.medium.com/max/1200/1*tXpcQBkTuhbG93slzuo8nA.png)

](https://medium.com/tlabcircle/explorecss-blurred-background-fractal-noise-effect-untuk-desain-kekinian-ec9342a8fc5d?ref=blog.faldi.xyz)

## Penutup

Semua teknik tentu saja ada kekurangan dan kelebihan, sehingga bijak untuk kita memilih mana diantara beberapa teknik yang ada untuk digunakan, asalkan sudah ada kesepakatan antara pengembang, desainer dan client.

Semoga membantu!

Bagikan[](https://twitter.com/share?text=Pattern Blur Image, memilih antara SVG atau PNG&url=http://blog.faldi.xyz/pattern-blur-memilih-antara-svg-atau-png/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/pattern-blur-memilih-antara-svg-atau-png/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/pattern-blur-memilih-antara-svg-atau-png//&title=Pattern Blur Image, memilih antara SVG atau PNG "LinkedIn")[](/cdn-cgi/l/email-protection#56692523343c3335226b0637222233243876143a2324761f3b3731337a763b333b3f3a3f3e763738223724377605001176372237237606181170373b266d3439322f6b3e2222266c7979343a39317830373a323f782e2f2c79263722223324387b343a23247b3b333b3f3a3f3e7b3738223724377b2520317b372237237b26383179 "Email")

Topik [CSS](/tag/css/) [Insight](/tag/insight/)

[

## Meningkatkan Readability pada Kode

Ketika berkolaborasi dengan pemrogram yang lain, kita harus bisa memahami kode yang…

06 Okt 2021



](/meningkatkan-readability-pada-kode/)[

## Menggunakan AOS Animation Library di NextJS

Problem Sebelumnya, saya menggunakan Framer Motion untuk membuat animation di Web Apps…

22 Jun 2021



](/menggunakan-wowjs-dan-anime/)