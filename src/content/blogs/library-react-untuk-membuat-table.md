---
title: "Library React untuk Membuat Table"
slug: library-react-untuk-membuat-table
description: "Beberapa waktu lalu, saya mendapatkan tugas untuk bisa memvisualisasi data dari Backend dengan berbagai ragam jenis data. Nah, salah satu cara dengan menampilka"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2022-01-06
image: "https://images.unsplash.com/photo-1593642532454-e138e28a63f4?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wxfDF8YWxsfDF8fHx8fHwyfHwxNjQxMzY0Nzcz&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/rekomendasi-library-react-untuk-membuat-table/"
---

Beberapa waktu lalu, saya mendapatkan tugas untuk bisa memvisualisasi data dari Backend dengan berbagai ragam jenis data. Nah, salah satu cara dengan menampilkan list data adalah dengan menggunakan Table, otomatis saya mencoba mencari kira-kira penggunaan Table di ReactJS itu apa saja. Akhirnya, menemukan 2 React Table yang sesuai dengan kebutuhanku.

Kebutuhanku itu diantaranya

*   Compatible dengan Typescript
*   Compatible dengan Material UI React
*   Dokumentasi yang jelas
*   Pengguna yang banyak sehingga saat ada kendala, kita bisa mudah bertanya.

Maka, ketemulah 2 React Table ini, yang memenuhi kriteria tersebut. Sekaligus bisa menjadi rekomendasi temen-temen karena kalau melihat dari [Top 5 React Table](https://blog.bitsrc.io/top-5-react-table-libraries-170505f75da7?ref=blog.faldi.xyz) atau [React Example Table](https://reactjsexample.com/tag/table/?ref=blog.faldi.xyz) hanya memberikan list, namun belum bisa memberikan beberapa pertimbangan terkait dengan setelah digunakan seperti apa.

# React Data Table Component

![Image](https://blog.faldi.xyz/content/images/2022/01/image.png)

Contoh Table

By default memang simple, namun ini yang dicari. Karena kita bisa melakukan custom dan integrasi dengan Framework CSS lain seperti

*   Boostrap
*   Material UI

Selain itu, ada fitur fitur yang memutuskan aku untuk menggunakan table ini. Antara lain fitur yang ada

*   Sorting
*   Resize Column
*   Responsive
*   Select Row ( Berguna untuk membuat Edit / Remove data berdasarkan Row)
*   Pagination
*   Export CSV

Salah satu krusialnya juga menggunakan React Data Table, karena compatible dengan Typescript. Update dari React Data Table, saat tulisan ini ditulis (  5 Januari 2022 ) , type diupdate pada 30 hari yang lalu.

[

Update types.ts by Dragate · Pull Request #938 · jbetancur/react-data-table-component

Since 7.4.0 (e0236e0), Primitive type was introduced which didn&#39;t allow data to have optional/undefined fields or have null values in a typescript project. This PR addresses this issue.EDIT: H...

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubjbetancur

![Image](https://opengraph.githubassets.com/d01a38f82c19c125e1053c780c69cfcd4551a65c4832657009277e55b4f37ea8/jbetancur/react-data-table-component/pull/938)

](https://github.com/jbetancur/react-data-table-component/pull/938?ref=blog.faldi.xyz)

Saat ini, komunitas sedang mengembangkan React Data Table versi 7 yang akan menggunakan Typescript(versi sebelumnya menggunakan Javascript)  sehingga type checking lebih mudah.

Jadi, kalau mau simple Table yang juga dukungan komunitas cukup tinggi, bisa menggunakan React Data Table.

Github :

[

GitHub - jbetancur/react-data-table-component: A responsive table library with built-in sorting, pagination, selection, expandable rows, and customizable styling.

A responsive table library with built-in sorting, pagination, selection, expandable rows, and customizable styling. - GitHub - jbetancur/react-data-table-component: A responsive table library with ...

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubjbetancur

![Image](https://opengraph.githubassets.com/9b4df10deeede5b89819125020f17d75ac12e743c9faf1c80aaeef88cce8cea3/jbetancur/react-data-table-component)

](https://github.com/jbetancur/react-data-table-component?ref=blog.faldi.xyz)

# React Table

![Image](https://blog.faldi.xyz/content/images/2022/01/image-1.png)

Kalau ini lebih simple lagi tampilannya, sehingga mudah untuk kita merubah tampian dan bisa diintegrasikan dengan library lain tidak terlepas Boostrap / Material UI.

Aku menyarankan untuk menggunakan React Table apabila kita sudah terbiasa menggukana Hooks, karena si Reac Table ini menggunakan Plugin Hooks untuk setiap fiturnya, jadi kita akan sangat familiar.

Apalagi, creatornya Tanner Linsley sudah memiliki banyak produk untuk React seperti

*   React Query
*   React Charts
*   React Visual
*   dst

[

tannerlinsley - Overview

Husband, Co-Founder, Open source fanatic, React Junkie, Javascripter - tannerlinsley

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHub

![Image](https://avatars.githubusercontent.com/u/5580297?v=4?s=400)

](https://github.com/tannerlinsley?ref=blog.faldi.xyz)

Awalnya, saat sebelum menggunakan React Data Table, dan memerlukan beberap fitur tambahan. Sayangnya, pada React Data Table, tidak ada. Akhirnya aku migrasi ke React Table. Salah satu fiturnya yaitu

*   Fixed Column  / Sticky Column

Ini berguna saat Table dengan width yang panjang, user tetap mengetahui row ini memiliki data dari mana (biasanya data column pertama menjadi acuan)

[

Sticky columns · Issue #848 · tannerlinsley/react-table

Is there any plan to add a feature for fixed or ‘sticky’ columns allowing for horizontal scrolling, in addition to vertical

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubtannerlinsley

![Image](https://opengraph.githubassets.com/af1e7d8673751d72c44364ebec62bc029a226a9de1463476033d746d32d2671e/tannerlinsley/react-table/issues/848)

](https://github.com/tannerlinsley/react-table/issues/848?ref=blog.faldi.xyz)

Sayangnya, ada beberapa type yang tidak sesuai apabila kita menggunakan Typescript. Misalnya pernah dibahas di  
[https://github.com/tannerlinsley/react-table/issues/3468](https://github.com/tannerlinsley/react-table/issues/3468?ref=blog.faldi.xyz)

jadi, kita harus mengakali supaya React Table bisa compatible dengan Type-nya. Ini dibahas juga pada issues #3064

[

React useTable hook with typescript · Issue #3064 · tannerlinsley/react-table

So I have a JavaScript class with useTable. In Java script its been used like below import {useTable, useFilters,useAsyncDebounce,useSortBy,usePagination,} from &quot;react-table&quot;; const {getT...

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubtannerlinsley

![Image](https://opengraph.githubassets.com/b5d12b399108fe596600753a50695d860ad3bf67e8add4ad0d16e787a9412521/tannerlinsley/react-table/issues/3064)

](https://github.com/tannerlinsley/react-table/issues/3064?ref=blog.faldi.xyz)

Jadi ya harus berhati hati saat menggunakan React-Table dan mengalami permasalah di type checking. Walaupun begitu, aku tetap menggunakan React Table, karena fiturnya lengkap seperti

*   Pagination
*   Filter
*   Fixed Column
*   Row Select
*   Expanding
*   dst

Bahkan kita bisa menambahakan plugin dari komunitas lain apabila dari official React Table tidak ada, seperti sticky column tersebut.

Oh ya, React Table sendiri memang masih Javascript, makanya type checking beberapa ada yang error dan ada yang tidak. Namun, sekarang komunitas sedang ngembangin React Table Typescript.

[

React Table

Hooks for building lightweight, fast and extendable datagrids for React. The best and most top-rated fully open-source table library for React!

![Image](https://react-table.tanstack.com/_next/static/images/favicon-07c3e551b48272d4685be76a6a7fb11c.png)Hooks for building lightweight, fast and extendable datagrids for React

![Image](https://react-table.tanstack.com/_next/static/images/og-dark-96face4cad6f204cbcc2b548b1276abd.png)

](https://react-table.tanstack.com/?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Rekomendasi Library React untuk Membuat Table&url=http://blog.faldi.xyz/rekomendasi-library-react-untuk-membuat-table/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/rekomendasi-library-react-untuk-membuat-table/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/rekomendasi-library-react-untuk-membuat-table//&title=Rekomendasi Library React untuk Membuat Table "LinkedIn")[](/cdn-cgi/l/email-protection#66591513040c0305125b34030d090b03080207150f462a0f041407141f46340307051246130812130d462b030b04130712463207040a0340070b165d0409021f5b0e1212165c4949040a09014800070a020f481e1f1c4914030d090b03080207150f4b0a0f041407141f4b14030705124b130812130d4b0b030b041307124b1207040a0349 "Email")

Topik [Insight](/tag/insight/) [ReactJS](/tag/reactjs/) [Lesson Learned](/tag/lesson-learned/)

[

## Cara Menonaktifkan Scroll Horizontal pada Visual Studio Code

Secara default, VS Code memiliki fitur untuk membuat kode editor kita bisa…

31 Mar 2022



](/cara-menonaktifkan-scroll-horizontal-pada-visual-studio-code/)[

## Tips Meningkatkan Produktifitas dengan Visual Studio Code

Siapa sih yang tidak menggunakan VS Code? Bahkan menurut survey terbaru dari…

14 Nov 2021



](/tips-meningkatkan-produktifitas-dengan-visual-studio-code/)