---
title: "Menggunakan AOS Animation Library di NextJS"
slug: menggunakan-aos-animation-library-di-nextjs
description: "Sebelumnya, saya menggunakan Framer Motion untuk membuat animation di Web Apps NextJS. Namun, belakangan ini menyadari adakalanya Framer Motion terlalu Overkill"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2021-06-22
image: "https://images.unsplash.com/photo-1621570276710-2ab2255ab105?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wxfDF8YWxsfDZ8fHx8fHwyfHwxNjI0MzU1MTcy&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/menggunakan-wowjs-dan-anime/"
---


## Problem

Sebelumnya, saya menggunakan Framer Motion untuk membuat animation di Web Apps NextJS. Namun, belakangan ini menyadari adakalanya Framer Motion terlalu Overkill. Memang, overkill atau over engineering itu bagus untuk kita belajar. Namun, saya juga perlu explorasi yang lain. Kira-kira menyesuaikan kebutuhan untuk  project yang akan dibangun. Misalnya saja beberapa situs yang saya buat menggunakan Framer Motion untuk sekedar animasi on scroll page yaitu

[

Landingpage Cryptocurrency. Build from NextJS by DipaInhouse.

Landingpage Cryptocurrency. Build from NextJS by DipaInhouse.

![Image](https://crypto-landingpage.vercel.app/favicon.ico)CoinbaseNiko ChristiAccountant - Morkisa

![Image](https://crypto-landingpage.vercel.app/assets/pattern/eclipse-1.svg)

](https://crypto-landingpage.vercel.app/?ref=blog.faldi.xyz)

[

Collabs Landingpage

![Image](https://collabs-landing.vercel.app/favicon.ico)

![Image](https://collabs-landing.vercel.app/assets/img/cursor-animation/hero-2.svg)

](https://collabs-landing.vercel.app/?ref=blog.faldi.xyz)

Memang menggunakan Framer Motion membuat kita menjadi lebih mudah untuk melakukan kustomisasi dalam membuat animasi, kita bahkan bisa menganimasikan element apapun. Nah, saat waktu project yang kita kerjakan sangat sedikit, waktu untuk memberikan animasi begitu sedikit, maka saya memerlukan sebuah library yang bisa memberikan _animasi on scroll_ secara instant. Karena, Framer Motion memerlukan library tambahan seperti `react-intersection-observer` untuk bisa mendeteksi inview atau saat sebuah element berada pada view user.

## Solution

Saya pun menemukan [https://wowjs.uk/](https://wowjs.uk/?ref=blog.faldi.xyz) dan berencana menggunakan [https://animate.style/](https://animate.style/?ref=blog.faldi.xyz) sayangnya, lisensi Wow JS tidak memperbolehkan secara gratis apabila digunakan untuk keperluan komersial. Harus membayar untuk bisa digunakan pada project komersial.

![Image](https://blog.faldi.xyz/content/images/2021/06/Screen-Shot-2021-06-22-at-16.56.07.png)

Sumber : https://github.com/matthieua/WOW

Sehingga saya pun mencari solusi lain dan menemukan AOS.

[

AOS - Animate on scroll library

Animate On Scroll library using CSS3

Animate on scroll library

![Image](https://michalsnik.github.io/aos/img/github_octocat.png)

](https://michalsnik.github.io/aos/?ref=blog.faldi.xyz)

![Image](https://blog.faldi.xyz/content/images/2021/06/Screen-Shot-2021-06-22-at-16.58.14.png)

AOS

Hebatnya, semua dalam satu cakupan. Animasi, Deteksi scroll dan tidak menggunakan JQuery. Tentu saja, artinya kita bisa menambahkannya dengan NextJS bukan?

Beberapa animasi yang disediakan antara lain :

*   Fade Animation
*   Flip Animation
*   Slide Animation
*   Zoom Animation

## Cara Memasang AOS di NextJS

### Install via NPM

```javascript
npm install --save aos@next
```

### Import AOS

Melalui `_app` dengan import lib aos dan stylenya.

```javascript
...
import AOS from 'aos';
import 'aos/dist/aos.css';
...

function MyApp({ Component, pageProps }) {
 
  return (
    <>
    ...
        <Component {...pageProps} />
	...
    </>
  );
}

export default MyApp;
```

### Inisasi AOS

Menggunakan `useEffect` kita melakukan inisasi AOS. Saya menyarankan untuk menambahkan beberapa global setting yaitu `easing`, `once` dan `offset` . Misalnya seperti ini

```javascript
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

...

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 50,
    });
  });
  return (
    <>
     ...
     <Component {...pageProps} />
      ...
    </>
  );
}

export default MyApp;
```

### Cara Menggunakan  AOS

Cukup menambahkan `data-aos="namaAnimasi"` misalkan `data-aos="fade-up` . Nama, nama animasi bisa dilihat di dokumentasi AOS. Contohnya menambahkannya pada component Chakra UI berikut:

```javascript
          <Heading
            as="h2"
            fontWeight="600"
            textAlign={{ base: 'center', sm: 'left' }}
            fontSize={{ base: '30px', sm: '54px' }}
            lineHeight={{ base: '36px', lg: '64.8px' }}
            data-aos="fade-left"
          >
            Did you know?
          </Heading>
```

Komponen Heading

Untuk lebih smooth, kita bisa menambahkan delay, `data-aos-delay="200"` (dalam waktu `ms`) seolah olah animasinya saling menunggu. Misalnya seperti ini

```javascript
          <Heading
            as="h2"
            fontWeight="600"
            textAlign={{ base: 'center', sm: 'left' }}
            fontSize={{ base: '30px', sm: '54px' }}
            lineHeight={{ base: '36px', lg: '64.8px' }}
            data-aos="fade-left"
          >
            Did you know?
          </Heading>
          <Text
            fontSize={{ base: '18px', sm: '24px' }}
            lineHeight="31.2px"
            my={{ base: '22px', sm: '43px' }}
            textAlign={{ base: 'center', sm: 'left' }}
            data-aos="fade-left"
            data-aos-delay="200"
          >
           lorem ipsum dolor amet sir 
          </Text>
```

Komponen Text

* * *

Semoga membantu!

## Referensi :

[

michalsnik/aos

Animate on scroll library. Contribute to michalsnik/aos development by creating an account on GitHub.

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubmichalsnik

![Image](https://opengraph.githubassets.com/4a639a8f775d87e394706ac2a964c496b2135ac047e29832c687aece8a994ac0/michalsnik/aos)

](https://github.com/michalsnik/aos?ref=blog.faldi.xyz)

[

AOS - Animate on scroll library

Animate On Scroll library using CSS3

Animate on scroll library

![Image](https://michalsnik.github.io/aos/img/github_octocat.png)

](https://michalsnik.github.io/aos/?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Menggunakan AOS Animation Library di NextJS&url=http://blog.faldi.xyz/menggunakan-wowjs-dan-anime/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/menggunakan-wowjs-dan-anime/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/menggunakan-wowjs-dan-anime//&title=Menggunakan AOS Animation Library di NextJS "LinkedIn")[](/cdn-cgi/l/email-protection#ad92ded8cfc7c8ced990e0c8c3cacad8c3ccc6ccc38dece2fe8decc3c4c0ccd9c4c2c38de1c4cfdfccdfd48dc9c48de3c8d5d9e7fe8bccc0dd96cfc2c9d490c5d9d9dd978282cfc1c2ca83cbccc1c9c483d5d4d782c0c8c3cacad8c3ccc6ccc380dac2dac7de80c9ccc380ccc3c4c0c882 "Email")

Topik [ChakraUI](/tag/chakraui/) [CSS](/tag/css/) [NextJS](/tag/nextjs/) [Tutorial](/tag/tutorial/)

[

## Pattern Blur Image, memilih antara SVG atau PNG

Sebulan terakhir ini, saya mendapatkan salah satu pekerjaan untuk implementasi sebuah situs…

09 Sep 2021



](/pattern-blur-memilih-antara-svg-atau-png/)[

## Snippet Membuat Gradient Underline

Masalah Beberapa hari kemarin, saya mendapatkan tugas untuk membuat sebuah warna gradient…

22 Jun 2021



](/membuat-gradient-underline/)