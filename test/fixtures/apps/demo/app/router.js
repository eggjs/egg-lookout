'use strict';

module.exports = app => {
  app.get('/', async function(ctx) {
    const counter = app.lookout.counter(
      app.lookout.createId('http_request_count').withTag('path', '/').withTag('method', 'GET')
    );
    counter.inc();
    ctx.body = 'ok';
  });
};
