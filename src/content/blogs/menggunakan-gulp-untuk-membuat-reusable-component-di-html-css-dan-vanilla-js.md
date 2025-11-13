---
title: "Menggunakan Gulp untuk membuat Reusable Component di HTML,CSS dan Vanilla JS"
slug: menggunakan-gulp-untuk-membuat-reusable-component-di-html-css-dan-vanilla-js
description: "Gulp merupakan salah satu tools untuk proses _task management_ seperti automasi, _testing_, _build_, _deploy_ dll. Gulp dibuat dengan NodeJS yang bisa digunakan"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2021-04-01
image: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wwfDF8c2VhcmNofDQ1fHxjb2RlfGVufDB8fHx8MTYxNzIyMzM3OQ&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/menggunakan-gulp-untuk-membuat-reusable-component-di-html-css-dan-vanilla-js/"
---

## Pengenalan

Gulp merupakan salah satu tools untuk proses _task management_ seperti automasi, _testing_, _build_, _deploy_ dll. Gulp dibuat dengan NodeJS yang bisa digunakan untuk mengeksekusi beberapa tugas dalam pengembangan website seperti :

*   Minify css, javascript
*   Kompilasi SASS
*   Menjalankan Server
*   Menjalankan reload saat ada perubahaan pada website
*   dst

