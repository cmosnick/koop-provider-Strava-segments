/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: http://koopjs.github.io/docs/usage/provider
*/
// const request = require('request').defaults({gzip: true, json: true})
// const config = require('config')
const strava = require('strava-v3')
var polyline = require('@mapbox/polyline')
const terraformer = require('terraformer')

function Model (koop) {}

// Public function to return data from the
// Return: GeoJSON FeatureCollection
//
// Config parameters (config/default.json)
// req.
//
// URL path parameters:
// req.params.host (if index.js:hosts true)
// req.params.id  (if index.js:disableIdParam false)
// req.params.layer
// req.params.method
Model.prototype.getData = function (req, callback) {
  // Get req params
  if(req.query && req.query.geometry) {
    const xmin = req.query.geometry.xmin;
    const ymin = req.query.geometry.ymin;
    const xmax = req.query.geometry.xmax;
    const ymax = req.query.geometry.ymax;

    if(xmin && ymin && xmax && ymax){
      // Convert to lat and long
      const minPoint = terraformer.Tools.positionToGeographic([xmin, ymin]);
      const maxPoint = terraformer.Tools.positionToGeographic([xmax, ymax]);
      
      // get segments within bounding box
      strava.segments.explore({
        bounds: [minPoint[1], minPoint[0], maxPoint[1], maxPoint[0]].join(","), 
        activity_type: 'riding'
      }, (err, payload) => {
        if(err){
          console.log(err);
          callback(err);
          return;
        }
    
        if(payload.errors) {
          console.log(payload.errors);
          callback(payload.errors);
          return;
        }

        if(payload.segments) {
          var featureCollection = translateSegments(payload.segments);
          callback(null, featureCollection);
          return;
        } else {
          callback("no segments returned");
          return;
        }

        console.log(payload);

      });
    }
  } else {
    callback("");
    return;
  }
}


  // // Get segment
  // strava.segments.get({id: 229781}, (err, payload) => {
    

    

  //   var singleGeoJson = translateSingle(payload);
  //   var geoJson = {
  //     type: "FeatureCollection",
  //     features: [singleGeoJson]
  //   };
  
  //   callback(null, geoJson);
  // });

function translateSingle(input) {
  // Convert polyline geom in response from polyline to geojson geom
  // Add all attributes and geom into feature geojson
  return {
    type: "Feature",
    properties: input,
    geometry: (input.points) ? polyline.toGeoJSON(input.points) : null
  };
}

function translateSegments(segments) {
  // feature collection with trnaslated features and cached for 10 seconds
  return {
    type: "FeatureCollection",
    features: segments.map(translateSingle),
    ttl: 10
  };
}

  //   // Optional: Service metadata and geometry type
  //   // geojson.metadata = {
  //   //   title: 'Koop Sample Provider',
  //   //   description: `Generated from ${url}`,
  //   //   geometryType: 'Polygon' // Default is automatic detection in Koop
  //   // }


// function translate (input) {
//   return {
//     type: 'FeatureCollection',
//     features: input.resultSet.vehicle.map(formatFeature)
//   }
// }

// function formatFeature (inputFeature) {
//   // Most of what we need to do here is extract the longitude and latitude
//   const feature = {
//     type: 'Feature',
//     properties: inputFeature,
//     geometry: {
//       type: 'Point',
//       coordinates: [inputFeature.longitude, inputFeature.latitude]
//     }
//   }
//   // But we also want to translate a few of the date fields so they are easier to use downstream
//   const dateFields = ['expires', 'serviceDate', 'time']
//   dateFields.forEach(field => {
//     feature.properties[field] = new Date(feature.properties[field]).toISOString()
//   })
//   return feature
// }

module.exports = Model

/* Example provider API:
   - needs to be converted to GeoJSON Feature Collection
{
  "resultSet": {
  "queryTime": 1488465776220,
  "vehicle": [
    {
      "tripID": "7144393",
      "signMessage": "Red Line to Beaverton",
      "expires": 1488466246000,
      "serviceDate": 1488441600000,
      "time": 1488465767051,
      "latitude": 45.5873117,
      "longitude": -122.5927705,
    }
  ]
}

Converted to GeoJSON:

{
  "type": "FeatureCollection",
  "features": [
    "type": "Feature",
    "properties": {
      "tripID": "7144393",
      "signMessage": "Red Line to Beaverton",
      "expires": "2017-03-02T14:50:46.000Z",
      "serviceDate": "2017-03-02T08:00:00.000Z",
      "time": "2017-03-02T14:42:47.051Z",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-122.5927705, 45.5873117]
    }
  ]
}
*/
