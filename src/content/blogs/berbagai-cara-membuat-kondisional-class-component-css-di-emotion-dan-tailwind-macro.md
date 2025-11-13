---
title: "Berbagai Cara Membuat Kondisional Class Component / CSS di Emotion dan Tailwind Macro"
slug: berbagai-cara-membuat-kondisional-class-component-css-di-emotion-dan-tailwind-macro
description: "twin.macro atau yang bisa kita sebut sebagai Twin's telah saya gunakan cukup lama. Seiringnya waktu pun, saya menemukan beberapa hal yang cukup menjadi _challe"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2021-04-03
image: "https://images.unsplash.com/photo-1608142172765-6949c94646ca?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wwfDF8c2VhcmNofDIxfHxtYWNib29rfGVufDB8fHx8MTYxNzQ1MDA3MQ&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/membuat-props-class-component-di-emotion-dan-tailwind-macro/"
---


## Pembuka

twin.macro atau yang bisa kita sebut sebagai Twin's  telah saya gunakan cukup lama. Seiringnya waktu pun, saya menemukan beberapa hal yang cukup menjadi _challenge_ bagi saya sendiri. Salah satunya adalah permasalahan kondisional class / kondisional style pada component di NextJS.

Kalau kita menggunakan Tailwind biasa, kita bisa menggunakan `tenary` pada class, misalnya :

```html
<div className={active ? "px-8 text-xl font-bold text-brand-400 " : " px-4 text-base font-semibold text-brand-600"}>
...
 </div>
```

atau menggunakan `dependencies` seperti `[classnames](https://www.npmjs.com/package/classnames?ref=blog.faldi.xyz)` yang membantu dalam _logic_ class.

Lantas, bagaimana dengan Twin's?

## Permasalahan

Ketika kita menggunakan Twin's, kita tidak bisa menggunakan `tenary` pada Twin’s `tw` prop, karena `tw` hanya bisa menerima `string`. Juga, kita tidak bisa menggunakan `className` untuk memberikan nama class karena Twin's menggunakan `tw` props atau `css` props untuk pemberian style / Tailwind Class pada jsx element.

## Solusi

Menggunakan `css` props

```javascript
import tw from 'twin.macro'

const Input = ({ hasHover }) => (
  <input css={[tw`border`, hasHover && tw`hover:border-black`]} />
)
```

Menggunakan `styled` Import

```javascript
import tw, { styled } from 'twin.macro'

const StyledInput = styled.input(({ hasBorder }) => [
  `color: black;`,
  hasBorder && tw`border-purple-500`,
])
const Input = () => <StyledInput hasBorder />
```

```javascript
import tw, { styled, css } from 'twin.macro'

const Btn = styled.button`
  ${props =>
    props.active
      ? tw`bg-brand-500 text-brand-500`
      : tw`bg-brand-300 text-brand-300`}
`

const Button = () => {
  return <Btn active={showButton}>Button Show</Btn>
}

export default Button
```

Selain bisa menggunakan `props` untuk bisa kondisional style, bisa pula digunakan untuk kondisional variable.

```javascript
import tw, {styled} from "twin.macro";

const PostImage = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 sm:h-80 bg-center bg-cover rounded-t`}
`;

export default () => {
	return (
  		<PostImage imageSrc={post.postImageSrc} />
	)
}
```

* * *

Beberapa cara tersebut yang bisa kita lakukan dalam melakukan kondisional `style` saat menggunakan Twin's. Kalau mungkin teman-teman memiliki cara tersendiri, silahkan mention ke [@f2ladi](twitter.com/f2aldi) ya!

Semoga Membantu!

## Referensi :

[

ben-rogerson/twin.macro

🦹‍♂️ Twin blends the magic of Tailwind with the flexibility of css-in-js (emotion, styled-components and goober) at build time. - ben-rogerson/twin.macro

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubben-rogerson

![Image](https://repository-images.githubusercontent.com/241534790/69c92980-3222-11eb-992f-a0802be3963d)

](https://github.com/ben-rogerson/twin.macro?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Berbagai Cara Membuat Kondisional Class Component / CSS di Emotion dan Tailwind Macro&url=http://blog.faldi.xyz/membuat-props-class-component-di-emotion-dan-tailwind-macro/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/membuat-props-class-component-di-emotion-dan-tailwind-macro/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/membuat-props-class-component-di-emotion-dan-tailwind-macro//&title=Berbagai Cara Membuat Kondisional Class Component / CSS di Emotion dan Tailwind Macro "LinkedIn")[](/cdn-cgi/l/email-protection#19266a6c7b737c7a6d245b7c6b7b787e7870395a786b7839547c747b6c786d395276777d706a7076777875395a75786a6a395a76746976777c776d3936395a4a4a397d70395c74766d707677397d7877394d7870756e70777d3954787a6b763f787469227b767d6024716d6d692336367b75767e377f78757d703761606336747c747b6c786d34696b76696a347a75786a6a347a76746976777c776d347d70347c74766d707677347d7877346d7870756e70777d3474787a6b7636 "Email")

Topik [CSS](/tag/css/) [Insight](/tag/insight/) [TailwindCSS](/tag/tailwindcss/) [Tutorial](/tag/tutorial/)

[

## List Kumpulan Tailwind UI Kit dan Tailwind UI Block

Ada kalanya, tanpa dengan kita membutuhkan referensi komponen komponen yang digunakan. Ada…

26 Apr 2021



](/list-kumpulan-tailwind-ui-kit-dan-tailwind-ui-block/)[

## Menggunakan Gulp untuk membuat Reusable Component di HTML,CSS dan Vanilla JS

Pengenalan Gulp merupakan salah satu tools untuk proses task management seperti automasi,…

01 Apr 2021



](/menggunakan-gulp-untuk-membuat-reusable-component-di-html-css-dan-vanilla-js/)