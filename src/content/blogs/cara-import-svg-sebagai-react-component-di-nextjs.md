---
title: "Cara Import SVG sebagai React Component di NextJS"
slug: cara-import-svg-sebagai-react-component-di-nextjs
description: "NextJS secara default tidak mendukung untuk bisa melakukan import pada SVG sebagai sebuah React Component. Sehingga, kita akan kesulitan bila melakukan perubaha"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2020-11-10
image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;fm&#x3D;jpg&amp;crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;w&#x3D;2000&amp;fit&#x3D;max&amp;ixid&#x3D;eyJhcHBfaWQiOjExNzczfQ"
canonical: "http://blog.faldi.xyz/cara-import-svg-sebagai-react-component-di-nextjs/"
---

### Problem

NextJS secara default tidak mendukung untuk bisa melakukan import pada SVG sebagai sebuah React Component. Sehingga, kita akan kesulitan bila melakukan perubahan atau _customize_ pada SVG yang kita miliki

### Pranala

Mungkin sebelumnya, teman-teman sedikit bertanya tanya. Kenapa kita harus mengimport SVG sebagai sebuah React Component? Bukankah lebih baik untuk melakukan hal hal pada umumnya? Menggunakan element / tag <img/> lalu import sumber gambar ?  
Jawabannya, teman-teman bisa temukan pada artikel saya sebelumnya :

NextJS memang support untuk static file serve, kita bisa menggunaka gambar dalam format apapun termasuk dengan SVG. Namun, tidak seperti Create React App yang bisa secara otomatis mengimport SVG untuk dijadikan component, kita harus menggunakan cara yang berbeda.

### Solusi

Caranya adalah dengan menggunakan salah satu packages dengan menggunakan babel dari Airbnb yaitu babel-plugin-inline-react-svg ( [Github](https://github.com/airbnb/babel-plugin-inline-react-svg?ref=blog.faldi.xyz) ).

**Pertama**, kita tambahkan babel-plugin-inline-react-svg pada proyek kita

```sh
npm install --save-dev babel-plugin-inline-react-svg
```

**Kedua**, kita tambahkan `config` untuk babel kita dengan membuat file baru di root folder NextJS kita dengan nama `.babelrc` dan dalam `.babelrc` kita tuliskan sebaga berikut

```
{
  "presets": ["next/babel"],
  "plugins": ["inline-react-svg"]
}
```

`presets` kita tulis seperti itu sesuai dengan dokumentasi di [NextJS](https://nextjs.org/docs/advanced-features/customizing-babel-config?ref=blog.faldi.xyz). Kalau kita menghapusnya, kita tidak akan bisa menggunakan dan akan memunculkan error. Sedangkan `plugins` kita tuliskan seperti itu karena saat ini kita sedang menggunakan plugins babel untuk import react svg sebagai sebuah komponen.

Ketiga, cara penulis dan import sebagai komponen berbeda dengan kita menuliskan di CRA. Kalau CRA menuliskan seperti ini

```javascript
import { ReactComponent as IconSearch } from '../assets/icons/icon-search.svg';
```

maka pada NextJS kita menuliskan seperti ini :

```javascript
import IconSearch from '../assets/icons/icon-search.svg';
```

lengkapnya kurang lebih seperti ini :

```js
import IconSearch from '../assets/icons/icon-search.svg';

export default function Home() {
  return (
    <div>
      <IconSearch className="w-8 h-6" />
      <h1>Hello Next.js</h1>
    </div>
  )
}
```

Cara lain sebenarnya  bisa dengan menggunakan [SVGR](https://github.com/gregberge/svgr?ref=blog.faldi.xyz) namun, kita harus setup di Webpacknya serta saya sendiri belum pernah mencobanya dan saat membaca-baca, saya merasa cara dengan menggunakan babel lebih mudah digunakan apalagi bagi mereka yang masih belajar menggunakan Webpack.

### Dukung Saya di Karyakarsa :

[

Dukung Naufaldi Rafif S di Karyakarsa!

Dukung Naufaldi Rafif S di Karyakarsa!

![Image](https://karyakarsa.com/naufaldisatriya/icons/favicon-96x96.png)

![Image](https://karyakarsa.s3.ap-southeast-1.amazonaws.com/header-5e38f4d4bc716.jpg)

](https://karyakarsa.com/naufaldisatriya/tip?ref=blog.faldi.xyz)

### Sumber Lain :

[

How to Import SVGs into your Next.js Project?

Next.js is my go-to framework for building any type of frontend applications. It has many things pre-configured right out of the box. For example, you have built-in support for css, css modules, sass etc. It also comes with built-in support for envir...

![Image](https://cdn.hashnode.com/res/hashnode/image/upload/v1601899954202/Y7Lmb5FOC.png?auto=format&q=60&fm=png)Bhanu Teja PachipulusuBhanu Teja Pachipulusu

![Image](https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1597579532485%2FbXn1tgUE4.png%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dformat%26q%3D60)

](https://blog.bhanuteja.dev/how-to-import-svgs-into-your-nextjs-project?ref=blog.faldi.xyz)

[

How To Import SVGs into NextJS

How to import SVGs into your NextJS TypeScript project using a custom babel or webpack configuration.

![Image](https://miro.medium.com/fit/c/152/152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png)Frontend DigestMalcolm Laing

![Image](https://miro.medium.com/max/1200/0*Sc5mz4SGyfftQeb_)

](https://medium.com/frontend-digest/how-to-import-svgs-into-nextjs-8ec6100e613f?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Cara Import SVG sebagai React Component di NextJS&url=http://blog.faldi.xyz/cara-import-svg-sebagai-react-component-di-nextjs/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/cara-import-svg-sebagai-react-component-di-nextjs/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/cara-import-svg-sebagai-react-component-di-nextjs//&title=Cara Import SVG sebagai React Component di NextJS "LinkedIn")[](/cdn-cgi/l/email-protection#68571b1d0a020d0b1c552b091a0948210518071a1c483b3e2f481b0d0a090f0901483a0d090b1c482b07051807060d061c480c0148260d101c223b4e090518530a070c1155001c1c185247470a04070f460e09040c0146101112470b091a0945010518071a1c451b1e0f451b0d0a090f0901451a0d090b1c450b07051807060d061c450c0145060d101c021b47 "Email")

Topik [Tutorial](/tag/tutorial/) [NextJS](/tag/nextjs/)

[

## Dunia Programming Tidak Hanya Berkutat seputar Logika dan Matematika

Kemarin lusa, saya mendapatkan permintaan jawaban menarik di Quora Indonesia. Q: Saya…

10 Nov 2020



](/dunia-programming-tidak-hanya-berkutat-seputar-logika-dan-matematika/)[

## Alasan Import SVG sebagai React Component

Permasalahan Pertama Pernah tidak mencoba untuk merubah warna SVG ? Entah kebutuhannya saat…

09 Nov 2020



](/alasan-import-svg-sebagai-react-component/)