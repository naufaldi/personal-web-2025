---
title: "Outline Blue dan Aksesibilitas pada Chakra UI"
slug: outline-blue-dan-aksesibilitas-pada-chakra-ui
description: "Pernah tidak, teman-teman saat pergi berkunjung ke setiap website yang menggunakan Chakra UI terdapat sebuah kesamaan? Seperti ini misalnya"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2021-06-07
image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wxfDF8YWxsfDF8fHx8fHwyfHwxNjIzMDQ4NDg1&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/outline-blue-dan-accesbility-pada-chakra-ui/"
---

Pernah tidak, teman-teman saat pergi berkunjung ke setiap website yang menggunakan Chakra UI terdapat sebuah kesamaan? Seperti ini misalnya

![Image](https://blog.faldi.xyz/content/images/2021/06/image.png)

Sumber : Web Ksana.in 

![Image](https://blog.faldi.xyz/content/images/2021/06/image-1.png)

Sumber : Web Future Bright 

![Image](https://blog.faldi.xyz/content/images/2021/06/image-2.png)

Sumber : NextJS Chakra Notion

Sudah mendapatkan kesamaannya? Benar, yaitu munculnya garis biru pada setiap element `a` dan saat state element tersebut `focus:` .

Hal ini membuat saya bertanda tanya, kenapa Chakra UI memberikan `focus:box-shadow` yang ternyata adalah property `box-shadow` bukan `border` atau `outline` pada setiap element.

Ternyata, setelah saya mencari cari, itu terkait dengan Accesibility yang mengacu kepada WAI-ARIA standards. WAI-ARIA merupakan [Web Accessibility Initiative's Accessible Rich Internet Applications](https://www.w3.org/TR/wai-aria/?ref=blog.faldi.xyz) atau bisa disebut secara singkat adalah ARIA merupakan Strategi, standar, informasi untuk membuat Web aksesibel bagi penyandang disabilitas.

Lantas, apa hubungannya penggunaan `box-shadow` pada tag element `a` di HTML? Berdasarkan Tips dari a11yproject disebutkan bahwa

> Menghapus outlines di CSS dapat mempersulit / memunculkan masalah bagi para orang-orang yang menavigasikan web dengan menggunakan keyboard.

Sumber : [https://www.a11yproject.com/posts/2013-01-25-never-remove-css-outlines/](https://www.a11yproject.com/posts/2013-01-25-never-remove-css-outlines/?ref=blog.faldi.xyz)  

Alasannya, dengan menghapuskan `box-shadow` atau mungkin `outline` di CSS menjadikan sebuah element link atau element tidak memiliki indikator focus kepada para pengguna  yang menggunakan keyboard untuk melakukan navigasi.

Masalah lainnya, bagi para pengguna mouse atau klien merasa bahwa `box-shadow` atau `outline` css di element link atau indikator fokus ini secara visual menjadi cukup buruk dan mungkin malah menginginkan fokus yang lain. Malah paling ekstrim ada kalanya, klien meminta dihilangkan sebuah `focus` elementnya.

### Solusi

Beruntungnya, pada salah satu pembahasan `outline` ini di [Issues Github Chakra UI](https://github.com/chakra-ui/chakra-ui/issues/3449?ref=blog.faldi.xyz) ada yang memberikan sebuah tautan mengenai cara memanipulasinya.

Menggunakan Package focus-visible

[

focus-visible

Polyfill for :focus-visible pseudo-selector

![Image](https://static.npmjs.com/1996fcfdf7ca81ea795f67f093d7f449.png)npm

![Image](https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png)

](https://www.npmjs.com/package/focus-visible?ref=blog.faldi.xyz)

Salah satu packages yang bisa menghilangkan `focus` pada pengguna mouse namun bisa memunculkan `focus` pada pengguna keyboard.

## Cara Pemasangan :

### Install Packagesnya pada Folder root

```
npm install focus-visible
```

### Import Focus Visible

Kalau menggunakan menggunakan NextJS, import \``'focus-visible/dist/focus-visible'` pada file `_app.js` misalnya

```javascript
import { useEffect } from 'react';

import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
// import focus visible
import 'focus-visible/dist/focus-visible';


import Fonts from '@/styles/fonts';
import customTheme from '@/styles/customTheme';
import '@/styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Fonts />
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
```

### Menambahkan Style CSS

Ini dimaksudkan, agar `focus` masih bisa muncul saat user menggunakan keyboard. Namun, tidak muncul saat user menggunakan Mouse.

Tambahkan kode berikut pada file `global.css`

```css
  .js-focus-visible :focus:not([data-focus-visible-added]) {
     outline: none;
     box-shadow: none;
   }
```

Sehingga menjadi seperti ini

```css
/* Global CSs Here */
.js-focus-visible :focus:not([data-focus-visible-added]) {
  outline: none;
  box-shadow: none;
}
```

global.css

Pastikan, file `global.css` diimport pada aplikasi NextJS kita dan Bimsalabim! Selesai!

Hasilnya, dapat dipastikan apabila kita menggunakan Mouse tidak muncul `box-shadow` lagi para element yang sedang `focus` namun akan muncul saat menggunakan Keyboard.

Sehingga munculah pertanyaan baru. Apakah yang akan terjadi apabila kita hanya menggunakan Keyboard untuk navigasi di halaman website kita? Ini akan jadi pembahasan menarik pada tulisan selanjutnya.

## Referensi

[

Quick tip: Never remove CSS outlines - The A11Y Project

Removing CSS outlines without proper fallbacks can make it impossible to navigate your site with a keyboard.

![Image](https://www.a11yproject.com/apple-touch-icon.png)The A11Y Project The A11Y ProjectGuilherme Simões

![Image](https://a11yproject.com/img/social/og-image-home.png)

](https://www.a11yproject.com/posts/2013-01-25-never-remove-css-outlines/?ref=blog.faldi.xyz)

[

Accessibility on-demand with Chakra-ui and focus-visible

tl;dr The Chakra-ui component library overrides the default accessibility outline with it’s own box-shadow property. Use the focus-visible package on npm to override this css property instead of the…

![Image](https://miro.medium.com/fit/c/152/152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png)MediumKeegan Famouss

![Image](https://miro.medium.com/max/1200/1*mmn9zryoWF3WKw7a345zMw.png)

](https://medium.com/@keeganfamouss/accessibility-on-demand-with-chakra-ui-and-focus-visible-19413b1bc6f9?ref=blog.faldi.xyz)

[

Blue outline borders around all clickable components ugly · Issue #708 · chakra-ui/chakra-ui

I&#39;m getting blue outline borders around all my clickable components, for example Button, Tab, and AccordionHeader. I realize this is likely related to default behavior in Chrome, but it&#39;s q...

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubchakra-ui

![Image](https://opengraph.githubassets.com/258ba5407b9b3449a6829f05d551cbbd1854b4cf2d50c327b2b8e50353bbc12a/chakra-ui/chakra-ui/issues/708)

](https://github.com/chakra-ui/chakra-ui/issues/708?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Outline Blue dan Aksesibilitas pada Chakra UI&url=http://blog.faldi.xyz/outline-blue-dan-accesbility-pada-chakra-ui/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/outline-blue-dan-accesbility-pada-chakra-ui/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/outline-blue-dan-accesbility-pada-chakra-ui//&title=Outline Blue dan Aksesibilitas pada Chakra UI "LinkedIn")[](/cdn-cgi/l/email-protection#88b7fbfdeae2edebfcb5c7fdfce4e1e6eda8cae4fdeda8ece9e6a8c9e3fbedfbe1eae1e4e1fce9fba8f8e9ece9a8cbe0e9e3fae9a8ddc1aee9e5f8b3eae7ecf1b5e0fcfcf8b2a7a7eae4e7efa6eee9e4ece1a6f0f1f2a7e7fdfce4e1e6eda5eae4fdeda5ece9e6a5e9ebebedfbeae1e4e1fcf1a5f8e9ece9a5ebe0e9e3fae9a5fde1a7 "Email")

Topik [Insight](/tag/insight/) [Lesson Learned](/tag/lesson-learned/) [NextJS](/tag/nextjs/) [ChakraUI](/tag/chakraui/) [Accesibility](/tag/accesibility/) [CSS](/tag/css/)

[

## Add Meta Description on NextJS

Meta description adalah salah satu hal yang cukup vital dalam dunia website,…

18 Jun 2021



](/add-meta-description-on-nextjs/)[

## Membuat Reusable Component dengan twin.macro, NextJS dan Emotion Bag 1

Salah satu alasan, kenapa saya menggunakan twin.macro dan Emotion daripada menggunakan…

11 Mei 2021



](/membuat-reusable-component-dengan-twin-macro-tailwindcss-di-nextjs/)