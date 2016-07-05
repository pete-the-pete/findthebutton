import BaseLevel from './base-level';

const MODAL_MASK = 1040;

export default BaseLevel.extend({
  classNames: ['too-many-buttons'],

  init() {
    this._super(...arguments);

    let currentLevel = this.get('currentLevel');
    this.totalButtons = currentLevel > 0 ? 7 * currentLevel : 7;
  },

  didRender() {
    this._super(...arguments);
    //position the real button randomly
    let maximums = this.get('element').getBoundingClientRect();
    this._positionButton(maximums);
    //make a bunch of other buttons that remove themselves when clicked
    let min = 10;
    let buttonTree = document.createElement('div');
    while(this.totalButtons--) {
      //create a button
      let button = document.createElement('button');
      let yPos = Math.floor(Math.random() * (this.max - min)) + min;
      let xPos = Math.floor(Math.random() * (this.max - min)) + min;
      let zPos = Math.floor(Math.random() * MODAL_MASK);
      button.style.top = `${yPos}px`;
      button.style.left = `${xPos}px`;
      button.style.zIndex = `${zPos}`;
      button.onclick = function() {
        this.parentElement.removeChild(this);
      };
      buttonTree.appendChild(button);
    }
    //append the button tree to the current element
    this.get('element').appendChild(buttonTree);
  }
});
