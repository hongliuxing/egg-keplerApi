// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPermission from '../../../app/model/permission';
import ExportRole from '../../../app/model/role';
import ExportSyslog from '../../../app/model/syslog';
import ExportUpload from '../../../app/model/upload';
import ExportUsers from '../../../app/model/users';

declare module 'sequelize' {
  interface Sequelize {
    Permission: ReturnType<typeof ExportPermission>;
    Role: ReturnType<typeof ExportRole>;
    Syslog: ReturnType<typeof ExportSyslog>;
    Upload: ReturnType<typeof ExportUpload>;
    Users: ReturnType<typeof ExportUsers>;
  }
}
