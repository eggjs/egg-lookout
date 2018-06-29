'use strict';

const StdoutObserver = require('sofa-lookout-node').StdoutObserver;

exports.lookout = {
  observer: new StdoutObserver(),
  stepMap: {
    HIGH: 200,
    NORMAL: 1000,
    LOW: 2000,
  },
};
