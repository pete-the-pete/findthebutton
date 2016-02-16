import Ember from 'ember';
import BaseLevel from './base-level';

export default BaseLevel.extend({
  classNames: ['peek-a-boo'],
  iteration: 1,

  _step: Ember.observer('hasStarted', function() {
    //as long as we're playing:
    if(this.get('isPlaying')) {
      this.stepTimer = Ember.run.later(this, () => {
        this._hide();
        this._positionButton();
        if(this.iteration++ % 2) {
          this._show();
        }
        this._step();
      }, this.delay);
    } else {
      this._stop();
    }
  }),

  init() {
    this._super(...arguments);

    let currentLevel = this.get('currentLevell');
    let delay = currentLevel > 0 ? 1000 * (parseInt(this.get('currentLevel'), 10)/10) : 1000;
    this.delay = delay;
  }

});
