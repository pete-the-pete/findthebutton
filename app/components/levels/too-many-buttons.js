import Ember from 'ember';
import BaseLevel from './base-level';

export default BaseLevel.extend({
  classNames: ['too-many-buttons'],

  init() {
    this._super(...arguments);

    let currentLevel = this.get('currentLevel');
    this.totalButtons = currentLevel > 0 ? 10 * (parseInt(currentLevel, 10)/10) : 10;
  },

  didInsertElement() {
    this._super(...arguments);
    //position the real button randomly
    this._positionButton();
    //make a bunch of other buttons that remove themselves when clicked
    let min = 10;
    let buttonTree = document.createElement('div');
    while(this.totalButtons--) {
      //create a button
      let pos = Math.floor(Math.random() * (this.max - min)) + min;
      let button = document.createElement('button');
      button.style.top = `${pos}px`;
      button.style.left = `${pos}px`;
      button.style.zIndex = `${pos}`;
      button.onclick = function() {
        this.parentElement.removeChild(this);
      };
      buttonTree.appendChild(button);
    }
    //append the button tree to the current element
    this.get('element').appendChild(buttonTree);
  }
});
