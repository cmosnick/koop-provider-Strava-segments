/*
  routes.js

  This file is an optional place to specify additional routes to be handled by this provider's controller
  Documentation: http://koopjs.github.io/docs/usage/provider
*/
module.exports = [
  {
        path: '$namespace/rest/info',
        methods: ['get', 'post'],
        handler: 'featureServerRestInfo'
      },
      {
        path: '$namespace/tokens/:method',
        methods: ['get', 'post'],
        handler: 'generateToken'
      },
      {
        path: '$namespace/tokens/',
        methods: ['get', 'post'],
        handler: 'generateToken'
      },
      {
        path: '$namespace/rest/services/$providerParams/FeatureServer/:layer/:method',
        methods: ['get', 'post'],
        handler: 'featureServer'
      },
      {
        path: '$namespace/rest/services/$providerParams/FeatureServer/layers',
        methods: ['get', 'post'],
        handler: 'featureServer'
      },
      {
        path: '$namespace/rest/services/$providerParams/FeatureServer/:layer',
        methods: ['get', 'post'],
        handler: 'featureServer'
      },
      {
        path: '$namespace/rest/services/$providerParams/FeatureServer',
        methods: ['get', 'post'],
        handler: 'featureServer'
      },
      {
        path: 'FeatureServer/:layer/:method',
        methods: ['get', 'post'],
        handler: 'featureServer'
      },
      {
        path: 'FeatureServer/layers',
        methods: ['get', 'post'],
        handler: 'featureServer'
      },
      {
        path: 'FeatureServer/:layer',
        methods: ['get', 'post'],
        handler: 'featureServer'
      },
      {
        path: 'FeatureServer',
        methods: ['get', 'post'],
        handler: 'featureServer'
      },
      {
        path: '$namespace/rest/services/$providerParams/FeatureServer*',
        methods: ['get', 'post'],
        handler: 'featureServer'
      },
      {
        path: 'FeatureServer*',
        methods: ['get', 'post'],
        handler: 'featureServer'
      },
      {
        path: '$namespace/rest/services/$providerParams/MapServer*',
        methods: ['get', 'post'],
        handler: 'featureServer'
      },
      {
        path: 'MapServer*',
        methods: ['get', 'post'],
        handler: 'featureServer'
      }
]
