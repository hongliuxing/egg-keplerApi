import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  // egg-sequelize 配置
  config.tablePrefix = 'kepler_';
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'keplerapi-database', // 数据库名称
    host: 'localhost', // 数据库地址
    port: '3306', // 数据库端口
    username: 'root', // 用户名
    password: '', // 密码
    // 禁用日志; 默认值: console.log
    // logging: false,
    // 链接数据库时的可选参数
    dialectOptions: {
      charset: 'utf8mb4', // 字符集
      collate: 'utf8mb4_unicode_ci', // 校对集
      // 当在数据库中处理一个大数(BIGINT和DECIMAL)数据类型的时候，你需要启用这个选项(默认: false)
      supportBigNumbers: true,
      // 这个选项需要bigNumberStrings与 supportBigNumbers同时启用，强制把数据库中大数(BIGINT和DECIMAL)数据类型的值转换为javascript字符对象串对象返回。(默认:false)
      bigNumberStrings: true,
    },
    // 指定在调用 sequelize.define 时使用的选项
    define: {
      underscored: true, // 字段以下划线（_）来分割（默认是驼峰命名风格）
      charset: 'utf8mb4', // 字符集
    },
    timezone: '+08:00', // 东八时区
  };
  config.cors = {
    origin: 'http://localhost:7001',
    // 允许跨域的时候，request携带cookie
    credentials: true,
  };
  return config;
};
