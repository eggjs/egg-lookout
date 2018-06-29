'use strict';

module.exports = app => {
  if (!app.sofaRpcServer) return;

  const providerId = app.lookout.createId('rpc.provider.service.stats');

  app.sofaRpcServer.on('response', ({ req, res }) => {
    const tags = new Map([
      [ 'app', app.name ],
      [ 'service', req.data.serverSignature ],
      [ 'method', req.data.methodName ],
      [ 'protocol', 'bolt' ],
      [ 'caller_app', req.data.requestProps && req.data.requestProps.app ],
    ]);
    const id = providerId.withTags(tags);
    const mixinMetric = app.lookout.mixinMetric(id);

    // Record the number of calls and time consuming
    const totalCounter = mixinMetric.counter('total_count');
    const totalTimer = mixinMetric.timer('total_time');
    totalCounter.inc();

    const rt = res.meta.rt;
    if (rt != null) {
      totalTimer.record(rt);
    }

    if (res.meta.resultCode !== '00') {
      const failCounter = mixinMetric.counter('fail_count');
      const failTimer = mixinMetric.timer('fail_time');

      failCounter.inc();
      if (rt != null) {
        failTimer.record(rt);
      }
    }
  });
};
