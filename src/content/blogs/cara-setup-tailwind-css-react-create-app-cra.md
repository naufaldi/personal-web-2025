---
title: "Cara Setup Tailwind CSS + React Create App (CRA)"
slug: cara-setup-tailwind-css-react-create-app-cra
description: "Pada kesempatan kali ini, saya mencoba untuk membuat tutorial bagaimana setup / melakukan pengaturan agar bisa Tailwind CSS bisa berjalan dengan Create React Ap"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2020-11-08
image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;fm&#x3D;jpg&amp;crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;w&#x3D;2000&amp;fit&#x3D;max&amp;ixid&#x3D;eyJhcHBfaWQiOjExNzczfQ"
canonical: "http://blog.faldi.xyz/cara-setup-tailwind-css-react-create-app-cra/"
---


Pada kesempatan kali ini, saya mencoba untuk membuat tutorial bagaimana setup / melakukan pengaturan agar bisa Tailwind CSS bisa berjalan dengan Create React App.

### Setup Create React App

Pertama, dengan terlebih dahulu melakukan setup proyek CRA atau menggunakan proyek CRA yang telah ada

```
npx create-react-app demo
```

### Setup Tailwind dan CRA

Kedua, kita akan menambahkan  TailwindCSS package ke CRA kita dengan melakukan

```
npm install tailwindcss
```

### Install Autoprefixer dan PostCSS

Ketiga, kita akan menambahkan `Autoprefixer` dan `PostCSS-CLI` pada proyek kita dengan melakukan

```
npm install postcss-cli autoprefixer --save-dev
```

Lantas, untuk apa kita memerlukan **PostCSS** dan **Autoprofixer**?

Berdasarkan dokumentasi PostCSS,:

> _PostCSS is a tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more._

Sedangkan, Autoprefixer adalah parses  CSS kita dan  menambahkan / mengurangi  vendor prefixes yang tidak digunakan saat  kita meng-compile CSS. ini fungsinya untuk bisa menambahkan prefixer pada animations, transition, transform, grid, flex, flexbox, etc.

### Mengubah Script pada package.json

Keempat, kita akan menambahkan script ke file `package.json` kita.

```json
 "scripts": {
    "start": "npm run build:css && react-scripts start",
    "build": "npm run build:css && react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "build:css": "postcss src/assets/css/tailwind.css -o src/assets/css/main.css",
  },
```

Saya akan mencoba menjelaskan disini satu persatu.

scripts `start` digunakan untuk melakukan build tailwindcss kita setiap kali kita akan menjalankan React App kita. Sedangkan `build` mirip dengan scripts start namun digunakan saat proses production.

script `build:css` digunakan untuk bisa mengcompile file _tailwind.css_ kita yang berada pada direktori `src/assets/css/tailwind.css` menjadi file css di direktori yang sama namun dengan nama `main.css` .

### Config PostCSS

Kelima, kita membuat file baru di diretori root proyek CRA kita dengan nama `postcss.config.js` atau berfungsi untuk melakukan konfigurasi pada PostCSS yang telah kita install lagi.

```json
//postcss.config.js
 const tailwindcss = require('tailwindcss');
 module.exports = {
     plugins: [
         tailwindcss('./tailwind.js'),
         require('autoprefixer'),
     ],
 };

```

### Config Tailwind

Keenam, kita membuat file baru di direktori root proyek CRA kita dengan nama `tailwind.js` yang berfungsi sebagai konfigurasi TailwindCSS kita. Kurang lebih isinya seperti ini sesuai dengan dokumentasi TailwindCSS

```json
module.exports = {
  future: {},
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
```

Ketujuh, baru kita membuat sebuah file css untuk TailwindCSS kita. Karena sebelumnya saya membuat di script direktori tailwind.css maka harusnya berada pada direktori `src/assets/css/tailwind.css` .

tailwind.css berisi `@tailwind` langsung untuk inject Tailwind's `base`, `components`, and `utilities` styles ke CSS kita:

```css
@tailwind base;

@tailwind components;

@tailwind utilities;
```

