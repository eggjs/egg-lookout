'use strict';

module.exports = app => {
  app.get('/', async function(ctx) {
    const r = await ctx.proxy.protoService.echoObj({
      name: 'GAO',
      group: 'B',
    });
    ctx.body = r;
  });

  app.get('/error', async function(ctx) {
    const r = await ctx.proxy.protoService.echoObj({
      name: 'XIAOCHEN',
      group: 'B',
    });
    ctx.body = r;
  });
};
