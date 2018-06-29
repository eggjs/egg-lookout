'use strict';

exports.echoObj = async function(req) {
  if (req.name === 'XIAOCHEN') throw new Error('mock error');

  return {
    code: 200,
    message: 'hello ' + req.name + ', you are in ' + req.group,
  };
};
