---
title: "Tantangan dan Kesulitan sebagai Frontend Dev"
slug: tantangan-dan-kesulitan-sebagai-frontend-dev
description: "Setiap pekerjaan memiliki tantangan atau kesulitan yang ditemui. Tidak terkecuali seorang Frontend Developer atau Pengembang Antarmuka. Yah, istilah pengembang"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2020-09-29
image: "https://images.unsplash.com/photo-1599687267812-35c05ff70ee9?ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;fm&#x3D;jpg&amp;crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;w&#x3D;2000&amp;fit&#x3D;max&amp;ixid&#x3D;eyJhcHBfaWQiOjExNzczfQ"
canonical: "http://blog.faldi.xyz/tantangan-sebagai-frontend-dev/"
---

Setiap pekerjaan memiliki tantangan atau kesulitan yang ditemui. Tidak terkecuali seorang Frontend Developer atau Pengembang Antarmuka. Yah, istilah pengembang antarmuka mungkin bagi sebagian orang masih asing. Namun, pengembang antarmuka ini merupakan terjemahan bahasa Indonesia dari Frontend Dev.

Walaupun pengalamanku masih minim di industri, namun banyak hal yang saya rasakan selama pengalaman bekerja di industri. Kesulitan yang saya hadapi, tantangan yang saya rasakan. Meskipun, bagi sebagian hal ini bukanlah kesulitan, namun bagi saya sendiri ya cukup mengganggu dan sebuah masalah yang harus dicarikan solusinya.

## Desain Tanpa Grid

