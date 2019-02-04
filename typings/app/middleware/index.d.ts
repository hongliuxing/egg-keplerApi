// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportExceptions from '../../../app/middleware/exceptions';
import ExportIsAuth from '../../../app/middleware/isAuth';
import ExportIsPermission from '../../../app/middleware/isPermission';

declare module 'egg' {
  interface IMiddleware {
    exceptions: typeof ExportExceptions;
    isAuth: typeof ExportIsAuth;
    isPermission: typeof ExportIsPermission;
  }
}
