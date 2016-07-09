import Ember from 'ember';
import BaseLevel from './base-level';

export default BaseLevel.extend({
  classNames: ['peek-a-boo'],
  iteration: 1,

  _step() {
      Ember.run.next(this, () => {
        if(!this.get('isDestroying') && !this.get('isDestroyed')) {
          this._hide();
          this._positionButton();
          if(this.iteration++ % 2) {
            this._show();
          }
          this.stepTimer = Ember.run.later(this, this._step, this.delay);
        }
      });
  },

  init: function() {
    this._super(...arguments);

    const currentLevel = this.get('currentLevel');
    this.delay = 1000 * (1 - (currentLevel * 1/20));
  },

  didRender() {
    this._super(...arguments);

    //only start the show/hide when they timer has started
    if(this.get('isPlaying')) {
      this._step();
    }
  }

});
