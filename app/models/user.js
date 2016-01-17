import DS from 'ember-data';

export default DS.Model.extend({
  uid: DS.attr('string'),
  name: DS.attr('string'),
  createDate: DS.attr('date'),
  lastLogin: DS.attr('date'),
  provider: DS.attr('string')
});
