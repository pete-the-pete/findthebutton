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

      Ember.run(() => {
        let el = this.get('element');
        let lastDimensions = el.getBoundingClientRect();
        let currentLevel = this.get('currentLevel');
        let {height: bHeight, width: bWidth} = this.buttonRect;
        let dimensions = currentLevel > 0 ? (100 * (1+(currentLevel/2))) : 100;
        el.style.width = `${dimensions}%`;
        el.style.height = `${dimensions}%`;

        let midPoint = lastDimensions.width/2;
        let multiplier = dimensions/100;
        let excludeRange = [
          midPoint - (multiplier * bWidth),
          midPoint + (multiplier * bWidth)
        ];
        let maximums = {
          height: (lastDimensions.height * multiplier) - bHeight,
          width: (lastDimensions.width * multiplier) - bWidth
        };

        let heatMap = this.get('element').querySelector('#heat-map');
        let computedStyle = window.getComputedStyle(heatMap);
        this._positionButton(maximums, bWidth, excludeRange).then((buttonPos) => {
          Ember.run(() => {
            let yCenter = buttonPos.top + bHeight/2;
            let xCenter = buttonPos.left + bWidth/2;
            let newBackground = computedStyle.background.replace(/circle at ([^,]*),/, `circle at ${xCenter}px ${yCenter}px,`);
            heatMap.style.background = newBackground;
          });
        });
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