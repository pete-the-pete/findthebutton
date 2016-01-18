import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    advanceLevel() {
      this.sendAction('advanceLevel');
    }
  }
});
