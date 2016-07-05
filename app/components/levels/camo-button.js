import BaseLevel from './base-level';

export default BaseLevel.extend({
  classNames: ['camo-button'],
  classNameBindings: ['camoLevel'],

  didRender() {
    this._super(...arguments);

    let val = this.get('attrs.currentLevel.value');
    let level = val > 0 ? val : 1;

    this.set('camoLevel', `camo-${level % 5}`);
    this._positionButton(this.get('element').getBoundingClientRect());
  }
});
