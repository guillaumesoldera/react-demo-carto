# <Carto />

## Install

```sh
yarn add https://github.com/guillaumesoldera/react-demo-carto
```

## Usage

```html
<html>
<head>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>
</head>
<body>
...
</body>
</html>
```

```js
import Carto from 'react-demo-carto';

function App(props) {
  const centerLatitude = 46.323716;
  const centerLongitude: -0.464777;
  return (
    <div>
      <h1>Recherchez une adresse</h1>
      <Carto centerLatitude={centerLatitude} centerLongitude={centerLongitude} />
    </div>
  );
}
```

## API

proptypes:

  * `centerLongitude: number` = Center Longitude as double
  * `centerLatitude: number` = Center Latitude as double
  * `centerLabel: string`: A label for center
  * `popupContent: node`: Node for popup content
  * `clickOnMap: function`: Callback when user click on map
  

