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
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']
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
    sessionRedis: {
      key: "EGG_SESSION",
      maxAge: 24 * 3600 * 1000, // 1 天
      httpOnly: true,
      encrypt: false
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
    // jwt 额外配置
    jwt_extra: {
      ttl: 2 * 7 * 24, // token 过期时间,单位: 小时
      refresh_ttl: 4 * 7 * 24, // token 可刷新的时间 [失效时间] 单位: 小时
      // iss: 'atzcl', // 令牌的签发者
      // iat: 'iat', // 令牌的发布时间 (unix时间戳）
      // exp: 'exp', // 令牌失效日期 (unix时间戳）
      // nbf: 'nbf', // 令牌从什么时候可用的时间 (unix时间戳)
      // sub: 'sub', // 令牌标识 [ 也就是存放我们自己数据的地方 ]
      // jti: 'jti', // 令牌的唯一标识符 （ sub 和 iat md5 加密后的字符）
    },
  };

  config.middleware = ['graphql', 'isAuth'];

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
