import { EggAppConfig, EggAppInfo, PowerPartial, Context } from 'egg';
import path = require('path');

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// app special config scheme
export interface BizConfig {
  apiPrefix: string;
  sourceUrl: string;
  enforcer: string;
}

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;
  // api路由前缀
  config.apiPrefix = '/api';
  // 加密 cookie 的 key
  config.keys = appInfo.name + '_1544860409189_6203';
  // 安全配置
  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      ignore: () => true,
    },
  };

  // 配置跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // 配置上传文件路径
  config.static = {
    prefix: '/uploads/',
    dir: path.join(appInfo.baseDir, 'uploads'),
  };

  // 自定义配置/未提供 .d.ts 文件的拓展配置
  const customizeConfig = {
    // redis 配置 [ 后面如果需要对某一业务进行缓存的时候，可以开启多实例来进行特定储存 ]
    redis: {
      client: {
        port: 6379,
        host: 'localhost',
        password: 'auth',
        db: 0,
      },
    },
    graphql: {
      router: '/graphql',
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
      // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
      graphiql: true,
      onPreGraphQL: function* (_ctx: Context) {},
      // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
      onPreGraphiQL: function* (_ctx: Context) {},
    },
    // jwt跨域身份验证
    jwt: {
      enable: false,
      secret: 'keplerapi',
    },
  };

  config.middleware = ['graphql', 'isLogin'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...customizeConfig,
    ...bizConfig,
  };
};
