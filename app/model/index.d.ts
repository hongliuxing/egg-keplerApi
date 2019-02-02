import * as sequelize from 'sequelize';
import { Model, Sequelize } from 'sequelize';
import { UsersAttributes, UsersInstance } from './users';
import { RoleAttributes, RoleInstance } from './role';
import { PermissionAttributes, PermissionInstance } from './permission';
import { SysLogAttributes, SysLogInstance } from './syslog';
import { UploadAttributes, UploadInstance } from './upload';

interface Models {
    Users: Model<UsersInstance, UsersAttributes>;
    Role: Model<RoleInstance, RoleAttributes>;
    Permission: Model<PermissionLogInstance, PermissionLogAttributes>;
    Upload: Model<UploadInstance, UploadAttributes>;
    Syslog: Model<SysLogInstance, SysLogAttributes>;
}

declare module 'egg' {
    export interface Application {
        Sequelize: typeof sequelize;
        model: Sequelize & Models;
    }
}

declare module 'sequelize' {
    interface Model<TInstance, TAttributes> {
        associate: () => any;
    }
}