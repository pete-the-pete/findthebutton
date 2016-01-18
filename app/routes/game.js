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

  levelTitle: Ember.computed('currentLevel', function() {
    return LEVELS[this.get('currentLevel')];
  }),

  levelFile: Ember.computed('levelTitle', function() {
    return this.get('levelTitle').toLowerCase()
  }),

  /**
   * Total time actually 'playing'
   */
  playTime: 0,

  /**
   * Pass the current state to the templates
   */
  model() {
    let model = this.getProperties(
      'currentLevel',
      'levelTitle',
      'levelFile',
      'playTime',
      'isPlaying'
    );
    model.isWinner = false;
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
