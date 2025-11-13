---
title: "NVM untuk Manajemen Node Version"
slug: nvm-untuk-manajemen-node-version
description: "Saat kita bekerja diperusahaan yang cukup besar, besar dalam artian memiliki banyak Web Apps yang dimaintenance, memiliki banyak legacy kode / Web Apps yang per"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2022-07-02
image: "https://images.unsplash.com/photo-1656625497563-ab79f48802ba?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wwfDF8YWxsfDJ8fHx8fHwyfHwxNjU2NjgzNTA1&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/nvm-untuk-manajemen-node-version/"
---

# Problem

Saat kita bekerja diperusahaan yang cukup besar, besar dalam artian memiliki banyak Web Apps yang dimaintenance, memiliki banyak legacy kode / Web Apps yang perlu dilakukan pembaruan. Maka sering kali kita menemukan bahwa Web Apps tersebut tidak bisa dijalankan pada NodeJS versi tertentu. Misalnya package manager pnpm.

![Image](https://blog.faldi.xyz/content/images/2022/06/Screen-Shot-2022-07-01-at-03.59.29.png)

PNPM Compatibility

Bila kita memiliki 2 Web Apps, Satu menggunakan pnpm versi 5 dan satunya menggunakan versi 7. Apakah kita harus install dan re install NodeJS versi 12 dan 14? Tentu saja tidak.

# Solution

Memperkenalkan, [NVM](https://github.com/nvm-sh/nvm?ref=blog.faldi.xyz). Node Version Manager. Sebuah package untuk install dan menggunakan node sesuai yang kita inginkan. Sesuai dengan namanya, kita bisa mengganti, melakukan pemasangan node dari berbagai versi dan melakukan switch node yang kita gunakan.

![Image](https://blog.faldi.xyz/content/images/2022/06/Screen-Shot-2022-07-01-at-04.03.01.png)

Akhirnya, dengan adanya NVM ini kita mampu untuk berpindah node saat berpindah menggunakan Web Apps / membangun sebuah Web Apps dengan node yang berbeda.

## Cara install NVM

Cukup susah untuk bisa menginstall [NVM](https://github.com/nvm-sh/nvm?ref=blog.faldi.xyz) kalau melihat Readme.md di [repositorynya](https://github.com/nvm-sh/nvm?ref=blog.faldi.xyz). Cara paling cepat adalah dengan install melalui homebrew untuk MacOS dan NVM-Dekstop untuk Windows.

Mudahnya untuk Windows tinggal unduh di [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows?ref=blog.faldi.xyz)

Sedangkan untuk MacOS dengan menggunakan homebrew

```script
brew install nvm
```

Lalu, membuat NVM Folder di Home

```script
mkdir ~/.nvm 
```

Melakukan configurasi variable

```script
vim ~/.zshrc
```

Menambahkan code berikut di profile terminal tadi

```script
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

Lalu, memuat variable tersebut dengan cara

```script
source ~/.bash_profile
```

Selanjutnya tinggal logout dan login.

## Cara menggunakan NVM

Sebelum kita install NVM, kita harus memastikan ketersedian node yang bisa kita install yaitu dengan

```script
nvm ls-remote
```

Kalau sudah, kita tinggal memilih versi node yang akan diinstall.

Install Node versi terbaru :

```script
nvm install node
```

Install Node sesuai versi, `nvm install [versi-node]`

```script
nvm install 14
```

Check versi Node yang sudah terinstall dengan

```
nvm ls 
```

Cara Mengganti versi Node

```script
nvm use 14 
```

#   
Conclusion

NVM Memudahkan kita dalam menggunakan node untuk setiap Web Apps yang memiliki dependencies yang berbeda beda tanpa perlu install dan uninstall node kita.

# Reference

[

GitHub - nvm-sh/nvm: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions

Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions - GitHub - nvm-sh/nvm: Node Version Manager - POSIX-compliant bash script to manage multiple active nod...

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubnvm-sh

![Image](https://opengraph.githubassets.com/34022bce02117a94b84693b74d15d8f7dad01ccc102c08fdb228d72bbac4d1c6/nvm-sh/nvm)

](https://github.com/nvm-sh/nvm?ref=blog.faldi.xyz#installing-and-updating)

> [How To Install NVM on macOS with Homebrew](https://tecadmin.net/install-nvm-macos-with-homebrew/?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=NVM untuk Manajemen Node Version&url=http://blog.faldi.xyz/nvm-untuk-manajemen-node-version/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/nvm-untuk-manajemen-node-version/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/nvm-untuk-manajemen-node-version//&title=NVM untuk Manajemen Node Version "LinkedIn")[](/cdn-cgi/l/email-protection#241b5751464e414750196a726904514a50514f0469454a454e4149414a046a4b404104724156574d4b4a024549541f464b405d194c5050541e0b0b46484b430a424548404d0a5c5d5e0b4a524909514a50514f0949454a454e4149414a094a4b404109524156574d4b4a0b "Email")

Topik [Lesson Learned](/tag/lesson-learned/) [Tutorial](/tag/tutorial/)

[

## Menuliskan Skillset pada CV

Beberapa waktu lalu, di Menfess Codingfess ada submit yang cukup menarik, yaitu…

09 Jul 2022



](/menuliskan-skillset-pada-cv/)[

## Unit Testing React Component

Mengutip salah satu research, bahwasannya dengan melakukan unit testing, kita akan bisa…

01 Jul 2022



](/unit-testing-react-component/)