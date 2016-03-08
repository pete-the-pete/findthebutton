import Ember from 'ember';
import BaseLevel from './base-level';

export default BaseLevel.extend({
  classNames: ['camo-button'],
  classNameBindings: ['camoLevel'],

  init() {
    this._super(...arguments);
    this.set('camoLevel', `camo-${Math.floor(this.get('attrs.currentLevel.value') / 5) + 1}`);
  }
});
