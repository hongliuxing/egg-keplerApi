import { Application } from 'egg';
import { Instance } from 'sequelize';

type enabled = '0' | '1';

export interface RoleAttributes {
  name: string;
  description: string;
  type: string;
  enabled: enabled;
}

export interface RoleInstance extends Instance<RoleAttributes>, RoleAttributes {
  id: number;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export default (app: Application) => {
  const {
    STRING,
    ENUM,
  } = app.Sequelize;
  const tablePrefix = app.config.tablePrefix;
  const role = app.model.define<RoleInstance, RoleAttributes>( tablePrefix + 'users_role', {
    name: {
      type: STRING(255),
      allowNull: true,
      comment: '角色名',
    },
    description: {
      type: STRING(255),
      allowNull: true,
      comment: '角色说明',
    },
    type: {
      type: STRING(255),
      allowNull: true,
      comment: '角色级别',
    },
    enabled: {
      type: ENUM(['0', '1']),
      allowNull: true,
      comment: '锁定状态，0为启用，1为禁用',
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  return role;
};
