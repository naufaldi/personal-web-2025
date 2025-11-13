---
title: "NextJS and React Leafleat : Add GeoJSON"
slug: nextjs-and-react-leafleat-add-geojson
description: "After posting about how to add leafleat in NextJS, in this tutorial we will learn how to adding coordinate with GEOJSON. GEOJSON is format for geospatial data s"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2024-01-16
image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;M3wxMTc3M3wwfDF8c2VhcmNofDR8fG1hcHxlbnwwfHx8fDE3MDUzODc4NTB8MA&amp;ixlib&#x3D;rb-4.0.3&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/geojson-leafleat-add-geojson/"
---

After posting about how to add leafleat in NextJS, in this tutorial we will learn how to adding coordinate with GEOJSON. GEOJSON is format for geospatial data structure.

> GeoJSON is a geospatial data interchange format based on JavaScript Object Notation (JSON).  It defines several types of JSON objects and the manner in which they are combined to represent data about geographic features, their properties, and their spatial extents. GeoJSON uses a geographic coordinate reference system, World Geodetic System 1984, and units of decimal degrees.– RFC 7946

# Why We Need GeoJSON?

Lets say we want to create Real Estate Mapping Application. **Purpose**: To help users find available properties for sale or rent in a specific area. In that apps, we need to save data about coordinate, area, boundaries, and other data to save. Thats why we need GeoJSON format. Data dynamically loaded onto the Leaflet map to represent the properties.

# Example GeoJSON Format

This example includes a couple of properties, each represented as a GeoJSON feature with various attributes relevant to real estate, like address, price, type of property, and other details.

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "property1",
        "address": "123 Maple Street",
        "price": "$300,000",
        "type": "House",
        "bedrooms": 3,
        "bathrooms": 2,
        "size": "2000 sqft",
        "forSale": true
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-75.14310264, 39.95267351]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "property2",
        "address": "456 Oak Avenue",
        "price": "$450,000",
        "type": "Condo",
        "bedrooms": 2,
        "bathrooms": 2,
        "size": "1500 sqft",
        "forSale": true
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-75.14310264, 39.95267351]
      }
    }
  ]
}
```

## **Explanation:**

**FeatureCollection**: The root element is a `FeatureCollection`, indicating that this GeoJSON contains multiple features (properties in this case).

**Features**: Each feature represents a property. The `properties` object within each feature contains relevant details like the address, price, type of property, number of bedrooms and bathrooms, size, and sale status.

**Geometry**: The `geometry` object describes the geographic location of each property. In this example, each property is represented as a `Point` with `coordinates` given in longitude and latitude. For a real application, these coordinates would correspond to the actual location of each property.

This format can be easily extended or modified to include more details or different types of geographical representations (like polygons for property boundaries) depending on the needs of your application.

# How to Add GEOJSON in Leafleat

Integrating GeoJSON with a Leaflet map in a NextJS application is a straightforward process. Begin by ensuring that you have GeoJSON data. This is the first and most crucial step in visualizing geographic information on your map.  

```jsx
...
 const dataGeoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-8.8280039, 115.1558519],
        },
        properties: {
          name: 'My Coffee Shop',
          address:
            'Jl. Pura Batu Pageh No.99R, Ungasan, Kec. Kuta Sel., Kabupaten Badung, Bali 80361',
          openingHours: '7am - 9pm',
        },
      },
    ],
  };
  ...
```

## Second Step: TypeScript and GeoJSON Standards

When using TypeScript, it's essential to ensure that your `dataGeoJSON` conforms to the GeoJSON data structure standards. To achieve this, assign the `geojson` type to your data. This step guarantees that the data aligns with the expected format of GeoJSON.

```
pnpm install -D @types/geojson
```

## Third Step: Type Checking

Perform type checking on your `dataGeoJSON`. This process involves verifying that the data indeed matches the GeoJSON structure, ensuring data integrity and reducing potential errors in your application.

```jsx
...
 const dataGeoJSON: FeatureCollection<Point> = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-8.8280039, 115.1558519],
        },
        properties: {
          name: 'My Coffee Shop',
          address:
            'Jl. Pura Batu Pageh No.99R, Ungasan, Kec. Kuta Sel., Kabupaten Badung, Bali 80361',
          openingHours: '7am - 9pm',
        },
      },
    ],
  };
  ...
```

# Add GeoJSON to Maps

To add GeoJSON data to a Leaflet map, you first need to extract coordinates from your `dataGeoJSON`. This can be done by declaring a variable that will hold this coordinate data.

The extraction process involves accessing the appropriate properties within your GeoJSON object where the geographic coordinates are stored. Once extracted, these coordinates can be used to plot points or shapes on your Leaflet map.

This approach ensures your map dynamically represents the geographical data defined in your GeoJSON file.

```jsx
// Extract  coordinates for Leaflet
const [latitude, longitude] = dataGeoJSON.features[0].geometry.coordinates;
// save as variable and
const leafletCoordinates: LatLngExpression = [latitude, longitude];
```

To integrate GeoJSON with your Leaflet map, first, define a variable, say `leafletCoordinates`, to ensure your array matches the GeoJSON data type. This step involves structuring your data in a format compatible with Leaflet's expectations for geographic data.

Once `leafletCoordinates` is set up and populated with the correct format, you can then add a GeoJSON component to your Leaflet map. This component will use the data from `leafletCoordinates` to render the geographical features specified in your GeoJSON onto the map.

This approach allows you to dynamically display geographic data, such as markers, lines, or shapes, on your map based on the contents of your GeoJSON file.

```jsx
import { MapContainer, Marker, Popup, GeoJSON, TileLayer } from 'react-leaflet';

