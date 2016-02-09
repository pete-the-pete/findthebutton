import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['level'],
  classNameBindings: ['hideButton:hidden'],

  _hide: function() {
    this.set('hideButton', true);
  },

  _show: function() {
    this.set('hideButton', false);
  },
  
  actions: {
    advanceLevel() {
      this._advanceLevel();
      this.sendAction('advanceLevel');
    }
  }
});