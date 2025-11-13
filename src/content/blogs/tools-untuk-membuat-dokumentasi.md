---
title: "Tools untuk Membuat Dokumentasi"
slug: tools-untuk-membuat-dokumentasi
description: "Dokumentasi sering kali terlupakan saat proses pengembangan perangkat lunak, padahal dokumentasi berperan penting dalam penjelasan sebuah project, bagaimana car"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2022-04-07
image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wwfDF8c2VhcmNofDN8fGRvY3VtZW50fGVufDB8fHx8MTY0OTM1NjUzMg&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/tools-membuat-dokumentasi/"
---


Dokumentasi sering kali terlupakan saat proses pengembangan perangkat lunak, padahal dokumentasi berperan penting dalam penjelasan sebuah project, bagaimana cara kita bekerja dengan apps tersebut, proses pemasangan perangkat lunak tersebut hingga memudahkan kita dalam mengurangi "pain" pada saat onboarding tim baru.

Dokumentasi pun, ada beragam jenisnya. Ada yang hanya digunakan untuk memberitahu informasi mengenai

*   Step by step install
*   Alur Kerja Software tersebut
*   Coding Styleguide
*   dst

Karena itulah ada banyak sekali jenis jenis cara untuk bisa membuat dokumentasi, tergantung tujuan dari dokumentasi tersebut dan siapa yang membacanya.

## Readme