...
<MapContainer
        className="h-[300px] w-full"
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
            Lorem Ipsum
          </Popup>
        </Marker>
        <GeoJSON data={dataGeoJSON} />
      </MapContainer>
...
```

At this stage, your code should be able to display markers on the map based on the coordinates from your GeoJSON data. To enhance the markers with more informative details, you can incorporate additional properties from your GeoJSON into the Marker components.

This involves deconstructing the `dataGeoJSON` to extract not just the coordinates, but also other relevant properties. These properties can then be used within the Marker components to provide richer information, such as descriptions, names, or any other relevant data contained in your GeoJSON. This process will make the markers more informative and interactive for users of your map application.

```
const { name, address } = dataGeoJSON.features[0]
    .properties as MyGeoJsonProperties;
```

## Add Into Marker

```
...
 <MapContainer
        className="h-[300px] w-full"
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
      </MapContainer>
...
```

If your implementation is correct, the markers on your Leaflet map will display additional information extracted from your `dataGeoJSON`. This might include text labels, descriptions, or any other relevant details contained in the GeoJSON data.

![Image](https://blog.faldi.xyz/content/images/2024/01/image-2.png)

Full Code something like this

```
import type { FeatureCollection, Point } from 'geojson';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { MapContainer, Marker, Popup, GeoJSON, TileLayer } from 'react-leaflet';

interface MyGeoJsonProperties {
  name: string;
  address: string;
  openingHours: string;
}

const MapsGeoJSON = () => {
  const icon = L.icon({ iconUrl: '/images/marker-icon.png' });
  const dataGeoJSON: FeatureCollection<Point> = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-8.8280039, 115.1558519],
        },
        properties: {
          name: 'My Coffee Shop',
          address:
            'Jl. Pura Batu Pageh No.99R, Ungasan, Kec. Kuta Sel., Kabupaten Badung, Bali 80361',
          openingHours: '7am - 9pm',
        },
      },
    ],
  };
  // Extract  coordinates for Leaflet
  const [latitude, longitude] = dataGeoJSON.features[0].geometry.coordinates;
  const leafletCoordinates: LatLngExpression = [latitude, longitude];
  const { name, address } = dataGeoJSON.features[0]
    .properties as MyGeoJsonProperties;
  return (
    <div className="w-full">
      <MapContainer
        className="h-[300px] w-full"
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
      </MapContainer>
    </div>
  );
};

export default MapsGeoJSON;
```

## Notes:

*   Dont forget to call your `MapsGeoJSON` as `dynamic` in NextJS
*   use `use client` for CSR

We call our `MapsGeoJSON` to our pages.

```
'use client';

import dynamic from 'next/dynamic';

const GeoJSON = () => {
  const NotSSRMaps = dynamic(() => import('@/lib/components/maps-geojson'), {
    ssr: false,
  });
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-screen-lg flex-col items-center justify-center gap-8 text-center">
      <NotSSRMaps />
    </div>
  );
};

export default GeoJSON;
```

# Full Code in Github :

For more clear code, you can see in here

[

nextjs-leaflet/src/lib/pages/geojson/index.tsx at main · naufaldi/nextjs-leaflet

Setup NextJS with leaflet. Contribute to naufaldi/nextjs-leaflet development by creating an account on GitHub.

![Image](https://github.githubassets.com/favicons/favicon.svg)GitHubnaufaldi

![Image](https://opengraph.githubassets.com/4e3b0e572b945670ea94885b3785aa558f395990615d44c86dcc5b9ce4754994/naufaldi/nextjs-leaflet)

](https://github.com/naufaldi/nextjs-leaflet/blob/main/src/lib/pages/geojson/index.tsx?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=NextJS and React Leafleat : Add GeoJSON&url=http://blog.faldi.xyz/geojson-leafleat-add-geojson/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/geojson-leafleat-add-geojson/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/geojson-leafleat-add-geojson//&title=NextJS and React Leafleat : Add GeoJSON "LinkedIn")[](/cdn-cgi/l/email-protection#9fa0eceafdf5fafceba2d1fae7ebd5ccbffef1fbbfcdfafefcebbfd3fafef9f3fafeebbfa5bfdefbfbbfd8faf0d5ccd0d1b9fef2efa4fdf0fbe6a2f7ebebefa5b0b0fdf3f0f8b1f9fef3fbf6b1e7e6e5b0f8faf0f5ecf0f1b2f3fafef9f3fafeebb2fefbfbb2f8faf0f5ecf0f1b0 "Email")

Topik [Documentation](/tag/documentation/) [ReactJS](/tag/reactjs/) [Tutorial](/tag/tutorial/) [Getting Started](/tag/getting-started/)

[

## Reflection on a Senior Frontend Engineer Interview

Of course, everything failed, even because the recruiter froze hiring or the…

02 Apr 2024



](/reflection-interview-senior-frontend-engineer/)[

## Technical Guide : Setup NextJS with Leaflet

Setup NextJS you can create next js with create-next-js-app npx create-next-app nextjs-leaflet…

04 Jan 2024



](/technical-guide-setup-nextjs-with-leaflet/)