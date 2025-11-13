---
title: "Membuat Reusable Component dengan twin.macro, NextJS dan Emotion Bag 1"
slug: membuat-reusable-component-dengan-twin-macro-nextjs-dan-emotion-bag-1
description: "Salah satu alasan, kenapa saya menggunakan [twin.macro](https://github.com/ben-rogerson/twin.macro?ref=blog.faldi.xyz) dan [Emotion](https://emotion.sh/docs/int"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2021-05-10
image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wwfDF8c2VhcmNofDI1fHxqYXZhc2NyaXB0fGVufDB8fHx8MTYyMDY3NjAzMA&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/membuat-reusable-component-dengan-twin-macro-tailwindcss-di-nextjs/"
---


Salah satu alasan, kenapa saya menggunakan [twin.macro](https://github.com/ben-rogerson/twin.macro?ref=blog.faldi.xyz) dan [Emotion](https://emotion.sh/docs/introduction?ref=blog.faldi.xyz) daripada menggunakan [TailwindCSS](https://tailwindcss.com/?ref=blog.faldi.xyz) dengan cara biasa adalah karena bagi saya, dengan menggunakan twin.macro dan Emotion disaat bersamaan akan membuat kode yang kita miliki menjadi mudah untuk didaur ulang atau istilahnya Reusable Component.

Penggunaan Reusable Component bagi saya cukup penting, mengingat didalam sebuah design ada beberapa styleguide yang dijadikan patokan seperti Typography, Color, Grid dan Component Figma sehingga kita mampu untuk implementasikan apa yang ada di desain ke dalam sebuah kode kita.

Salah satu contoh styleguide bisa terlihat pada [Styleguide Figma Community](https://www.figma.com/community/file/813355064454280492/Designers-Project-Styleguide?ref=blog.faldi.xyz) ini.

* * *

Saya akan memberikan sebuah contoh pembuatan Reusable Component dengan twin.macro.

## Typography

### Paragraf

Katakanlah, kita membuat sebuah komponen / styling Paragraf. Kalau merujuk styleguide aturannya seperti ini.

![Image](https://blog.faldi.xyz/content/images/2021/05/Screen-Shot-2021-05-10-at-09.42.27.png)

Pada tutorial ini, saya menggunakan UI Kit Community dari Figma Community dengan Lisensi CC BY 4.0 yang bisa teman-teman download atau unduh melalui tautan ini :

[Landify - Landingpage UI Kit v1.1](https://www.figma.com/community/file/894552273937682724/Landify---Landing-Page-UI-Kit-v1.1?ref=blog.faldi.xyz)

Berarti, nantinya komponen `h1` kita memiliki aturan sebagai berikut :

```css
font-family: Inter;
font-style: normal;
font-weight: 800;
font-size: 72px;
line-height: 98px;
```

Saya tidak menambahkan warna pada aturan komponen h1, karena warna nantinya ikut styleguide warna atau mengikuti komponen yang akan kita buat.

Saya anggap, kamu sudah bisa NextJS. Kalau belum, kamu bisa mengikuti tutorial [Memulai NextJS dengan Twin.macro dan Emotion](https://blog.faldi.xyz/memulai-nextjs-tailwind-macro-emotion/).

Apabila sudah selesai melakukan tutorialnya, bisa melanjutkan pada step sebelumnya, atau bisa menggunakan [Starter NextJS+Twin's+ Emotion](https://github.com/naufaldi/nextjs-twinmacro-emotion?ref=blog.faldi.xyz) yang telah aku buat yang bisa teman-teman clone.

Bila sudah kurang lebih nantinya struktur NextJS project kita seperti ini :

![Image](https://blog.faldi.xyz/content/images/2021/05/Screen-Shot-2021-05-10-at-09.39.59.png)

### Merubah Tailwind Config Sesuai Styleguide

Tahap selanjutnya, adalah kita merubah styleguide yang telah ditulis / dibuat di Pages Styles pada UI Kit untuk kita implementasikan pada TailwindConfig. Kurang lebih beberapa yang kita tambahkan pada Tailwind Config adalah

*   Font Family
*   Font Size
*   Line Height

Sehingga hasil dari Tailwind Config sebagai berikut :

```javascript
module.exports = {
  purge: ['./pages/*.js', './pages/**/*.js', './components/*.js', './components/**/*.js'],
  theme: {
    fontSize: {
      xs: '.75rem',
      base: ['16px', '26px'],
      lg: ['18px', '28px'],
      xl: ['20px', '30px'],
      '2xl': ['24px', '32px'],
      '3xl': ['28px', '40px'],
      '4xl': ['40px', '54px'],
      '5xl': ['48px', '64px'],
      '6xl': ['72px', '98px'],
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
```

Tailwind Config

Saya menambahkan Font Family, Font Size dan Line height sebagai awal untuk styleguide kita nanti saat ingin membuat reusable component typography.

### Membuat Komponen Typography

Kita bisa membuat foldernya pada direktori `components/typography/HeadOne.js` . Kalau sudah, kita tinggal menuliskan kode sebagai berikut :

```javascript
import tw, { styled } from 'twin.macro';

const HeadOne = styled.h1(() => [
	tw`font-extrabold text-6xl font-inter`
]);

export default HeadOne;
```

Komponen Head One

Kode diatas, artinya kita memberikan styling pada element `h1` yaitu font weight extra bold, font size 6xl dan font family inter sesuai dengan styleguide.

Lakukan hal yang sama dengan element `h1`, `h2`, dan `h3`.

Uji Coba Komponen Typography

Sekarang, kita coba memanggil komponen yang telah kita buat. Cara pada file `index.js` pada folder pages, kita membuat kode kurang lebih seperti ini

```javascript
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import HeadOne from '@/components/typography/HeadOne';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Reusable Component</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div tw="flex flex-col min-h-screen">
          <h1>Default h1 tanpa styling</h1>
          <HeadOne> H1 dengan Styling Component</HeadOne>
        </div>
      </Layout>
    </div>
  );
}
```

Component Index

### Catatan :

> Komponen `Layout` adalah komponen berasal dari Starter NextJS yang telah teman-teman clone tadi. Sedangkan `Head` adalah komponen dari NextJS untuk `head` sebuah dokumen HTML.

Kalau teman-teman perhatikan, kita membuat dua element yaitu `h1` dengan default style dan `h1` hasil dari komponen yang telah kita buat sebelumnya. Cara menggunakannya pun, kita cukup import komponen pada umumnya saat menggunakan React Component.

Kurang lebih hasilnya nanti seperti ini

![Image](https://blog.faldi.xyz/content/images/2021/05/image.png)

Terlihat bahwa perbedaan komponen H1 dan default h1 html

Nah, sekarang ketika kita membuat komponen `h1` sudah sesuai dengan styleguide yang telah ada tanpa perlu kita menghafal styleguide. Inilah yang dinamakan Reusable Component.

Menambah Style pada Komponen Typography

Lantas, bagaimana bila komponen `h1` kita memerlukan warna tambahan? atau warnanya berubah?

Kita bisa menggunakan beberapa cara. Misalnya dengan menambahkan `string` `tw` pada komponen tersebut, salah satu fitur dari `twin.macro`.

```javascript
import tw from 'twin.macro';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import HeadOne from '@/components/typography/HeadOne';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Reusable Component</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div tw="flex flex-col min-h-screen">
          <h1>Default h1 tanpa styling</h1>
          <HeadOne> H1 dengan Styling Component</HeadOne>
          <HeadOne tw="text-green-500 mt-4 mb-5"> H1 dengan Styling Component dan tambahan style</HeadOne>
        </div>
      </Layout>
    </div>
  );
}
```

Komponen H1 dengan tambahan style

Pada komponen `<HeadOne>` saya menambahkan class `text-green-500` , `mt-4` dan `mb-5` sehingga hasilnya kurang lebih :

![Image](https://blog.faldi.xyz/content/images/2021/05/image-1.png)

Styling tambahan pada HeadOne

Cara kedua, adalah dengan membuat komponen baru, dari komponen `<HeadOne/>` yang telah kita buat. Misalnya seperti ini

```javascript
import tw from 'twin.macro';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import HeadOne from '@/components/typography/HeadOne';

const Title = tw(HeadOne)`text-blue-500 my-4`;
export default function Home() {
  return (
    <div>
      <Head>
        <title>Reusable Component</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div tw="flex flex-col min-h-screen">
          <h1>Default h1 tanpa styling</h1>
          <HeadOne> H1 dengan Styling Component</HeadOne>
          <HeadOne tw="text-green-500 mt-4 mb-5"> H1 dengan Styling Component dan tambahan style</HeadOne>
          <Title> Komponen Title dari H1 </Title>
        </div>
      </Layout>
    </div>
  );
}
```

Kita membuat sebuah komponen baru yaitu Title

```javascript
const Title = tw(HeadOne)`text-blue-500 my-4`;
```

Komponen ini, mengambil style dari `HeadOne` untuk kemudian kita tambahkan dengan style `text-blue-500` dan `my-4` dan membuat komponen baru dengan nama `Title`.

Hasilnya kurang lebih seperti ini :

Kedua cara ini yang selalu saya gunakan ketika ingin menambahkan style atau menggunakan base style untuk membuat komponen lain. Misalnya membuat komponen untuk Title, Subtitle, Caption dan lain sebagainya.

* * *

Nah, bagian pertama kita sudah membahas mengenai Font. Membuat styling pada Font. Bagian kedua, kita akan membuat sebuah komponen Button sekaligus membuat beberapa variasinya.

Sampai jumpa pada tulisan berikutnya. Terima kasih dan semoga membantu!

Bagikan[](https://twitter.com/share?text=Membuat Reusable Component dengan twin.macro, NextJS dan Emotion Bag 1&url=http://blog.faldi.xyz/membuat-reusable-component-dengan-twin-macro-tailwindcss-di-nextjs/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/membuat-reusable-component-dengan-twin-macro-tailwindcss-di-nextjs/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/membuat-reusable-component-dengan-twin-macro-tailwindcss-di-nextjs//&title=Membuat Reusable Component dengan twin.macro, NextJS dan Emotion Bag 1 "LinkedIn")[](/cdn-cgi/l/email-protection#27185452454d4244531a6a424a45524653077542525446454b420764484a574849424953074342494046490753504e49094a464455480b0769425f536d740743464907624a48534e484907654640071601464a571c4548435e1a4f5353571d0808454b48400941464b434e095f5e5d084a424a455246530a5542525446454b420a44484a5748494249530a4342494046490a53504e490a4a464455480a53464e4b504e49434454540a434e0a49425f534d5408 "Email")

Topik [Getting Started](/tag/getting-started/) [NextJS](/tag/nextjs/) [Tutorial](/tag/tutorial/) [TailwindCSS](/tag/tailwindcss/)

[

## Outline Blue dan Aksesibilitas pada Chakra UI

Chakra UI memberikan focus:box-shadow yang ternyata adalah property box-shadow bukan border atau outline pada setiap element.…

07 Jun 2021



](/outline-blue-dan-accesbility-pada-chakra-ui/)[

## Cara Menangani Responsive di NextJS ( SSR )

Permasalahan Saat menggunakan library react-responsive dan menggabungkannya dengan NextJS serta Twin'…

27 Apr 2021



](/handle-responsive-website-in-nextjs-ssr/)