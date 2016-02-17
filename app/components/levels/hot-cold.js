import Ember from 'ember';
import BaseLevel from './base-level';

export default BaseLevel.extend({
  classNames: ['hot-cold'],

  didReceiveAttrs: function() {
    if(this.get('isPlaying')) {
      this._positionButton().then((buttonPos) => {
        let center = buttonPos + this.buttonRect.width/2;
        let newBackground = this.computedStyle.background.replace(/circle at ([^,]*),/, `circle at ${center}px ${center}px,`);
        this.heatMap.style.background = newBackground;
      });
    }
  },

  didInsertElement: function() {
    this._super(...arguments);
    this.heatMap = this.get('element').querySelector('#heat-map');
    this.computedStyle = window.getComputedStyle(this.heatMap);
  },

  actions: {
    /**
     * The CSS overlay needs to start at the button and move out from it.  The click should
     * show the button which will trigger advanceLevel
     */
    peek() {
      //show the button
      this._show();
      this.stepTimer = Ember.run.later(this, () => {
        //hide and move if they don't click on it in time
        //this._hide();
        //this._step();
      }, this.delay);
    },

  }
});