import Ember from 'ember';
import BaseLeveL from './base-level';

export default BaseLeveL.extend({
  _stop: function() {
    Ember.run.cancel(this.stepTimer);
  },

  /**
   * move the top and left around in the parent.
   * the parent gets larger each level, and the button gets smaller
   * the button is square to make things easier
   */
  _move: function() {
    //move the button somewhere within the parent's
    //bounding rect so that it is still visible
    let min = 10;
    let pos = Math.floor(Math.random() * (this.max - min)) + min;
    Ember.run(() => {
      let b = this.element.querySelector('button');
      b.style.top = pos+'px';
      b.style.left = pos+'px';
    });
  },

  _positionButton: function() {
    this._hide();
    this._move();
    if(this.iteration++ % 2) {
      this._show();
    }
    this._step();
  },

  _step: Ember.observer('hasStarted', function() {
    //as long as we're playing:
    if(this.get('isPlaying')) {
      this.stepTimer = Ember.run.later(this, function() {
        this._positionButton();
      }, this.delay);
    } else {
      this._stop();
    }
  }),

  _advanceLevel: function() {
    this._stop();
  },

  init() {
    this._super(...arguments);

    let currentLevel = this.get('currentLevell');
    let delay = currentLevel > 0 ? 1000 * (parseInt(this.get('currentLevel'), 10)/10) : 1000;
    this.delay = delay;
    this.iteration = 1;
  },

  didInsertElement: function() {
    this._super(...arguments);
    let el = this.get('element');
    //get the parent boundingRect
    let parentRect = el.parentElement.getBoundingClientRect();
    //get the button boundingRect (NEEDS TO BE RETHOUGHT)
    let buttonRect = el.querySelector('button').getBoundingClientRect();
    this.max = parentRect.width - buttonRect.width;
  }

});
