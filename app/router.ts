import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const apiPrefix = app.config.apiPrefix;
  // 首页提示
  router.get(
    '/',
    controller.home.index,
  );
  // 登录
  router.post(
    apiPrefix + '/login',
    controller.login.login,
  );
  router.get(
    apiPrefix + '/isLogin',
    controller.login.isLogin,
  );
  router.get(
    apiPrefix + '/logout',
    controller.login.logout,
  );
  router.post(
    apiPrefix + '/register',
    controller.login.register,
  );
  // 用户
  router.get(
    apiPrefix + '/user',
    middleware.isPermission('UsersController', 'fetch'),
    controller.users.fetch,
  );
  router.get(
    apiPrefix + '/user/:id',
    middleware.isPermission('UsersController', 'index'),
    controller.users.index,
  );
  router.post(
    apiPrefix + '/user',
    middleware.isPermission('UsersController', 'create'),
    controller.users.create,
  );
  router.put(
    apiPrefix + '/user/:id',
    middleware.isPermission('UsersController', 'update'),
    controller.users.update,
  );
  router.delete(
    apiPrefix + '/user/:id',
    middleware.isPermission('UsersController', 'destroy'),
    controller.users.destroy,
  );
  // 角色
  router.get(
    apiPrefix + '/role',
    middleware.isPermission('RoleController', 'fetch'),
    controller.role.fetch,
  );
  router.get(
    apiPrefix + '/role/:id',
    middleware.isPermission('RoleController', 'index'),
    controller.role.index,
  );
  router.post(
    apiPrefix + '/role',
    middleware.isPermission('RoleController', 'create'),
    controller.role.create,
  );
  router.put(
    apiPrefix + '/role/:id',
    middleware.isPermission('RoleController', 'update'),
    controller.role.update,
  );
  router.delete(
    apiPrefix + '/role/:id',
    middleware.isPermission('RoleController', 'destroy'),
    controller.role.destroy,
  );
  // 权限
  router.get(
    apiPrefix + '/permission',
    middleware.isPermission('PermissionController', 'fetch'),
    controller.permission.fetch,
  );
  router.post(
    apiPrefix + '/permission',
    middleware.isPermission('PermissionController', 'create'),
    controller.permission.create,
  );
  router.put(
    apiPrefix + '/permission',
    middleware.isPermission('PermissionController', 'update'),
    controller.permission.update,
  );
  // 文件
  router.get(
    apiPrefix + '/upload',
    middleware.isPermission('UploadController', 'fetch'),
    controller.upload.fetch,
  );
  router.post(
    apiPrefix + '/upload',
    middleware.isPermission('UploadController', 'create'),
    controller.upload.create,
  );
  router.delete(
    apiPrefix + '/upload/:id',
    middleware.isPermission('UploadController', 'destroy'),
    controller.upload.destroy,
  );
};
