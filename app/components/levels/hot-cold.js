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

    el.style.width = `${dimensions}%`;
    el.style.height = `${dimensions}%`;
    this.heatMap = this.get('element').querySelector('#heat-map');
    this.computedStyle = window.getComputedStyle(this.heatMap);

    let excludeRange = [
       dimensions/2 - currentLevel * this.buttonRect.width,
       dimensions/2 + currentLevel * this.buttonRect.width
    ];

    this._positionButton(dimensions, this.buttonRect.width, excludeRange).then((buttonPos) => {
      let center = buttonPos.top + this.buttonRect.width/2;
      let newBackground = this.computedStyle.background.replace(/circle at ([^,]*),/, `circle at ${center}px ${center}px,`);
      this.heatMap.style.background = newBackground;
    });
  },

  didRender() {
    if(this.initialRender) {
      this.initialRender = false;

      let el = this.get('element');
      //scroll to the center of the level
      Ember.run.next(() => {
        console.debug(el.scrollTop);
        console.debug(el.scrollHeight);
        console.debug(Math.floor(el.scrollHeight/2));
        el.parentNode.scrollTop = 50;//Math.floor(el.scrollHeight/2);
        el.parentNode.scrollLeft = 50;//Math.floor(el.scrollWidth/2);
        console.debug(el.scrollTop);
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