import Ember from 'ember';
import BaseLevel from './base-level';

export default BaseLevel.extend({
  classNames: ['camo-button'],
  classNameBindings: ['camoLevel'],

  didRender() {
    this._super(...arguments);

    Ember.run.next(this, () => {
      const level = this.get('currentLevel');

      this.set('camoLevel', `camo-${(level % 5) + 1}`);
      this._positionButton();
    });
  }
});
