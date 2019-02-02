import { Controller } from 'egg';

export default class RoleController extends Controller {
  roleValidateType: {
    name: {
      type: string;
      required: boolean;
      allowEmpty: boolean;
    };
    description: {
      type: string;
      required: boolean;
      allowEmpty: boolean;
    };
    type: {
      type: string;
      required: boolean;
      allowEmpty: boolean;
    };
  };
  constructor(ctx: any) {
    super(ctx);
    this.roleValidateType = {
      name: { type: 'string', required: true, allowEmpty: false },
      description: { type: 'string', required: true, allowEmpty: false },
      type: { type: 'string', required: true, allowEmpty: false },
    };

  }
  public async fetch() {
    const ctx = this.ctx;
    const data = await this.service.role.fetch();
    ctx.body = data;
  }
  public async index() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const data = await this.service.role.find(id);
    ctx.body = data;
  }
  public async create() {
    const ctx = this.ctx;
    // 校验参数
    ctx.validate(this.roleValidateType);
    const data = await this.service.role.create(ctx.params);
    ctx.body = data;
  }
  public async update() {
    const ctx = this.ctx;
    // 校验参数
    ctx.validate(this.roleValidateType);
    const data = await this.service.role.update(ctx.params);
    ctx.body = data;
  }
  public async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const data = await this.service.role.destroy(id);
    ctx.body = data;
  }
}
