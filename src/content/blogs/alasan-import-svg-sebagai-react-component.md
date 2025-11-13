---
title: "Alasan Import SVG sebagai React Component"
slug: alasan-import-svg-sebagai-react-component
description: "Pernah tidak mencoba untuk merubah warna SVG ? Entah kebutuhannya saat pengguna melakukan hover pada element SVG tersebut atau untuk menyesuaikan SVG dengan tem"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2020-11-09
image: "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;fm&#x3D;jpg&amp;crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;w&#x3D;2000&amp;fit&#x3D;max&amp;ixid&#x3D;eyJhcHBfaWQiOjExNzczfQ"
canonical: "http://blog.faldi.xyz/alasan-import-svg-sebagai-react-component/"
---


### Permasalahan Pertama

Pernah tidak mencoba untuk merubah warna SVG ? Entah kebutuhannya saat pengguna melakukan hover pada element SVG tersebut atau untuk menyesuaikan SVG dengan tema dari situs kita ?

### Permasalahan Kedua

Pernah tidak menggunakan SVG sebagai inline element di HTML dan saat dibuka pada browser Chrome, SVG sebagai inline element tidak bisa compatible dengan Chrome dan hanya compatible dengan Firefox ?

### Permasalahan Ketiga

Pernah tidak ingin merubah ukuran SVG langsung, namun disaat yang bersamaan juga merubah warna SVG tersebut?

Kalau teman-teman pernah merasakan yang sama dan setelah saya _ubek-ubek_ di interneti akhirnya, ketemulah cara untuk membuat hal-hal tersebut yaitu dengan merubah SVG tersebut menjadi sebuah React Component.

Konteksnya, saat kita menggunakan ReactJS / Create React App, kita bisa mengimport SVG untuk dijadikan sebuah komponen daripada kita harus membuatnya inline element di HTML.

### Contoh Inline SVG Component di HTML

```javascript
 <p className="flex items-center text-font-gray opacity-50">
                  Beranda{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 opacity-100 mx-2"
                    viewBox="0 0 11.384 20.025"
                  >
                    <g
                      id="Group_4034"
                      data-name="Group 4034"
                      transform="translate(1.414 1.414)"
                    >
                      <line
                        id="Line_452"
                        data-name="Line 452"
                        x2="12.099"
                        transform="translate(8.555 8.642) rotate(135)"
                        fill="none"
                        stroke="#596375"
                        strokeLinecap="round"
                        strokeWidth="2"
                      />
                      <line
                        id="Line_453"
                        data-name="Line 453"
                        x2="12.099"
                        transform="translate(8.555 8.555) rotate(-135)"
                        fill="none"
                        stroke="#596375"
                        strokeLinecap="round"
                        strokeWidth="2"
                      />
                    </g>
                  </svg>
                </p>
```

Kalau kita menggunakan inline element, tentu saja kita bisa menyelesaikan permasalahan pertama dan ketiga. Sayangnya, akan muncul permasalahan kedua dengan tidak compatible svg ke chrome ( saya pernah mengalaminya) dan masalah lain yang muncul adalah kode editor menjadi lebih lebar,dan terlihat jelek karena satu SVG yang menyimpan data path, dan line akan memenuhi kode editor kita.

Sedangkan kalau kita menggunakan tag element img maka

### Contoh Import SVG dengan tag element img

```javascript
import IconSuccess from '../../assets/icons/success-icons.svg'

<img src={IconSuccess} className="w-5/12 mb-6" alt=""/>
```

Kita benar memecahkan masalah Kedua, namun timbul masalah pertama dan ketiga karena kita tidak bisa merubah warna pada SVG tersebut.

### Solusi

Jelaslah, sesuai dengan judul tulisan ini. Yaitu dengan melakukan import SVG sebagai sebuah `React Component`. Bagaimana caranya?

```javascript
import React from 'react'
import { ReactComponent as IconSearch } from '../assets/icons/icon-search.svg';

const Tutorial = () => {
  return (
    <div>
      <IconSearch className="w-6 h-6"/>
    </div>
  )
}

export default Tutorial
```

Ya, sesimple itu. `IconSearch` adalah nama dari komponen SVG kita. Sedangkan `ReactComponent as BlaBlaBla` adalah salah satu fitur yang dimiliki oleh `[[email protected]](/cdn-cgi/l/email-protection)` versi keatas, dan `[[email protected]](/cdn-cgi/l/email-protection)` versi keatas.

Dengan kita menggunakan cara ini, kita bisa mengubah SVG sesuai yang kita mau. Mau merubah warna atau fill SVG? Mau merubah size? Mau merubah warna saat hover element atau pseudoclass lain? Bisa.

Oh ya, konteksnya ini bila teman-teman menggunakan `Create React App`. Kalau teman-teman tidak menggunakan CRA. Bisa jadi menggunakan / setup Webpack sendiri atau NextJS maka teman-teman bisa menggunakan `babel-plugin-inline-react-svg`  dari Airbnb. Cek di [Github](https://github.com/airbnb/babel-plugin-inline-react-svg?ref=blog.faldi.xyz) untuk dokumentasinya.

Besok, saya tuliskan bagaimana cara menggunakannya. Stay tune ya!

### Dukung Saya di Karyakarsa :

[

Dukung Naufaldi Rafif S di Karyakarsa!

Dukung Naufaldi Rafif S di Karyakarsa!

![Image](https://karyakarsa.com/naufaldisatriya/icons/favicon-96x96.png)

![Image](https://karyakarsa.s3.ap-southeast-1.amazonaws.com/header-5e38f4d4bc716.jpg)

](https://karyakarsa.com/naufaldisatriya/tip?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Alasan Import SVG sebagai React Component&url=http://blog.faldi.xyz/alasan-import-svg-sebagai-react-component/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/alasan-import-svg-sebagai-react-component/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/alasan-import-svg-sebagai-react-component//&title=Alasan Import SVG sebagai React Component "LinkedIn")[](/cdn-cgi/l/email-protection#f1ce8284939b949285ccb09d9082909fd1b89c819e8385d1a2a7b6d182949390969098d1a394909285d1b29e9c819e9f949f85d7909c81ca939e9588cc99858581cbdede939d9e96df97909d9598df89888bde909d9082909fdc989c819e8385dc828796dc82949390969098dc8394909285dc929e9c819e9f949f85de "Email")

Topik [ReactJS](/tag/reactjs/) [Tutorial](/tag/tutorial/)

[

## Cara Import SVG sebagai React Component di NextJS

Problem NextJS secara default tidak mendukung untuk bisa melakukan import pada SVG…

10 Nov 2020



](/cara-import-svg-sebagai-react-component-di-nextjs/)[

## Cara Setup Tailwind CSS + React Create App (CRA)

Pada kesempatan kali ini, saya mencoba untuk membuat tutorial bagaimana setup / melakukan…

08 Nov 2020



](/cara-setup-tailwind-css-react-create-app-cra/)