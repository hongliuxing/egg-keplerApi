import { Context } from 'egg';

export default function isLoginMiddleware() {
  return async (ctx: Context, next: () => Promise<any>) => {
    if (
      ctx.url === '/' ||
      ctx.url === '/api/login' ||
      ctx.url === '/api/register' ||
      ctx.session.isLogin) {
      await next();
    } else {
      ctx.helper.toResponse(ctx, 405, null, '请先登录!');
    }
  };
};
