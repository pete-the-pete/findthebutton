import Ember from 'ember';
import BaseLevel from './base-level';

export default BaseLevel.extend({
  classNames: ['peek-a-boo'],
  iteration: 1,

  _step: Ember.observer('hasStarted', function() {
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

    let currentLevel = this.get('currentLevel');
    this.delay = currentLevel > 0 ? 1000 * (parseInt(currentLevel, 10)/10) : 1000;
  }

});
