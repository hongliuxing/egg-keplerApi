import { Service } from 'egg';

export default class UserRoleService extends Service {
    async fetch() {
      const { model } = this.ctx;
      const data = await model.Role.findAll();
      return data;
    }

    async find(id: number) {
      const { model } = this.ctx;
      const data = await model.Role.findOne({
        where: {
          id,
        },
      });
      return data;
    }

    async create(params: any) {
      const { model } = this.ctx;
      const data = await model.Role.findOrCreate({
        where: {
          ...params,
        },
      });
      return data;
    }

    async update(params: any) {
      const { model } = this.ctx;
      const data = await model.Role.update(
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
      const data = await model.Role.destroy({
        where: {
          id,
        },
      });
      return data;
    }
  }
