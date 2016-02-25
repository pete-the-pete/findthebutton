import Ember from 'ember';
import BaseLevel from './base-level';

export default BaseLevel.extend({
  classNames: ['hot-cold'],

  initialRender: true,

  didInsertElement() {
    this._super(...arguments);

    let el = this.get('element');
    let currentLevel = this.get('currentLevel');
    let dimensions = currentLevel > 0 ? (100 * (1+(currentLevel/10))) : 100;

    Ember.run(() => {
      el.style.width = `${dimensions}%`;
      el.style.height = `${dimensions}%`;
      this.heatMap = this.get('element').querySelector('#heat-map');
      this.computedStyle = window.getComputedStyle(this.heatMap);

      let excludeRange = [
        dimensions/2 - currentLevel * this.buttonRect.width,
        dimensions/2 + currentLevel * this.buttonRect.width
      ];

      this._positionButton(parseInt(this.computedStyle.width, 10), this.buttonRect.width, excludeRange).then((buttonPos) => {
        Ember.run(() => {
          let yCenter = buttonPos.top + this.buttonRect.height/2;
          let xCenter = buttonPos.left + this.buttonRect.width/2;
          let newBackground = this.computedStyle.background.replace(/circle at ([^,]*),/, `circle at ${xCenter}px ${yCenter}px,`);
          this.heatMap.style.background = newBackground;
        });
      });
    });
  },

  didRender() {
    if(this.initialRender) {
      this.initialRender = false;

      let el = this.get('element');
      //scroll to the center of the level
      Ember.run.next(() => {
        el.parentNode.scrollTop = Math.floor(el.scrollHeight/2);
        el.parentNode.scrollLeft = Math.floor(el.scrollWidth/2);
      });
    }
  },

  actions: {
    /**
     * The CSS overlay needs to start at the button and move out from it.  The click should
     * show the button which will trigger advanceLevel
     */
    peek() {
      //show the button
      this._show();
    }

  }
});