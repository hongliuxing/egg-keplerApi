// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportActionToken from '../../../app/service/actionToken';
import ExportCache from '../../../app/service/cache';
import ExportPermission from '../../../app/service/permission';
import ExportRole from '../../../app/service/role';
import ExportSyslog from '../../../app/service/syslog';
import ExportUpload from '../../../app/service/upload';
import ExportUsers from '../../../app/service/users';

declare module 'egg' {
  interface IService {
    actionToken: ExportActionToken;
    cache: ExportCache;
    permission: ExportPermission;
    role: ExportRole;
    syslog: ExportSyslog;
    upload: ExportUpload;
    users: ExportUsers;
  }
}
