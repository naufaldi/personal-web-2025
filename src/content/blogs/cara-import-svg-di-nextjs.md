---
title: "Cara Import SVG di NextJS"
slug: cara-import-svg-di-nextjs
description: "Sebenarnya, untuk import SVG,JPG, Webp dan extension image lain, secara default sudah didukung di NextJS. Misalnya saja"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2020-11-15
image: "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;fm&#x3D;jpg&amp;crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;w&#x3D;2000&amp;fit&#x3D;max&amp;ixid&#x3D;eyJhcHBfaWQiOjExNzczfQ"
canonical: "http://blog.faldi.xyz/cara-import-svg-di-nextjs/"
---


## Permasalahan

Sebenarnya, untuk import SVG,JPG, Webp dan extension image lain, secara default sudah didukung di NextJS. Misalnya saja

```
const Member = () => {
  return (
    <>
      <img
        src="/assets/img/team-1.png"
        alt="Icon Team 1"
        className="h-8 w-8 -mr-2"
      />
    </>
  );
};
```

Permasalahan mulai muncul saat saya ingin mencoba untuk melakukan custom SVG yang saya miliki. Mulai dari merubah warna misalnya seperti yang telah aku jabarkan mengenai alasan menggunakan [_ReactComponent_ untuk SVG](https://blog.faldi.xyz/alasan-import-svg-sebagai-react-component/).

Sehingga saya memerlukan SVG sebagai sebuah _ReactComponent_. Bukan sebagai sebuah element biasa.

## Solusi

Ada 3 solusi yang saat ini saya ketahui.  Namun saya hanya mencoba 2 solusi dari 3 tersebut.

### Pertama menggunakan [SVGR](https://github.com/gregberge/svgr?ref=blog.faldi.xyz).

Sebuah Tools yang mengizinkan kita untuk melakukan import SVG sebagai React Component. Caranya adalah dengan memasang dependencies `@svgr/webpack` pada NextJS kita lalu merubah setup di next.config.js . Caranya bisa membaca di [dokumentasi NextJS](https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config?ref=blog.faldi.xyz) , atau memasangnya seperti ini berdasarkan [tulisan ini](https://medium.com/frontend-digest/how-to-import-svgs-into-nextjs-8ec6100e613f?ref=blog.faldi.xyz)

```
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};
```

Lalu, kita bisa menuliskannya seperti ini

```
mport React from 'react';
import Dog from "./Dog.svg";

export const DogComponent = () => (
  <div>
    <h1>Dogs are nice</h1>
    <Dog classNames="h-4 w-4" />
  </div>
);
```

Benar, caranya berbeda dengan cara import di CRA.

### Kedua, menggunakan babel-plugin-react-svg

Salh satu plugin dari Airbnb dan ini yang sering aku gunakan untuk proyek-proyekku karena cukup merubah / menambah di babelnya. Dokumentasi bisa dilihat [disini](https://github.com/airbnb/babel-plugin-inline-react-svg?ref=blog.faldi.xyz).

*   Install dengan menggunakan perintah

```
npm install --save-dev babel-plugin-inline-react-svg
```

*   Buaf file baru di root folder proyek dengan nama .babelrc dan isikan dengan kode dibawah

```
{
  "presets": ["next/babel"],
  "plugins": ["inline-react-svg"]
}
```

Sehingga saat menuliskan kode nya bisa menjadi seperti ini

```
import React from 'react';
import Dog from "./Dog.svg";

export const DogComponent = () => (
  <div>
    <h1>Dogs are nice</h1>
    <Dog classNames="h-4 w-4" />
  </div>
);
```

Ketiga, dengan mengcopy file SVG tersebut untuk menjadi inline atau component baru. Misalnya kamu memiliki SVG seperti ini :

```svg
<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="4" cy="4" r="4" fill="#FF3333"/>
</svg>
```

Lalu kamu tinggal membuat component baru dari file tersebut menjadi

```
import React from 'react';

export const NotifIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="4" cy="4" r="4" fill="#FF3333"/>
</svg>

)
```

atau menjadi inline

```
export const Notif = () => (
  <div className="flex items-center w-full">
    <div className="bg-blue-200 w-8 h-8 mr-4 rounded flex items-center justify-center">
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="4" cy="4" r="4" fill="#FF3333" />
      </svg>
    </div>
    <h5 className="text-2xl font-semibold  text-gray-100">Event Calendar</h5>
  </div>
);
```

* * *

Saya sendiri memutuskan untuk menggunakan babel dan menjadikannya sebagai React Component karena bisa melakukan custom langsung pada component SVG tersebut seperti merubah warna, ukuran serta mungkin kedepan untuk kebutuhan animasi.

## Sumber :

[

How To Import SVGs into NextJS

How to import SVGs into your NextJS TypeScript project using a custom babel or webpack configuration.

![Image](https://miro.medium.com/fit/c/152/152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png)Frontend DigestMalcolm Laing

![Image](https://miro.medium.com/max/1200/0*Sc5mz4SGyfftQeb_)

](https://medium.com/frontend-digest/how-to-import-svgs-into-nextjs-8ec6100e613f?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Cara Import SVG di NextJS&url=http://blog.faldi.xyz/cara-import-svg-di-nextjs/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/cara-import-svg-di-nextjs/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/cara-import-svg-di-nextjs//&title=Cara Import SVG di NextJS "LinkedIn")[](/cdn-cgi/l/email-protection#83bcf0f6e1e9e6e0f7bec0e2f1e2a3caeef3ecf1f7a3d0d5c4a3e7eaa3cde6fbf7c9d0a5e2eef3b8e1ece7fabeebf7f7f3b9acace1efece4ade5e2efe7eaadfbfaf9ace0e2f1e2aeeaeef3ecf1f7aef0f5e4aee7eaaeede6fbf7e9f0ac "Email")

Topik

[

## Seputar Custom Scrollbar CSS pada Firefox dan Chrome

Problem Desainer merekomendasikan untuk melakukan custom scrollbar pada salah satu desain di…

23 Nov 2020



](/seputar-custom-scrollbar/)[

## Membuat Redirect dengan OnClick / After Event di React

Permasalahan Pernah tidak, memiliki sebuah element yang telah dibuat sedemikian rupa, ternyata…

14 Nov 2020



](/membuat-redirect-onclick-routes/)