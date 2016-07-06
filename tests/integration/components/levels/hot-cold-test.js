import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('levels/hot-cold', 'Integration | Component | levels/hot cold', {
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
