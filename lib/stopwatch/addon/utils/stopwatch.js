import Ember from 'ember';

export default Ember.Object.extend({
  time: 0,
  pausedTime: 0,
  startTime: 0,

  isRunning: false,
  isPaused: false,

  /**
   * Keep going.
   */
  _tick(timeStamp=0) {
    let timeElapsed = 0;
    let {isRunning, isPaused, startTime, pausedTime, time } = this.getProperties([
      'isRunning',
      'isPaused',
      'startTime',
      'pausedTime',
      'time'
    ]);

    if(isRunning) {
      if(isPaused) {
        pausedTime = (timeStamp - startTime) - timeElapsed;
      }
      this.set('time', ((timeStamp - startTime) - pausedTime));
      this.set('RAF', window.requestAnimationFrame(this._tick.bind(this)));
    }
  },

  start() {
    this.set('isRunning', true);
    this.set('isPaused', false);
    this.set('startTime', window.performance.now());
    this.set('RAF', window.requestAnimationFrame(this._tick.bind(this)));
  },

  stop() {
    this.set('isRunning', false);
    window.cancelAnimationFrame(this.get('RAF'));
  },

  pause() {
    this.set('isPaused', true);
  },

  resume() {
    this.set('isPaused', false);
  },

});