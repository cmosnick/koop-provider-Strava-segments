# Instructions for setup:
### Start Strava provoider:
- `cd koop-strava`
- `npm install`
- `mkdir data`
- `cp node_modules/strava-v3/strava_config data/strava_config`
- Add strava api access tokens and info to data/strava_config
- `npm start`

### Start Yelp provider:
- `cd koop-yelp`
- `npm install`
- Add yelp api token to config/default.json
- `npm start`

### Open static webpage in browser:
- Simple webpage is in web/index.html



## Frameworks used:
#### Server:
- [koop.js](https://koopjs.github.io/)
- [Strava API](https://developers.strava.com/docs/reference/#api-Segments-exploreSegments) segments explorer endpoint
- forked from [koop-provider-sample](https://github.com/koopjs/koop-provider-sample) for strava provider
- forked from [koop-provider-yelp](https://github.com/koopjs/koop-provider-yelp) for yelp provider
- inspired by [Jking-GIS/koop-provider-Strava](https://github.com/Jking-GIS/koop-provider-Strava)
- [strava-v3](https://www.npmjs.com/package/strava-v3) for easy strava api access
- [@mapbox/polyline](https://www.npmjs.com/package/@mapbox/polyline) for easy decoding from Strava's [polyline](https://developers.google.com/maps/documentation/utilities/polylinealgorithm) geometry format 
- [terraformer](https://www.npmjs.com/package/terraformer) for easy conversion from webmap's web mercator extent to Geographic coordinates
- [yelp-fusion](https://www.npmjs.com/package/yelp-fusion) client to replace old client

#### Front end:
- [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/api-reference/index.html) for quick and easy mapping on the front end

## Future Improvements:
- Add in Yelp provider to query restaurants within buffer of returned segments
- Update symbology of map
- Display more segment info in popup or side bar
- Improve koop provider speed
- Configure provider as a service on personal website
- Add more Strava provider endpoints and query parameters
- More thorough testing ofstrava provider results- looks like a limited number are returned
- Add automatic refreshing of access token for Strava api using OAuth
- Improve infoWindows and information displayed on them
- Make more advanced queries:
  - Give higher priority to yelp businesses in closer proximity to bike segments
  - Filter yelp restaurants by rating- possibly symbolize them woth more emphasis
- Provide basemap switcher
-  Completely update Yelp koop provider to new yelp-fusion specs, and submit PR to main repo
