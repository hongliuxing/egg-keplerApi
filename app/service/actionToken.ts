import { Service } from 'egg';

export default class ActionTokenService extends Service {
    async createToken(data: object) {
        const { ctx } = this;
        return ctx.app.jwt.sign(
            {
                data,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
            },
            ctx.app.config.jwt.secret,
        );
    }
    async verifyToken(token: string) {
        const { ctx } = this;
        return new Promise((resolve, _reject?: any) => {
            ctx.app.jwt.verify(token, ctx.app.config.jwt.secret, (err: any, decoded: any) => {
                const result: any = {};
                if (err) {
                    result.verify = false;
                    result.message = err.message;
                } else {
                    result.verify = true;
                    result.message = decoded;
                }
                resolve(result);
            });
        });
    }
}
