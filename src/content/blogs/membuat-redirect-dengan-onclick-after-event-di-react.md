---
title: "Membuat Redirect dengan OnClick / After Event di React"
slug: membuat-redirect-dengan-onclick-after-event-di-react
description: "Pernah tidak, memiliki sebuah element yang telah dibuat sedemikian rupa, ternyata saat revisi memiliki fungsi untuk berpindah halaman? atau memiliki sebuah even"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2020-11-14
image: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;fm&#x3D;jpg&amp;crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;w&#x3D;2000&amp;fit&#x3D;max&amp;ixid&#x3D;eyJhcHBfaWQiOjExNzczfQ"
canonical: "http://blog.faldi.xyz/membuat-redirect-onclick-routes/"
---


## Permasalahan

Pernah tidak, memiliki sebuah element yang telah dibuat sedemikian rupa, ternyata saat revisi memiliki fungsi untuk berpindah halaman? atau memiliki sebuah event?

Pernah tidak, ingin mempertahankan sebuah tag pada sebuah element. Misalnya `<button/>` namun disisi lain, element tersebut memiliki kemampuan untuk memindahkan halaman satu ke halaman lain ?

## Solusi

React Router memiliki sebuah function untuk bisa melakukan _routing_ / _redirect_ user ke sebuah halaman, yaitu dengan menggunakan history dengan `history.push` . Contohnya apabila kita menginginkan sebuah button kita untuk bisa melakukan routing atau baris table kita bisa melakukan redirect ke halaman lain dengan cara

```javascript
import React from 'react

export default function UjiCoba() { 
const handleOnClick = () => history.push('/sample');    
    return (
    <button type="button" onClick={handleOnClick}>
      Go home
    </button>
  );
}
```

Bisa dilihat, kita bisa menggunakan onClick pada button atau element lainnya. Tidak melulu harus menggunakan komponen `<Link>` dari _react router_. Namun, perlu ada beberapa catatan kita tetap harus menggunakan `<Link>` daripada onClick dengan `history.push`. Misalnya terkait dengan tag element yang mana `<Link>` menggunakan tag element `<a/>` dan `history.push` digunakan saat kita mencoba untuk secara otomatis memindahkan sebuah halaman ke halaman lain. Contoh kasusnya setelah login dialihkan ke halaman dashboard.

### Contoh otomasi perpindahan page sebuah event seperti

```
handleDelete() {
  const { match: { params }, history } = this.props;

  axios.delete(`/api/users/${params.userId}`)
    .then(() => {
      history.push('/users');
    });
}
```

* * *

Sekiranya, hanya itu saja yang bisa saya bagikan terkait dengan OnClick untuk routing. Semoga membantu ya!

## Sumber :

[

Using history

Using History Now that we have the user’s info showing, we need to add the functionality to redirect to the /users route after deleting the user through the API. Since we need to redirect after the API returns a response, we can’t just use Link to go back. We ne

![Image](https://scotch.io/apple-touch-icon.png)ScotchAlex Sears

![Image](https://scotch-res.cloudinary.com/image/upload/w_auto,q_auto:good,f_auto/media/1/MyiYcendTBiZK0iU35n6_using-the-react-router-4.png.jpg)

](https://scotch.io/courses/using-react-router-4/using-history?ref=blog.faldi.xyz)

[

React-router: How to manually invoke Link?

I’m new to ReactJS and to React-Router. I have a component that receives through props a &lt;Link/&gt; object from react-router. Whenever the user clicks on a ‘next’ button inside this component I ...

![Image](https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a)Stack OverflowAlan Souza

![Image](https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded)

](https://stackoverflow.com/questions/29244731/react-router-how-to-manually-invoke-link?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Membuat Redirect dengan OnClick / After Event di React&url=http://blog.faldi.xyz/membuat-redirect-onclick-routes/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/membuat-redirect-onclick-routes/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/membuat-redirect-onclick-routes//&title=Membuat Redirect dengan OnClick / After Event di React "LinkedIn")[](/cdn-cgi/l/email-protection#8eb1fdfbece4ebedfab3c3ebe3ecfbeffaaedcebeae7fcebedfaaeeaebe0e9efe0aec1e0cde2e7ede5aea1aecfe8faebfcaecbf8ebe0faaeeae7aedcebefedfaa8efe3feb5ece1eaf7b3e6fafafeb4a1a1ece2e1e9a0e8efe2eae7a0f6f7f4a1e3ebe3ecfbeffaa3fcebeae7fcebedfaa3e1e0ede2e7ede5a3fce1fbfaebfda1 "Email")

Topik

[

## Cara Import SVG di NextJS

Permasalahan Sebenarnya, untuk import SVG,JPG, Webp dan extension image lain, secara…

15 Nov 2020



](/cara-import-svg-di-nextjs/)[

## Cara Bertanya Permasalahan dalam Pemrogram yang Baik

Permasalahan Sering kali, kite menemukan orang menyanyakan sebuah masalah atas galat di…

13 Nov 2020



](/cara-bertanya-permasalahan-dalam-pemrogram-yang-baik/)