'use strict';

const fs = require('mz/fs');
const path = require('path');
const mm = require('egg-mock');
const assert = require('assert');
const sleep = require('mz-modules/sleep');
const LogObserver = require('./log_observer');

const logpath = path.join(__dirname, 'fixtures/apps/demo/logs/demo/egg-web.log');

describe('test/demo.test.js', () => {
  let app;
  before(async function() {
    app = mm.app({
      baseDir: 'apps/demo',
    });
    await app.ready();
    app.lookout.addObserver(new LogObserver(app.lookout));
  });
  afterEach(mm.restore);
  after(async function() {
    await app.close();
  });

  it('should create custom metric ok', async function() {
    await app.httpRequest()
      .get('/')
      .expect('ok');

    await sleep(2000);

    const content = await fs.readFile(logpath, 'utf8');
    assert(content.includes('"http_request_count":{"count":1,"rate":1'));
  });
});
