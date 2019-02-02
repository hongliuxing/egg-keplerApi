import { Controller } from 'egg';

export default class UserPermissionController extends Controller {
  public async fetch() {
    const { ctx } = this;
    const permission = await this.service.permission.fetch();
    const data = {
        code: 200,
        data: permission,
    };
    ctx.body = data;
  }
  public async create() {
    const { ctx } = this;
    const permission = await this.service.permission.create({});
    const data: any = permission;
    ctx.body = data;
  }
  public async update(params: any) {
    const { ctx } = this;
    const data = await this.service.permission.update(params);
    ctx.body = data;
  }
}
