---
title: "Membuat Reusable Component dengan Menggunakan TailwindCSS dan Classnames di ReactJS"
slug: membuat-reusable-component-dengan-menggunakan-tailwindcss-dan-classnames-di-reactjs
description: "Sering kali, ketika kita mengerjakan sebuah website maka kita akan mendapati banyak sekali komponen komponen yang sering sekali untuk digunakan. Misalnya kompon"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2020-12-03
image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MXwxMTc3M3wwfDF8c2VhcmNofDI5fHx8ZW58MHx8fA&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/membuat-reusable-component-dengan-menggunakan-tailwind-dan-classnames/"
---

## Pranala

Sering kali, ketika kita mengerjakan sebuah website maka kita akan mendapati banyak sekali komponen komponen yang sering sekali untuk digunakan. Misalnya komponen `button`, `container` atau `card`. Kalau pengalamanku, komponen tersebut tidak memiliki logic yang rumit atau malah tidak ada sama sekali.

## Permasalahan

Beberapa hari belakangan ini, aku sendiri merasakan sering membuat komponen komponen yang sama ditambah lagi, kira-kira ada tidak sih cara membaut reusable komponen dengan menggunakan [TailwindCSS](https://tailwindcss.com/?ref=blog.faldi.xyz)? Apalagi [TailwindCSS](https://tailwindcss.com/?ref=blog.faldi.xyz) memiliki nama-nama class yang cukup memudahkan dalam membuat _reusable component_ seperti _component button_ berikut

```html
 <button className='relative bg-blue-500 text-white p-6 rounded text-2xl font-bold overflow-visible'>
      Example button
</button>
```

Kalau kita lihat, komponen ini bisa di ubah untuk menjadi _reusable component_ dengan memanfaatkan nama kelas dari TailwindCSS. Misalnya apabila kita ingin button primary kita menjadi seperti ini

```html
 <Button bgBlue="500" text="2xl">
      Example button
</Button>
```

Sehingga kita bisa mengatur `button` kita bisa _reusable_ dan warna _background_ serta _text size_ bisa berganti sesuai keinginan kita.

## Solusi

Menggunakan `[classnames npm module](https://www.npmjs.com/package/classnames?ref=blog.faldi.xyz)` untuk bisa merubah / mengatur supaya pengaturan `class component` bisa disesuaikan.

**Semula seperti ini**

```html
 <button className='relative bg-blue-500 text-white p-6 rounded text-2xl font-bold overflow-visible'>
      Example button
</button>
```

**Menjadi seperti ini**

```html
 <Button bgBlue="500" text="2xl">
      Example button
</Button>
```

**Lantas, bagaimana caranya?**

Pertama, Install terlebih dahulu `[classname](https://www.npmjs.com/package/classnames?ref=blog.faldi.xyz)`

```
npm install classnames --save
```

Kedua, membuat sebuah komponen button

```javascript
import React from "react";

const Button = () => {
  return (
    <button
      className= "py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg bg-orange-500 hover:shadow-orange-md transition-all outline-none text-base "
    >
      Button
    </button>
  );
};

export default Button;
```

Ketiga, kita akan merubah komponen tersebut menjadi lebih usable, bisa digunakan berulang ulang dengan template yang sama. Ini tergantung kebutuhan desain teman-teman. Misalnya, saya memiliki beberapa button dan yang berubah hanya dari segi warna `background` , `text` dan `font size`.

Maka , saya harus `import classnames`, menambahkannya ke `classNames`. Lalu, membuat logic untuk `font size`.

```javascript
// Button.js
import React from 'react'
import classnames from 'classnames';

const Button = ({ size, bg, text, addClass, children })=> {
  return (
    <button className={classnames(`py-3 lg:py-4 px-12 lg:px-16 text-${text} font-semibold rounded-lg bg-${bg} hover:shadow-orange-md transition-all outline-none ${addClass}`, {
      "text-sm": size === 'sm',
      "text-lg": size === 'lg',
    })}>
      {children}
    </button>
  )
};

export default Button;
```

**Penjelasannya :**

1.  `size` merupakan logic bila nilai `size` sama dengan `sm` maka nanti `class` yang ditambahkan adalah `text-sm`, saat `size` sama dengan `lg` maka nanti `class` yang ditambahkan adalah `text-lg`. Namun, saat tidak ada maka `size` akan `null` dan secara default `font size` adalah `text-base`.
2.  `bg`, dan `text` adalah `props` yang nantinya menyesuaikan dengan nilai yang didapat. Karena seperti yang saya jelaskan diawal kalau saya hanya perlu mengganti warna dan text saja, sisanya sama semua dari desain.
3.  `children` adalah props untuk mengirimkan semua data yang di "apit" oleh komponen.
4.  `AddClass` kalau saya membutuhkan class tambahan. Misalnya `margin` atau kelas lain.

Nanti, kurang lebih saat kita memanggil button menjadi seperti ini

```
import React from "react";
import Button from "../misc/Button";

const DetailJob = () => {
  return (
  <>
  <h2 className="text-3xl">Button</h2>
    <Button size="sm" bg="blue-100" text="white">Submit</Button>
      </>
  );
};

export default DetailJob;
```

Selesai.

## Kesimpulan

Kurang lebih seperti itu cara saya membuat reusable component di [ReactJS](reactjs.org/)/[NextJS](nextjs.org/) dengan [TailwindCSS](https://tailwindcss.com/?ref=blog.faldi.xyz) dan bantuan [classnames](https://www.npmjs.com/package/classnames?ref=blog.faldi.xyz). Kalau teman-teman ada cara lain, bisa sharing atau berbagi di Twitter / hubungi saya via Twitter.

### Dukung saya di Karyakarsa :

[

Dukung Naufaldi Rafif S di Karyakarsa!

Dukung Naufaldi Rafif S di Karyakarsa!

![Image](https://karyakarsa.com/naufaldisatriya/icons/favicon-96x96.png)

![Image](https://karyakarsa.s3.ap-southeast-1.amazonaws.com/header-5e38f4d4bc716.jpg)

](https://karyakarsa.com/naufaldisatriya/tip?ref=blog.faldi.xyz)

## Sumber Belajar Lain :

[

Building Reusable React Components Using Tailwind — Smashing Magazine

Tailwind is a popular utility-first CSS framework that provides low-level class names to web developers. In this article, we’ll explore ways to build reusable React components using Tailwind.

![Image](https://www.smashingmagazine.com/images/favicon/app-icon-512x512.png)Smashing MagazineMore aboutTilo…

![Image](https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/679ef6ca-6993-4573-a557-28341ae5cc7d/reusable-react-components-tailwind.png)

](https://www.smashingmagazine.com/2020/05/reusable-react-components-tailwind/?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Membuat Reusable Component dengan Menggunakan TailwindCSS dan Classnames di ReactJS&url=http://blog.faldi.xyz/membuat-reusable-component-dengan-menggunakan-tailwind-dan-classnames/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/membuat-reusable-component-dengan-menggunakan-tailwind-dan-classnames/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/membuat-reusable-component-dengan-menggunakan-tailwind-dan-classnames//&title=Membuat Reusable Component dengan Menggunakan TailwindCSS dan Classnames di ReactJS "LinkedIn")[](/cdn-cgi/l/email-protection#d1eea2a4b3bbb4b2a5ec9cb4bcb3a4b0a5f183b4a4a2b0b3bdb4f192bebca1bebfb4bfa5f1b5b4bfb6b0bff19cb4bfb6b6a4bfb0bab0bff185b0b8bda6b8bfb5928282f1b5b0bff192bdb0a2a2bfb0bcb4a2f1b5b8f183b4b0b2a59b82f7b0bca1eab3beb5a8ecb9a5a5a1ebfefeb3bdbeb6ffb7b0bdb5b8ffa9a8abfebcb4bcb3a4b0a5fca3b4a4a2b0b3bdb4fcb2bebca1bebfb4bfa5fcb5b4bfb6b0bffcbcb4bfb6b6a4bfb0bab0bffca5b0b8bda6b8bfb5fcb5b0bffcb2bdb0a2a2bfb0bcb4a2fe "Email")

Topik [NextJS](/tag/nextjs/) [ReactJS](/tag/reactjs/) [TailwindCSS](/tag/tailwindcss/) [Tutorial](/tag/tutorial/)

[

## Lesson Learned dari Test Accesibility pada Website

Accesibility konsep yang merujuk pada pengembangan dan desain web untuk memastikan kemudahan akses digital atau online bagi semua orang, baik yang mampu maupun memiliki disabilitas.…

09 Des 2020



](/lesson-learned-dari-test-accesibility-pada-website/)[

## Membandingkan TailwindCSS dengan Framework Lain

Pranala TailwindCSS merupakan sebuah Framework CSS yang dibuat oleh Adam Wathan. Tidak…

24 Nov 2020



](/membandingkan-tailwindcss-dengan-framework-lain/)