---
title: "Lesson Learned dari Test Accesibility pada Website"
slug: lesson-learned-dari-test-accesibility-pada-website
description: "Accesibility konsep yang merujuk pada pengembangan dan desain web untuk memastikan kemudahan akses digital atau online bagi semua orang, baik yang mampu maupun"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2020-12-09
image: "https://images.unsplash.com/photo-1518349619113-03114f06ac3a?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MXwxMTc3M3wwfDF8c2VhcmNofDJ8fHVzYWJpbGl0eXxlbnwwfHx8&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/lesson-learned-dari-test-accesibility-pada-website/"
---


## Pranala

Accesibility  konsep yang merujuk pada pengembangan dan desain web untuk memastikan kemudahan akses digital atau online bagi semua orang, baik yang mampu maupun memiliki disabilitas.

Cakupannya meliputi :

*   ARIA
*   Semantic Web
*   Contrast Warna
*   Akses konten dengan Keyboard
*   dst

## Permasalahan

Berapa jumlah perusahaan di Indonesia yang mementingkan Accesibility? atau mungkin bisa dikatakan pernah melakukan testing pada Accesbility Web? Bagaimana cara mereka melakukan testing? Seberapa penting memang melakukan testing Accesbility?

Merupakan pertanyaan yang saya pikirkan saat mendengarkan mengenai Accesbility. Sebabnya jelas, karena saya tidak pernah sekalipun melakukan testing pada Accesbility. Tidak pernah memikirkan Semantic HTML, ARIA, Kontras Warna dst. Namun, suatu waktu saya menjadi penasaran dengan Accesibility dan mulai membaca lebih jauh dan bertemulah dengan website [https://www.a11yproject.com/](https://www.a11yproject.com/?ref=blog.faldi.xyz)

![Image](https://blog.faldi.xyz/content/images/2020/12/Screen-Shot-2020-12-09-at-11.45.07.png)

a11y Project

Saat itulah, saya merasa sepertinya perlu untuk belajar sedikit sedikit, menerapkan pada proyek pribadi dan mempelajari. Apasih sekiranya yang bisa diterapkan Accesbility pada proyek web yang sedang saya bangun?

## Solusi

Nah, lalu saya menemukan website [https://accessibilityinsights.io/](https://accessibilityinsights.io/?ref=blog.faldi.xyz) dari Mas Adityo.

> Pakai plugin ini Di [https://t.co/6XKGISv5Pu](https://t.co/6XKGISv5Pu?ref=blog.faldi.xyz) lumayan dalam hasilnya. Seneng makenya
> 
> — Adityo Pratomo (@kotakmakan) [November 10, 2020](https://twitter.com/kotakmakan/status/1326112568029577217?ref_src=twsrc%5Etfw&ref=blog.faldi.xyz)

Mulailah dari situ saya mencoba untuk melakukan test Accesibility Insight pada salah satu situs web saya yaitu :

**Demo** : [https://dashboard-cowork.vercel.app/](https://dashboard-cowork.vercel.app/?ref=blog.faldi.xyz)

![Image](https://blog.faldi.xyz/content/images/2020/12/Screen-Shot-2020-12-09-at-11.59.11.png)

Dashboard CoWork Test Accesbility

**Kontras Warna**

*   Kontras Warna menjadi yang paling banyak mendapatkan Highlight merah karena memang warna menjadi yang paling dominan dalam sebuah desain. Berdasarkan Accesibility Insight, penyebabnya karena warna yang didapatkan tidak sesuai dengan WCAG 2 AA kontras rasio. Kontras rasio website saat ini ada pada 3.74 , sedangkan rekomendasi rasio harusnya 4.5 .
*   WCAG 2 AA adalah sebuah standard dalam pembuatan situs untuk orang orang dengan kebutuhan khusus. Terdapat level dalm WCAG 2, yaitu A, AA dan AAA. Kebanyakan industri menggunakan AA untuk standard minimumnya.

**Tag `lang`**

*   Penambahan tag lang pada element html juga menjadi salah satu hal yang penting untuk bisa menerjemahkan dan screen reader bisa membaca isi konten sesuai bahasa yang telah ada pada html tersebut

**Label Input**

*   Memberikan Label pada setiap input. Fungsinya untuk screen reader mengetahui fungsi setiap input tersebut.

Accesbility ini tentu saja masih bisa ditest lagi dengan melakukan wawancara kepada teman teman berkebutuhan khusus dan mendengarkan keluh mereka saat menggunakan website ini. Sayangnya, saya masih belum sampai pada tahap ini. Mungkin masih akan terus menggunakan Accesibility Insight untuk melakukan testing. Kedepan baru melakukan wawancara lapangan langsung.

Selain itu, saya semakin paham mengenai ARIA pada HTML. Karena saya sering sekali menghapus "aria" pada element html 💆‍♂️

[

ARIA

Accessible Rich Internet Applications (ARIA) is a set of attributes that define ways to make web content and web applications (especially those developed with JavaScript) more accessible to people with disabilities. It supplements HTML so that interactions and widgets commonly used in applications c…

![Image](https://developer.mozilla.org/static/img/favicon144.e7e21ca263ca.png)MDN Web Docs

![Image](https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png)

](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA?ref=blog.faldi.xyz)

### Dukung saya di Karyakarsa :

[

Dukung Naufaldi Rafif S di Karyakarsa!

Dukung Naufaldi Rafif S di Karyakarsa!

![Image](https://karyakarsa.com/naufaldisatriya/icons/favicon-96x96.png)

![Image](https://karyakarsa.s3.ap-southeast-1.amazonaws.com/header-5e38f4d4bc716.jpg)

](https://karyakarsa.com/naufaldisatriya/tip?ref=blog.faldi.xyz)

**Sumber**

> [Accessibility: Konsep untuk Pastikan Situs Web Mudah Diakses Penyandang Disabilitas](https://glints.com/id/lowongan/accessibility-adalah/?ref=blog.faldi.xyz)

[

Web Content Accessibility Guidelines (WCAG) 2 Level AA Conformance

The Website of the World Wide Web Consortium’s Web Accessibility Initiative.

Web Accessibility Initiative (WAI)W3C Web Accessibility Initiative (WAI)

![Image](https://www.w3.org/WAI/assets/images/social-sharing-default.jpg)

](https://www.w3.org/WAI/WCAG2AA-Conformance?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Lesson Learned dari Test Accesibility pada Website&url=http://blog.faldi.xyz/lesson-learned-dari-test-accesibility-pada-website/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/lesson-learned-dari-test-accesibility-pada-website/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/lesson-learned-dari-test-accesibility-pada-website//&title=Lesson Learned dari Test Accesibility pada Website "LinkedIn")[](/cdn-cgi/l/email-protection#dee1adabbcb4bbbdaae392bbadadb1b0fe92bbbfacb0bbbafebabfacb7fe8abbadaafe9fbdbdbbadb7bcb7b2b7aaa7feaebfbabffe89bbbcadb7aabbf8bfb3aee5bcb1baa7e3b6aaaaaee4f1f1bcb2b1b9f0b8bfb2bab7f0a6a7a4f1b2bbadadb1b0f3b2bbbfacb0bbbaf3babfacb7f3aabbadaaf3bfbdbdbbadb7bcb7b2b7aaa7f3aebfbabff3a9bbbcadb7aabbf1 "Email")

Topik [Lesson Learned](/tag/lesson-learned/) [Insight](/tag/insight/)

[

## Mencegah Scrolling Saat Modal Terbuka

Permasalahan : Permasalahan yang saya alami adalah ketika membuat sebuah fitur pada landingpage,…

23 Des 2020



](/prevent-scrolling-when-modal-open/)[

## Membuat Reusable Component dengan Menggunakan TailwindCSS dan Classnames di ReactJS

Pranala Sering kali, ketika kita mengerjakan sebuah website maka kita akan mendapati…

03 Des 2020



](/membuat-reusable-component-dengan-menggunakan-tailwind-dan-classnames/)