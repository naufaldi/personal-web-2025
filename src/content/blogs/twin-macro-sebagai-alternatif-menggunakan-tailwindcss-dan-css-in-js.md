---
title: "twin.macro Sebagai Alternatif menggunakan TailwindCSS dan CSS-in-JS"
slug: twin-macro-sebagai-alternatif-menggunakan-tailwindcss-dan-css-in-js
description: "twin.macro adalah salah satu library yang dibuat oleh [Ben Rogerson](https://github.com/ben-rogerson?ref=blog.faldi.xyz), menggunakan Tailwind dan mencampurkann"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2021-03-14
image: "https://images.unsplash.com/photo-1612831661153-4914a5ff7851?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wxfDF8YWxsfDF8fHx8fHwyfHwxNjE1NzQ2NjY1&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/menggunakan-twin-macro-dan-emotion-di-nextjs/"
---

twin.macro adalah salah satu library yang dibuat oleh [Ben Rogerson](https://github.com/ben-rogerson?ref=blog.faldi.xyz), menggunakan Tailwind dan mencampurkannya dengan CSS-in-JS menjadikan twin.macro sebagai salah satu alternatif untuk bisa menuliskan Tailwind dengan lebih mudah dan lebih bervariatif.

## Apa itu twin.macro?

Salah satu pustaka yang merubah Tailwind class menjadi CSS object dengan menggunakan Emotion/styled-component yang memberikan kita beberapa keunggulan dengan menulis Styled Component.

## Cara Install twin.macro

Ada beberapa cara untuk bisa melakukan install twin.macro. Untuk versi bahasa inggris (saya akan menulis versi bahasa indonesia) bisa melakukan dengan cara dari official twin.macro.

### Light libraries

*   **Preact**  
    [styled-components](https://github.com/ben-rogerson/twin.examples/tree/master/preact-styled-components?ref=blog.faldi.xyz) / [emotion](https://github.com/ben-rogerson/twin.examples/tree/master/preact-emotion?ref=blog.faldi.xyz) / [goober](https://github.com/ben-rogerson/twin.examples/tree/master/preact-goober?ref=blog.faldi.xyz)
*   **React**  
    [styled-components](https://github.com/ben-rogerson/twin.examples/tree/master/react-styled-components?ref=blog.faldi.xyz) / [emotion](https://github.com/ben-rogerson/twin.examples/tree/master/react-emotion?ref=blog.faldi.xyz)

### Tooled libraries

*   **Create React App**  
    [styled-components](https://github.com/ben-rogerson/twin.examples/tree/master/cra-styled-components?ref=blog.faldi.xyz) / [emotion](https://github.com/ben-rogerson/twin.examples/tree/master/cra-emotion?ref=blog.faldi.xyz)
*   **Snowpack**  
    [styled-components](https://github.com/ben-rogerson/twin.examples/tree/master/snowpack-react-styled-components?ref=blog.faldi.xyz) / [styled-components (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/snowpack-react-styled-components-typescript?ref=blog.faldi.xyz) / [emotion](https://github.com/ben-rogerson/twin.examples/tree/master/snowpack-react-emotion?ref=blog.faldi.xyz) / [emotion (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/snowpack-react-emotion-typescript?ref=blog.faldi.xyz)
*   **Vite**  
    [styled-components (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/vite-styled-components-typescript?ref=blog.faldi.xyz) / emotion

### Advanced frameworks

*   **Gatsby**  
    [styled-components](https://github.com/ben-rogerson/twin.examples/tree/master/gatsby-styled-components?ref=blog.faldi.xyz) / [emotion](https://github.com/ben-rogerson/twin.examples/tree/master/gatsby-emotion?ref=blog.faldi.xyz)
*   **Next.js**  
    [styled-components](https://github.com/ben-rogerson/twin.examples/tree/master/next-styled-components?ref=blog.faldi.xyz) / [emotion](https://github.com/ben-rogerson/twin.examples/tree/master/next-emotion?ref=blog.faldi.xyz)
*   **Laravel**  
    [styled-components (ts)](https://github.com/ben-rogerson/twin.examples/tree/master/laravel-styled-components-typescript?ref=blog.faldi.xyz)

## Cara Menggunakan twin.macro

Kalau biasanya, tanpa twin.macro kita menggunakan ClassName, maka di twin.macro kita menggunakan `tw` props untuk menambahkan Tailwind classes ke jsx element.

```javascript
import 'twin.macro'

const Input = () => <input tw="border hover:border-black" />
```

## Conditional Style

```javascript
import tw from 'twin.macro'

const Input = ({ hasHover }) => (
  <input css={[tw`border`, hasHover && tw`hover:border-black`]} />
)
```

## Menggunakan SaSS

```javascript
import tw, { css } from 'twin.macro'

const hoverStyles = css`
  &:hover {
    border-color: black;
    ${tw`text-black`}
  }
`
const Input = ({ hasHover }) => (
  <input css={[tw`border`, hasHover && hoverStyles]} />
)
```

## Menggunakan Styled Components untuk styling component

```javascript
import Reactfrom 'react';
import tw from 'twin.macro'

const Input = tw.input`border hover:border-black`

const ComponentInput = () => {
return (
	<Input name="name" />
	)
}
```

Bisa juga menjadikannya Reusable Component, terutama dalam kasus Styling Text.

```javascript
import tw from 'twin.macro';

const TextBody = tw.p`text-black text-base leading-5`;

export default TextBody;
```

TextBody.js

Lalu, kita bisa menggunakan ulang component tersebut dan menambahkan beberapa styling yang kita custom. Misalnya

```javascript
import React from 'react';
import tw from 'twin.macro';
import TextBody from '../components/misc/TextBody';

const Subtitle = tw(TextBody)`font-semibold my-2 mx-auto`;

const Paragraf = () => {
  return (
    <>
      <Subtitle>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quo at
        maiores molestias, est cum atque iusto, perspiciatis laudantium mollitia
        et facere ipsum in amet deserunt eaque, similique porro vero!
      </Subtitle>
    </>
  );
};

export default Paragraf;
```

paragraf.js

### Menggunakan twin.macro dan Sass secara bersamaan pada sebuah komponen

```javascript
import tw, { styled, css } from 'twin.macro';

const TextHeaderSix = styled.h6`
  ${tw`font-bold text-3xl text-center`}
  ${css`
    line-height: 1em;
  `}
`;

export default TextHeaderSix;
```

TextHeaderSix.js

## Condition Styling Component di twin.macro pada Component

```javascript
import tw, { styled } from 'twin.macro';

const TextHeaderOne = styled.h1(({ isCapitalize, isLarge }) => [
  tw`font-Playfair font-bold `,
  // Ternary
  isCapitalize && tw`capitalize`,
  isLarge ? tw`text-3xl` : tw`text-2xl`,
]);

export default TextHeaderOne;
```

TextHeaderOne.js

## Variant- variant untuk Prefix

Kalau di Tailwind, hanya beberapa prefix yang disupport seperti `active:` `hover:` `group:` , `focus:` sedangkan pada twin.macro, ada banyak sekali variant yang disupport seperti :

*   Prefix `before:` and `after:` untuk style pseudo-elements
*   Prefix `hocus:` untuk style hover + focus pada saat yang sama
*   Style dengan extra group states seperti `group-hocus:` dan `group-active:`
*   Style form field states dengan`checked:`, `invalid:` dan `required:`
*   Stack up variants  `sm:hover:first:bg-black`

Stack variant bisa berlaku untuk variant dengan banyak style menjadi seperti ini

```javascript
import React from 'react';
import tw from 'twin.macro';

const Header = () => {
  return (
    <div tw="bg-blue-100 py-4 hover:(bg-blue-200 text-white py-2)">
      header Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut optio,
      sint, neque et veritatis expedita suscipit perspiciatis illum recusandae
      enim, libero tempora. Eveniet est excepturi doloremque error nobis
      dignissimos magnam.
    </div>
  );
};

export default Header;
```

Header.js

## Menambahkan Class !important

Sebenarnya, kita sebisa mungkin menghindari penggunaan style `!important` namun, pada beberapa kasus kita membutuhkan. Nah, twin.macro juga mensupport hal tersebut.

```javascript
import React from 'react';
import tw from 'twin.macro';

const Footer = () => {
  return <div tw="bg-blue-100 bg-blue-400!">footer</div>;
};

export default Footer;
```

Footer.js

### Referensi Tulisan:

[

ben-rogerson/twin.macro

🦹‍♂️ Twin blends the magic of Tailwind with the flexibility of css-in-js (emotion, styled-components and goober) at build time. - ben-rogerson/twin.macro

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubben-rogerson

![Image](https://repository-images.githubusercontent.com/241534790/69c92980-3222-11eb-992f-a0802be3963d)

](https://github.com/ben-rogerson/twin.macro?ref=blog.faldi.xyz)

[

The Power of twin.macro

I’ll explain what is twin.macro and I’ll show you all of the features provided by twin.macro....

![Image](https://res.cloudinary.com/practicaldev/image/fetch/s--t7tVouP9--/c_limit,f_png,fl_progressive,q_80,w_192/https://practicaldev-herokuapp-com.freetls.fastly.net/assets/devlogo-pwa-512.png)DEV CommunityAngel Martinez

![Image](https://res.cloudinary.com/practicaldev/image/fetch/s--xs2Gl0_f--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/bnimsixcpkqm82y2iith.png)

](https://dev.to/angelmtztrc/the-powerful-of-twin-macro-5gjn?ref=blog.faldi.xyz)

### Sumber Kode Github:

[

naufaldi/example-emotion-twin-macro-nextjs

Project Example Emotion and Twin Macro with NextJS - naufaldi/example-emotion-twin-macro-nextjs

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubnaufaldi

![Image](https://avatars.githubusercontent.com/u/13159420?s=400&v=4)

](https://github.com/naufaldi/example-emotion-twin-macro-nextjs?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=twin.macro Sebagai Alternatif menggunakan TailwindCSS dan CSS-in-JS&url=http://blog.faldi.xyz/menggunakan-twin-macro-dan-emotion-di-nextjs/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/menggunakan-twin-macro-dan-emotion-di-nextjs/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/menggunakan-twin-macro-dan-emotion-di-nextjs//&title=twin.macro Sebagai Alternatif menggunakan TailwindCSS dan CSS-in-JS "LinkedIn")[](/cdn-cgi/l/email-protection#5e612d2b3c343b3d2a632a29373070333f3d2c317e0d3b3c3f393f377e1f322a3b2c303f2a37387e333b3039392b303f353f307e0a3f37322937303a1d0d0d7e3a3f307e1d0d0d73373073140d783f332e653c313a2763362a2a2e6471713c32313970383f323a377026272471333b3039392b303f353f30732a29373073333f3d2c31733a3f30733b33312a373130733a3773303b262a342d71 "Email")

Topik [CSS](/tag/css/) [NextJS](/tag/nextjs/) [ReactJS](/tag/reactjs/) [TailwindCSS](/tag/tailwindcss/) [Tutorial](/tag/tutorial/)

[

## Cara Install NextJS + twin.macro + Emotion

Ada beberapa kemudahan ketika kita menggunakan twin.macro dan Emotion pada proyek…

30 Mar 2021



](/memulai-nextjs-tailwind-macro-emotion/)[

## Repository Github untuk meningkatkan Skill Pemrograman

Meningkatkan skill pemrograman tidak hanya selalu berkutat pada proses pengerjaan proyek secara…

02 Feb 2021



](/repository-github-untuk-meningkatkan-skill-pemrograman/)