import Ember from 'ember';
import BaseLevel from './base-level';

export default BaseLevel.extend({
  classNames: ['hot-cold'],

  willRender() {
    this._hide();
  },

  didRender() {
    this._super(...arguments);
    if(this.initialRender) {
      this.initialRender = false;

      let el = this.get('element');
      let lastDimensions = el.getBoundingClientRect();
      let currentLevel = this.get('currentLevel');

      Ember.run(() => {
        let dimensions = currentLevel > 0 ? (100 * (1+(currentLevel/10))) : 100;
        el.style.width = `${dimensions}%`;
        el.style.height = `${dimensions}%`;

        let midPoint = lastDimensions.width/2;
        let multiplier = dimensions/100;
        let excludeRange = [
          midPoint - (multiplier * this.buttonRect.width),
          midPoint + (multiplier * this.buttonRect.width)
        ];
        let maximums = {
          height: (lastDimensions.height * multiplier) - this.buttonRect.height,
          width: (lastDimensions.width * multiplier) - this.buttonRect.width
        };

        let heatMap = this.get('element').querySelector('#heat-map');
        let computedStyle = window.getComputedStyle(heatMap);
        this._positionButton(maximums, this.buttonRect.width, excludeRange).then((buttonPos) => {
          Ember.run(() => {
            let yCenter = buttonPos.top + this.buttonRect.height/2;
            let xCenter = buttonPos.left + this.buttonRect.width/2;
            let newBackground = computedStyle.background.replace(/circle at ([^,]*),/, `circle at ${xCenter}px ${yCenter}px,`);
            heatMap.style.background = newBackground;
          });
        });
      });

      // if(this.initialRender) {
      //   this.initialRender = false;

      //   let el = this.get('element');
      //   //scroll to the center of the level
      //   Ember.run.next(() => {
      //     el.parentNode.scrollTop = Math.floor(el.scrollHeight/2);
      //     el.parentNode.scrollLeft = Math.floor(el.scrollWidth/2);
      //   });
      // }
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