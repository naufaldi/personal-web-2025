---
title: "Snippet Membuat Gradient Underline"
slug: snippet-membuat-gradient-underline
description: "Beberapa hari kemarin, saya mendapatkan tugas untuk membuat sebuah warna gradient dari project. Project tersebut ternyata memerlukan underline namun warnanya ha"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2021-06-22
image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wxfDF8YWxsfDF8fHx8fHwyfHwxNjI0MzU1MTcy&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/membuat-gradient-underline/"
---


## Masalah

Beberapa hari kemarin, saya mendapatkan tugas untuk membuat sebuah warna gradient dari project. Project tersebut ternyata memerlukan underline namun warnanya haruslah gradient. Bukan _single color._ Sebenarnya, saya sendiri baru pertama kali ini juga mendapatkan pengalaman dalam membuat underline pada text untuk menjadikannya gradient.

Sayangnya, kita tidak bisa secara langsung untuk membuat sebuah gradient pada property css `text-decoloration-color` karena tidak mendukung untuk membuat sebuah gradient warna pada property tersebut. Sehingga kita harus menggunakan jalan lain untuk bisa archievment untuk membuat gradient. Hasil jadinya kurang lebih nanti seperti ini :

### Codepen Underline Gradient

## Solusi

Prinsipnya adalah kita membuat sebuah background dengan menggunakan `pseudo-element` dengan menggunakan `::after` lalu memberikannya `position:absolute` . Agar posisinya lebih tepat, kita memberikan `position:relative` pada element parent atau element yang akan kita berikan underline gradient.

Jangan lupa memberikan property `content` dan `width` untuk lebar `background` sesuai dengan parentnya. Karena kita memberikan `background` berupa `linier-gradient` sebagai lokasi gradient color kita.

Kodenya bisa teman-teman dapatkan di tautan codepen diatas. Semoga membantu!

> [Gradient Underlines](https://css-tricks.com/snippets/css/gradient-underlines/?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Snippet Membuat Gradient Underline&url=http://blog.faldi.xyz/membuat-gradient-underline/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/membuat-gradient-underline/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/membuat-gradient-underline//&title=Snippet Membuat Gradient Underline "LinkedIn")[](/cdn-cgi/l/email-protection#39064a4c5b535c5a4d046a575049495c4d19745c545b4c584d197e4b585d505c574d196c575d5c4b5550575c1f585449025b565d4004514d4d490316165b55565e175f58555d501741404316545c545b4c584d145e4b585d505c574d144c575d5c4b5550575c16 "Email")

Topik [CSS](/tag/css/) [Tutorial](/tag/tutorial/) [Snippet](/tag/snippet/)

[

## Menggunakan AOS Animation Library di NextJS

Problem Sebelumnya, saya menggunakan Framer Motion untuk membuat animation di Web Apps…

22 Jun 2021



](/menggunakan-wowjs-dan-anime/)[

## Add Meta Description on NextJS

Meta description adalah salah satu hal yang cukup vital dalam dunia website,…

18 Jun 2021



](/add-meta-description-on-nextjs/)