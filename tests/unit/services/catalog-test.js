import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Band from 'rarwe/models/band';
import Song from 'rarwe/models/song';

module('Unit | Service | catalog', function(hooks) {
  setupTest(hooks);

  test('it can store and retrieve bands', function(assert) {
    let catalog = this.owner.lookup('service:catalog');
    catalog.add('band', new Band({ id: 1, name: 'Led Zeppelin' }));
    assert.equal(catalog.bands.length, 1);
    assert.equal(catalog.bands[0].name, 'Led Zeppelin');
  });

  test('it can store and retrieve songs', function(assert) {
    let catalog = this.owner.lookup('service:catalog');
    catalog.add('song', new Song({
      id: 1,
      title: 'Achilles Last Stand',
      rating: 5
    }));

    assert.equal(catalog.songs.length, 1);
    assert.equal(catalog.songs[0].title, 'Achilles Last Stand');
  });

  test('it can load in a band from an API response', function(assert) {
    let catalog = this.owner.lookup('service:catalog');
    let responseData = {
      data: {
        type: 'bands',
        id: '1',
        attributes: {
          name: 'TOOL'
        },
        relationships: {
          songs: {
            links: {
              related: '/bands/1/songs'
            }
          }
        }
      }
    }

    catalog.load(responseData);

    let band = catalog.bands[0];
    assert.equal(catalog.bands.length, 1);
    assert.equal(band.name, 'TOOL');
    assert.equal(band.relationships.songs, '/bands/1/songs')
  });
});
