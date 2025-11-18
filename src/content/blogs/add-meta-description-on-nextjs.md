---
title: "placeholder"
slug: add-meta-description-on-nextjs
description: "placeholder"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2020-09-27
image: ""
canonical: ""
---

Meta description adalah salah satu hal yang cukup vital dalam dunia website, apalagi Landingpage. `<meta name="description">` merupakan salah satu element yang memberikan ringkasan mengenai isi konten dari website kita yang membuat search engines memasukkannya di hasil pencarian. Kualitas meta deskripsi yang bagus dan unik akan membuat halaman kita menjadi lebih relevan dan meningkatkan trafik pencarian terhadap situs kita.

Ketika kita mencoba untuk melakukan test pada website kita di Web Dev Measure, salah satu hal yang dikritisi adalah ada tidaknya meta deskripsi.

![Image](https://blog.faldi.xyz/content/images/2021/06/image-3.png)

Hasil Web Dev Measure

Hasilnya menunjukan bahwa menambahkan meta desription merupakah hal yang memiliki tingkat kepentingan Medium.Sehingga, menurut saya sudah sewajarnya apabila sebuah website menambahkan meta deskripsi pada situsnya.

## Menambahkan Meta Deskripsi  

Menambahkan `meta description` pada NextJS adalah dengan menambahkannya pada component `next/head` , built-in component yang komponen digunakan untuk render element HTML `<head>` pada situs. Kurang lebih hasilnya seperti ini :

```
import Head from 'next/head'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
         <meta
          name="description"
          content="Landingpage for Website. Website for gaining information what you need"
          key="description"
        />
      </Head>
      <p>Hello world!</p>
    </div>
  )
}

export default IndexPage
```

Selain menambahkan meta description pada built-in component di `<Head>` sebaiknya kita juga menambahkan

- Favicon
- Open Graph untuk sosial media seperti Twitter, Facebook dan sosial media lain

Hal ini tentu saja dapat meningkatkan SEO pada Web App kita.

## Referensi :

[

How to Improve your SEO and Social Metadata with Next.js

Check out this Next.js primer on SEO fundamentals. Utilize the Open Graph Protocol to update metadata in your Next apps, ship sites with optimize page titles, and more!

![Image](https://www.netlify.com/img/global/favicon/apple-touch-icon.png)NetlifyCassidy Williams

![Image](https://www.netlify.com/img/blog/good-cards.png)

](https://www.netlify.com/blog/2020/05/08/improve-your-seo-and-social-sharing-cards-with-next.js/?ref=blog.faldi.xyz)

[

How to Add a Meta Description Tag to a Next.js Website

Add a meta description to a Next.js website using the built-in Head component.

![Image](https://assets.coderrocketfuel.com/favicon-32x32.png)

![Image](https://assets.coderrocketfuel.com/next-js-article-thumbnail.png)

](https://coderrocketfuel.com/article/how-to-add-a-meta-description-tag-to-a-next-js-website?ref=blog.faldi.xyz)
