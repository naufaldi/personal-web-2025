---
title: "Mencegah Scrolling Saat Modal Terbuka"
slug: mencegah-scrolling-saat-modal-terbuka
description: "Permasalahan yang saya alami adalah ketika membuat sebuah fitur pada landingpage, lalu kita membuat sebuah komponen baru untuk menampilkan `Modal` pada Landingp"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2020-12-23
image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MXwxMTc3M3wxfDF8YWxsfDF8fHx8fHwyfA&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/prevent-scrolling-when-modal-open/"
---

## **Permasalahan :**

Permasalahan yang saya alami adalah ketika membuat sebuah fitur pada landingpage, lalu kita membuat sebuah komponen baru untuk menampilkan `Modal` pada Landingpage. Misalnya modal untuk `Login`. Nah, permasalahan yang muncul adalah Landingpage tersebut benar menampilkan `Modal Login`, dengan `overlay` aktif dan Modal bisa terlihat. Kurang lebih seperti ini :

![Image](https://blog.faldi.xyz/content/images/2020/12/image.png)

Modal dan Overlay untuk memusatkan perhatian pengguna ke Modal

Sayangnya, pada page tersebut, saya masih mampu untuk bisa melakukan scrolling pada halamannya walaupun, saya sudah membuat komponen tersebut `overflow` nya menjadi `hidden`.

![Image](https://blog.faldi.xyz/content/images/2020/12/recording-1--1.gif)

Saya pun jadi teringat, bahwa sebenarnya yang overflow atau membuat adanya scroll bukan dari pihak `Component Modal`. Harusnya, menambahkan `overflow` menjadi `hidden` itu pada bagian komponen `overflow` tersebut, bukan pada Modal.

Masalah lain, adalah dalam sebuah pages, konteksnya Home Page, saya membagi beberapa section menjadi `component-component` yang berbeda. Apa iya saya harus menambahkan `overflow hidden` pada setiap komponen. Kalau iya, Bagaimana bila modal tersebut ditutup?  Bagaimana bila modal tersebut dibuka di halaman lain? Apakah masih bisa scrolling?

## **Solusi**

Lantas, saya mencoba untuk mencari cara di [Stackoverflow](https://stackoverflow.com/?ref=blog.faldi.xyz) dan bertemulah saya dengan salah satu cara yang tidak terpikirkan, yaitu kenapa kita tidak menambahkan saja style `overflow` menjadi `hidden` ketika `Component Modal` digunakan dan `overflow` menjadi `unset` ketika `Component Modal` ditutup?

Sehingga kita cukup menambahkan kode berikut ini disetiap component Modal yang kita miliki.  

```js
useEffect(() => {
     document.body.style.overflow = 'hidden';
     return ()=> document.body.style.overflow = 'unset';
  }, []);
```

Menggunakan `useEffect` untuk meload javascript agar menambahkan style `overflow hidden` di body element dan return `overflow unset` saat modal ditutup.

### Referensi :

[

React: Prevent scroll when modal is open

I have a custom modal component. When it’s open, there is no scrolling whatsoever in the background. I tried this code below: componentDidMount() { document.body.style.overflow = ‘hidden’;}

![Image](https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a)Stack OverflowRCohen

![Image](https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded)

](https://stackoverflow.com/questions/54989513/react-prevent-scroll-when-modal-is-open?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Mencegah Scrolling Saat Modal Terbuka&url=http://blog.faldi.xyz/prevent-scrolling-when-modal-open/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/prevent-scrolling-when-modal-open/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/prevent-scrolling-when-modal-open//&title=Mencegah Scrolling Saat Modal Terbuka "LinkedIn")[](/cdn-cgi/l/email-protection#d7e8a4a2b5bdb2b4a3ea9ab2b9b4b2b0b6bff784b4a5b8bbbbbeb9b0f784b6b6a3f79ab8b3b6bbf783b2a5b5a2bcb6f1b6baa7ecb5b8b3aeeabfa3a3a7edf8f8b5bbb8b0f9b1b6bbb3bef9afaeadf8a7a5b2a1b2b9a3faa4b4a5b8bbbbbeb9b0faa0bfb2b9fabab8b3b6bbfab8a7b2b9f8 "Email")

Topik [Lesson Learned](/tag/lesson-learned/) [NextJS](/tag/nextjs/) [ReactJS](/tag/reactjs/) [Tutorial](/tag/tutorial/)

[

## Repository Github untuk meningkatkan Skill Pemrograman

Meningkatkan skill pemrograman tidak hanya selalu berkutat pada proses pengerjaan proyek secara…

02 Feb 2021



](/repository-github-untuk-meningkatkan-skill-pemrograman/)[

## Lesson Learned dari Test Accesibility pada Website

Accesibility konsep yang merujuk pada pengembangan dan desain web untuk memastikan kemudahan akses digital atau online bagi semua orang, baik yang mampu maupun memiliki disabilitas.…

09 Des 2020



](/lesson-learned-dari-test-accesibility-pada-website/)