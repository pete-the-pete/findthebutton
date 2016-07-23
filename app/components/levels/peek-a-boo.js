import Ember from 'ember';
import BaseLevel from './base-level';

export default BaseLevel.extend({
  classNames: ['peek-a-boo'],
  iteration: 1,

  _step() {
    this._hide();
    this._positionButton().then(() => {
      this._show();
      this.stepTimer = Ember.run.later(this, this._step, this.delay);
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
      Ember.run.scheduleOnce('afterRender', this, this._step);
    }
  },

  willDestroyElement() {
    Ember.run.cancel(this.stepTimer);
  }

});
