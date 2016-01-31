/*
  Inject the stopwatch service into all controllers and components
*/
export function initialize() {
  const app = arguments[1] || arguments[0];
  app.inject('controller', 'stopwatch', 'service:stopwatch');
  app.inject('component', 'stopwatch', 'service:stopwatch');
}

export default {
  name: 'stopwatch',
  initialize: initialize
};