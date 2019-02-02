import { Context } from 'egg';

module.exports = (controller: string, action: string) => {
  return async function hasPermission(ctx: Context, next: () => Promise<any>) {
    const method = ctx.method.toLowerCase();
    const url = ctx.url;
    const ip = ctx.ip;
    if ( ctx.session.isLogin ) {
      const uid = ctx.session.user.id;
      const roleid = ctx.session.roleid;
      const data: any = await ctx.service.permission.action({
        controller,
        action,
      });

      if ( data && data.enabled === '1' && data.role_id === roleid) {
        if (method !== 'get') {
          let info: string;
          switch (method) {
          case 'post':
            info = '添加成功!';
            break;
          case 'pul':
            info = '更新成功!';
            break;
          default:
            info = '删除成功!';
          }
          await ctx.service.syslog.create({
            uid,
            time: new Date(),
            ip,
            status: ctx.status,
            method,
            info,
            url,
          });
        }
        await next();
      } else {
        if (method !== 'get') {
          let info: string;
          switch (method) {
          case 'post':
            info = '添加失败!';
            break;
          case 'pul':
            info = '更新失败!';
            break;
          default:
            info = '删除失败!';
          }
          await ctx.service.syslog.create({
            uid,
            time: new Date(),
            ip,
            status: ctx.status,
            method,
            info,
            url,
          });
        }
        ctx.helper.toResponse(ctx, 401, null, ctx.helper.errorCode[ctx.status]);
      }
    }
  };
};
