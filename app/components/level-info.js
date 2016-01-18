import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['level-info'],
  //bind a class to hide
  classNameBindings: ['isPlaying:hidden'],

  //if is play is false, this should be 3
  countDownDisplay: 3,

  scheduleCountdown: function() {
    Ember.run.later(() => {
      this.decrementProperty('countDownDisplay');
      if(this.get('countDownDisplay')) {
        this.scheduleCountdown();
      } else {
        this.sendAction('startPlaying');
      }
    }, 1000);
  },

  didInsertElement() {
    this.scheduleCountdown();
  }
});
