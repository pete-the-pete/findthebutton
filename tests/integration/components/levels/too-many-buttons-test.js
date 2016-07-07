import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('levels/too-many-buttons', 'Integration | Component | levels/too many buttons', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#levels/camo-button}}
      <button class="thebutton">Clean this up!</button>
    {{/levels/camo-button}}
  `);

  assert.notEqual(this.$().text().trim(), '');
});
