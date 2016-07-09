import Ember from 'ember';

const INTITIAL_COUNTDOWN = 3;

export default Ember.Component.extend({
  classNames: ['level-info'],
  //bind a class to hide
  classNameBindings: ['isPlaying:hidden'],

  //if is play is false, this should be 3
  countDownDisplay: INTITIAL_COUNTDOWN,

  _resetDisplay() {
    this.set('countDownDisplay', INTITIAL_COUNTDOWN);
  },

  scheduleCountdown: function() {
    this.countdown = Ember.run.later(() => {
      if(!this.isDestroying && !this.isDestroyed) {
        this.decrementProperty('countDownDisplay');
        if(this.get('countDownDisplay')) {
          this.scheduleCountdown();
        } else {
          this._resetDisplay();
          this.attrs.startPlaying();
        }
      }
    }, 1000);
  },

  didReceiveAttrs() {
    if(!this.get('isPlaying') && !this.get('isWinner')) {
      this.scheduleCountdown();
    } else {
      Ember.run.cancel(this.countdown);
      this._resetDisplay();
    }
  },

  actions: {
    playAgain() {
      this.attrs.playAgain();
      this.scheduleCountdown();
    }
  }
});
