import Ember from 'ember';

const LEVELS = [
  'Peek-a-Boo'
];

/**
 * TLC That operates like a controller, there is very little
 * state that comes from the route, it mainly get sent
 * to save the score.
 */
export default Ember.Component.extend({

  /**
   * Unecessary comment.
   */
  currentLevel: 0,

  /**
   * Total time actually 'playing'
   */
  playTime: 0,

  /**
   * Signifies that the user has actually started playing a level,
   * to distinguish from isPlaying
   */
  hasStarted: false,

  /**
   * Signifies when the user is actually playing, so the timer
   * will be running and count towards their score.
   */
  isPlaying: false,

  /**
   * One day...
   */
  isWinner: false,

  /**
   * glob of level data that updates based on the current level.
   */
  level: Ember.computed('currentLevel', function() {
    let levelTitle = LEVELS[this.get('currentLevel')];
    return {
      levelTitle,
      currentLevel: this.get('currentLevel'),
      levelFile: levelTitle.toLowerCase()
    };
  }),

  _start() {
    this.set('hasStarted', true);
    this.set('isPlaying', true);
  },

  _stop() {
    this.set('hasStarted', false);
    this.set('isPlaying', false);
  },

  _pause() {
    this.set('isPlaying', false);
  },

  actions: {
    startPlaying() {
      this._start();
    },

    pausePlaying() {
      this._pause();
    },

    advanceLevel() {
      this._stop();
      this.incrementProperty('currentLevel');
      if(this.get('currentLevel') === LEVELS.length) {
        this.set('isWinner', true);
      }
    },

    resetGame() {
      this.setProperties({
        'hasStarted': false,
        'isPlaying': false,
        'currentLevel': 0,
        'playTime': 0
      });
    }
  }
});
