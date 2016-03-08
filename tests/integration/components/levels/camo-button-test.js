import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('levels/camo-button', 'Integration | Component | levels/camo button', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{levels/camo-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#levels/camo-button}}
      template block text
    {{/levels/camo-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
