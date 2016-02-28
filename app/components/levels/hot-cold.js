import Ember from 'ember';
import BaseLevel from './base-level';

export default BaseLevel.extend({
  classNames: ['hot-cold'],

  willRender() {
    this._super(...arguments);
    this._hide();
  },

  didRender() {
    this._super(...arguments);

    Ember.run(() => {
      let el = this.get('element');
      let currentLevel = this.get('currentLevel');
      let {height: bHeight, width: bWidth} = this.buttonRect;
      let dimensions = currentLevel > 0 ? (100 * (1+(currentLevel/2))) : 100;
      el.style.width = `${dimensions}%`;
      el.style.height = `${dimensions}%`;

      let newDimensions = el.getBoundingClientRect();
      let midPoint = newDimensions.width/2;
      let multiplier = dimensions/100;
      let excludeRange = [
        midPoint - (multiplier * bWidth),
        midPoint + (multiplier * bWidth)
      ];
      let maximums = {
        height: newDimensions.height - bHeight,
        width: newDimensions.width - bWidth
      };

      let heatMap = this.get('element').querySelector('#heat-map');
      let computedStyle = window.getComputedStyle(heatMap);
      this._positionButton(maximums, bWidth, excludeRange).then((buttonPos) => {
        Ember.run(() => {
          this.buttonPos = buttonPos;
          let yCenter = buttonPos.top + bHeight/2;
          let xCenter = buttonPos.left + bWidth/2;
          let newBackground = computedStyle.background.replace(/circle at ([^,]*),/, `circle at ${xCenter}px ${yCenter}px,`);
          heatMap.style.background = newBackground;
        });
      });
      el.parentNode.scrollTop = Math.floor(el.scrollHeight/2);
      el.parentNode.scrollLeft = Math.floor(el.scrollWidth/2);
    });
  },

  click(e) {
    let inX = e.offsetX > this.buttonPos.left && e.offsetX < this.buttonPos.left + this.buttonRect.width;
    let inY = e.offsetY > this.buttonPos.top && e.offsetY < this.buttonPos.top + this.buttonRect.height;

    if(inX && inY) {
      this._show();
    }
  },

  actions: {
    foundButton() {
      Ember.run(() => {
        let el = this.get('element');
        el.parentNode.scrollTop = 0;
        el.parentNode.scrollLeft = 0;
        this.attrs.foundButton();
      });
    }
  }
});