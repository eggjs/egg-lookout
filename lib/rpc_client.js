'use strict';

module.exports = app => {
  if (!app.rpcClient) return;

  const consumerId = app.lookout.createId('rpc.consumer.service.stats');

  app.rpcClient.on('request', req => {
    // 添加当前系统名到 requestProps 里
    if (req.requestProps && !req.requestProps.app) {
      req.requestProps.app = app.name;
    }
  });

  app.rpcClient.on('response', ({ req }) => {
    const tags = new Map([
      [ 'app', app.name ],
      [ 'service', req.serverSignature ],
      [ 'method', req.methodName ],
      [ 'protocol', 'bolt' ],
      [ 'invoke_type', 'future' ],
      [ 'target_app', req.targetAppName ],
    ]);
    const id = consumerId.withTags(tags);
    const mixinMetric = app.lookout.mixinMetric(id);

    // Record the number of calls and time consuming
    const totalCounter = mixinMetric.counter('total_count');
    const totalTimer = mixinMetric.timer('total_time');
    totalCounter.inc();

    const rt = req.meta.rt;
    if (rt != null) {
      totalTimer.record(rt);
    }

    if (req.meta.resultCode !== '00') {
      const failCounter = mixinMetric.counter('fail_count');
      const failTimer = mixinMetric.timer('fail_time');

      failCounter.inc();
      if (rt != null) {
        failTimer.record(rt);
      }
    }

    // Record request size and response size
    const requestSize = req.meta.reqSize;
    const responseSize = req.meta.resSize;

    if (requestSize) {
      const requestSizeDS = mixinMetric.distributionSummary('request_size');
      requestSizeDS.record(requestSize);
    }

    if (responseSize) {
      const responseSizeDS = mixinMetric.distributionSummary('response_size');
      responseSizeDS.record(responseSize);
    }
  });
};
