// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportLogin from '../../../app/controller/login';
import ExportPermission from '../../../app/controller/permission';
import ExportRole from '../../../app/controller/role';
import ExportUpload from '../../../app/controller/upload';
import ExportUsers from '../../../app/controller/users';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    login: ExportLogin;
    permission: ExportPermission;
    role: ExportRole;
    upload: ExportUpload;
    users: ExportUsers;
  }
}
