import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('levels/peek-a-boo', 'Integration | Component | levels/peek a boo', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{levels/peek-a-boo}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#levels/peek-a-boo}}
      template block text
    {{/levels/peek-a-boo}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
