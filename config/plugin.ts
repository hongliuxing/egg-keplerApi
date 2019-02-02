import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  session: true,
  // 挂载 egg-security 安全防范
  security: {
    enable: false,
  },
  // 挂载 egg-cors 跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 挂载 egg-sequelize mysql
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // 挂载 egg-redis redis 拓展
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  // 挂载 egg-session-redis redis 拓展
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },
  // 挂载 egg-graphql API查询
  graphql: {
    enable: true,
    package: 'egg-graphql',
  },
  // router 加强版
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  // validate 校验
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // jwt 跨域身份验证
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};

export default plugin;
