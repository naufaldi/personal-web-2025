---
title: "Unit Testing React Component"
slug: unit-testing-react-component
description: "Mengutip salah satu research, bahwasannya dengan melakukan unit testing, kita akan bisa [mengurangi bug setidaknya 40% -80%.](https://www.researchgate.net/publi"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2022-07-01
image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;MnwxMTc3M3wwfDF8c2VhcmNofDV8fHVzZXIlMjB0ZXN0fGVufDB8fHx8MTY1NjY4MzUyMA&amp;ixlib&#x3D;rb-1.2.1&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/unit-testing-react-component/"
---

Mengutip salah satu research, bahwasannya dengan melakukan unit testing, kita akan bisa [mengurangi bug setidaknya 40% -80%.](https://www.researchgate.net/publication/3249271_Guest_Editors'_Introduction_TDD--The_Art_of_Fearless_Programming?ref=blog.faldi.xyz) Kent C. Dodds sendiri pernah bilang dalam Tweetnya bahwa :

> The more your tests resemble the way your software is used, the more confidence they can give you.
> 
> — Kent C. Dodds 💿 (@kentcdodds) [March 23, 2018](https://twitter.com/kentcdodds/status/977018512689455106?ref_src=twsrc%5Etfw&ref=blog.faldi.xyz)

Artinya, dengan kita melakukan testing pada component kita. Kita bisa merasa percaya diri bahwa component yang kita buat, apps yang kita buat tidak akan menimbulkan bug / permasalahan dikemudian hari.

Kent C. Dodds juga pernah bilang dalam blognya, [How to know what to test](https://kentcdodds.com/blog/how-to-know-what-to-test?ref=blog.faldi.xyz) :

> **Think less about the code you are testing and more about the use cases that code supports.**

> The more your tests resemble the way your software is used, the more confidence they can give you.
> 
> — Kent C. Dodds 💿 (@kentcdodds) [March 23, 2018](https://twitter.com/kentcdodds/status/977018512689455106?ref_src=twsrc%5Etfw&ref=blog.faldi.xyz)

Testing yang dihasilkan atau yang akan kita bangun, haruslah merepresentasikan apa yang dilakukan oleh user terhadap komponen kita dan apa saja yang bisa komponen kita lakukan.

## Studi Kasus Melakukan Test

Kalau kita melihat dari [Chakra UI Test Component](https://github.com/chakra-ui/chakra-ui/blob/main/packages/button/tests/button.test.tsx?ref=blog.faldi.xyz), dimana Testing yang dilakukan berfokus kepada behaviour komponen dan ARIA sangat wajar karena Chakra berfokus kepada ARIA dan setiap komponen memiliki props yang cukup banyak sehingga perlu melakukan testing terhadap setiap props.

Kalau kita membicarakan [React Boostrap Test Case](https://github.com/react-bootstrap/react-bootstrap/blob/bs4-dev/test/ButtonSpec.js?ref=blog.faldi.xyz) berfokus kepada UI Class. Maka sangat wajar pula, karena React Boostrap memiliki banyak variant UI Class pada komponennya.

Sehingga dapat kita simpulkan bahwasannya scenario test yang akan kita bangun berdasarkan "Interaksi user kepada component kita"

Apabila component tersebut digunakan untuk user input, memasukkan data maka test case kita haruslah lebih banyak berfokus kepada user event, dimana kita mencoba menuliskan scenario dimana user memasukan berbagai jenis data (string, number, date etc) pada component input kita.

Kalau component kita digunakan sebagai dump component, maka kita membuat scenario dimana komponen kita memiliki variant UI / mampu menampilkan props sesuai dengan context.

## Testing pada React

Saat melakukan test pada React, kita bisa menimbang beberapa hal yaitu

*   Interaksi user
*   Perubahan  _component props_
*   Perubahan _Context_
*   Perubahan _Subscribtion_ (Perubahan _Router_, _Redux Store_, dst)

Lalu, kita bisa menuliskan screnario possibility setiap component yang bisa terjadi. Misalkan untuk sebuah Button,

1.  Button disabled apabila mendapatkan props isDisabled
2.  Button memiliki class 'bg-blue-500'  apabila mendapatkan props variant primary
3.  Button memberikan callback apabila user melakukan click pada button
4.  Button bernama simpan apabila diberikan context simpan pada props name

Lalu, kita bisa berpindah untuk testing pada Pages yang lain apabila semua component, single component sudah ditest. Namun, ada yang bilang bahwa ini sudah termasuk integration test. Saat kita mencoba untuk melakukan testing yang berkaitan dengan satu component dengan component lain. Misalkan saja melakukan test pada halaman Form Login, maka kita memastikan bahwa form input username, password dan button login mampu untuk melaksanakan tugasnya.

Kurang lebih scenario / possibilitynya seperti

1.  Button disabled apabila form input username dan password belum terisi
2.  Form input menampilkan error apabila username tidak terdaftar
3.  Form input menampilkan error apabila password salah
4.  Form input menampilkan error apabila jumlah karakter password kurang
5.  Button enabled apabila form input username dan password sudah terisi
6.  Button berganti warna apabila enabled
7.  Form input berganti warna apabila terdapat props error
8.  dst

Karena saya belum mempelajari Integration Test lebih lanjut, dan End-to-end test, maka saya belum bisa memberikan screnario lain dan tahapan testing lainnya.

# Kesimpulan

Apa yang ingin saya sampaikan pada tulisan ini itu, sebenarnya

1.  Testing itu penting
2.  Penting untuk bisa meminimalisir bug
3.  Semaksimal mungkin mengcover scenario berdasarkan behaviour user terhadap apps kita

Kalau ditanya kenapa tidak end-to-end test, menurut Kent C. Dodds :

![Image](https://blog.faldi.xyz/content/images/2022/06/image.png)

Unit Test lebih murah dan cepat, End-to-end lebih mahal dan lambat(proses test lama).

## Reference

[

Write tests. Not too many. Mostly integration.

\[Guillermo Rauch\](https://twitter.com/rauchg) \[tweeted\](https://twitter.com/rauchg/status/807626710350839808) this a while back. Let’s take a dive into what it means.

![Image](https://kentcdodds.com/favicons/apple-touch-icon.png)Guillermo Rauch rauchg

![Image](https://kentcdodds.com/img/social?type=2&title=Write+tests.+Not+too+many.+Mostly+integration.&preTitle=Check+out+this+article&img=unsplash%2Fphoto-1469598614039-ccfeb0a21111&url=kentcdodds.com%2Fblog%2Fwrite-tests)

](https://kentcdodds.com/blog/write-tests?ref=blog.faldi.xyz)

[

How to write unit tests

As a beginner programmer, you often hear advice to test your code. It’s good advice—let’s look at how you can start doing it!What are unit testsTests are a way to explicitly set expectations about code. You establish them to allow the machine to ch...

![Image](https://cdn.hashnode.com/res/hashnode/image/upload/v1642449180090/AdwT0d7uh.jpeg?auto=compress,format&format=webp&fm=png)How to devMarcin Wosinek

![Image](https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1649236580739%2FfgqFXT3qB.jpg%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng)

](https://how-to.dev/how-to-write-unit-tests?ref=blog.faldi.xyz)

[

The Testing Trophy and Testing Classifications

How to interpret the testing trophy for optimal clarity

![Image](https://kentcdodds.com/favicons/apple-touch-icon.png)

![Image](https://kentcdodds.com/img/social?type=2&title=The+Testing+Trophy+and+Testing+Classifications&preTitle=Check+out+this+article&img=unsplash%2Fphoto-1527871454777-032ec3f75edc&url=kentcdodds.com%2Fblog%2Fthe-testing-trophy-and-testing-classifications)

](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications?ref=blog.faldi.xyz)

[

How to know what to test

Practical advice to help you determine what to test.

![Image](https://kentcdodds.com/favicons/apple-touch-icon.png)

![Image](https://kentcdodds.com/img/social?type=2&title=How+to+know+what+to+test&preTitle=Check+out+this+article&img=unsplash%2Fphoto-1494017411273-233a4d225d36&url=kentcdodds.com%2Fblog%2Fhow-to-know-what-to-test)

](https://kentcdodds.com/blog/how-to-know-what-to-test?ref=blog.faldi.xyz)

[

Unit Testing React Components

Unit testing is a great discipline which can lead to 40%-80% reductions in bug density. Unit testing also has several other important benefits: But some things are easier to unit test than others…

![Image](https://miro.medium.com/fit/c/152/152/1*sHhtYhaCe2Uc3IU0IgKwIQ.png)JavaScript SceneEric Elliott

![Image](https://miro.medium.com/max/1200/1*RzR_S8UJeDn0b_sEQa2V8Q.jpeg)

](https://medium.com/javascript-scene/unit-testing-react-components-aeda9a44aae2?ref=blog.faldi.xyz)

[

Avoid the Test User

How your UI code has only two users, but the wrong tests can add a third

![Image](https://kentcdodds.com/favicons/apple-touch-icon.png)

![Image](https://kentcdodds.com/img/social?type=2&title=Avoid+the+Test+User&preTitle=Check+out+this+article&img=unsplash%2Fphoto-1497138169556-ba5743a6031c&url=kentcdodds.com%2Fblog%2Favoid-the-test-user)

](https://kentcdodds.com/blog/avoid-the-test-user?ref=blog.faldi.xyz)

[

Static vs Unit vs Integration vs E2E Testing for Frontend Apps

What these mean, why they matter, and why they don’t

![Image](https://kentcdodds.com/favicons/apple-touch-icon.png)

![Image](https://kentcdodds.com/img/social?type=2&title=Static+vs+Unit+vs+Integration+vs+E2E+Testing+for+Frontend+Apps&preTitle=Check+out+this+article&img=kentcdodds.com%2Fcontent%2Fblog%2Funit-vs-integration-vs-e2e-tests%2Fbanner&url=kentcdodds.com%2Fblog%2Fstatic-vs-unit-vs-integration-vs-e2e-tests)

](https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=Unit Testing React Component&url=http://blog.faldi.xyz/unit-testing-react-component/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/unit-testing-react-component/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/unit-testing-react-component//&title=Unit Testing React Component "LinkedIn")[](/cdn-cgi/l/email-protection#ebd4989e89818e889fd6be85829fcbbf8e989f82858ccbb98e8a889fcba884869b84858e859fcd8a869bd089848f92d6839f9f9bd1c4c48987848cc58d8a878f82c5939291c49e85829fc69f8e989f82858cc6998e8a889fc68884869b84858e859fc4 "Email")

Topik [Getting Started](/tag/getting-started/) [Insight](/tag/insight/) [Opini](/tag/opini/)

[

## NVM untuk Manajemen Node Version

Problem Saat kita bekerja diperusahaan yang cukup besar, besar dalam artian memiliki…

02 Jul 2022



](/nvm-untuk-manajemen-node-version/)[

## Tools untuk Membuat Dokumentasi

Dokumentasi sering kali terlupakan saat proses pengembangan perangkat lunak, padahal dokumentasi berperan…

08 Apr 2022



](/tools-membuat-dokumentasi/)