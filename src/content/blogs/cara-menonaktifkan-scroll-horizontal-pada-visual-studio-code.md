---
title: "Cara Menonaktifkan Scroll Horizontal pada Visual Studio Code"
slug: cara-menonaktifkan-scroll-horizontal-pada-visual-studio-code
description: "Secara default, VS Code memiliki fitur untuk membuat kode editor kita bisa discroll secara horizontal. Hal ini akan kerasa ketika kita menggunakan HTML atau men"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2022-03-31
image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wwfDF8c2VhcmNofDI0fHxjb2RlfGVufDB8fHx8MTY0ODcxMDAxNQ&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/cara-menonaktifkan-scroll-horizontal-pada-visual-studio-code/"
---


Secara default, VS Code memiliki fitur untuk membuat kode editor kita bisa discroll secara horizontal. Hal ini akan kerasa ketika kita menggunakan HTML atau menggunakan class Tailwind yang bisa membuat kode menjadi cukup panjang.  Ini cukup membuat frustasi, apalagi bila kita ingin melihat keseluruhan kode kita. Misalnya seperti ini :

![Image](https://blog.faldi.xyz/content/images/2022/03/Recording-2022-03-31-at-13.23.53.gif)

Untuk bisa menonaktifkan  horizontal scroll pada VS Code sebenarnya cukup mudah, yaitu dengan :

## 📜 Menonaktifkan Horizontal Scroll di Visual Studio Code dengan Mengaktifkan Word Wrap

### Setting untuk User (Global)

Klik Menu ****File**** > ****Preferences**** > ****Settings**** dan tuliskan “word wrap” di ****Search settings**** .

atau

Klik Menu **Code** > **Preferences** > **Settings** dan tuliskan “word wrap” di ****Search settings**** .

![Image](https://blog.faldi.xyz/content/images/2022/03/Screen-Shot-2022-03-31-at-13.29.50.png)

Menu Setting User

Lalu pada `Editor: Word Wrap` pilih `on`

**Hasilnya :**

![Image](https://blog.faldi.xyz/content/images/2022/03/code.gif)

Scroll Horizontal Menghilang

Scroll horizontal menghilang, akibatnya kode yang semula memanjang kesebelah kanan, akan jadi terpotong-potong / Word Wrap ke garis kedua dan seterusnya. Hal ini memudahkan kita untuk membaca kode kode yang panjang.

* * *

## 📝Take a Note :

Kalau temen temen menggunakan Git Lens, maka Word Wrap tersebut memang benar akan bisa digunakan, namun perlu menambahkan untuk mendisable Git Lens di line tersebut. Caranya dengan menambahkan `"gitlens.currentLine.scrollable": false` pada `setting.json` di VS Code.

*   Tekan Command + P  
*   Ketikkan `>setting`
*   Pilih Settings(JSON)
*   Pada baris bawah sendiri tambahkan `"gitlens.currentLine.scrollable": false`

![Image](https://blog.faldi.xyz/content/images/2022/03/Screen-Shot-2022-03-31-at-13.51.16.png)

Ketikkan >Setting pada Kolom Pencarian

![Image](https://blog.faldi.xyz/content/images/2022/03/Screen-Shot-2022-03-31-at-13.54.47.png)

Tambahkan gitlens current line

Voila.!! Scroll Horizontal menghilang secara 100%.  Semoga membantu!

Referensi :

[

How to Enable Word Wrap to Disable Horizontal Scrolling in VS Code

Find out how to disable horizontal scrolling in VS Code by enabling word wrap for all files or per single file!

![Image](https://radu.link/wp-content/uploads/2021/08/cropped-site-icon-1-192x192.png)Radu.linkJanuary 29, 2022 at 19:49

![Image](https://radu.link/wp-content/uploads/2019/06/code-word-wrap.png)

](https://radu.link/enable-word-wrap-visual-studio-code/?ref=blog.faldi.xyz)

\-

[

GitLens line info causes horizontal scroll in editor · Issue #290 · gitkraken/vscode-gitlens

Just filed an issue with VSCode and want you to be aware as well: microsoft/vscode#43940 With the default settings, Gitlens draws text at the end of the current line showing git blame info. This ca...

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubgitkraken

![Image](https://opengraph.githubassets.com/77fd63ebd6aad3819610594887897302a27152a524d83f89c2e17cf086bff224/gitkraken/vscode-gitlens/issues/290)

](https://github.com/gitkraken/vscode-gitlens/issues/290?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Cara Menonaktifkan Scroll Horizontal pada Visual Studio Code&url=http://blog.faldi.xyz/cara-menonaktifkan-scroll-horizontal-pada-visual-studio-code/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/cara-menonaktifkan-scroll-horizontal-pada-visual-studio-code/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/cara-menonaktifkan-scroll-horizontal-pada-visual-studio-code//&title=Cara Menonaktifkan Scroll Horizontal pada Visual Studio Code "LinkedIn")[](/cdn-cgi/l/email-protection#2c135f594e46494f58116f4d5e4d0c61494243424d4758454a474d420c7f4f5e4340400c64435e45564342584d400c5c4d484d0c7a455f594d400c7f58594845430c6f4348490a4d415c174e434855114458585c1603034e40434b024a4d40484502545556034f4d5e4d0141494243424d4758454a474d42015f4f5e4340400144435e45564342584d40015c4d484d015a455f594d40015f5859484543014f43484903 "Email")

Topik [Tutorial](/tag/tutorial/)

[

## Tools untuk Membuat Dokumentasi

Dokumentasi sering kali terlupakan saat proses pengembangan perangkat lunak, padahal dokumentasi berperan…

08 Apr 2022



](/tools-membuat-dokumentasi/)[

## Rekomendasi Library React untuk Membuat Table

Beberapa waktu lalu, saya mendapatkan tugas untuk bisa memvisualisasi data dari Backend…

06 Jan 2022



](/rekomendasi-library-react-untuk-membuat-table/)