Kedelapan, kita baru melakukan import css kita ke index.js dari React App kita. Sehingga kurang lebih seperti ini :

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Import CSS
import './assets/css/main.css';
import * as serviceWorker from './serviceWorker';
```

Ingat, bahwa yang kita import bukanlah file dari tailwind.css melainkan hasil compile dari tailwind.css yaitu main.css

Kurang lebih setelah step step tersebut, kita bisa melihat direktori dari file CRA kita seperti ini :

![Image](https://blog.faldi.xyz/content/images/2020/11/Screen-Shot-2020-11-08-at-23.03.19.png)

Direktori CRA + TailwindCSS

**Catatan :**

1.  Kita bisa membuat custom css dan meletakannya di tailwind.css dengan menggunakan `@apply`  yang dijelaskan pada dokumentasi Tailwind. Masalahnya,adalah saat kita membuat banyak sekali custom class, maka setiap kita membuat custom class baru pada tailwind.css , kita harus build ulang / compile ulang dengan melakukan npm run build:css agar apa yang kita tulis pada `tailwind.css` terupdate di `main.css` Ada beberapa alternative untuk melakukan compile otomatis. tentunya, akan memberatkan komputer kita. yaitu dengan menggunakan tutorial dari [Dave Ceddia](https://daveceddia.com/tailwind-create-react-app/?ref=blog.faldi.xyz) menggunakan packages `chokidar` atau menggunakan `watch` packages.
2.  Optimasi untuk proses build yang akan saya tulis pada tulisan selanjutnya dengan menggunakan PurgeCSS
3.  Gunakan autoprefixer versi 9 apabila kamu menggunakan PostCSS versi 8. Hal ini karena ada bug / issues yang bisa teman-teman lihat [disini](https://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users?ref=blog.faldi.xyz)  dan [disini](https://stackoverflow.com/questions/64057023/error-postcss-plugin-autoprefixer-requires-postcss-8-update-postcss-or-downgra?ref=blog.faldi.xyz)

### Kode di Github :

[

naufaldi/cra-tailwind

Create React App + Tailwind. Contribute to naufaldi/cra-tailwind development by creating an account on GitHub.

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubnaufaldi

![Image](https://avatars0.githubusercontent.com/u/13159420?s=400&v=4)

](https://github.com/naufaldi/cra-tailwind?ref=blog.faldi.xyz)

Semoga membantu!

### Dukung saya di Karyakarsa ya..

[

Dukung Naufaldi Rafif S di Karyakarsa!

Dukung Naufaldi Rafif S di Karyakarsa!

![Image](https://karyakarsa.com/icons/favicon-96x96.png)

![Image](https://karyakarsa.s3.ap-southeast-1.amazonaws.com/header-5e38f4d4bc716.jpg)

](https://karyakarsa.com/naufaldisatriya?ref=blog.faldi.xyz)

### Sumber Lain :

[

Config Tailwind CSS in React JS project in TL;DR way

TL;DR Link to the React, Tailwind GitHub template https://github.com/Rohithgilla12/react-tailwind-tem...

![Image](https://res.cloudinary.com/practicaldev/image/fetch/s--t7tVouP9--/c_limit,f_png,fl_progressive,q_80,w_192/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/devlogo-pwa-512.png)DEV CommunityRohith Gilla

![Image](https://res.cloudinary.com/practicaldev/image/fetch/s--GarkiKyH--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/luypje6wq63ddym8kgql.png)

](https://dev.to/gillarohith/config-tailwind-css-in-react-js-project-in-tl-dr-way-1m6k?ref=blog.faldi.xyz)

[

Using Tailwind CSS with Create React App

![Image](https://daveceddia.com/images/apple-touch-icon-144x144-precomposed.png)Dave CeddiaDave Ceddia

![Image](https://daveceddia.com/images/create-react-app-with-tailwind.png)

](https://daveceddia.com/tailwind-create-react-app/?ref=blog.faldi.xyz#production)

> [How to configure create-react-app to use Tailwind CSS](https://blog.logrocket.com/create-react-app-and-tailwindcss/?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Cara Setup Tailwind CSS + React Create App \(CRA\)&url=http://blog.faldi.xyz/cara-setup-tailwind-css-react-create-app-cra/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/cara-setup-tailwind-css-react-create-app-cra/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/cara-setup-tailwind-css-react-create-app-cra//&title=Cara Setup Tailwind CSS + React Create App \(CRA\) "LinkedIn")[](/cdn-cgi/l/email-protection#300f4345525a5553440d73514251106355444540106451595c47595e5410736363101b106255515344107342555144551071404010187362711916515d400b525f54490d584444400a1f1f525c5f571e56515c54591e48494a1f535142511d43554445401d4451595c47595e541d5343431d42555153441d5342555144551d5140401d5342511f "Email")

Topik [ReactJS](/tag/reactjs/) [Tutorial](/tag/tutorial/) [TailwindCSS](/tag/tailwindcss/)

[

## Alasan Import SVG sebagai React Component

Permasalahan Pertama Pernah tidak mencoba untuk merubah warna SVG ? Entah kebutuhannya saat…

09 Nov 2020



](/alasan-import-svg-sebagai-react-component/)[

## Cara Install React ID Swiper untuk Membuat Komponen React Slideshow

Namun, saya merasa sedikit ada masalah ketika mencoba mencoba untuk memanipulasi beberapa element HTML dan merubah styling pada pustaka tersebut sehingga mencoba alternatif lain. Akhirnya, saya menemukan yang namanya React ID Swiper.…

02 Nov 2020



](/cara-install-react-id-swiper-untuk-membuat-komponen-slideshow/)