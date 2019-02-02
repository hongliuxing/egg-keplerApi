import { Application } from 'egg';

export default function User (app: Application) {
  const { STRING, ENUM } = app.Sequelize;
  const tablePrefix = app.config.tablePrefix;
  // 创建模型
  const permission = app.model.define( tablePrefix + 'users_permission', {
    type: {
      type: STRING(32),
      allowNull: true,
      comment: '类型名',
    },
    controller: {
      type: STRING(32),
      allowNull: true,
      comment: '控制层',
    },
    action: {
      type: STRING(32),
      allowNull: true,
      comment: '行为层',
    },
    enabled: {
      type: ENUM(['0', '1']),
      allowNull: true,
      comment: '锁定状态，0为启用，1为禁用',
    },
    policy: {
      type: STRING(32),
      allowNull: true,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  return permission;
};
