import { Service } from 'egg';

export default class UserPermissionService extends Service {
    async fetch() {
      const { model } = this.ctx;
      const data = await model.Permission.findAll();
      return data;
    }

    async find(roleid: number) {
      const { model } = this.ctx;
      const data = await model.Permission.findOne({
        where: {
          roleid,
        },
      });
      return data;
    }

    async action(params: any) {
      const { model } = this.ctx;
      const data = await model.Permission.findOne({
        where: {
          ...params,
        },
      });
      return data;
    }

    async create(params: any) {
      const { model } = this.ctx;
      const data = await model.Permission.findOrCreate({
        where: {
          ...params,
        },
      });
      return data;
    }

    async update(params: any) {
      const { model } = this.ctx;
      const data = await model.Permission.update(
        {...params},
        {
          where: {
            id: params.id,
          },
        },
      );
      return data;
    }

    async destroy(id: number) {
      const { model } = this.ctx;
      const data = await model.Permission.destroy({
        where: {
          id,
        },
      });
      return data;
    }
  }
