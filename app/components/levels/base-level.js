import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['level'],
  classNameBindings: ['hideButton','showButton'],
  initialRender: true,

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

  _foundButton: function() {
    this._stop();
    //reset the game board
    this.initialRender = true;
  },

  /**
   * move the top and left around in the parent.
   * the parent gets larger each level, and the button gets smaller
   * the button is square to make things easier
   */
  _positionButton: function(maximums, min=10, excludeRange=undefined) {
    //move the button somewhere within the parent's
    //bounding rect so that it is still visible
    let moveDefer = Ember.RSVP.defer();
    let top = Math.floor(Math.random() * (maximums.height - this.max - min)) + min;
    if(excludeRange) {
      let [excludeMin, excludeMax] = excludeRange;
      if(top > excludeMin && top < excludeMax) {
        top = Date.now() % 2 ? excludeMax : excludeMin;
      }
    }
    let left = Math.floor(Math.random() * (maximums.width - this.max - min)) + min;
    if(excludeRange) {
      let [excludeMin, excludeMax] = excludeRange;
      if(left > excludeMin && left < excludeMax) {
        left = Date.now() % 2 ? excludeMax : excludeMin;
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
    this.buttonRect = el.querySelector('.thebutton').getBoundingClientRect();
    this.max = this.parentRect.width - this.buttonRect.width;
  },

  didInsertElement: function() {
    this._super(...arguments);
    this._determineBoundaries();
  },

  actions: {
    foundButton() {
      this._foundButton();
      this.sendAction('foundButton');
    }
  }
});