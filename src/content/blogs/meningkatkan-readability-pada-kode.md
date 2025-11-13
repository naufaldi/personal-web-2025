---
title: "Meningkatkan Readability pada Kode"
slug: meningkatkan-readability-pada-kode
description: "Ketika berkolaborasi dengan pemrogram yang lain, kita harus bisa memahami kode yang orang lain tulis, memahami bagaimana cara kerja kode tersebut. Sehingga ada"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2021-10-06
image: "https://images.unsplash.com/photo-1600195077909-46e573870d99?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wwfDF8c2VhcmNofDN8fGxlYXJufGVufDB8fHx8MTYzMzUyMzEzMQ&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/meningkatkan-readability-pada-kode/"
---


Ketika berkolaborasi dengan pemrogram yang lain, kita harus bisa memahami kode yang orang lain tulis, memahami bagaimana cara kerja kode tersebut. Sehingga ada kalanya teman atau kolega kita saat membaca kode kita akan merasa seperti

> "Ini dapat props darimana ya?"

> "Maksud kode ini apa ya?"

> "Ini komponen darimana? Visualisasi komponennya seperti apa?"

> "Function ini mengambil darimana? Gunanya untuk apa?"

Artinya kalau ada kolega atau teman yang mengatakan seperti itu, mungkin kode yang kita tulis masih belum bisa menjelaskan maksud dan tujuan dari kode tersebut.

Ini merupakan sebuah masalah, karena kode yang susah dibaca dapat mengakibatkan

*   Pemahaman yang salah akan kode tersebut, sehingga kode tersebut secara tiba-tiba akan direfactor / digunakan tidak sebagaimana mestinya
*   Susah untuk debugging atau bugfixing apabila muncul galat akibat dari logika kode tersebut. Karena function atau component yang dibuat susah untuk "ditemukan" karena penamaan yang buruk
*   Menghabiskan banyak waktu bagi pengembang lain hanya untuk bisa memahami sebuah kode atau komponen, yang seharusnya waktu tersebut digunakan untuk mengimplementasikan kode tersebut, jadinya terpakai hanya untuk memahaminya.

Maka sudah sebaiknya kita sebagai pemrogram untuk bisa menuliskan kode yang bisa dipahami untuk orang lain, beberapa cara yang bisa kita lakukan diantaranya :

## **😶 Membuat Komentar pada Kode**

Ini benar-benar tidak masalah apabila kita menuliskan sebuah komentar pada kode yang kita tulis. Jangan memikirkan terlebih dahulu optimasi apabila kita masih menuliskan kode yang susah untuk dibaca oleh orang lain. Karena seoptimal apapun kode yang kita tulis, tapi tidak bisa dibaca oleh orang lain, apagunanya?

**Misalkan kode komentar itu seperti**

*   Menjelaskan maksud kode tersebut
*   Memberikan informasi "darimana" kode tersebut berasal, apalagi bila menggunakan thirdparty dan kode tersebut agak legacy
*   Komentar untuk TODO yang akan diimplementasikan pada sebuah kode
*   Komentar saat melakukan bug fixing, atau alasan diperlukannya kode tersebut.
*   Menggunakan komentar _oneline_ dan _multiline_

### **Beberapa contoh menulis komentar pada kode misalnya**

```javascript
// NOTE: At least in Firefox 2, if the user drags outside of the browser window,
  // mouse-move (and even mouse-down) events will not be received until
  // the user drags back inside the window. A workaround for this issue
  // exists in the implementation for onMouseLeave().
  @Override
  public void onMouseMove(Widget sender, int x, int y) { .. }
```

Komentar sebagai catatan saat bugfix

```javascript
// Untuk check media query saat useEffect / clientside

const useMediaQueryHook = (width) => {
  const [desktop, setDesktop] = useState(false)
  const isDekstop = useMediaQuery({ minWidth: width })
  useEffect(() => {
    if (isDekstop !== desktop) {
      setDesktop(isDekstop)
    }
    console.log('Dekstop', isDekstop)
  }, [isDekstop])

  return desktop
}
```

Komentar untuk memberikan keterangan, alasan diperlukannya kode tersebut

