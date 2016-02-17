import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['level'],
  classNameBindings: ['hideButton:hidden','showButton:shown'],

  _hide: function() {
    this.set('hideButton', true);
    this.set('showButton', false);
  },

  _show: function() {
    this.set('hideButton', false);
    this.set('showButton', true);
  },

  _stop: function() {
    Ember.run.cancel(this.stepTimer);
  },

  _advanceLevel: function() {
    this._stop();
  },

  /**
   * move the top and left around in the parent.
   * the parent gets larger each level, and the button gets smaller
   * the button is square to make things easier
   */
  _positionButton: function() {
    //move the button somewhere within the parent's
    //bounding rect so that it is still visible
    let moveDefer = Ember.RSVP.defer();
    let min = 10;
    let pos = Math.floor(Math.random() * (this.max - min)) + min;
    Ember.run(() => {
      let b = this.element.querySelector('button');
      b.style.top = `${pos}px`;
      b.style.left = `${pos}px`;
      moveDefer.resolve(pos);
    });
    return moveDefer.promise;
  },

  didInsertElement: function() {
    this._super(...arguments);
    let el = this.get('element');
    //get the parent boundingRect
    this.parentRect = el.parentElement.getBoundingClientRect();
    //get the button boundingRect
    this.buttonRect = el.querySelector('button').getBoundingClientRect();
    this.max = this.parentRect.width - this.buttonRect.width;
  },

  actions: {
    advanceLevel() {
      this._advanceLevel();
      this.sendAction('advanceLevel');
    }
  }
});