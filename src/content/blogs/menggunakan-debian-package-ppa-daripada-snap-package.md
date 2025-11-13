---
title: "Menggunakan Debian Package / PPA daripada Snap Package"
slug: menggunakan-debian-package-ppa-daripada-snap-package
description: "Beberapa waktu lalu saat saya menggunakan ubuntu, saya mencoba untuk melakukan install semua aplikasi Ubuntu dengan menggunakan snap."
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2021-10-17
image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wwfDF8c2VhcmNofDZ8fGxpbnV4fGVufDB8fHx8MTYzNDQ5MzcxMA&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/menggunakan-deb-ppa-daripada-snapd/"
---

Beberapa waktu lalu saat saya menggunakan ubuntu, saya mencoba untuk melakukan install semua aplikasi Ubuntu dengan menggunakan snap.

Snap merupakan sebuah _software package_ dan bisa dibilang sebuah ekosistem yang dikembangkan oleh Canoical untuk sistem operasi yang berjalan di Linux Kernal.

![Image](https://blog.faldi.xyz/content/images/2021/10/image-2.png)

Homepage Snap

## **Menggunakan Snap sebagai Alternatif Linux App**

Saat saya akan melakukan install, seperti halnya pengguna linux umumnya, selalu melakukan Google "Things to do after install Ubuntu 20.04" dan salah satu rekomendasinya adalah menggunakan package Snap sebagai basis untuk memasang aplikasi Linux di Ubuntuku.

Hal ini saya lakukan karena melihat beberapa aplikasi yang sering saya gunakan, sudah tersedia di snap. Misalnya saja

*   Visual Studio Code
*   Spotify
*   VLC
*   Postman
*   Telegram
*   Slack
*   Figma
*   dst

Ibaratnya, benar-benar seperti sebuah marketplace untuk keseluruhan aplikasi daily basis untuk pemrogram, semuanya ada. Sehingga saya pun merasa sangat terbantu. Untuk memasang / install cukup menggunakan

```bash
sudo snap install figma-linux
```

ganti saja `figma-linux` dengan nama Apps yang mau diinstall, maka kita dengan mudah bisa melakukan proses install

## Masalah saat Menggunakan Snap Apps

Nah, beberapa hari terakhir karena semakin pada aktivitasku dikantor, maka semakin banyak Apps yang harus aku buka secara bersamaan, darisinilah muncul masalah masalah saat menggunakan Snap Apps.

### Snap Store memakan banyak RAM

Masalah pertama, adalah Snap store yang tidak aku buka tetiba memakan / menggunakan banyak sekali RAM. Bahkan dengan Swap 2 GB dan RAM 12GB masih kurang mencukupi. Saat aku Google pun, ternyata saya tidak sendiri. Beberapa pembahasannya terkait snap memakan RAM (layaknya Google Chrome)

[

Should the snap-store be using >300Mb of memory?

The snap-store process is intermittently using hundreds of megabytes of RAM. Is this normal? Is there a solution?

![Image](https://cdn.sstatic.net/Sites/askubuntu/Img/apple-touch-icon.png?v=e16e1315edd6)Ask UbuntuJames

![Image](https://cdn.sstatic.net/Sites/askubuntu/Img/apple-touch-icon@2.png?v=c492c9229955)

](https://askubuntu.com/questions/1239860/should-the-snap-store-be-using-300mb-of-memory?ref=blog.faldi.xyz)

> [Snap-store hogging ram](https://www.reddit.com/r/Ubuntu/comments/gk48xm/snapstore_hogging_ram/?ref_source=embed&ref=share) from [Ubuntu](https://www.reddit.com/r/Ubuntu/?ref=blog.faldi.xyz)

Berdasarkan diskusi forum tersebut dapat beberapa kesimpulan yang bisa saya ambil

1.  Snap-store memang memakan RAM banyak, maka disarakan untuk menghapus snap-store apabila tidak digunakan
2.  Menggunakan gnome software center, mirip sama snap-store yang berisi banyak aplikasi namun dia sudah support snap dan Flatpak. Flatpak dan snap adalah cross platform linux format

### Apps Snap Memakan RAM

Kalau tadi masalah ada pada snap-store, ini salah satu masalah yang saya rasakan. Sebagai pemrogram Frontend maka hal yang wajar bila menggunakan beberapa Aplikasi berikut secara bersamaan

*   Figma
*   Slack
*   Google Chrome
*   Visual Studio Code
*   Telegram

Sayangnya, hanya membuka aplikasi tersebut sudah membuat Laptop Freeze, saat saya cek dengan menggunakan `htop` terlihat penggunaan RAM yang luar biasa dari Apps tersebut.

![Image](https://blog.faldi.xyz/content/images/2021/10/image-3.png)

List Apps yang bisa menghabiskan RAM

Benar-benar tidak ada RAM yang disisakan yang membuat komputer freeze dan harus masuk mode CLI untuk bisa `killall` snap dan snap Apps.

Masalahnya, kejadian ini tidak terjadi 1 - 2 kali, melainkan sudah 3x sehingga membuat diri ini harus segera mencari solusi atau jalan keluar dari masalah ini.

## Menghapus Snap dan Install Melalui PPA / package .deb

Akhirnya, saya mencoba untuk menghapus keseluruhan Apps Snap dan Snap store serta install Apps Linux menggunakan PPA Ubuntu atau langsung menggunakan package .deb, misalnya saja

**Visual Studio Code**

Menggunakan .deb dari Officialnya. [Download disini](https://code.visualstudio.com/download?ref=blog.faldi.xyz)

**Figma**

Menggunakan Electron Figma .deb, Download melalui Github karena Figma tidak memiliki Apps official untuk Linux. [Download sini](https://github.com/Figma-Linux/figma-linux?ref=blog.faldi.xyz)

**Slack**

Menggunakan .deb official Slack. [Download disini](https://slack.com/intl/en-id/downloads/linux?ref=blog.faldi.xyz)

**Google Chrome**

Menggunakan .deb official Chrome. [Download disini](https://www.google.com/chrome/?platform=linux&ref=blog.faldi.xyz)

**Telegram**

Menggunakan PPA Telegram, caranya menambahkan dan tutorial bisa [lihat disini](https://www.omgubuntu.co.uk/2019/08/how-to-install-telegram-on-ubuntu?ref=blog.faldi.xyz)

**Spotify**

Menggunakan Flatplak, caranya [setup Flatplak disini](https://flatpak.org/setup/?ref=blog.faldi.xyz), lalu tinggal [install spotify disini](https://flathub.org/apps/details/com.spotify.Client?ref=blog.faldi.xyz)

## Lesson Learned

> Snapd apps is of course will eat more memory because they pack all the dependency into the snap package. Also, they run under the container jail, which almost a lightweight Docker by itself. It is a tradeoff between easy distribution vs. low overhead with basic packman install
> 
> — Gilang Mentari Hamidy (@GilangHamidy) [October 6, 2021](https://twitter.com/GilangHamidy/status/1445648208437207040?ref_src=twsrc%5Etfw&ref=blog.faldi.xyz)

![Image](https://blog.faldi.xyz/content/images/2021/10/image-4.png)

Membuka aplikasi yang sama namun hanya memakan 6 GB RAM

Saat kita mengetahui teknologi sebuah ekosistem mungkin kita bisa mengetahui _trade off_ dari ekossitem tersebut dan dampak yang terjadi. Kurangnya riset saya dalam mengetahui snap ini memberikan _pain_ dengan waktu yang harus saya habiskan untuk install dan remove package snap dari Ubuntu.

Waktu yang harusnya digunakan untuk kerja pun harus dipending karena digunakan untuk install apps dan waktu saat menggunakan snap tidak maksimal karena sering freeze.

* * *

Semoga dengan tulisan ini bisa memberikan insight kepada teman-teman terkait menggunakan Apps di ekosistem Linux.

Bagikan[](https://twitter.com/share?text=Menggunakan Debian Package / PPA daripada Snap Package&url=http://blog.faldi.xyz/menggunakan-deb-ppa-daripada-snapd/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/menggunakan-deb-ppa-daripada-snapd/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/menggunakan-deb-ppa-daripada-snapd//&title=Menggunakan Debian Package / PPA daripada Snap Package "LinkedIn")[](/cdn-cgi/l/email-protection#67581412050d0204135a2a020900001209060c0609472302050e0609473706040c060002474847373726470306150e170603064734090617473706040c06000241060a175c0508031e5a0f1313175d4848050b08004901060b030e491f1e1d480a020900001209060c06094a0302054a1717064a0306150e170603064a140906170348 "Email")

Topik [Insight](/tag/insight/) [Lesson Learned](/tag/lesson-learned/) [Linux](/tag/linux/)

[

## Tips Meningkatkan Produktifitas dengan Visual Studio Code

Siapa sih yang tidak menggunakan VS Code? Bahkan menurut survey terbaru dari…

14 Nov 2021



](/tips-meningkatkan-produktifitas-dengan-visual-studio-code/)[

## Meningkatkan Readability pada Kode

Ketika berkolaborasi dengan pemrogram yang lain, kita harus bisa memahami kode yang…

06 Okt 2021



](/meningkatkan-readability-pada-kode/)