import Ember from 'ember';

const LEVELS = [
  'Peek-a-Boo'
];

export default Ember.Route.extend({
  /**
   * Signifies when the user is actually playing, so the timer
   * will be running and count towards their score.
   */
  isPlaying: false,

  /**
   * The current level the user is on
   */
  currentLevel: 0,

  /**
   * Total time actually 'playing'
   */
  playTime: 0,

  /**
   * Pass the current state to the templates
   */
  model() {
    let currentLevel = this.get('currentLevel');
    let playTime = this.get('playTime');
    let isPlaying = this.get('isPlaying');

    return {
      isPlaying,
      currentLevel,
      playTime,
      LEVELS
    };
  },

  _start() {
    this.set('isPlaying', true);
    this.set('currentModel.isPlaying', this.get('isPlaying'));
  },

  _pause() {
    this.set('isPlaying', false);
    this.set('currentModel.isPlaying', this.get('isPlaying'));
  },

  /**
   * Resets everything back to 0
   * @private
   */
  _reset() {
    this.setProperties({
      'isPlaying': false,
      'currentLevel': 0,
      'playTime': 0
    });
  },

  actions: {
    startPlaying() {
      this._start();
    },

    pausePlaying() {
      this._pause();
    },

    advanceLevel() {
      this.incrementProperty('currentLevel');
    },

    resetGame() {
      this._reset();
    }
  }
});
