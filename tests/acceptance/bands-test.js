import { module, test } from 'qunit';
import { visit, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { createBand } from 'rarwe/tests/helpers/custom-helpers';

module('Acceptance | Bands', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('List bands', async function(assert) {
    this.server.create('band', { name: 'Radiohead' });
    this.server.create('band', { name: 'Long Distance Calling' });
    
    await visit('/');

    assert.dom('[data-test-rr="band-link"]').exists({ count: 2 }, 'All band links are rendered');
    assert.dom('[data-test-rr="band-list-item"]:first-child').hasText('Radiohead', 'The first band link contains the band name');
    assert.dom('[data-test-rr="band-list-item"]:last-child').hasText('Long Distance Calling', 'The last band link contains the band name');
  });

  test('Create a band', async function(assert){
    this.server.logging = true;
    this.server.create('band', { name: 'Royal Blood' });

    await visit('/');
    await createBand('Caspian');
    await waitFor('[data-test-rr="no-songs-text"]');

    assert.dom('[data-test-rr="band-list-item"]').exists({ count: 2 }, 'A new band link is rendered');
    assert.dom('[data-test-rr="band-list-item"]:last-child').hasText('Caspian', 'The new band link is rendered as the last item');
    assert.dom('[data-test-rr="band-list-item"]:last-child').hasText('Caspian', 'The new band link is rendered as the last item');
  });
});
