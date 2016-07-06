import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('levels/peek-a-boo', 'Integration | Component | levels/peek a boo', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`
    {{#levels/camo-button}}
      {{partial 'partials/thebutton'}}
    {{/levels/camo-button}}
  `);

  assert.notEqual(this.$().text().trim(), '');
});
