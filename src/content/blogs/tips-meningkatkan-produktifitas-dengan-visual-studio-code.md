---
title: "Tips Meningkatkan Produktifitas dengan Visual Studio Code"
slug: tips-meningkatkan-produktifitas-dengan-visual-studio-code
description: "Siapa sih yang tidak menggunakan VS Code? Bahkan menurut survey terbaru dari stackoverflow tahun 2021 VS Code menjadi text editor yang paling banyak digunakan."
category: "Opinions"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: Sun Nov 14 2021 07:00:00 GMT+0700 (Western Indonesia Time)
image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wxfDF8YWxsfDIxfHx8fHx8Mnx8MTYyNDM1NTE3Mg&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/tips-meningkatkan-produktifitas-dengan-visual-studio-code/"
---


Siapa sih yang tidak menggunakan VS Code? Bahkan menurut survey terbaru dari stackoverflow tahun 2021 VS Code menjadi text editor yang paling banyak digunakan.

![Image](https://blog.faldi.xyz/content/images/2021/11/image.png)

Collaboration Tools

Sumber  terkait [survey stackoverflow 2021](https://insights.stackoverflow.com/survey/2021?ref=blog.faldi.xyz#worked-with-vs-want-to-work-with-new-collab-tools-worked-want)

Sayangnya, masih belum banyak yang bisa memanfaatkan VSCode secara maksimal. Nah, berikut beberapa tips yang bisa kita implementasikan supaya lebih maksimal dalam menggunakan VSCode.

## **Menggunakan Console Log dengan Lebih Cerdas**

Biasanya kita menggunakan console log dengan mengetikkan secara manual bukan? Nah, kita bisa mempercepat hal ini dengan menggunakan extension

### Wrap Console Log

Tautan: [Wrap Console Log by Midnight](https://marketplace.visualstudio.com/items?itemName=midnightsyntax.vscode-wrap-console-log&ref=blog.faldi.xyz)

![Image](https://blog.faldi.xyz/content/images/2021/11/image-1.png)

### Console-log

Tautan : [Console Log by Vitaly](https://marketplace.visualstudio.com/items?itemName=dotcypress.console-log&ref=blog.faldi.xyz)

![Image](https://blog.faldi.xyz/content/images/2021/11/image-2.png)

Hasilnya, kita tidak perlu lagi cape cape menuliskan console.log untuk bisa check nilai variable kita.

![demo](https://github.com/midnightsyntax/vscode-wrap-console-log/raw/master/images/screenshot_indent.gif)

contoh penggunaan Wrap Console

### Turbo Console Log

Tautan : [Turbo Console Log](https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log&ref=blog.faldi.xyz)

![Image](https://blog.faldi.xyz/content/images/2021/11/image-8.png)

![alt text](https://image.ibb.co/dysw7p/insert_log_message.gif)

in action

## **Shortcut dengan Emmet**

Emmet merupakan sebuah toolkit untuk meningkatkan produktifitas para Frontend, terutama dalam menuliskan HTML dan CSS. Misalnya saja kita ingin membuat sebuah file seperti ini :

```
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Document</title>
</head>
<body>
 
</body>
</html>
```

maka kita cukup menuliskan,

![Image](https://blog.faldi.xyz/content/images/2021/11/image-4.png)

dan kita cukup enter maka akan muncul file HTML tersebut.

![Image](https://blog.faldi.xyz/content/images/2021/11/image-5.png)

Beberapa contoh lain penggunaan emmet :

![Image](https://blog.faldi.xyz/content/images/2021/11/emmet.gif)

## **Menggunakan Git Blame**

Sesuai namanya, Git Blame merupakan extension untuk blaming orang orang! [👿](https://emojikeyboard.org/copy/Angry_Face_with_Horns_Emoji_%F0%9F%91%BF?utm_source=extlink) Ya tidaklah, fungsinya untuk mengetahui saat kita berkolaborasi dengan pemrogram lain, kode mana saja yang telah mereka tulis, sehingga ketika ada masalah, kebingungan terkait kode tersebut, kita bisa mengerti mau tanya ke siapa. Misalnya :

![Image](https://blog.faldi.xyz/content/images/2021/11/image-6.png)

Adanya Git Blame ini akan membantu kita apa, siapa dan kapan sebuah kode berubah.

## **Mendaftar di Github Co-pilot**

Notice, saat menulis di emmet tadi ada sejenis comment yang tiba-tiba muncul? Ya, itu adalah salah satu rekomendasi kode dari Github Co-pilot. Merupakan sebuah project dari Github Co-pilot untuk pair programming kita saat menuliskan sebuah kode.

Beberapa contoh Github Co-pilot in action bisa teman-teman lihat disini :

> Thread Power of Github copilot  
> a collection from myself.  
>   
> this code write by github copilot, i just write name of function [pic.twitter.com/lrBhaiORuM](https://t.co/lrBhaiORuM?ref=blog.faldi.xyz)
> 
> — FλL-D1 / Vaksin AZ (@F2aldi) [October 12, 2021](https://twitter.com/F2aldi/status/1447895163922096133?ref_src=twsrc%5Etfw&ref=blog.faldi.xyz)

Ini akan membantu kita untuk menuliskan kode, sehingga kita akan diberikan insight mengenai kode apa saja yang bisa dituliskan, tentu saja bisa membantu dalam mempercepat kita menuliskan kode yang sifatnya "repeatable" seperti membuat data dummy misalnya.

* * *

Sebenarnya untuk meningkatkan produktivitas lebih baik menggunakan banyak ekstension, yang bisa teman-teman cek di

[

\[Premium Video Course\] Kursus Pengenalan Visual Studio Code · Karyakarsa

![Image](https://karyakarsa.com/naufaldisatriya/icons/favicon-96x96.png)

![Image](https://assets.karyakarsa.com/image-60d07d02bb5f1.png@800w.png)

](https://karyakarsa.com/naufaldisatriya/kursus-pengen?ref=blog.faldi.xyz)

karena salah satu kehebatan VSCode itu di extension dan eksistem yang benar-benar mendukung untuk "melakukan segala sesuatu di text editor".

Bagikan[](https://twitter.com/share?text=Tips Meningkatkan Produktifitas dengan Visual Studio Code&url=http://blog.faldi.xyz/tips-meningkatkan-produktifitas-dengan-visual-studio-code/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/tips-meningkatkan-produktifitas-dengan-visual-studio-code/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/tips-meningkatkan-produktifitas-dengan-visual-studio-code//&title=Tips Meningkatkan Produktifitas dengan Visual Studio Code "LinkedIn")[](/cdn-cgi/l/email-protection#fdc28e889f97989e89c0a9948d8eddb0989394939a969c89969c93ddad8f9299889689949b94899c8edd9998939a9c93ddab948e889c91ddae8988999492ddbe929998db9c908dc69f929984c09589898dc7d2d29f91929ad39b9c919994d3858487d289948d8ed090989394939a969c89969c93d08d8f9299889689949b94899c8ed09998939a9c93d08b948e889c91d08e8988999492d09e929998d2 "Email")

Topik

[

## Rekomendasi Library React untuk Membuat Table

Beberapa waktu lalu, saya mendapatkan tugas untuk bisa memvisualisasi data dari Backend…

06 Jan 2022



](/rekomendasi-library-react-untuk-membuat-table/)[

## Menggunakan Debian Package / PPA daripada Snap Package

Beberapa waktu lalu saat saya menggunakan ubuntu, saya mencoba untuk melakukan install…

18 Okt 2021



](/menggunakan-deb-ppa-daripada-snapd/)