Pembahasan terkait dengan Gulp tidak akan saya bahas pada postingan ini, namun bisa dilihat pada tautan di [Petani Kode.](https://www.petanikode.com/gulp-untuk-pemula/?ref=blog.faldi.xyz)

* * *

## Permasalahan

Masalahan ini muncul saat saya mendapatkan task untuk membuat Dashboard HTML/CSS dan Vanilla JS(Walaupun pada akhirnya saya menggunakan Alphine JS). Berbeda dengan ReactJS yang component based, saat menggunakan HTML/CSS biasa kita menghadapi beberapa masalah yaitu salah satunya beberapa component sama / layouting component yang belum tentu fix, harus sering melakukan copy paste dan perulangan sehingga misalkan pada halaman `index.html` terdapat komponent `sidebar`, maka pada halaman `about`  juga memerlukan `sidebar`.

Nah, pada flow biasanya, saya harus melakukan copy paste `sidebar` dari `index.html` ke `about.html`. Masalah muncul adalah ketika ada perubahan pada `sidebar` di `index.html` maka seharusnya hal itu juga merubah component `sidebar` pada `about.html` juga. Sayangnya, saya harus melakukan copy paste kode dari `index.html` ke `about.html`.

* * *

## Solusi

Akhirnya, saya menggunakan Gulp. Sebuah tools yang membantu saya bisa membuat task seperti / mirip dengan reusable component di Laravel yang `@@include`.

## Menggunakan Gulp Plugin Include File

Jawabannya ada pada gulp plugin dengan memberikan kita fasilitas dalam melakukan include file html ke dalam sebuah halaman html, namanya `[gulp-file-include](https://www.npmjs.com/package/gulp-file-include?ref=blog.faldi.xyz)`.

Karena, saya sendiri juga baru dalam menggunakan Gulp dan pertama kali mencoba Tailwind pada Gulp, saya mencoba mencari Boilerplate Gulp dan Tailwind dan menemukan repositorinya:

[

lazymozek/gulp-with-tailwindcss

Gulp with TailwindCSS Starter Kit. Contribute to lazymozek/gulp-with-tailwindcss development by creating an account on GitHub.

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHublazymozek

![Image](https://avatars.githubusercontent.com/u/75535242?s=400&v=4)

](https://github.com/lazymozek/gulp-with-tailwindcss?ref=blog.faldi.xyz)

Berangkat dari repositoy tersebut, saya merubah / menambahkan `gulp-file-include` dengan menambahkan

```javascript
const fileinclude = require('gulp-file-include');
```

dan merubah function `devHTML` menjadi `includeHTML` yang berisikan :

```javascript
// Include HTML
function includeHTML() {
  return src([`${options.paths.src.base}/**/*.html`])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(dest(options.paths.dist.base));
}
```

Lalu, menggantikan semua pemanggilan `devHTML` menjadi `includeHTML` :

```javascript
function watchFiles(){
  watch(`${options.paths.src.base}/**/*.html`,series(devHTML, previewReload));
  watch([options.config.tailwindjs, `${options.paths.src.css}/**/*`],series(devStyles, previewReload));
  watch(`${options.paths.src.js}/**/*.js`,series(devScripts, previewReload));
  watch(`${options.paths.src.img}/**/*`,series(devImages, previewReload));
  console.log("\n\t" + logSymbols.info,"Watching for Changes..\n");
}
```

Sebelum mengganti pada Function watchFiles

```javascript
function watchFiles() {
  watch(
    `${options.paths.src.base}/**/*.html`,
    series(includeHTML, previewReload)
  );
  watch(
    [options.config.tailwindjs, `${options.paths.src.css}/**/*`],
    series(devStyles, previewReload)
  );
  watch(`${options.paths.src.js}/**/*.js`, series(devScripts, previewReload));
  watch(`${options.paths.src.img}/**/*`, series(devImages, previewReload));
  console.log('\n\t' + logSymbols.info, 'Watching for Changes..\n');
}
```

Sesudah mengganti pada Function watchFiles

Lalu, memasukkan `includeHTML` pada list task yang akan dieksekusi

```javascript

exports.default = series(
  devClean, // Clean Dist Folder
  parallel(devStyles, devScripts, devImages, devHTML), //Run All tasks in parallel
  livePreview, // Live Preview Build
  watchFiles // Watch for Live Changes
);
```

Sebelum mengganti pada listTask yang akan dieksekusi oleh Gulp

```javascript

exports.default = series(
  devClean, // Clean Dist Folder
  includeHTML,
  parallel(devStyles, devScripts, devImages), //Run All tasks in parallel
  livePreview, // Live Preview Build
  watchFiles // Watch for Live Changes
);
```

Sesudah mengganti pada listTask yang akan dieksekusi oleh Gulp

* * *

Cara Menggunakan Gulp Include HTML

Apabila  Gulp Include sudah dimasukan ke dalam `gulp.js` maka kita tinggal belajar cara menggunakan Gulp Include HTML. Pada contoh ini, saya mencoba membuat sebuah komponen HTML biasa dengan file bernama `header.html`. File tersebut isinya :

```html
<header
  class="p-20 bg-gradient-to-r from-red-400 via-red-500 to-pink-500 text-center"
>
  <div class="py-15 flex justify-center space-x-6">
    <a
      class="github-button"
      href="https://github.com/manjumjn"
      data-show-count="true"
      aria-label="Follow @manjumjn on GitHub"
      >Follow @manjumjn</a
    >
    <a
      class="github-button"
      href="https://github.com/manjumjn/gulp-with-tailwindcss"
      data-icon="octicon-star"
      data-show-count="true"
      aria-label="Star manjumjn/gulp-with-tailwindcss on GitHub"
      >Star</a
    >
    <a
      class="github-button"
      href="https://github.com/manjumjn/gulp-with-tailwindcss/fork"
      data-icon="octicon-repo-forked"
      data-show-count="true"
      aria-label="Fork manjumjn/gulp-with-tailwindcss on GitHub"
      >Fork</a
    >
    <a
      class="github-button"
      href="https://github.com/manjumjn/gulp-with-tailwindcss/archive/master.zip"
      data-icon="octicon-cloud-download"
      aria-label="Download manjumjn/gulp-with-tailwindcss on GitHub"
      >Download</a
    >
  </div>
</header>
```

Benar, kita tidak perlu menggunakan tag `html` . Cukup menggunakan tag `header` layaknya kita menuliskan sebuah komponen pada `html` biasa.

Selanjutnya pada file `index.html` kita cukup menggunakan :

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Gulp with TailwindCSS</title>
    <link rel="stylesheet" type="text/css" href="./css/style.css" />
  </head>
  <body class="bg-gray-200">
    <!-- Import component header -->
    @@include('./header.html')
    <!-- End import component header -->
    <div class="mx-auto py-20 max-w-2xl">
      <img
        class="shadow transition-shadow duration-500 rounded hover:shadow-lg mb-10"
        src="img/cover.jpg"
        alt="Gulp with TailwindCSS"
      />

      <div class="social">
        <p class="w-full text-center">Want to connect with me?</p>
        <div class="flex justify-center space-x-6">
          <a href="https://manjumjn.com">Website</a>
          <a href="https://www.facebook.com/manjumjn">Facebook</a>
          <a href="https://twitter.com/manju_mjn">Twitter</a>
          <a href="mailto:[email protected]">Email Me</a>
        </div>
      </div>
    </div>

    <script src="./js/scripts.js"></script>

    <!-- Demo Purpose -->
    <script async defer src="https://buttons.github.io/buttons.js"></script>
  </body>
</html>
```

Kalau teman-teman lihat, pada file diatas terdapat

```html
...
 <!-- Import component header -->
    @@include('./header.html')
 <!-- End import component header -->
...
```

Nah, tanda `@@include('./letak-file.html` merupakan syntax untuk melakukan import file html component yang nantinya Gulp akan mengcompile dan menggabungkan kedua file tersebut. Sehingga nanti isinya seperti ini:

![Image](https://blog.faldi.xyz/content/images/2021/04/Screen-Shot-2021-04-01-at-14.58.00.png)

List Direktori

![Image](https://blog.faldi.xyz/content/images/2021/04/Screen-Shot-2021-04-01-at-14.58.26.png)

Komponen Header tercompile dan muncul pada file index.html

Hasilnya? Apabila kita ingin merubah file `header` maka secara otomatis pada file `index.html` atau bila menambahkan pada file lain seperti `about.html` dst bisa ikut berubah. Tidak perlu merubah satu persatu.

* * *

Bila teman-teman merasa kebingungan karena belum pernah menggunakan Gulp. Saya merekomendasikan melihat tutorial dibawah ini:

## Github :

Kode dari tutorial ini bisa teman-teman dapatkan melalui Github saya di

[

naufaldi/gulp-tailwind-include-html

Gulp HTML Import with TailwindCSS. Contribute to naufaldi/gulp-tailwind-include-html development by creating an account on GitHub.

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubnaufaldi

![Image](https://avatars.githubusercontent.com/u/13159420?s=400&v=4)

](https://github.com/naufaldi/gulp-tailwind-include-html?ref=blog.faldi.xyz)

## Referensi

> [Using Gulp 4 in your workflow for Sass and JS files](https://coder-coder.com/gulp-4-walk-through/?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Menggunakan Gulp untuk membuat Reusable Component di HTML,CSS dan Vanilla JS&url=http://blog.faldi.xyz/menggunakan-gulp-untuk-membuat-reusable-component-di-html-css-dan-vanilla-js/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/menggunakan-gulp-untuk-membuat-reusable-component-di-html-css-dan-vanilla-js/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/menggunakan-gulp-untuk-membuat-reusable-component-di-html-css-dan-vanilla-js//&title=Menggunakan Gulp untuk membuat Reusable Component di HTML,CSS dan Vanilla JS "LinkedIn")[](/cdn-cgi/l/email-protection#e7d89492858d828493daaa828980809289868c8689c7a0928b97c7928993928cc78a828a85928693c7b582929486858b82c7a4888a978889828993c7838ec7afb3aaabcba4b4b4c7838689c7b186898e8b8b86c7adb4c1868a97dc8588839eda8f939397ddc8c8858b8880c981868b838ec99f9e9dc88a828980809289868c8689ca80928b97ca928993928cca8a828a85928693ca9582929486858b82ca84888a978889828993ca838eca8f938a8bca849494ca838689ca9186898e8b8b86ca8d94c8 "Email")

Topik [Getting Started](/tag/getting-started/) [Lesson Learned](/tag/lesson-learned/) [TailwindCSS](/tag/tailwindcss/) [Tutorial](/tag/tutorial/)

[

## Berbagai Cara Membuat Kondisional Class Component / CSS di Emotion dan Tailwind Macro

Pembuka twin.macro atau yang bisa kita sebut sebagai Twin's…

03 Apr 2021



](/membuat-props-class-component-di-emotion-dan-tailwind-macro/)[

## Cara Install NextJS + twin.macro + Emotion

Ada beberapa kemudahan ketika kita menggunakan twin.macro dan Emotion pada proyek…

30 Mar 2021



](/memulai-nextjs-tailwind-macro-emotion/)