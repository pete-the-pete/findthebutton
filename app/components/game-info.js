import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['game-info'],
  timerDisplayComponent: null,

  levelDisplay: Ember.computed('currentLevel', function() {
    return this.get('currentLevel') + 1;
  }),

  isPlayingChanged: Ember.observer('isPlaying', function() {
    let timerComponent = this.get('timerDisplayComponent');

    if(this.get('isPlaying')) {
      timerComponent.send('start');
    } else {
      timerComponent.send('stop');
    }
  }),

  isWinnerChanged: Ember.observer('isWinner', function() {
    let timerComponent = this.get('timerDisplayComponent');

    if(this.get('isWinner')) {
      timerComponent.send('pause')
      timerComponent.send('stop');
    }
  }),

  didInsertElement() {
    if(!this.get('timerDisplayComponent')) {
      this.set('timerDisplayComponent', this.get('childViews.firstObject'));
    }
  },

  actions: {
    updatePausedTime(duration) {
      debugger;
    }
  }
});
