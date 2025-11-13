---
title: "Add Meta Description on NextJS"
slug: add-meta-description-on-nextjs
description: "Meta description adalah salah satu hal yang cukup vital dalam dunia website, apalagi Landingpage. `<meta name=\"description\">` merupakan salah satu element yang"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2021-06-18
image: "https://images.unsplash.com/photo-1621570274959-83e254246c07?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wxfDF8YWxsfDE2fHx8fHx8Mnx8MTYyMzk4NTU2NA&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/add-meta-description-on-nextjs/"
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

*   Favicon
*   Open Graph untuk sosial media seperti Twitter, Facebook dan sosial media lain

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

Bagikan[](https://twitter.com/share?text=Add Meta Description on NextJS&url=http://blog.faldi.xyz/add-meta-description-on-nextjs/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/add-meta-description-on-nextjs/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/add-meta-description-on-nextjs//&title=Add Meta Description on NextJS "LinkedIn")[](/cdn-cgi/l/email-protection#c2fdb1b7a0a8a7a1b6ff83a6a6e28fa7b6a3e286a7b1a1b0abb2b6abadace2adace28ca7bab68891e4a3afb2f9a0ada6bbffaab6b6b2f8ededa0aeada5eca4a3aea6abecbabbb8eda3a6a6efafa7b6a3efa6a7b1a1b0abb2b6abadacefadacefaca7bab6a8b1ed "Email")

Topik [NextJS](/tag/nextjs/) [Tutorial](/tag/tutorial/)

[

## Snippet Membuat Gradient Underline

Masalah Beberapa hari kemarin, saya mendapatkan tugas untuk membuat sebuah warna gradient…

22 Jun 2021



](/membuat-gradient-underline/)[

## Outline Blue dan Aksesibilitas pada Chakra UI

Chakra UI memberikan focus:box-shadow yang ternyata adalah property box-shadow bukan border atau outline pada setiap element.…

07 Jun 2021



](/outline-blue-dan-accesbility-pada-chakra-ui/)