Sesimple Readme di Github, teman-teman bisa menggunakan [https://readme.so/](https://readme.so/?ref=blog.faldi.xyz) untuk memudahkan dalam membuat Readme. Readme disini bisa digunakan untuk memberikan informasi yang ringan mengenai sebuah project misalnya untuk

*   Step by Step pemasangan software di local machine
*   Tech Stack yang digunakan
*   Folder Structure
*   FAQ
*   Usage
*   dst

Mayoritas digunakan pada project project open source di Github. Beberapa contoh Readme.md yang cukup bagus seperti :

[

ohmyzsh/README.md at master · ohmyzsh/ohmyzsh

🙃 A delightful community-driven (with 2,000+ contributors) framework for managing your zsh configuration. Includes 300+ optional plugins (rails, git, macOS, hub, docker, homebrew, node, php, pyth...

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubohmyzsh

![Image](https://repository-images.githubusercontent.com/291137/fb009080-6110-11e9-82c2-b21ca7831f5c)

](https://github.com/ohmyzsh/ohmyzsh/blob/master/README.md?ref=blog.faldi.xyz)

[

twin.macro/README.md at master · ben-rogerson/twin.macro

🦹‍♂️ Twin blends the magic of Tailwind with the flexibility of css-in-js (emotion, styled-components, stitches and goober) at build time. - twin.macro/README.md at master · ben-rogerson/twin.macro

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubben-rogerson

![Image](https://repository-images.githubusercontent.com/241534790/69c92980-3222-11eb-992f-a0802be3963d)

](https://github.com/ben-rogerson/twin.macro/blob/master/README.md?ref=blog.faldi.xyz)

## Storybook

[

Storybook: UI component explorer for frontend developers

Storybook is an open source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.

![Image](https://storybook.js.org/icons/icon-512x512.png)StorybookBrad FrostAuthor of Atomic Design

![Image](https://storybook.js.org/images/social/open-graph.png)

](https://storybook.js.org/?ref=blog.faldi.xyz)

Storybook adalah tools untuk membuat dokumentasi terkait dengan UI Component, misalnya ketika kita akan membuat sebuah

*   Design System
*   UI Kit

Selain bisa digunakan untuk membuat dokumentasi UI, kita bisa menggunakan Storybook untuk melakukan testing component UI, misalnya untuk test props dari variants component UI bekerja. Beberapa contoh penggunakan Storybook :

[

Webpack App



](https://react-data-table-component.netlify.app/?ref=blog.faldi.xyz)

[

Storybook



](https://govuk-react.github.io/govuk-react/?path=%2Fstory%2Fwelcome--page&ref=blog.faldi.xyz)

## Docusaurus

[

Build optimized websites quickly, focus on your content | Docusaurus

An optimized site generator in React. Docusaurus helps you to move fast and write content. Build documentation websites, blogs, marketing pages, and more.

![Image](https://docusaurus.io/img/docusaurus.png)Docusaurus

![Image](https://docusaurus.io/img/docusaurus-soc.png)

](https://docusaurus.io/?ref=blog.faldi.xyz)

Docusaurus adalah sebuah Site Generator dengan menggunakan ReactJS yang berfokus pada dokumentasi, sehingga saat kita menggunakan kita bisa langsung fokus pada penulisan dokumentasi produk kita. Tidak perlu mengurus Styling (kecuali bila ingin disesuaikan dengan brand perusahaan).

Ini sangat cocok bila kita gunakan untuk

*   Step by Step Install
*   Dokumentasi terkait penggunaan Apps / Library
*   Referensi API
*   dst

Docusaurus menggunakan MDX, sehingga memudahkan kita dalam melakukan format tulisan yang akan dibuat, support code highlight, component interaction.

Beberapa contoh yang menggunakan Docusaurus :

[

Dyte Docs

Real-time audio & video SDKs, ready to launch 🚀



](https://docs.dyte.io/react/installation?ref=blog.faldi.xyz)

[

Animations | Ionic Documentation

Animations: Web Animations API to Build and Run on Ionic Apps

![Image](https://ionicframework.com/docs/img/meta/favicon-96x96.png)Site Logo

![Image](https://ionicframework.com/docs/logos/ionic-text-docs-dark.svg)

](https://ionicframework.com/docs/utilities/animations?ref=blog.faldi.xyz)

## Notion

[https://www.notion.so/](https://www.notion.so/?ref=blog.faldi.xyz)

Notion adalah salah satu project management untuk menuliskan catatan catatan penting dalam sebuah ruang kerja. Alasan inilah yang membuat banyak perusahaan menggunakannya sebagai tempat untuk membuat dokumentasi di Notion yang batasannya tidak hanya pada template-template yang dimiliki Notion, namun juga komunitasnya.

Notion juga memberikan kemudahan dengan integrasi dengan Third Party yaitu

*   Google Docs
*   Figma
*   Slack
*   Jira
*   Typeform
*   dst

Selain itu, munculnya Notion API membuat kita bisa membuat Web berbasis Notion, misalnya Blog, dan Personal Site.

Beberapa contoh Wiki Engineering di Notion :

[https://www.notion.so/templates/engineering-wiki](https://www.notion.so/templates/engineering-wiki?ref=blog.faldi.xyz)

[

Notion – The all-in-one workspace for your notes, tasks, wikis, and databases.

A new tool that blends your everyday work apps into one. It’s the all-in-one workspace for you and your team

![Image](https://www.notion.so/images/logo-ios.png)Notion

![Image](https://www.notion.so/images/meta/default.png)

](https://www.notion.so/API-Documentation-e4a7746e6a3f45dbb58ea6b45b8f9744?ref=blog.faldi.xyz)

[

Documentation Made Easy

Imitation is the sincerest form of flattery. 65+ Notion docs for early stage startups.

![Image](https://air.inc/apple-touch-icon.png)Air

![Image](https://images.ctfassets.net/c1d9eptjtfvv/6kVKeiTtQCcDoJJGnL4WIp/f81d3a8fc37439c8c9fc375d0949afda/Group_240.png?fit=scale&w=600&h=315)

](https://air.inc/blog/documentation-for-dummies-notion-templates-for-early-stage-startups?ref=blog.faldi.xyz)

## Custom

Kurang merasa cocok dengan tools dokumentasi yang saya sebutkan diatas? Mungkin bisa dengan membuat sendiri dokumentasinya dengan menggunakan Framework JS untuk membuat SSG (Static Site Generator).

### Nextra

[

GitHub - shuding/nextra: The Next.js Static Site Generator

The Next.js Static Site Generator. Contribute to shuding/nextra development by creating an account on GitHub.

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubshuding

![Image](https://repository-images.githubusercontent.com/272492043/4f671c80-3995-11eb-9928-5f15561aff6b)

](https://github.com/shuding/nextra?ref=blog.faldi.xyz)

Menggunakan NextJS untuk membuat SSG, Nextra merupakan salah satu lib yang bisa kita gunakan karena menggunakan Tech Stack

*   Typescript
*   NextJS
*   TailwindCSS

Menggunakan teknologi populer, akan memudahkan kita dalam mengcustom dokumentasi yang akan kita gunakan. Sayangnya, Nextra masih belum tahap rilis, atau masih beta. Sehingga bisa jadi banyak perubahan pada API-nya. Namun, Nextra sudah digunakan untuk membuat dokumentasi SWR.

[

Getting Started – SWR

SWR is a React Hooks library for data fetching. SWR first returns the data from cache (stale), then sends the fetch request (revalidate), and finally comes with the up-to-date data again.

![Image](https://swr.vercel.app/favicon/apple-touch-icon.png)

![Image](https://swr-card.vercel.app/?title=Getting%20Started)

](https://swr.vercel.app/docs/getting-started?ref=blog.faldi.xyz)

### Gatsby Docs Theme

Gatsby merupakan salah satu framework ReactJS yang berfokus pada SSG. Karena itu kita bisa membuat dokumentasi dengan integrasi Markdown, merubah styling sesuai dengan yang kita inginkan. Bahkan sudah banyak sekali template / Gatsby Theme untuk membuat dokumentasi :

[

List of 6 curated Gatsby Themes for Documentaion site

Informative and easy to use documentation themes for your project. Most of them created by well-known companies and feature-rich

![Image](https://gatsbytemplates.io/icons/icon-512x512.png?v=211554f20803332a047a44718e37c68b)

![Image](https://gatsbytemplates.io/logo.png)

](https://gatsbytemplates.io/gatsby-documentation-themes/?ref=blog.faldi.xyz)

* * *

Penggunaan tools tentu harus menyesuaikan dengan siapa pembaca dokumentasi, siapa yang bertugas menulis dokumentasi dan apa saja yang ada didokumentasi tersebut. Ini membuat orang menjadi lebih mudah untuk membaca dokumentasi tersebut, tujuan dokumentasi kan untuk memudahkan orang menggunakan apps, kalau dokumentasi tersebut susah untuk dibaca, bagaimana orang mau menggunakan dokumentasi tersebut?

## 👀 Referensi :

[

Documentation in Software Development ► README, Flowchart, Coding style guides

In software development we create different types of documentation. Let’s tell more about the project documentation types.

![Image](https://maddevs.io/favicon.ico)Mad Devs Group LTDEmir Sabyrkulov Software Delivery Manager Oct 20, 2021

![Image](https://images.prismic.io/superpupertest/bfdee19c-ad15-4ea5-b12e-5a2e6ffbf909_The+Importance+of+Documentation+in+Software+Development.webp)

](https://maddevs.io/customer-university/importance-of-documentation/?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Tools untuk Membuat Dokumentasi&url=http://blog.faldi.xyz/tools-membuat-dokumentasi/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/tools-membuat-dokumentasi/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/tools-membuat-dokumentasi//&title=Tools untuk Membuat Dokumentasi "LinkedIn")[](/cdn-cgi/l/email-protection#b986caccdbd3dcdacd84edd6d6d5ca99ccd7cdccd299f4dcd4dbccd8cd99fdd6d2ccd4dcd7cdd8cad09fd8d4c982dbd6ddc084d1cdcdc9839696dbd5d6de97dfd8d5ddd097c1c0c396cdd6d6d5ca94d4dcd4dbccd8cd94ddd6d2ccd4dcd7cdd8cad096 "Email")

Topik [Insight](/tag/insight/) [Opini](/tag/opini/) [Lesson Learned](/tag/lesson-learned/)

[

## Unit Testing React Component

Mengutip salah satu research, bahwasannya dengan melakukan unit testing, kita akan bisa…

01 Jul 2022



](/unit-testing-react-component/)[

## Cara Menonaktifkan Scroll Horizontal pada Visual Studio Code

Secara default, VS Code memiliki fitur untuk membuat kode editor kita bisa…

31 Mar 2022



](/cara-menonaktifkan-scroll-horizontal-pada-visual-studio-code/)