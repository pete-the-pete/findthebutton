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
  _positionButton: function(max=this.max, min=10, excludeRange=undefined) {
    //move the button somewhere within the parent's
    //bounding rect so that it is still visible
    let moveDefer = Ember.RSVP.defer();
    let top = Math.floor(Math.random() * (max - min)) + min;
    if(excludeRange) {
      let [excludeMin, excludeMax] = excludeRange;
      if(top > excludeMin && top < excludeMax) {
        top = excludeMax;
      }
    }
    let left = Math.floor(Math.random() * (max - min)) + min;
    if(excludeRange) {
      let [excludeMin, excludeMax] = excludeRange;
      if(left > excludeMin && left < excludeMax) {
        left = excludeMax;
      }
    }

    Ember.run(() => {
      let b = this.element.querySelector('button');
      b.style.top = `${top}px`;
      b.style.left = `${left}px`;
      moveDefer.resolve({top, left});
    });
    return moveDefer.promise;
  },

  _determineBoundaries: function() {
    let el = this.get('element');
    //get the parent boundingRect
    this.parentRect = el.getBoundingClientRect();
    //get the button boundingRect
    this.buttonRect = el.querySelector('button').getBoundingClientRect();
    this.max = this.parentRect.width - this.buttonRect.width;
  },

  didInsertElement: function() {
    this._super(...arguments);

    this._determineBoundaries();
  },

  actions: {
    advanceLevel() {
      this._advanceLevel();
      this.sendAction('advanceLevel');
    }
  }
});