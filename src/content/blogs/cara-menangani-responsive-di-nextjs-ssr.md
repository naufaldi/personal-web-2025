---
title: "Cara Menangani Responsive di NextJS ( SSR )"
slug: cara-menangani-responsive-di-nextjs-ssr
description: "Saat menggunakan library `react-responsive` dan menggabungkannya dengan NextJS serta Twin's / `twin.macro` saya mendapatkan permasalahan. Saat menggunakan `rea"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2021-04-26
image: "https://images.unsplash.com/photo-1472437774355-71ab6752b434?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wwfDF8c2VhcmNofDF8fGphdmFzY3JpcHR8ZW58MHx8fHwxNjE5Mzc3NDQ0&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/handle-responsive-website-in-nextjs-ssr/"
---


## Permasalahan

Saat menggunakan library `react-responsive` dan menggabungkannya dengan NextJS serta Twin's /  `twin.macro` saya mendapatkan permasalahan. Saat menggunakan `react-responsive`, salah dalam melakukan render styled-component. Misalnya komponen A dengan style A pada dekstop version, tetapi yang dirender adalah komponen A dengan style B pada dekstop version.

Saya pun mencoba mencari penyebab permasalahan tersebut. Akhirnya menemukan artikel yang ditulis [Nitay Neeman dalam Blognya](https://nitayneeman.com/posts/combining-server-side-rendering-and-responsive-design-using-react/?ref=blog.faldi.xyz) berjudul **"React - Combining Server-Side Rendering and Responsive Design"**

Apa yang dituliskan Nitay tersebut, memberikan beberapa point penting bagi saya yang sebelumnya tidak pernah saya pikirkan.

1.  Menggunakan NextJS, yang merupakan SSR. Sedangkan Server-side tidak tidak bisa mengenali `window` yang digunakan untuk mengenali viewport pada sebuah dokumen
2.  Karena tidak bisa mengenai, tentu saja berpotensi untuk terjadinya galat, yang dalam tulisan tersebut sempat memention `hydration()` yang sampai saat ini saya masih belum memahmi 100% apa maksud dari hal tersebut.

Nitay, dalam blognya juga memberikan sejumlah rekomendasi, salah satunya adalah menggunakan Library [https://github.com/artsy/fresnel](https://github.com/artsy/fresnel?ref=blog.faldi.xyz) yang mirip dengan `react-responsive` . Sayangnya, secara sederhananya, pustaka ini menambahkan sebuah element div baru untuk bisa membuat element child menjadi kondisional _render_ berdasarkan `viewport`. Walaupun, saya belum lagi melakukan `exploring` saat digabungkan dengan `react context` .

```javascript
import React from "react"
import { Media } from "./Media"

export const HomePage = () => {
  return (
    <>
      <Media at="sm">Hello mobile!</Media>
      <Media greaterThan="sm">Hello desktop!</Media>
    </>
  )
}
```

Penambahan Komponen Media

## Solusi

### Penggunaan Display Hidden

Tentu saja kembali pada cara yang sederhana dan menyelesaikan banyak masalahm yaitu menggunakan `display:none` untuk bisa menghilangkan secara `visual` sebuah element HTML. Ya, tentu saja secara `visual` element HTML sudah menghilang. Namun, pada DOM Tree, element ini masih ada. Cara ini juga direkomendasikan oleh mas Resi.

> Kalo di kcov19, it's okay kita jadiin \`display: none\`, we use what was offered by emotion + styled-system
> 
> — Resi "pronoun-in-the-bio person" Respati (@resir014) [April 8, 2021](https://twitter.com/resir014/status/1380015363367202820?ref_src=twsrc%5Etfw&ref=blog.faldi.xyz)

### Penggunaan Element Picture untuk Gambar

Semantic HTML ini masih kurang populer digunakan oleh banyak Frontend Developer, mengingat untuk menggunakannya, kita harus menyiapkan beberapa gambar sesuai `viewport` yaitu `<picture> </picture>` yang bisa dibaca pada [picture w3school](https://www.w3schools.com/tags/tag_picture.asp?ref=blog.faldi.xyz).

Cara ini bisa digunakan apabila saat menggunakan `display:none` pada element yang memiliki sebuah gambar. Karena, walaupun kita menggunakan `display:none` namun, element tetap akan mengunduh gambar. Karena memang `display:none` berfungsi hanya untuk menghilangkan element secara visual saja.

### Menggunakan NextJS Image

Tentu saja, saat berurusan dengan gambar, sejak NextJS versi 10, saya sebisa mungkin menggunakan [Next Image](https://nextjs.org/docs/api-reference/next/image?ref=blog.faldi.xyz) yang merupakan salah satu keunggulannya dalam mengoptimalkan gambar. Next Image membuat gambar dioptimasi dengan mengubah kualitas, dan size menyesuaikan dengan `viewport` sehingga cukup dengan satu sumber gambar bisa memberikan hasil gambar berbeda sesuai dengan `viewport`

### Menggunakan Custom Hooks di react-responsive

Solusi inilah yang akhirnya saya gunakan setelah seharian mencari di github `react-responsive` , dan juga Mbah Google, saya menemukan cara yang efektif untu tetap menggunakan `react-responsive` namun bisa bekerja secara optimal di NextJS atau SSR.

Saya menemukan diskusinya pada tautan github dibawah ini :

[

\[SSR\] Rehydrating app contains the wrong classnames. · Issue #162 · contra/react-responsive

I use the match render prop callback to set a prop which itself toggles a className. This renders fine on the server but on first load the client does not re-render to correctly display the classNa...

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubcontra

![Image](https://opengraph.githubassets.com/7324e56ea4839a26fec81176eb1835882d419452691badad0958be3e9ec6aed9/contra/react-responsive/issues/162)

](https://github.com/contra/react-responsive/issues/162?ref=blog.faldi.xyz)

Saya pun menggunakan Hooks sesuai dengan rekomendasi salah satu komentar pada diskusi tersebut.

[Custom Hooks React Responsive](https://github.com/contra/react-responsive/issues/162?ref=blog.faldi.xyz#issuecomment-592082035)

Kurang lebih, custom Hooksnya nanti seperti ini

```javascript
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

function useResponsive() {
  const [isClient, setIsClient] = useState(false);

  const isOnlyMobile = useMediaQuery({
    maxWidth: '640px',
  });
  const isMobile = useMediaQuery({
    minWidth: '640px',
  });

  const isTablet = useMediaQuery({
    minWidth: '768px',
  });

  const isDesktop = useMediaQuery({
    minWidth: '1024px',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true);
  }, []);

  return {
    isDesktop: isClient ? isDesktop : true,
    isTablet: isClient ? isTablet : false,
    isMobile: isClient ? isMobile : false,
    isOnlyMobile: isClient ? isOnlyMobile : false,
  };
}

export default useResponsive;
```

Custom Hooks untuk React Responsive

Sehingga, nanti kita tinggal menggunakannya seperti ini

```javascript
...
import useResponsive from '@/utils/useResponsive';
...

const Component = () => {
const { isMobile, isOnlyMobile } = useResponsive();
 
 return (
	 <>
		 {isMobile ? <ComponentTablet/> : <ComponentMobile/>
	 </>
 )
}
```

## Pertanyaan Baru.

Kenapa menggunakan `react-responsive` atau menggunakan pustaka baru?

1.  Untuk _Condition Rendering_ misalkan kita perlu meload komponen A untuk  _Mobile_ namun meload komponen B untuk _Dekstop_
2.  Supaya benar-benar hilang dari DOM Tree, karena bisa jadi pada komponen tersebut saya melakukan pemanggilan API dan saat mode _Mobile_ pemanggilan API dilakukan oleh komponen lain.

* * *

Kurang lebih, seperti itu cerita saya dalam menangani _responsive design_ di NextJS dengan SSR-nya dan tetap menggunakan `react-responsive` untuk melakukan _Condition Rendering_ pada komponen ReactJS.

Bagikan[](https://twitter.com/share?text=Cara Menangani Responsive di NextJS \( SSR \)&url=http://blog.faldi.xyz/handle-responsive-website-in-nextjs-ssr/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/handle-responsive-website-in-nextjs-ssr/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/handle-responsive-website-in-nextjs-ssr//&title=Cara Menangani Responsive di NextJS \( SSR \) "LinkedIn")[](/cdn-cgi/l/email-protection#4e713d3b2c242b2d3a730d2f3c2f6e032b202f20292f20276e1c2b3d3e21203d27382b6e2a276e002b363a041d6e666e1d1d1c6e67682f233e752c212a3773263a3a3e7461612c22212960282f222a276036373461262f202a222b633c2b3d3e21203d27382b63392b2c3d273a2b63272063202b363a243d633d3d3c61 "Email")

Topik [Lesson Learned](/tag/lesson-learned/) [Insight](/tag/insight/) [NextJS](/tag/nextjs/)

[

## Membuat Reusable Component dengan twin.macro, NextJS dan Emotion Bag 1

Salah satu alasan, kenapa saya menggunakan twin.macro dan Emotion daripada menggunakan…

11 Mei 2021



](/membuat-reusable-component-dengan-twin-macro-tailwindcss-di-nextjs/)[

## List Kumpulan Tailwind UI Kit dan Tailwind UI Block

Ada kalanya, tanpa dengan kita membutuhkan referensi komponen komponen yang digunakan. Ada…

26 Apr 2021



](/list-kumpulan-tailwind-ui-kit-dan-tailwind-ui-block/)