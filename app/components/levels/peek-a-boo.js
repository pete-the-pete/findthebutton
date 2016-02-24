import Ember from 'ember';
import BaseLevel from './base-level';

export default BaseLevel.extend({
  classNames: ['peek-a-boo'],
  iteration: 1,

  _step: Ember.on('didReceiveAttrs', function() {
    this._super(...arguments);

    if(this.get('isPlaying')) {
      this.stepTimer = Ember.run.later(this, function() {
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

  init: function() {
    this._super(...arguments);

    let currentLevel = this.get('currentLevel');
    this.delay = currentLevel > 0 ? (1000 * (currentLevel/10)) : 1000;
  }

});
