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
      });
    } else {
      callback("");
      return;
    }
  } else if(req.f) {
    callback(null, "");
    return;
  } else {
    callback("");
    return;
  }
}

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

module.exports = Model