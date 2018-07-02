'use strict';

const collectRpcClient = require('./lib/rpc_client');
const collectRpcServer = require('./lib/rpc_server');

module.exports = app => {
  collectRpcClient(app);
  collectRpcServer(app);
};
