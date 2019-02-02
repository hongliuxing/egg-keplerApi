import { Application } from 'egg';
import { Instance } from 'sequelize';

type enabled = '0' | '1';

export interface UserAttributes {
    username: string;
    nickname: string;
    password: string;
    email: string;
    avatar: string;
    level: number;
    enabled: enabled;
}

export interface UserInstance extends Instance<UserAttributes>, UserAttributes {
    enabled: enabled;
    createdAt: Date;
    updatedAt: Date;
}

export default (app: Application) => {
    const {
        STRING,
        ENUM,
        INTEGER,
    } = app.Sequelize;
    const tablePrefix = app.config.tablePrefix;

    const user = app.model.define<UserInstance, UserAttributes>( tablePrefix + 'users', {
        username: {
            type: STRING(32),
            unique: true,
            allowNull: false,
            comment: '用户名',
        },
        nickname: {
            type: STRING(30),
            allowNull: true,
            comment: '真实姓名',
        },
        password: {
            type: STRING(255),
            allowNull: false,
            comment: '密码',
        },
        email: {
            type: STRING(64),
            unique: true,
            allowNull: true,
            comment: '邮箱地址',
        },
        avatar: {
            type: STRING(150),
            allowNull: true,
            comment: '头像',
        },
        level: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 100,
            comment: '用户级别',
        },
        enabled: {
            type: ENUM(['0', '1']),
            allowNull: true,
            comment: '锁定状态，0为启用，1为禁用',
        },
    }, {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            // 修改器
            setterMethods: {
                password(value: any) {
                    // 加密密码
                    (this as any).setDataValue('password', app.createBcrypt(value));
                },
            },

        },
    );

    user.associate = () => {
        user.belongsTo(app.model.Role, { as: 'role' });
    };
    return user;
};
