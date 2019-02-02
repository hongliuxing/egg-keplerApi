import { Controller } from 'egg';

export default class LoginController extends Controller {
  loginValidateType: {
    username: {
      type: string;
      required: boolean;
      allowEmpty: boolean;
    };
    password: {
      type: string;
      required: boolean;
      allowEmpty: boolean;
      min: number;
    };
  };
  constructor(ctx: any) {
    super(ctx);

    this.loginValidateType = {
      username: {type: 'string', required: true, allowEmpty: false },
      password: {type: 'password', required: true, allowEmpty: false, min: 6},
    };
  }
  public async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    // 校验参数
    ctx.validate(this.loginValidateType);
    if (username.length === 0) {
      ctx.helper.toResponse(ctx, 404, null, '请输入用户名!');
    } else if (password.length === 0) {
      ctx.helper.toResponse(ctx, 404, null, '请输入密码!');
    } else {
      const isRegister = await this.service.users.findByName(username);
      if (isRegister !== null) {
        ctx.helper.toResponse(ctx, 404, null, '用户名已存在!');
      } else {
        const res: any = await this.service.users.create({username, password});
        const data = {
          id: res.id,
          username: res.username,
        };
        ctx.session.user = data;
        ctx.session.isLogin = true;
        const token = await this.service.actionToken.createToken(data);
        ctx.helper.toResponse(ctx, 200, null, '注册成功!', token);
      }
    }
  }
  public async login() {
    const { ctx, app} = this;
    const { username, password } = ctx.request.body;
    // 校验参数
    ctx.validate(this.loginValidateType);
    const isLogin: any = await this.service.users.findByName(username);
    let data: any;
    if (!ctx.session.isLogin) {
      if (isLogin !== null) {
        if (app.verifyBcrypt(password, isLogin.password)) {
          data = {
            id: isLogin.id,
            username: isLogin.username,
            roleid: isLogin.roleid,
          };
          ctx.session.user = data;
          ctx.session.isLogin = true;
          const token = await this.service.actionToken.createToken(data);
          ctx.helper.toResponse(ctx, 200, data, '登录成功!', token);
        } else {
          ctx.helper.toResponse(ctx, 400, null, '密码错误!');
        }
      } else {
        ctx.helper.toResponse(ctx, 404, null, '账号不存在!');
      }
    } else {
      data = {
        id: ctx.session.user.id,
        username: ctx.session.user.username,
      };
      ctx.helper.toResponse(ctx, 404, data, '重复登录!');
    }
  }
  public async isLogin() {
    const { ctx } = this;
    let data: any;
    if (ctx.session.isLogin) {
      data = {
        id: ctx.session.user.id,
        username: ctx.session.user.username,
      };
      ctx.helper.toResponse(ctx, 200, data, '登录成功!');
    } else {
      ctx.helper.toResponse(ctx, 405, null, '请先登录!');
    }
  }
  public async logout() {
    const { ctx } = this;
    if (ctx.session.isLogin) {
      ctx.session.user = null;
      ctx.session.isLogin = false;
      ctx.helper.toResponse(ctx, 200, null, '成功退出!');
    } else {
      ctx.helper.toResponse(ctx, 405, null, '请先登录!');
    }
  }
}
