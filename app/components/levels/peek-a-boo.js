import Ember from 'ember';

export default Ember.Component.extend({
  hideButton: true,
  classNameBindings: ['hideButton:hidden'],

  _stop: function() {
    Ember.run.cancel(this.get('repositionTimer'));
  },

  _hide: function() {
    this.set('hideButton', true);
  },

  _show: function() {
    this.set('hideButton', false);
  },

  /**
   * move the top and left around in the parent.
   * the parent gets larger each level, and the button gets smaller
   * the button is square to make things easier
   */
  _move: function() {
    //move the button somewhere within the parent's
    //bounding rect so that it is still visible
    let coordinates = Math.random();
  },

  _positionButton: function() {
    this._hide();
    this._move();
    this._show();
    this.step();
  },

  init() {
    this._super(...arguments);

    let currentLevel = this.get('currentLevell');
    let delay = currentLevel > 0 ? 1000 * (parseInt(this.get('currentLevel'), 10)/10) : 1000;
    this.set('delay', delay);
  },

  didInsertElement: function() {
    this._super(...arguments);
    let el = this.get('element');
    //get the parent boundingRect
    this.set('parentRect', el.parentElement.getBoundingClientRect());
    //get the button boundingRect (NEEDS TO BE RETHOUGHT)
    this.set('buttonRect', el.querySelector('button').getBoundingClientRect());
  },

  didRender: function() {
    Ember.run.next(this, this._positionButton);
  },

  step: function() {
    //as long as we're playing:
    if(this.get('isPlaying')) {
      this.set('repositionTimer', Ember.run.later(this, function() {
        this._positionButton();
      }, this.get('delay')));
    } else {
      this._stop();
    }
  },

  actions: {
    advanceLevel() {
      this._stop();
      this.sendAction('advanceLevel');
    }
  }
});
