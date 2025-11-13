---
title: "How to add Open Graph to NextJS"
slug: how-to-add-open-graph-to-nextjs
description: "The Open Graph Protocol is a technology created by Facebook that allows web pages to become rich objects in social media. For example, when we share a page on T"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2023-06-26
image: "https://images.unsplash.com/photo-1687295051794-03a70e3f8a14?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;M3wxMTc3M3wwfDF8YWxsfDN8fHx8fHwyfHwxNjg3Nzk1Mzk4fA&amp;ixlib&#x3D;rb-4.0.3&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/menambahkan-open-graph-pada-web-app-nextjs/"
---


## Open Graph Protocol

The Open Graph Protocol is a technology created by Facebook that allows web pages to become rich objects in social media. For example, when we share a page on Twitter or Facebook, there will be a preview

![Image](https://blog.faldi.xyz/content/images/2023/06/image.png)

Open graph is about meta tag, more improvement in SEO, and shareable in social media. Its often requirement from tim SEO for better crawl from google.

### General Minimum

Based on Open Graph Website, there are minimum for adding

*   `og:title` - The title of your object as it should appear within the graph, e.g., "The Rock".
*   `og:type` - The [type](https://ogp.me/?ref=blog.faldi.xyz#types) of your object, e.g., "video.movie". Depending on the type you specify, other properties may also be required.
*   `og:image` - An image URL which should represent your object within the graph.
*   `og:url` - The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/".

We can add to our React Web Apps using `react-helmet` or just add to `<head>` in our NextJS :

Adding to our `head` component

```jsx
<Head>
 <title>My page title</title>
<meta property="og:title" content="The Rock" />
<meta property="og:type" content="video.movie" />
<meta property="og:url" content="https://www.imdb.com/title/tt0117500/" />
<meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" />
</Head>
```

Also, on other hand, you can check in NextJS docs about how to implement it

[

Metadata Files: opengraph-image and twitter-image

API Reference for the Open Graph Image and Twitter Image file conventions.

![Image](https://nextjs.org/favicon.ico)Next.js

![Image](https://nextjs.org/api/og?title=Metadata%20Files:%20opengraph-image%20and%20twitter-image)

](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image?ref=blog.faldi.xyz)

# Open Graph for Social Media

That just for general minimum, for google example. How about adding Open Graph to other social media like Twitter or Facebook?

## Twitter

According to the official Twitter documentation on Open Graph, we only need to add a few new meta tags to enable Twitter Cards. By adding this code to our web application, we can include it in the `head` of our NextJS apps

```javascript
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@nytimesbits" />
<meta name="twitter:creator" content="@nickbilton" />
<meta property="og:url" content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/" />
<meta property="og:title" content="A Twitter for My Sister" />
<meta property="og:description" content="In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling." />
<meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" />
```

## Facebook

According to the Facebook documentation, we only need to add the `og:description` meta tag to enable Open Graph. However, it is almost the same as the default Open Graph. Another thing to note is that we can also include other meta tags such as `og:video` or `og:image` to improve the properties of the content.

Adding this code to our Web Apps. We can add into our `head` in NextJS Apps.

```javascript
<meta property="og:url"                content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
<meta property="og:type"               content="article" />
<meta property="og:title"              content="When Great Minds Don’t Think Alike" />
<meta property="og:description"        content="How much does culture influence creative thinking?" />
<meta property="og:image"              content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
```

## Full Open Graph

here of example open graph for General, Twitter and Facebook :

```html
<!-- Primary Meta Tags -->
<title>State Management in ReactJS</title>
<meta name="title" content="State Management in ReactJS" />
<meta name="description" content="In this blog post, we explore the challenges of managing application state effectively as a frontend engineer." />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://blog.cerita-faldi.xyz/memilih-state-management/" />
<meta property="og:title" content="State Management in ReactJS" />
<meta property="og:description" content="In this blog post, we explore the challenges of managing application state effectively as a frontend engineer." />
<meta property="og:image" content="https://metatags.io/images/meta-tags.png" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://blog.cerita-faldi.xyz/memilih-state-management/" />
<meta property="twitter:title" content="State Management in ReactJS" />
<meta property="twitter:description" content="In this blog post, we explore the challenges of managing application state effectively as a frontend engineer." />
<meta property="twitter:image" content="https://metatags.io/images/meta-tags.png" />
```

# Open Graph for SEO

Open Graph is a powerful tool that can optimize your shared content, improve your web presence, ensure that your content is displayed correctly on social media platforms, and provide targeted information for specific audiences.

1.  The Open Graph Protocol optimizes your shared content and provides a better user experience. It improves the visibility of your content, makes it more engaging, and helps attract clicks.
2.  Engaging rich objects created using Open Graph can drive traffic to your website, improve page rankings in search results, increase conversions, build brand reputation and trust, earn quality backlinks, increase engagement, and earn more social media shares.
3.  Open Graph tags play a crucial role in helping social media platforms understand your content. Neglecting to use OG tags can result in a poor user experience, such as missing images or incorrect titles.
4.  OG tags can also be used for group and location targeting, allowing you to control what information displays for users in a specific area.

# Reference

[

Open Graph: Mengambil Kendali Bagaimana Media Sosial Membagikan Halaman Web Anda

Tidak ada dua markup situs web yang dibuat setara. Begitu pula, sulit bagi platform media sosial seperti Facebok untuk menemukan potongan informasi yang benar dalam konten yang akan ditampilkan...

![Image](https://static.tutsplus.com/packs/media/images/apple-touch-icon-99da4cfc1b6e3d94174906836f4f9e6b.png)Envato TutsLouie Rootfield

![Image](https://cms-assets.tutsplus.com/uploads/users/30/posts/27927/preview_image/share.jpg)

](https://webdesign.tutsplus.com/id/tutorials/open-graph-take-control-of-how-social-media-shares-your-web-pages--cms-27927?ref=blog.faldi.xyz)

[

Webmasters - Sharing - Documentation - Meta for Developers

![Image](https://static.xx.fbcdn.net/rsrc.php/yv/r/B8BxsscfVBr.ico)Meta for Developers

![Image](https://facebook.com/security/hsts-pixel.gif?c=3.2.5)

](https://developers.facebook.com/docs/sharing/webmasters/?ref=blog.faldi.xyz)

[

Getting started with Cards

![Image](https://abs.twimg.com/favicons/favicon.ico)Getting started with Cards Getting Started Guide Getting Started with CardsCard and Content AttributionURL Crawling & CachingCard DisplayMultiple URLs in a TweetTwitter Cards and Open Graph Getting Started with CardsTo get started with implementing Cards markup, specify the type of card for your content by adding the following HTML markup to the HEAD section of the page:<meta name="twitter:card" content="summary"></meta> Card properties are simple key-value pairs, each defined in an HTML meta tag as seen above. The combined collection of properties defines the overall card experience on Twitter, and each card type supports and requires a specific set of properties.All cards have one basic property in common - the card type value: Card PropertyDescriptiontwitter:cardThe card type, which will be one of “summary”, “summary\_large\_image”, “app”, or “player”. Only one card type per-page is supported. If more than one twitter:card value exists in the page, the “last” one in sequence will take priority. Card and Content AttributionEach card has built-in content attribution, which surfaces appropriate Twitter accounts for the content as specified by you. Users will be able to follow and view the profiles of attributed accounts directly from the card. There are two kinds of attribution:Website Attribution: Indicates the Twitter account for the website or platform on which the content was published. Note that a service may set separate Twitter accounts for different pages/sections of their website, and the most appropriate Twitter account should be used to provide the best context for the user. For example, nytimes.com may set the the website attribution to “@nytimes” for front page articles, and “@NYTArts” for articles in the Arts & Entertainment section.Creator Attribution: Indicates the individual user that created the content within the card. This applies to the Summary with Large Image card.Configure card attribution using the following properties: Card PropertyDescriptionRequiredtwitter:site@username for the website used in the card footer.Notwitter:creator@username for the content creator / author.No URL Crawling & CachingTwitter’s crawler respects Google’s robots.txt specification when scanning URLs. If a page with card markup is blocked, no card will be shown. If an image URL is blocked, no thumbnail or photo will be shown.Twitter uses the User-Agent of Twitterbot (with version, such as Twitterbot/1.0), which can be used to create an exception in the robots.txt file.For example, here is a robots.txt which disallows crawling for all robots, except Twitter’s fetcher:User-agent: TwitterbotDisallow: User-agent: \*Disallow: / Here is another example, which specifies which directories are allowed to be crawled by Twitterbot (in this case, disallowing all except the images and archives directories):User-agent: TwitterbotDisallow: \* Allow: /imagesAllow: /archives The server’s robots.txt file must be saved as plain text with ASCII character encoding. To verify this, run the following command:$ file -I robots.txtrobots.txt: text/plain; charset=us-ascii Content is cached by Twitter for 7 days after a link to a page with card markup has been published in a Tweet.If you encounter issues with cards in Tweets not appearing properly, see the Cards Troubleshooting Guide. Card DisplayTwitter Cards generated from meta tags only appear when a Tweet is either expanded in the timeline (on web) or viewed on the Tweet’s individual permalink page (by clicking on the date from the timeline, either on web or on mobile).In limited circumstances, Cards may appear in the timeline, such as in images posted to Twitter, Ad formats, and Twitter-run experiments.If you are looking to bring media (photos, videos and Cards) into the timeline, consider one of the following options: Accounts can pin a Tweet to the top of their timeline, which auto-expands the Tweet and displays the Card. (This is possible on web only.).For photos and animated GIFs, upload the media directly with the Tweet or consider using the Twitter API to upload media.For Ad formats with a call-to-action, visit Twitter Ads for Website Cards. Multiple URLs in a TweetIn some circumstances, users may want to Tweet multiple URLs. Only one card may be shown in a Tweet. Here is the order of precedence when processing multiple URLs: Images or media attached to Tweets will have precedence over any card attached to a URL.URLs with cards are processed in order of appearance in the Tweet, first to last Twitter Cards and Open GraphTwitter card tags look similar to Open Graph tags, and are based on the same conventions as the Open Graph protocol. When using Open Graph protocol to describe data on a page, it is easy to generate a Twitter card without duplicating tags and data. When the Twitter card processor looks for tags on a page, it first checks for the Twitter-specific property, and if not present, falls back to the supported Open Graph property. This allows for both to be defined on the page independently, and minimizes the amount of duplicate markup required to describe content and experience.Note that while Open Graph recommends specifying the “og” RDFa Core 1.1 CURIE prefix mapping via <html prefix="og: http://ogp.me/ns#">, no such markup is required for Twitter cards and its use of the twitter: prefix in a HTML meta element’s name attribute. Open Graph protocol also specifies the use of property and content attributes for markup (<meta property="og:image" content="http://example.com/ogp.jpg"/>) while Twitter cards use name and content. Twitter’s parser will fall back to using property and content, so there is no need to modify existing Open Graph protocol markup if it already exists.The example below uses a mix of Twitter and Open Graph tags to define a summary card:<meta name="twitter:card" content="summary" /><meta name="twitter:site" content="@nytimesbits" /><meta name="twitter:creator" content="@nickbilton" /><meta property="og:url" content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/" /><meta property="og:title" content="A Twitter for My Sister" /><meta property="og:description" content="In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling." /><meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" /> Developer policy and terms Follow @twitterdev Subscribe to developer news Twitter platform Twitter.com Status Accessibility Embed a Tweet Privacy Center Transparency Center X Corp. About the company Twitter for Good Company news Brand toolkit Jobs and internships Investors Help Help Center Using Twitter Twitter for creators Ads Help Center Managing your account Email Preference Center Rules and policies Contact us Developer resources Developer home Documentation Forums Communities Developer blog Engineering blog Developer terms Business resources Advertise Twitter for business Resources and guides Twitter for marketers Marketing insights Brand inspiration Twitter Flight School © 2023 X Corp. Cookies Privacy Terms and conditions By using Twitter’s services you agree to our Cookies Use. We use cookies for purposes including analytics, personalisation, and ads. OK This page and certain other Twitter sites place and read third party cookies on your browser that are used for non-essential purposes including targeting of ads. Through these cookies, Google, LinkedIn and Demandbase collect personal data about you for their own purposes. Learn more. Accept Decline

![Image](https://cdn.cms-twdigitalassets.com/content/dam/developer-twitter/redesign-2021-images/og-social-card/devwebsite_card_tn.jpg.twimg.768.jpg)

](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=How to add Open Graph to NextJS&url=http://blog.faldi.xyz/menambahkan-open-graph-pada-web-app-nextjs/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/menambahkan-open-graph-pada-web-app-nextjs/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/menambahkan-open-graph-pada-web-app-nextjs//&title=How to add Open Graph to NextJS "LinkedIn")[](/cdn-cgi/l/email-protection#330c404651595650470e7b5c4413475c13525757137c43565d13744152435b13475c137d564b47796015525e4308515c574a0e5b474743091c1c515f5c541d55525f575a1d4b4a491c5e565d525e51525b58525d1e5c43565d1e544152435b1e435257521e4456511e5243431e5d564b4759401c "Email")

Topik [Getting Started](/tag/getting-started/) [ReactJS](/tag/reactjs/) [NextJS](/tag/nextjs/) [Insight](/tag/insight/)

[

## Getting Started with Zustand, State Management for Hooks User

Introduction to Zustand State management is an essential aspect of modern web…

05 Jul 2023



](/getting-started-with-zustand/)[

## State Management in ReactJS

This blog post delves into challenges of managing app state as a frontend engineer. Learn about importance of state management, recommended solutions like React Context API, and key factors for choosing the right approach. Enhance your state management skills, beginner or experienced.…

21 Jun 2023



](/memilih-state-management/)