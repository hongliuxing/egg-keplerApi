// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportExceptions from '../../../app/middleware/exceptions';
import ExportIsLogin from '../../../app/middleware/isLogin';
import ExportPermission from '../../../app/middleware/permission';

declare module 'egg' {
  interface IMiddleware {
    exceptions: typeof ExportExceptions;
    isLogin: typeof ExportIsLogin;
    permission: typeof ExportPermission;
  }
}
