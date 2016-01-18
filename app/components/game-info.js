import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['game-info'],
  timerDisplayComponent: null,

  isPlayingChanged: Ember.observer('isPlaying', function() {
    let timerComponent = this.get('timerDisplayComponent');

    if(this.get('isPlaying')) {
      timerComponent.send('start');
    } else {
      timerComponent.send('stop');
    }
  }),

  didInsertElement() {
    if(!this.get('timerDisplayComponent')) {
      this.set('timerDisplayComponent', this.get('childViews.firstObject'));
    }
  }
});