![Image](https://qph.fs.quoracdn.net/main-qimg-16d993965489935ead5a97c55ea23e6c)

Penerapan Grid Sistem pada Desain

Saya sering bertemu desainer yang tidak menggunakan Grid. Sehingga desainnya tidak presisi sesuai dengan grid sistem. Hal ini tentu saja menyulitkan pemrogram atau saya sendiri. Mungkin desainernya sudah bisa berimajinasi dan berekspektasi. Namun, dalam dunia Frontend. Semua dihitung dengan angka. Tidak imajinasi. Tanpa adanya grid, kami kesulitan untuk bisa memastikan jarak antar komponen. Tidak hanya itu saja, melainkan bilapun sukses memastikan jarak antar komponen tanpa grid. Bagaimana dengan responsivenya? Kita juga harus memikirkan hal tersebut bukan?

## Desain Tanpa Responsive

Desainer biasanya hanya membuatkan versi Dekstop saja dengan resolusi 1440px. Sehingga kita selalu yang memjadikannya responsive, entah untuk perangkat

*   \>1024px
*   \>900px
*   \>480px
*   \>360px
*   dst

Nah, bagi saya sendiri kadang tidak masalah. Namun, kalau desainnya terlalu bagus, saya kesulitan untuk berimajinasi sendiri bagaimana penerapannya bila dalam versi mobile / tablet. Saya takut, malah hasilnya tidak sesuai dengan yang di dekstop. Merubah _experience_ penggunanya jadi berbeda.

Tidak hanya itu, tanpa grid pun akan semakin sulit juga mengetahui, versi mobile atau tablet nanti, komponen mana saja yang bisa dikecilkan? Seberapa besar yang perlu dikecilkan? dihilangkan?

## Desain Tanpa Animasi

Tidak mungkin bukan, saat pengguna membuka website yang kita buat tidak ada animasi sama sekali? Pasti ada. Nah, salah satu tantangan kita adalah bagaimana membuat animasi, menyesuaikan dengan tampilan dan pengguna merasa tidak bosan terhadap animasi yang telah kita buat.

## Desain Tanpa Flow

Figma, Zeplin, Adobe XD memberikan fitur demo pada desain. Flow pada desain sehingga kita tahu, apakah desain ini merupakan button? ataukan hanya url saja? Karena ini nanti akan berpengaruh kepada semantic, jenis tag HTML. Sehingga desain tanpa flow akan membingungkan kita untuk bisa mengetahui fungsi setiap komponen, setiap desain. Walaupun harusnya hal ini dibicarakan saat briefing proyek. Kalau kita tahu flow desain, user story. Maka kita bisa membuatkan komponen, alert atau pesan bila sukses.

## Desain Tanpa Styleguide

Styleguide itu penting. Ini yang saya rasakan pada akhir-akhir ini.  Karena itu sebagai pondasi awal dalam proses pembuatan website.Karena, awal pembuatannya,  Bila tidak ada styleguide maka hal seperti ini yang akan terjadi :

![Image](https://qph.fs.quoracdn.net/main-qimg-e9c8d171cc7c41b1949fc22ec03d2ed9)

![Image](https://qph.fs.quoracdn.net/main-qimg-62e66b0c081cde77d57a0243d6901198)

Mungkin kalau ada styleguide, saya bisa membuatnya menjadi "mudah dibaca". Misal

*   Primary Color
*   Secondary Color
*   Primary Dark Color
*   Primary Light Color
*   Black Font Color
*   dst

Sehingga memudahkan saya atau siapapun untuk mengetahui fungsi warna-warna tersebut. Bila tidak, akan banyak sekali warna warna yang membingungkan. Ini warna untuk apa? Ini warna pakai warna abu-abu apa? dst

Itu hanya masalah warna. Belum Font, Button, dst. Walaupun mungkin kedepan, saya bisa menganti nama-nama tersebut menjadi warna yang lainnya.

## Penyesuaian Browser

Baru saja kemarin saya diberi laporan sama teman bahwa salah satu situs yang kami kerjakan tidak sesuai. Padahal, sama-sama menggunakan Firefox versi terbaru. Bedanya, saya test menggunakan Firefox versi Developer dan teman saya yang biasa. Ini masih belum tahu, letak permasalahan dimana. Padahal juga sudah menggunakan [Normalize CSS](https://necolas.github.io/normalize.css/?ref=blog.faldi.xyz) di Tailwind 💆‍♂️

Namun, setelah dicari tahu, itu karena saya belum melakukan pengecekatan pada browser dengan screensize 1024px di firefox.  Memang ada baiknya ada Timeline tersendiri untuk melakukan testing Browser compatibility dan Device compatibility. Itu padahal masih antar dekstop. Belum dengan perangkat mobile yang beragam jenis ukuran.

Untung saja Internet Explorer sudah dimatikan walaupun banyak pengguna yang masih menggunakan. Itu belum melawan safari pula yang sering tidak compatible. Makanya, sering sekali situs menyarankan pengguna menggunakan Chrome untuk hasil yang maksimal.

## Error Tracking dan CORS

[**Cross-Origin Resource Sharing (CORS)**](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS?ref=blog.faldi.xyz)

Sering sekali saya temukan dalam konsumsi API yaitu CORS. Pernah 2 hari debugging, ternyata yang masalah di backend karena CORS. Bukan di frontendnya 🤦‍♂️ Parahnya,error yang saya dapat hanyalah **_"Network Failed"_**. Sepengelaman dan pengetahuan saya, Network Failed artinya ada jaringan yang bermasalah disisi client. Berarti saya dong yang salah? Namun, nyatanya itu ada di CORS. Lantas kenapa dikatakan Network Failed? Yah, mungkin pemahaman saya terkait dengan networking masih kurang banyak.

Itu di Javascript. CSS? Setiap _pixel_ itu berpengaruh terhadap komponen lain. Ada komponen yang pixelnya melebihi desain, akan berpengaruh terhadap lokasi element lain. Hingga berakhir dengan element yang lebih lebar/lebih tinggi.

Terima Kasih kepada Firefox Developer Tools, yang benar benar membantu dalam proses pengembangan karena benar-benar membantu saya dalam indentifikasi setiap element. Misalnya

![Image](https://qph.fs.quoracdn.net/main-qimg-6d9fab704ce1d99c32b726c445e68733)

Saya jadi tahu apa saja yang mempengaruhi Komponen tersebut. Karena ada "Layout" , dan Hightlight display yang membantu dalam mengindentifikasi setiap element / komponen html tersebut.

## State Management

Kapan state / nilai variable ini disimpan di Global? Siapa saja yang bisa aksesnya? Apakah c_hild component / parent?_

Simpan di Cookies? Localstorage? atau variable?

Redux? atau Context?

Itu hal yang harus kita pikirkan dalam pembuatan Web Apps berbasis ReactJS. Karena benar-benar menguras tenaga dan banyak corat coret karena memikirkan setiap statenya. Saya sendiri memang masih belajar JS dan kebingungan dalam menghandle state di ReactJS. Masih belum yakin, apakah cara yang selama ini saya lakukan sudah benar atau tidak. Makanya sering saya melihat kode orang lain untuk tahu, cara mereka dalam menyimpan state management.

* * *

Yah, itu aja sih curhatanku mengenai  **_tantangan dan kesulitan sebagai pengembang antarmuka_** , mungkin bagi sebagian orang apa yang saya rasakan ini bukan kesulitan. Namun, setidaknya hal hal tersebutlah yang harus kita antisipasi di proyek - proyek selanjutnya. Setidaknya, saya harus bisa belajar dari masalah tersebut.

Bagikan[](https://twitter.com/share?text=Tantangan dan Kesulitan sebagai Frontend Dev&url=http://blog.faldi.xyz/tantangan-sebagai-frontend-dev/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/tantangan-sebagai-frontend-dev/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/tantangan-sebagai-frontend-dev//&title=Tantangan dan Kesulitan sebagai Frontend Dev "LinkedIn")[](/cdn-cgi/l/email-protection#e3dc90968189868097deb7828d97828d84828dc387828dc3a88690968f8a97828dc39086818284828ac3a5918c8d97868d87c3a78695c5828e93d8818c879ade8b979793d9cccc818f8c84cd85828f878acd9b9a99cc97828d97828d84828dce9086818284828ace85918c8d97868d87ce878695cc "Email")

Topik [Opini](/tag/opini/)

[

## Harus ya, mahir menuliskan kode?

Disclaimer : Saya tidak memiliki data real mengenai lulusan IT yang bekerja sebagai…

30 Sep 2020



](/harus-mahir-menuliskan-kode/)[

## Murahnya Biaya Desain dan Pembuatan Aplikasi

"Desain doang pamflet, sehari jadi bisakan?" "Buatin desain undangan…

27 Sep 2020



](/murahnya-biaya-desain-dan-kode/)