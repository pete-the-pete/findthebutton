import Ember from 'ember';
import ENV from '../config/environment';

const LEVELS = [
  //'Peek-a-Boo',
  'Hot-Cold',
  'Too-Many-Buttons'
];
const ROUNDS = 5;
const LAST_LEVEL = (LEVELS.length * ROUNDS) - 1;

/**
 * TLC That operates like a controller, there is very little
 * state that comes from the route, it mainly get sent
 * to save the score.
 */
export default Ember.Component.extend({

  inProduction: Ember.computed(function() {
    return ENV.environment === 'production';
  }),

  /**
   * Unecessary comment.
   */
  currentLevel: 0,

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

  playTime: Ember.computed('stopwatch.timer.time', function() {
    return this.get('stopwatch.timer.time');
  }),

  /**
   * glob of level data that updates based on the current level.
   */
  level: Ember.computed('currentLevel', function() {
    let levelTitle = LEVELS[this.get('currentLevel') % LEVELS.length];
    return {
      levelTitle,
      currentLevel: this.get('currentLevel'),
      levelDisplay: this.get('currentLevel') + 1,
      levelFile: levelTitle.toLowerCase()
    };
  }),

  _start() {
    this.get('stopwatch.timer').start();
    this.set('hasStarted', true);
    this.set('isPlaying', true);
  },

  _stop() {
    this.set('hasStarted', false);
    this.set('isPlaying', false);
    this.get('stopwatch.timer').stop();
  },

  _pause() {
    this.set('isPlaying', false);
    this.get('stopwatch.timer').pause();
  },

  _resume() {
    this.set('isPlaying', true);
    this.get('stopwatch.timer').resume();
  },

  _reset() {
    this._stop();
    this.setProperties({
      'isWinner': false,
      'currentLevel': 0
    });
  },

  actions: {
    startPlaying() {
      if(this.get('hasStarted')) {
        this._resume();
      } else {
        this._start();
      }
    },

    pausePlaying() {
      this._pause();
    },

    advanceLevel() {
      this._pause();
      if(this.get('currentLevel') === LAST_LEVEL) {
        this._stop();
        this.set('isWinner', true);
      } else {
        this.incrementProperty('currentLevel');
      }
    },

    playAgain() {
      //maybe do something else, like keep track of
      //how many rounds they have gone through
      this._reset();
    },

    resetGame() {
      this._reset();
    }
  }
});
