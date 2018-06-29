'use strict';

const fs = require('mz/fs');
const path = require('path');
const mm = require('egg-mock');
const assert = require('assert');
const sleep = require('mz-modules/sleep');
const LogObserver = require('./log_observer');

const logpath = path.join(__dirname, 'fixtures/apps/rpc/logs/rpc/egg-web.log');

describe('test/index.test.js', () => {
  let app;
  before(async function() {
    app = mm.app({
      baseDir: 'apps/rpc',
    });
    await app.ready();
    await sleep(1000);

    app.lookout.addObserver(new LogObserver(app.lookout));
  });
  afterEach(mm.restore);
  after(async function() {
    await app.close();
  });

  it('should collect success rpc', async function() {
    await app.httpRequest()
      .get('/')
      .expect({
        code: 200,
        message: 'hello GAO, you are in 1',
      });

    await sleep(2000);

    const content = await fs.readFile(logpath, 'utf8');
    assert(content.includes('"rpc.provider.service.stats":{"total_count.count":1,"total_count.rate":1,'));
    assert(content.includes('"rpc.consumer.service.stats":{"total_count.count":1,"total_count.rate":1,'));
  });

  it('should collect failed rpc', async function() {
    await app.httpRequest()
      .get('/error')
      .expect(500);

    await sleep(2000);

    const content = await fs.readFile(logpath, 'utf8');
    assert(content.includes('"fail_count.count":1,"fail_count.rate":1'));
    assert(content.includes('"request_size.rate":1,"request_size.totalAmount":288,"request_size.max":288,"response_size.rate":1,"response_size.totalAmount":113,"response_size.max":113,'));
  });
});
