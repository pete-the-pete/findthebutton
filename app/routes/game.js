import Ember from 'ember';

/**
 * Doesn't do much, let's the TLC know if the user
 * is logged in, and saves results.
 */
export default Ember.Route.extend({

  /**
   * Pass along the session data.
   */
  model() {
    return this.get('session').isAuthenticated;
  },

  actions: {
    advanceLevel() {
      //save some data
    }
  }
});
