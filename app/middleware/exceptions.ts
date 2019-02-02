import { Context } from 'egg';

export default function exceptionsMiddleware() {
    return async (ctx: Context, next: () => Promise<any>) => {
        try {
            // 无错误则直接放行
            await next();
        } catch (error) {
            // 状态码
            const statusCode = error.status || 500;
            // 错误提示
            const statusMessage = error.message || 'error';
            // 响应返回
            ctx.body = {
                code: statusCode,
                msg: statusMessage,
            };
        }
    };
};