### **Referensi Terkait Komentar di Kode :**

> [Best practices for writing code comments](https://stackoverflow.blog/2021/07/05/best-practices-for-writing-code-comments/?ref=blog.faldi.xyz)

Selain itu, saya merekomendasikan untuk melakukan penambahan ekstensi di VS Code untuk komentar yang lebih baik, yaitu [Better Comment](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments&ref=blog.faldi.xyz)

![Image](https://blog.faldi.xyz/content/images/2021/10/image.png)

Beberapa variasi better comment di vscode

## **😄 Memberikan Nama yang jelas pada Function**

Tujuannya jelas, agar function yang dibuat hanya memiliki satu tugas sehingga memudahkan seseorang untuk membacanya dan memahami function tersebut bertanggung jawab untuk apa. Sehingga saat membuat function yang satu responsibility, maka akan mudah bagi kita untuk memberikan nama pada function tersebut.

```javascript
function StringToNumber();
function DateToString();
function getActiveUser();
function setActiveUserFromAPI();
```

Beberapa contoh memberikan penamaan yang jelas pada function

## **😲 Memberikan Nama yang jelas pada Component**

Benar, agar saat debugging di Browser Dev Tools menjadi lebih mudah dan menggunakan React Dev Tools semakin mudah karena kita mengetahui mana komponen yang akan kita rubah dan fungsi dari komponen tersebut seperti apa. Mirip sebenarnya dengan tujuan saat memberikan nama pada function, sama-sama agar dimengerti tujuannya seperti apa, isi dari komponen tersebut seperti apa.

```javascript
<CustomDataTable/>
<SelectMultipleUser/>
<TitleHero> Superman <TitleHero/>
<Button variants="primary" size="lg"  />
```

beberapa contoh dalam memberikan penamaan yang jelas pada komponen

Komponen yang dimaksud disini, misalkan ingin membuat re-usable komponen untuk digunakan atau saat menggunakan `styled-component` . Contoh paling mudah memberikan nama, bisa dilihat pada bagaimana framework-framework dalam memberikan nama pada komponennya. Misal

*   [Material UI](https://mui.com/?ref=blog.faldi.xyz)

atau beberapa real project yang pernah saya /dan teman-teman buat :

*   [Logos Fest](https://github.com/logos-engineer/logos-fest?ref=blog.faldi.xyz)
*   [VPN Landingpage](https://github.com/naufaldi/next-landing-vpn?ref=blog.faldi.xyz)
*   [Personal Web](https://github.com/naufaldi/next-landing-vpn?ref=blog.faldi.xyz)
*   [Naufaldi.xyz](https://github.com/naufaldi/naufaldi.xyz?ref=blog.faldi.xyz)

### **Referensi penamaan komponen bisa dilihat pada**

[

Naming Styled Components

At Inturn we spend a lot of time debating and crafting best practices around common patterns. Recently, after converting our styling system to emotion (a styled component library), we ran into a…

![Image](https://miro.medium.com/fit/c/152/152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png)inturn-engOrry Baram

![Image](https://miro.medium.com/max/1200/1*sI1qso8UqytGP7ZQRSwTjg.jpeg)

](https://medium.com/inturn-eng/naming-styled-components-d7097950a245?ref=blog.faldi.xyz)

## 😆 Menggunakan Metodelogi Penamaan

Paling sering penamaan, itu salah satunya adalah CSS. Saya sendiri selama ini selalu menggunakan BEM / Utility-first / Atomic CSS dalam menuliskan CSS.

![Image](https://blog.faldi.xyz/content/images/2021/10/image-1.png)

Metode Penamaan di CSS

Maka saat kita ingin menuliskan class / naming pada CSS kita cukup mengikuti pedoman dengan BEM atau Utility-first. Beberapa contoh misalnya :

```html
// BEM
<button class="btn btn--secondary"></button>

<figure class="photo">
  <img class="photo__img" src="me.jpg">
  <figcaption class="photo__caption">Look at me!</figcaption>
</figure>

<div class="accordion">
 <div class="accordion__item">
    <h3 class="accordion__title js-title">Real Lorem Ipsum by 37signals</h3>
    <p class="accordion__copy accordion__copy--open js-copy">By not having the imagination to imagine what the content "might" be, a design consideration is lost. Meaning becomes obfuscated because "it's just text", understandability gets compromised because nobody realized that this text stuff was actually meant to be read. Opportunities get lost because the lorem ipsum garbage that you used instead of real content didn't suggest opportunities. The text then gets made really small, because, it's not meant to be used, we might as well create loads of that lovely white space.</p>
  </div>
</div>
```

```html
// Utility-first
<button class="flex items-center bg-blue text-base border border-black rounded-lg color-white"></button>

<figure class="flex items-center justify-center mx-auto w-100px h-100px">
  <img class="object-cover h-full w-full " src="me.jpg">
  <figcaption class="text-lg color-black line-normal">Look at me!</figcaption>
</figure>

<div class="flex flex-col w-full h-auto ">
 <div class="flex bg-blue-ocean h-100px ">
    <h3 class="text-h3 color-black font-bold">Real Lorem Ipsum by 37signals</h3>
    <p class="text-p color-gray font-semibold">By not having the imagination to imagine what the content "might" be, a design consideration is lost. Meaning becomes obfuscated because "it's just text", understandability gets compromised because nobody realized that this text stuff was actually meant to be read. Opportunities get lost because the lorem ipsum garbage that you used instead of real content didn't suggest opportunities. The text then gets made really small, because, it's not meant to be used, we might as well create loads of that lovely white space.</p>
  </div>
</div>
```

Lebih lengkap seputar BEM dan Atomic CSS/ Utility-first bisa dilihat pada referensi berikut

*   [BEM 101](https://css-tricks.com/bem-101/?ref=blog.faldi.xyz)
*   [Atomic CSS 101](https://css-tricks.com/lets-define-exactly-atomic-css/?ref=blog.faldi.xyz)

Beberapa framework implementasinya

*   Boostrap dengan BEM
*   Tailwind dengan Utility-first / Atomic CSS

* * *

Terlepas dari situ, saya sendiri masih terus mencari dan memikirkan untuk bisa meningkatkan kualitas kode yang saya tulis apalagi banyak kolega atau teman yang menyarankan untuk  membaca buku "clean code a handbook of agile software craftsmanship".

Jadi bila ada yang salah atau saran pada tulisan ini silahkan tulis komentar di Twitterku, [@f2aldi](https://twitter.com/f2aldi?ref=blog.faldi.xyz) dan mari kita berdiskusi. Boleh juga bila teman-teman ada yang ingin ditanyakan terkait dengan tulisan ini.

Semoga membantu ya!

Bagikan[](https://twitter.com/share?text=Meningkatkan Readability pada Kode&url=http://blog.faldi.xyz/meningkatkan-readability-pada-kode/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/meningkatkan-readability-pada-kode/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/meningkatkan-readability-pada-kode//&title=Meningkatkan Readability pada Kode "LinkedIn")[](/cdn-cgi/l/email-protection#d7e8a4a2b5bdb2b4a3ea9ab2b9beb9b0bcb6a3bcb6b9f785b2b6b3b6b5bebbbea3aef7a7b6b3b6f79cb8b3b2f1b6baa7ecb5b8b3aeeabfa3a3a7edf8f8b5bbb8b0f9b1b6bbb3bef9afaeadf8bab2b9beb9b0bcb6a3bcb6b9faa5b2b6b3b6b5bebbbea3aefaa7b6b3b6fabcb8b3b2f8 "Email")

Topik [Insight](/tag/insight/) [ReactJS](/tag/reactjs/) [Tutorial](/tag/tutorial/)

[

## Menggunakan Debian Package / PPA daripada Snap Package

Beberapa waktu lalu saat saya menggunakan ubuntu, saya mencoba untuk melakukan install…

18 Okt 2021



](/menggunakan-deb-ppa-daripada-snapd/)[

## Pattern Blur Image, memilih antara SVG atau PNG

Sebulan terakhir ini, saya mendapatkan salah satu pekerjaan untuk implementasi sebuah situs…

09 Sep 2021



](/pattern-blur-memilih-antara-svg-atau-png/)