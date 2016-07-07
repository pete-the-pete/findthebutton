import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['level'],
  classNameBindings: ['hideButton','showButton'],

  min: 10,
  maxHeight: 0,
  maxWidth: 0,
  buttonRect: null,


  _hide: function() {
    this.set('hideButton', true);
    this.set('showButton', false);
  },

  _show: function() {
    this.set('hideButton', false);
    this.set('showButton', true);
  },

  /**
   * move the top and left around in the parent.
   * the parent gets larger each level, and the button gets smaller
   * the button is square to make things easier
   */
  _positionButton: function(maximums=this.parentRect, min=10, excludeRange=undefined) {
    //move the button somewhere within the parent's
    //bounding rect so that it is still visible
    let moveDefer = Ember.RSVP.defer();
    let top = Math.floor(Math.random() * (this.maxHeight - min)) + min;
    if(excludeRange) {
      let [excludeMin, excludeMax] = excludeRange;
      if(top > excludeMin && top < excludeMax) {
        top = Date.now() % 2 ? excludeMax : excludeMin;
      }
    }
    let left = Math.floor(Math.random() * (this.maxWidth - min)) + min;
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

  didInsertElement() {
    this._super(...arguments);

    const el = this.get('element');

    Ember.run.next(this, () => {
      //get the parent boundingRect
      this.parentRect = el.getBoundingClientRect();
      //get the button boundingRect
      this.buttonRect = el.querySelector('.thebutton').getBoundingClientRect();
      //get the key dimensions
      this.maxWidth = this.parentRect.width - this.buttonRect.width;
      this.maxHeight = this.parentRect.height - this.buttonRect.height;
    });
  }
});