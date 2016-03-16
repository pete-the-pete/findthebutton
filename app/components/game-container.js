import Ember from 'ember';
import ENV from '../config/environment';

const LEVELS = [
  // 'Peek-a-Boo',
  // 'Hot-Cold',
  // 'Too-Many-Buttons',
  'Camo-Button'
];
const ROUNDS = 5;
const LAST_LEVEL = (LEVELS.length * ROUNDS) - 1;

/**
 * TLC That operates like a controller, there is very little
 * state that comes from the route, it mainly get sent
 * to save the score.
 */
export default Ember.Component.extend({
  classNameBindings: ['isPlaying:playing'],

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

  didInsertElement() {
    this._super(...arguments);
    let rightRail = this.get('element').querySelector('.right-rail');
    if(rightRail) {
      Ember.run(() => {
        let script= document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        document.getElementsByTagName('head')[0].appendChild(script);
        rightRail.innerHTML = `
          <!-- RightRail -->
          <ins class="adsbygoogle"
              style="display:inline-block;width:300px;height:600px"
              data-ad-client="ca-pub-2811298199735743"
              data-ad-slot="3746614119"></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>`;
      });
    }
  },

  actions: {
    startPlaying() {
      if(this.get('hasStarted')) {
        this.incrementProperty('currentLevel');
        this._resume();
      } else {
        this._start();
      }
    },

    pausePlaying() {
      this._pause();
    },

    foundButton() {
      this._pause();
      if(this.get('currentLevel') === LAST_LEVEL) {
        this._stop();
        this.set('isWinner', true);
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
