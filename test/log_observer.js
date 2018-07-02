'use strict';

class LogObserver {
  constructor(registry) {
    this.registry = registry;
  }

  get logger() {
    return this.registry.logger;
  }

  update(ms) {
    ms.forEach(m => { this.logger.info('[lookout] ==> %j', m); });
  }
}

module.exports = LogObserver;
