'use strict';

exports.keys = 'helloworld';

exports.sofaRpc = {
  registry: {
    address: '127.0.0.1:2181',
  },
  client: {
    responseTimeout: 3000,
  },
  server: {
    namespace: 'com.alipay.sofa.rpc.test',
  },
};
