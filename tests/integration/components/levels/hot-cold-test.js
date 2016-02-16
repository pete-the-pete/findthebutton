import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('levels/hot-cold', 'Integration | Component | levels/hot cold', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{levels/hot-cold}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#levels/hot-cold}}
      template block text
    {{/levels/hot-cold}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
