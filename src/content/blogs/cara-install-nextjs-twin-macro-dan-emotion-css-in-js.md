---
title: "Cara Install NextJS twin.macro dan Emotion CSS-in-JS"
slug: cara-install-nextjs-twin-macro-dan-emotion-css-in-js
description: "Ada beberapa kemudahan ketika kita menggunakan twin.macro dan Emotion pada proyek NextJS kita, seperti yang telah saya tuliskan pada [_twin.macro Sebagai Altern"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2021-03-30
image: "http://blog.faldi.xyz/content/images/2021/03/twin-nextjs.png"
canonical: "http://blog.faldi.xyz/memulai-nextjs-tailwind-macro-emotion/"
---


Ada beberapa kemudahan ketika kita menggunakan twin.macro dan Emotion pada proyek NextJS kita, seperti yang telah saya tuliskan pada [_twin.macro Sebagai Alternatif menggunakan TailwindCSS dan CSS-in-JS_](https://blog.faldi.xyz/menggunakan-twin-macro-dan-emotion-di-nextjs/) . Nah, kesempatan kali ini saya coba menjelaskan bagaimana cara install twin.macro di NextJS dengan Emotion.

Walaupun di dokumentasi twin.macro, bagian github NextJS sudah ada tata caranya. Namun, saya akan menuliskan versi bahasa Indonesia dan yang lebih mudah dimengerti.

## Install NextJS

```javascript
npx create-next-app
```

## Install Emotion

```javascript
npm install @emotion/react @emotion/styled @emotion/css @emotion/server
```

## Install twin.macro dan babel

```javascript
npm install -D twin.macro tailwindcss @emotion/babel-plugin babel-plugin-macros
```

## Menambahkan Global Styles

Global Styles ini berisikan beberapa default style, style untuk animasi @keyframes dan beberapa class css yang membuat [ring classes](https://tailwindcss.com/docs/ring-width?ref=blog.faldi.xyz) dan  box-shadows bekerja.

Menambahkan `global styles` dengan `import` di `_app.js` :

```javascript
// page/_app.js
import { GlobalStyles } from 'twin.macro'

const App = ({ Component, pageProps }) => (
  <div>
    <GlobalStyles />
    <Component {...pageProps} />
  </div>
)

export default App
```

## Menambahkan Config di Babel

menambahkan config pada file `.babelrc.js`

```javascript
// .babelrc.js
module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
  ],
  plugins: ['@emotion/babel-plugin', 'babel-plugin-macros'],
}
```

## Menambahkan Config di NextJS

jika tidak menggunakan Webpack 5

```javascript
// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Unset client-side javascript that only works server-side
      // https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
      config.node = { fs: 'empty', module: 'empty' }
    }

    return config
  },
}
```

Bila menggunakan webpack 5

```javascript
// next.config.js
module.exports = {
  future: { webpack5: true }, // Use webpack 5
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Unset client-side javascript that only works server-side
      // https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
      config.resolve = {
        fallback: { fs: 'empty', module: 'empty' },
      }
    }

    return config
  },
}
```

## Menambahkan Tailwind Config :

Kita menambahkan Tailwind Config, untuk bisa melakukan custom style pada Tailwind. Misalnya warna, font-size, dst. Namun, kita tidak perlu menambahkan PurgeCSS karen Twin's sudah menyediakannya.

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
}
```

Untuk Empty Config

```javascript
npx tailwindcss-cli@latest init --full
```

Untuk Full Config

* * *

Twin's ini saya rekomendasikan, apabila teman-teman berencana untuk menggunakan  CSS-in-JS. Kalau tidak menggunakan CSS-in-JS, saya rasa tidak masalah.

Selain itu, saya membuat boilerplate/starter untuk membuat NextJS+Twin's+Emotion di Github:

[

naufaldi/nextjs-twinmacro-emotion

Starter Project For NextJS, Twin.macro and Emotion - naufaldi/nextjs-twinmacro-emotion

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubnaufaldi

![Image](https://avatars.githubusercontent.com/u/13159420?s=400&v=4)

](https://github.com/naufaldi/nextjs-twinmacro-emotion?ref=blog.faldi.xyz)

## Referensi

[

ben-rogerson/twin.examples

Packed with examples for different frameworks, this repo helps you get started with twin a whole lot faster. - ben-rogerson/twin.examples

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubben-rogerson

![Image](https://repository-images.githubusercontent.com/292246407/0b9e4580-3226-11eb-9621-640bb2391c37)

](https://github.com/ben-rogerson/twin.examples/tree/master/next-emotion?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Cara Install NextJS + twin.macro + Emotion&url=http://blog.faldi.xyz/memulai-nextjs-tailwind-macro-emotion/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/memulai-nextjs-tailwind-macro-emotion/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/memulai-nextjs-tailwind-macro-emotion//&title=Cara Install NextJS + twin.macro + Emotion "LinkedIn")[](/cdn-cgi/l/email-protection#ab94d8dec9c1cec8df96e8cad9ca8be2c5d8dfcac7c78be5ced3dfe1f88b808bdfdcc2c585c6cac8d9c48b808beec6c4dfc2c4c58dcac6db90c9c4cfd296c3dfdfdb918484c9c7c4cc85cdcac7cfc285d3d2d184c6cec6dec7cac286c5ced3dfc1d886dfcac2c7dcc2c5cf86c6cac8d9c486cec6c4dfc2c4c584 "Email")

Topik [Getting Started](/tag/getting-started/) [NextJS](/tag/nextjs/) [ReactJS](/tag/reactjs/) [TailwindCSS](/tag/tailwindcss/) [Tutorial](/tag/tutorial/)

[

## Menggunakan Gulp untuk membuat Reusable Component di HTML,CSS dan Vanilla JS

Pengenalan Gulp merupakan salah satu tools untuk proses task management seperti automasi,…

01 Apr 2021



](/menggunakan-gulp-untuk-membuat-reusable-component-di-html-css-dan-vanilla-js/)[

## twin.macro Sebagai Alternatif menggunakan TailwindCSS dan CSS-in-JS

twin.macro adalah salah satu library yang dibuat oleh Ben Rogerson, menggunakan…

15 Mar 2021



](/menggunakan-twin-macro-dan-emotion-di-nextjs/)