---
title: "RFC (Request for Comment) , Apa dan Mengapa?"
slug: rfc-request-for-comment-apa-dan-mengapa
description: "RFC atau kepanjangannya adalah [Request For Comment](https://en.wikipedia.org/wiki/Request_for_Comments?ref=blog.faldi.xyz) adalah sebuah “Design Dokumen” yang"
category: "Idea"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: Sun Aug 07 2022 07:00:00 GMT+0700 (Western Indonesia Time)
image: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wwfDF8c2VhcmNofDR8fGRvY3VtZW50fGVufDB8fHx8MTY1OTcyMzU3Mw&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/rfc-apa-dan-mengapa/"
---


## **Pengertian RFC**

RFC atau kepanjangannya adalah [Request For Comment](https://en.wikipedia.org/wiki/Request_for_Comments?ref=blog.faldi.xyz) adalah sebuah “Design Dokumen” yang diawali oleh IETF yang mempublish research paper yang berbentuk .txt dan membentuk internet sejak tahun 2000. Kalau bahasa mudahnya, RFC merupakan “engineering planning process” yang berbentuk dokumen yang akan selalu dibuat sebelum proses development.

## **Mengapa RFC Penting?**

### **Transparansi**

Proses RFC ini perlu dilakukan agar setiap tim dan anggota tim itu sendiri mengetahui apa saja teknologi yang telah dibuat dan sedang dibuat oleh setiap. Sehingga saat akan mengerjakan sebuah produk atau menemukan masalah yang sama dengan tim lain, bisa membaca RFC tersebut untuk mendapatkan insight atau pengetahuan baru sebelum proses pengembangan.

### Communication

Menghilangkan komunikasi dengan menuliskan RFC, terutama saat akan mengimplementasikan sebuah fitur. Karena dengan begitu, tidak akan terjadi kesalahpahaman saat akan meneruskan sebuah fitur / membuat sebuah fitur.

Selain itu, akan mengminimalisir misskomunikasi antar team. Karena sudah mengetahui apa yang sedang dikerjakan, telah dikerjakan, teknologi apa yang telah dipasang pada sebuah proses bisnis.

### Dokumentasi

Informasi-informasi di RFC bisa digunakan pula untuk mengetahui alasan-alasan setiap teknologi yang digunakan / diadopsi oleh team. Sehingga ketika ada proses migrasi, pembaruan teknologi, atau maintenace kita bisa memiliki keputusan apakah tetap menggunakan teknologi tersebut atau menggantinya karena disesuaikan dengan kebutuhan bisnis.

Saat tidak ada RFC, maka akan kesulitan untuk mengetahui goal penggunaan sebuah teknologi yang mana teknologi tersebut menjadi sebuah tech debt yang harus disolve seperti migrasi atau pembaruan yang berakibat pada blocking.

### Edukasi

RFC juga sekaligus sarana edukasi, menyebarkan pengetahuan kepada para Software Engineer lain. Sehingga semua orang mendapatkan pengetahuan yang sama tanpa perlu menjalani proses riset yang cukup dalam.

### Culture Menulis

Menumbuhkan culture menulis, apalagi untuk engineer sangat terkenal ketidak inginan untuk menulis dokumentasi. Nah, dengan adanya RFC ini akan menumbuhkan kemampuan, kegemaran, keinginan untuk menulis. Salah satunya dengan adanya RFC ini.

### Responsibility

RFC sesuai dengan namanya, Request For Comment maka siapa saja bisa memberikan komentar atas RFC yang sedang dibangun. Ini akan memberikan kita kesempatan untuk bisa mempertahankan argumen, alasan kita membuat sebuah request atas fitur yang akan kita bangun. Baik pro dan kontra fitur tersebut. Sehingga saat ada yang memberikan masukan, kita bisa menerima atau menolaknya. Bahkan ada saat kita harus menerima masukan tersebut walaupun membuat RFC kita ditolak.

## Format RFC itu apa saja dan seperti apa?

Kalau melihat tulisan dari Pak **_**Gergely Orosz**,_** ada beberapa Format RFC yang terbuka oleh beberapa perusahaan dan list perusahaan yang menggunakan RFC.

![Image](https://blog.faldi.xyz/content/images/2022/07/image.png)

## Bagian-bagian RFC

Secara umum, menurut saya setiap RFC akan memiliki 2 komponen utama, yaitu masalah dan solusinya seperti apa.

### Problem

Pada bab masalah ini, kita akan menceritakan masalah-masalah apa yang ada sehingga kita harus membuat RFC ini. Misalnya studi kasus kita ingin membuat Landingpage untuk bisa diakses oleh orang.

### Solution

Pada bab solusi, kita akan menceritakan bagaimana solusi yang kita tempuh untuk bisa menyelesaikan masalah tersebut. Misalnya dengan studi kasus Landing page tadi, kita akan menggunakan Next JS untuk bisa membuat Server Side Rendering. Nah, kita ceritakan dan memberikan pembuktian bahwa NextJS menjadi jawaban atas masalah tersebut.

Beberapa Format RFC yang bisa ditemukan seperti :

*   RFC [Sourcegraph](https://handbook.sourcegraph.com/company-info-and-process/communication/rfcs/?ref=blog.faldi.xyz)
*   RFC [Hashicorp](https://docs.google.com/document/d/1Oz_7FhaWxdFUDEzKCC5Cy58t57C4znmC_Qr80BORy1U/edit?ref=blog.faldi.xyz)
*   RFC [Soundcloud](https://philcalcado.com/2018/11/19/a_structured_rfc_process.html?ref=blog.faldi.xyz)
*   RFC [Couchbase](https://github.com/couchbaselabs/sdk-rfcs/blob/master/0000-template.md?ref=blog.faldi.xyz)
*   etc

Untuk melihat beberapa format RFC lain, temen-teman bisa check disini :

[

Companies Using RFCs or Design Docs and Examples of These

What companies follow an RFC-like process, and what are templates and examples to get inspiration from?

![Image](https://blog.pragmaticengineer.com/favicon.png)The Pragmatic EngineerGergely Orosz

![Image](https://blog.pragmaticengineer.com/content/images/2022/06/Screenshot-2022-06-23-at-10.53.04-1.png)

](https://blog.pragmaticengineer.com/rfcs-and-design-docs/?ref=blog.faldi.xyz)

## Public RFC

Menariknya, tidak semua RFC itu diprivate. Ada beberapa RFC yang bisa dilihat oleh public misalnya

*   [RFC Razorpay](https://github.com/razorpay/blade/tree/master/rfcs?ref=blog.faldi.xyz)
*   [RFC Couchbase](https://github.com/couchbaselabs/sdk-rfcs/tree/master/rfc?ref=blog.faldi.xyz)
*   [RFC NextJS](https://nextjs.org/blog/layouts-rfc?ref=blog.faldi.xyz)

Adanya public RFC ini akan memberikan kita knowladge bahwa setiap teknologi yang digunakan akan memiliki alasan.

## Kesimpulan

RFC mungkin akan membuat sebuah proses pengembangan menjadi lebih lama karena kita ada proses menulis RFC, diskusi soal RFC tersebut, revisi RFC dan baru proses pengembangan.Namun, itu akan memberikan kita trade off yang lebih bagus seperti yang saya sampaikan sebelumnya yaitu dokumentasi, sharing knowledge, sarana komunikasi dst yang malah akan meningkatkan produktifitas tim engineer dan menghilangkan misskomunikasi antar engineer/team.

Bagikan[](https://twitter.com/share?text=RFC \(Request for Comment\) , Apa dan Mengapa?&url=http://blog.faldi.xyz/rfc-apa-dan-mengapa/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/rfc-apa-dan-mengapa/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/rfc-apa-dan-mengapa//&title=RFC \(Request for Comment\) , Apa dan Mengapa? "LinkedIn")[](/cdn-cgi/l/email-protection#c9f6babcaba3acaabdf49b8f8ae9e19bacb8bcacbabde9afa6bbe98aa6a4a4aca7bde0e9e5e988b9a8e9ada8a7e984aca7aea8b9a8f6efa8a4b9f2aba6adb0f4a1bdbdb9f3e6e6aba5a6aee7afa8a5ada0e7b1b0b3e6bbafaae4a8b9a8e4ada8a7e4a4aca7aea8b9a8e6 "Email")

Topik [Insight](/tag/insight/) [Documentation](/tag/documentation/) [Culture](/tag/culture/)

[

## Digital Nomad di Kota Malang

Malang sebagai tempat untuk para pekerja digital menghadirkan keragaman lokasi, makanan, keunggulan…

19 Agt 2022



](/nomad-malang/)[

## Quick Note Showwcase ID : Suka Duka Menjadi Tech Content Creator

Narasumber: \* Sandhika Galih \* Borrys Hasian \* Iqbal Farabi \* Riza Fahmi \* Zain Fathoni Alasan…

06 Agt 2022



](/rangkuman-showwcase-id-suka-duka-menjadi-tech-content-creator/)