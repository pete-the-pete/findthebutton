/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'findthebutton',
    environment: environment,
    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' *.firebaseio.com *.facebook.net *.facebook.com pagead2.googlesyndication.com",
      'connect-src': "'self' auth.firebase.com wss://*.firebaseio.com pagead2.googlesyndication.com",
      'frame-src': "'self' *.firebaseio.com *.facebook.com pagead2.googlesyndication.com *.doubleclick.net",
      'style-src': "'self' 'unsafe-inline'",
      'img-src': "'self' *.fbcdn.net",
    },
    firebase: 'https://findthebutton.firebaseio.com/',
    torii: {
      sessionServiceName: 'session'
    },
    baseURL: '/',
    locationType: 'auto',
    serviceWorker: {
      enabled: true
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.serviceWorker = {
      skipWaiting: true,
      debug: true
    }

  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
