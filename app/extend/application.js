'use strict';

const LookoutRegistry = require('sofa-lookout-node').LookoutRegistry;
// Symbols
const _lookout = Symbol.for('Application#lookout');

module.exports = {
  get lookout() {
    if (!this[_lookout]) {
      const options = Object.assign({
        appName: this.name,
        logger: this.coreLogger,
        httpclient: this.httpclient,
      }, this.config.lookout);
      this[_lookout] = new LookoutRegistry(options);

      this.beforeClose(async () => { this[_lookout].close(); });
    }
    return this[_lookout];
  },
};
