---
title: "Membandingkan TailwindCSS dengan Framework Lain"
slug: membandingkan-tailwindcss-dengan-framework-lain
description: "TailwindCSS merupakan sebuah Framework CSS yang dibuat oleh [Adam Wathan](https://twitter.com/adamwathan?ref=blog.faldi.xyz). Tidak main-main, pertumbuhan [Tail"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2020-11-24
image: "https://images.unsplash.com/photo-1537884944318-390069bb8665?ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;fm&#x3D;jpg&amp;crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;w&#x3D;2000&amp;fit&#x3D;max&amp;ixid&#x3D;eyJhcHBfaWQiOjExNzczfQ"
canonical: "http://blog.faldi.xyz/membandingkan-tailwindcss-dengan-framework-lain/"
---

## Pranala

TailwindCSS merupakan sebuah Framework CSS yang dibuat oleh [Adam Wathan](https://twitter.com/adamwathan?ref=blog.faldi.xyz). Tidak main-main, pertumbuhan [TailwindCSS](tailwindcss.com/) cukup spektakuler.

![Image](https://blog.faldi.xyz/content/images/2020/11/image.png)

Pertumbuhan TailwindCSS

Sumber Gambar dari [Twitter](https://twitter.com/GuamHat/status/1316845938506432513/photo/1?ref=blog.faldi.xyz)

Konsep yang diusung oleh TailwindCSS memang cukup spektakuler, yaitu utility first dimana kita tidak perlu meninggalkan html/jsx kita untuk bisa menuliskan css yang kita mau.

Mungkin sedikit mirip kali ya dengan CSS-in-JS atau styled component yang mana tidak perlu keluar dari file jsx/html kita untuk melakukan styling pada komponen kita.

## Lantas Apa yang Membuat TailwindCSS Banyak digunakan ?

Opini saya sendiri yang saat ini sudah berpindah ke TailwindCSS pada beberapa proyek karena

### Solusi atas Masalah Nama Class

Memberikan solusi terhadap pemberian nama komponen. Tidak perlu memusingkan dengan konsep BEM atau penamaan setiap komponen karena kita sudah menuliskan sebuah komponen berdasarkan stylingnya. Misalnya saja biasanya sebuah button memiliki nama seperti ini

```
<button type="button" class="btn btn-primary">Primary</button>
```

menjadi seperti ini

```
<button type="button" class="transition duration-150 ease-in-out transform hover:scale-125 bg-emerald-600 text-white font-semibold py-3 px-6 rounded-md" > Primary </button>
```

### Menulis Ulang CSS

Awal saya melakukan slicing dari desain website kantor, saya mencoba menggunakan Boostrap. Hasilnya? 70% saya melakukan penulisan ulang semua komponen yang ada. Misalnya button yang memiliki warna primary berbeda, padding yang berbeda. Saya terpaksa harus menulis ulang. Seolah olah, saya tidak menggunakan sebuah framework. Hanya 20% saja mungkin class pada framework Boostrap yang saya gunakan.

### Menyediakan API untuk Style Guide / Design System

Desainer pasti sudah memiliki styleguide bukan? Apalagi kalau perusahaan besar pasti sudah memiliki design sistem. Nah, styleguide ini sebagai patokan kita dalam melakukan styling pada setiap komponen yang ada pada wesbite. Misalnya saja styling untuk button, paragraf, warna dan lain sebagainya.

![Image](https://blog.faldi.xyz/content/images/2020/11/Screen-Shot-2020-11-23-at-11.10.08-1.png)

Styleguide pada Figma

![Image](https://blog.faldi.xyz/content/images/2020/11/Screen-Shot-2020-11-23-at-11.11.20.png)

Implementasi Styleguide pada Figma di TailwindCSS

Sehingga ketika kita ingin implementasikan styleguide yang telah ada, kita tinggal memanggilnya saja. Mudah bukan?

### AutoPrefixer dan Menghapus CSS yang Tidak digunakan

Tidak perlu lagi memikirkan masalah prefixer karena saat config awal, kita sudah diharuskan untuk menambahkan [AutoPrefixer](https://www.npmjs.com/package/autoprefixer?ref=blog.faldi.xyz) yang merupakan bagian dari pustaka PostCSS. Ketambahan lagi dengan ada [PurgeCSS](https://purgecss.com/?ref=blog.faldi.xyz) untuk menghapus file CSS yang tidak kita gunakan saat `production` sehingga hanya file CSS yang digunakan saja yang akan dibuild.

Contohnya bisa teman-teman lihat pada [https://dashboard-cowork.vercel.app/](https://dashboard-cowork.vercel.app/?ref=blog.faldi.xyz) yang sudah saya setup agar menghapus css yang tidak digunakan.

![Image](https://blog.faldi.xyz/content/images/2020/11/Screen-Shot-2020-11-23-at-11.28.51.png)

Mengatur Purge CSS

### Support Dark Mode versi 2.0

Ini belum saya coba, tapi sejak versi 2.0 TailwindCSS sudah mendukung Dark Mode. Penggunakan Dark Mode versi TailwindCSS bisa dengan 2 cara. Pertama dengan menggunakan media dimana darkmodenya berdasarkan setting dari komputer / browser user. Kedua dengan menggunakan class, yaitu toggle dari user itu sendiri.

**Dokumentasi Dark Mode TailwindCSS bisa dibaca disini**

[

Dark Mode - Tailwind CSS

Using Tailwind CSS to style your site in dark mode.

![Image](https://tailwindcss.com/apple-touch-icon.png)Tailwind CSS

![Image](https://tailwindcss.com/_next/static/media/twitter-large-card.85c0ff9e455da585949ff0aa50981857.jpg)

](https://tailwindcss.com/docs/dark-mode?ref=blog.faldi.xyz)

## Lantas Kapan Sebaiknya Kita Menggunakan TailwindCSS?

*   Apakah kamu membutuhkan framework untuk implementasi custom desain? Gunakan TailwindCSS
*   Apakah kamu membutuhkan framework untuk membuat custom component sendiri? Gunakan TailwindCSS

Bagi saya sendiri, TailwindCSS cocok untuk mereka yang membutuhkan styling custom dan tidak membutuhkan ready-component, dan tidak mempusingkan mengenai penamaan class.

Bagikan[](https://twitter.com/share?text=Membandingkan TailwindCSS dengan Framework Lain&url=http://blog.faldi.xyz/membandingkan-tailwindcss-dengan-framework-lain/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/membandingkan-tailwindcss-dengan-framework-lain/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/membandingkan-tailwindcss-dengan-framework-lain//&title=Membandingkan TailwindCSS dengan Framework Lain "LinkedIn")[](/cdn-cgi/l/email-protection#ac93dfd9cec6c9cfd891e1c9c1cecdc2c8c5c2cbc7cdc28cf8cdc5c0dbc5c2c8efffff8cc8c9c2cbcdc28ceadecdc1c9dbc3dec78ce0cdc5c28acdc1dc97cec3c8d591c4d8d8dc968383cec0c3cb82cacdc0c8c582d4d5d683c1c9c1cecdc2c8c5c2cbc7cdc281d8cdc5c0dbc5c2c8cfdfdf81c8c9c2cbcdc281cadecdc1c9dbc3dec781c0cdc5c283 "Email")

Topik [Insight](/tag/insight/) [CSS](/tag/css/) [TailwindCSS](/tag/tailwindcss/)

[

## Membuat Reusable Component dengan Menggunakan TailwindCSS dan Classnames di ReactJS

Pranala Sering kali, ketika kita mengerjakan sebuah website maka kita akan mendapati…

03 Des 2020



](/membuat-reusable-component-dengan-menggunakan-tailwind-dan-classnames/)[

## Seputar Custom Scrollbar CSS pada Firefox dan Chrome

Problem Desainer merekomendasikan untuk melakukan custom scrollbar pada salah satu desain di…

23 Nov 2020



](/seputar-custom-scrollbar/)