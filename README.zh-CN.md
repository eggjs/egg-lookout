# egg-lookout

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-lookout.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-lookout
[travis-image]: https://img.shields.io/travis/eggjs/egg-lookout.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-lookout
[codecov-image]: https://codecov.io/gh/eggjs/egg-lookout/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/eggjs/egg-lookout
[david-image]: https://img.shields.io/david/eggjs/egg-lookout.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-lookout
[snyk-image]: https://snyk.io/test/npm/egg-lookout/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-lookout
[download-image]: https://img.shields.io/npm/dm/egg-lookout.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-lookout

为 egg 提供 [SOFALookout](https://github.com/alipay/sofa-lookout) 客户端功能

## 安装

```bash
$ npm i egg-lookout --save
```

## 用法

### 开启插件

通过 `${app_root}/config/plugin.js` 配置启动 SOFALookout 插件:

```js
exports.lookout = {
  enable: true,
  package: 'egg-lookout',
};
```

### 配置

```js
exports.lookout = {
  agentHost: 'lookout server host',
  agentPort: 7200,
  maxMetricNum: 3000,
  reportBatchSize: 1700,
  compressThreshold: 100,
  autoPoll: true,
};
```

- `agentHost`: lookout 服务器地址
- `agentPort`: lookout 服务器端口
- `maxMetricNum`: 最大可以创建的 metric 数量，默认为 3000
- `reportBatchSize`: 上报服务器的时，会把多个 metric 做合并，这个配置指定了最大合并大小
- `compressThreshold`: 超过这个数目的 metric 会进行压缩
- `autoPoll`: 是否开启自动上报

## 示例

你可以通过 app.lookout 实例来访问 lookout 的 APIs，更多内容可以参考 [sofa-lookout-node](https://github.com/alipay/sofa-lookout-node) 文档

```js
const id = app.lookout.createId('http_request_count');
const counter = app.lookout.counter(id);
counter.inc();
```

## 如何贡献

Please let us know how can we help. Do check out [issues](https://github.com/eggjs/egg/issues) for bug reports or suggestions first.

To become a contributor, please follow our [contributing guide](https://github.com/eggjs/egg/blob/master/CONTRIBUTING.md).

## License

[MIT](LICENSE)
