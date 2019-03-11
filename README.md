# Instructions for setup:
- `cd koop-strava`
- `npm install`
- `mkdir data`
- `cp node_modules/strava-v3/strava_config data/strava_config`
- Add strava api access tokens and info to data/strava_config
- `npm start`

- simple webpage is in web/index.html



## Frameworks used:
#### Server:
- [koop.js](https://koopjs.github.io/)
- forked from [koop-provider-sample](https://github.com/koopjs/koop-provider-sample)
- inspired by [Jking-GIS/koop-provider-Strava](https://github.com/Jking-GIS/koop-provider-Strava)
- [strava-v3](https://www.npmjs.com/package/strava-v3) for easy strava api access
- [@mapbox/polyline](https://www.npmjs.com/package/@mapbox/polyline) for easy decoding from Strava's [polyline](https://developers.google.com/maps/documentation/utilities/polylinealgorithm) geometry format 
- [terraformer](https://www.npmjs.com/package/terraformer) for easy conversion from webmap's web mercator extent to Geographic coordinates

#### Front end:
- [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/api-reference/index.html) for quick and easy mapping on the front end
