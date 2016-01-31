import Ember from 'ember';
import StopWatch from '../utils/stopwatch';

/**
 * Service.
 */
export default Ember.Service.extend({
  timer: null,

  init() {
    this.set('timer', new StopWatch());
  }
});