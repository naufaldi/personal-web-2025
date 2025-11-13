---
title: "NextJS Leaflet : Adding Geoman to Leaflet"
slug: nextjs-leaflet-adding-geoman-to-leaflet
description: "Geoman is a powerful library that enables the creation and editing of geospatial data on maps. It integrates seamlessly with Leaflet, making it an excellent cho"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2024-09-26
image: "https://images.unsplash.com/photo-1727324735318-c25d437052f7?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;M3wxMTc3M3wwfDF8YWxsfDV8fHx8fHx8fDE3MjczODA4Mjh8&amp;ixlib&#x3D;rb-4.0.3&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/nextjs-leaflet-add-geoman/"
---

Geoman is a powerful library that enables the creation and editing of geospatial data on maps. It integrates seamlessly with Leaflet, making it an excellent choice for anyone working with interactive web maps.

One of the best features of Geoman is its easy integration with Leaflet.js and React-Leaflet. This tool provides a range of useful features, including:

*   Creating polygons for maps
*   Completely free to use
*   Excellent documentation

* * *

### **Integrating Geoman into Leaflet**

In this tutorial, I’ll demonstrate how to integrate Geoman into a **Next.js** project using **React-Leaflet**. If you’re new to React-Leaflet integration, you can refer to [this guide](https://blog.faldi.xyz/geojson-leafleat-add-geojson/) for a detailed explanation.

#### Step 1: Install Geoman

First, we need to install Geoman. For this example, we’ll use the free version of Leaflet-Geoman:

```bash
npm i @geoman-io/leaflet-geoman-free
```

#### Step 2: Add the CSS Module to `layout.tsx`

Next, we need to import the Geoman CSS file in the layout file to style the controls properly:

```jsx
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
```

#### Step 3: Import Geoman in the Map Component

Now, we import the Geoman module into the component responsible for rendering the map:

```jsx
import "@geoman-io/leaflet-geoman-free";
```

#### Step 4: Initialize the Geoman Toolbar

We create a function to initialize the Geoman toolbar and add it to our map controls:

```jsx
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

const AddGeomanControls = () => {
  const map = useMap();

  useEffect(() => {
    map.pm.addControls({
      position: 'topleft',
      drawMarker: true,
      drawPolygon: true,
      drawPolyline: true,
      drawCircle: true,
      drawCircleMarker: true,
      editMode: true,
      dragMode: true,
      cutPolygon: true,
      removalMode: true,
    });

    map.on('pm:create', (e) => {
      // Handle creation event here
      console.log(e);
    });
  }, [map]);

  return null;
};
```

In this example, `useMap()` is used to access the map object, and the `pm.addControls` method is used to add drawing and editing controls to the toolbar. We set various controls like drawing markers, polygons, circles, and enabling editing and dragging modes by setting the respective keys to `true`.

```jsx
map.pm.addControls({
  position: 'topleft',
  drawMarker: true,
  drawPolygon: true,
  drawPolyline: true,
  drawCircle: true,
  drawCircleMarker: true,
  editMode: true,
  dragMode: true,
  cutPolygon: true,
  removalMode: true,
});
```

The event handler:

```jsx
map.on('pm:create', (e) => {
  // Trigger actions when a shape is created
  console.log(e);
});
```

This allows you to trigger specific actions, such as saving the drawn polygon or interacting with the created object when the user draws a shape on the map.

You can explore more about Geoman's toolbar controls [here](https://geoman.io/docs/leaflet/toolbar?ref=blog.faldi.xyz). By default, many controls are enabled, but you can customize them as needed.

#### Step 5: Add the Geoman Controls to the Map

Finally, we integrate the `AddGeomanControls` function into the map component:

```jsx
<MapContainer
  className="h-[500px] w-full"
  zoom={13}
  scrollWheelZoom={false}
  center={leafletCoordinates}
>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={leafletCoordinates} icon={icon}>
    <Popup>
      {name} <br /> {address}
    </Popup>
  </Marker>
  <GeoJSON data={dataGeoJSON} />
  <AddGeomanControls />
</MapContainer>
```

You can find the full example code [here on GitHub](https://github.com/naufaldi/nextjs-leaflet/blob/main/src/lib/components/maps-geoman/index.tsx?ref=blog.faldi.xyz).

That’s it for this simple tutorial on integrating Geoman. In the next part, we’ll cover how to create dynamic maps and save the drawn shapes to a database.

Bagikan[](https://twitter.com/share?text=NextJS Leaflet : Adding Geoman to Leaflet&url=http://blog.faldi.xyz/nextjs-leaflet-add-geoman/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/nextjs-leaflet-add-geoman/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/nextjs-leaflet-add-geoman//&title=NextJS Leaflet : Adding Geoman to Leaflet "LinkedIn")[](/cdn-cgi/l/email-protection#f8c78b8d9a929d9b8cc5b69d808cb2abd8b49d999e949d8cd8c2d8b99c9c91969fd8bf9d97959996d88c97d8b49d999e949d8cde999588c39a979c81c5908c8c88c2d7d79a94979fd69e99949c91d6808182d7969d808c928bd5949d999e949d8cd5999c9cd59f9d97959996d7 "Email")

Topik [Documentation](/tag/documentation/) [NextJS](/tag/nextjs/) [Tutorial](/tag/tutorial/)

[

## How to Approach Code Optimization Questions in Interviews: A Frontend Engineer's Guide

Recently, during an interview, I was asked a question that caught me…

07 Okt 2024



](/guide-to-code-optimization-questions-for-frontend-engineers/)[

## The Dual Passion: Story-Driven and Strategy Games as My Escape and Challenge

Currently, there are two types of games that I enjoy: \* Story-driven Games…

26 Sep 2024



](/the-dual-passion-story-driven-and-strategy-games-as-my-escape-and-challenge/)