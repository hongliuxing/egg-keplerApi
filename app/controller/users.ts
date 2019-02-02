import { Controller } from 'egg';

export default class UsersController extends Controller {
    userValidateType: {
        username: {
            type: string;
            required: boolean;
            allowEmpty: boolean;
        };
        password: { type: string;
            required: boolean;
            allowEmpty: boolean;
            min: number;
        };
    };
    constructor(ctx: any) {
        super(ctx);

        this.userValidateType = {
            username: { type: 'string', required: true, allowEmpty: false },
            password: { type: 'password', required: true, allowEmpty: false, min: 6 },
        };
    }
    public async fetch() {
        const { ctx } = this;
        const user = await this.service.users.fetch();
        const data = {
            code: 200,
            data: user,
        };
        ctx.body = data;
    }
    public async index() {
        const { ctx } = this;
        const id = ctx.params.id;
        const user = await this.service.users.find(id);
        let data: any;
        if (user) {
            data = {
                code: 200,
                data: user,
            };
        } else {
            data = {
                code: 404,
                msg: '用户不存在!',
            };
        }
        ctx.body = data;
    }
    public async create() {
        const { ctx, app } = this;
        const { username, password } = ctx.request.body;
        // 校验参数
        ctx.validate(this.userValidateType);
        let data: any;
        if (username.length === 0) {
            data = {
                code: 405,
                msg: '请输入用户名!',
            };
        } else if (password.length === 0) {
            data = {
                code: 405,
                msg: '请输入密码!',
            };
        } else {
            const findByName = await this.service.users.findByName(username);
            if (findByName !== null) {
                data = {
                    code: 405,
                    msg: '用户名已存在!',
                };
            } else {
                const create = await this.service.users.create({ username, password: app.createBcrypt(password) });
                if (create) {
                    data = {
                        status: 1,
                        code: 200,
                        msg: '添加成功!',
                    };
                } else {
                    data = {
                        status: 1,
                        code: 200,
                        msg: '添加失败!',
                    };
                }
            }
        }
        ctx.body = data;
    }
    public async update() {
        const { ctx } = this;
        const id = ctx.params.id;
        const { username, password } = ctx.request.body;
        // 校验参数
        ctx.validate(this.userValidateType);
        let data: any;
        const findByName = await this.service.users.findByName(username);
        if (findByName !== null) {
            const req: any = {
                id,
                username,
                password,
            };
            const updateUserInfo = await this.service.users.update(req);
            if (updateUserInfo) {
                data = {
                    code: 200,
                    msg: '更新成功!',
                };
            } else {
                data = {
                    code: 404,
                    msg: '更新失败!',
                };
            }
        } else {
            data = {
                code: 400,
                msg: '用户不存在!',
            };
        }
        ctx.body = data;
    }
    public async destroy() {
        const { ctx } = this;
        const id = ctx.params.id;
        const user = await this.service.users.destroy(id);
        let data: any;
        if (user) {
            data = {
                code: 200,
                msg: '删除成功!',
            };
        } else {
            data = {
                code: 404,
                msg: '用户不存在!',
            };
        }
        ctx.body = data;
    }
}
