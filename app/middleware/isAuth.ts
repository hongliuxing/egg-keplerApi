import { Context } from 'egg';

export default function isAuthMiddleware() {
  /**
    * 该中间件无须验证的路由数组
    */
  const except: string[] = [
    `/`,
    `/api/login`,
    `/api/register`,
    `/api/logout`
  ];
  return async (ctx: Context, next: () => Promise<any>) => {
    // 判断当前访问路径是否是无须验证的路由数组
    if (except.includes(ctx.path)) {
      return next()
    }
    // 获取 header 携带的 authorization 头
    let token = '';
    if (
      ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = ctx.headers.authorization.split(' ')[1];
    } else if (ctx.query.token) {
      token = ctx.query.token;
    } else if (ctx.request.body.token) {
      token = ctx.request.body.token;
    }
    if (!token) {
      ctx.helper.toResponse(ctx, 422, null, '错误的 Token!');
      return;
    }

    if(token){
      try {
        // 验证 token 是否合法有效，并将解密后的 sub 数据挂载到 request 的 body 的 jwt_sub 中，方便后续使用
        ctx.request.body.jwt_sub = await ctx.service.actionToken.getSub(token);
        // 放行
        return next();
      } catch (error) {
        //

      }
    }

    await ctx.helper.toResponse(ctx, 405, null, '请先登录!');
  };
};
