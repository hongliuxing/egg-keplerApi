import { Application } from 'egg';
import { Instance } from 'sequelize';

export interface SysLogAttributes {
  uid: string;
  time: string;
  ua: string;
  ip: string;
  status: boolean;
  info: string;
  method: string;
  url: string;
}

export interface SysLogInstance extends Instance < SysLogAttributes >, SysLogAttributes {
  id: number;
  uid: string;
  time: string;
  ua: string;
  ip: string;
  status: boolean;
  info: string;
  method: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function User (app: Application) {
  const { STRING, BOOLEAN } = app.Sequelize;
  const tablePrefix = app.config.tablePrefix;
  // 创建模型
  const syslog = app.model.define( tablePrefix + 'syslog', {
    uid: {
      type: STRING(32),
      allowNull: false,
      comment: '用户ID',
    },
    time: {
      type: STRING(64),
      allowNull: true,
      comment: '操作时间',
    },
    ip: {
      type: STRING(20),
      allowNull: true,
      comment: 'ip',
    },
    status: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: 1,
      comment: '用户状态: 1 正常； 0 禁用',
    },
    info: {
      type: STRING(255),
      allowNull: true,
      comment: '操作信息',
    },
    method: {
      type: STRING(255),
      allowNull: true,
      comment: '请求方式',
    },
    url: {
      type: STRING(255),
      allowNull: true,
      comment: '调用地址',
    },
  });
  return syslog;
};
