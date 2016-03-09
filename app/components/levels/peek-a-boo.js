import Ember from 'ember';
import BaseLevel from './base-level';

export default BaseLevel.extend({
  classNames: ['peek-a-boo'],
  iteration: 1,

  _step: Ember.on('didInsertElement', function() {
    this._super(...arguments);
    let maximums = this.get('element').getBoundingClientRect();

    this.stepTimer = Ember.run.later(this, function() {
      if(!this.get('isDestroying') && !this.get('isDestroyed')) {
        this._hide();
        this._positionButton(maximums);
        if(this.iteration++ % 2) {
          this._show();
        }
        this._step();
      }
    }, this.delay);
  }),

  init: function() {
    this._super(...arguments);

    let currentLevel = this.get('currentLevel');
    this.delay = currentLevel > 0 ? (1000 * (1/Math.ceil(currentLevel/5))) : 1000;
  },

  actions: {
    foundButton() {
      this._stop();
      this.attrs.foundButton();
    }
  }

});
