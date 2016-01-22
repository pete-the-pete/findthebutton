import Ember from 'ember';

const LEVELS = [
  'Peek-a-Boo'
];

export default Ember.Route.extend({
  /**
   * Unecessary comment.
   */
  currentLevel: 0,

  /**
   * Total time actually 'playing'
   */
  playTime: 0,

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

  /**
   * Pass the current state to the templates
   */
  model() {
    let model = this.getProperties(
      'level',
      'playTime',
      'isWinner',
      'isPlaying'
    );
    model.LEVELS = LEVELS;
    return model;
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
      if(this.get('currentLevel') === LEVELS.length) {
        this.set('currentModel.isWinner', true);
        this._pause();
      }
    },

    resetGame() {
      this._reset();
    }
  }
});
