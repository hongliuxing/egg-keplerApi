import { Service } from 'egg';

export default class UsersService extends Service {
    async fetch() {
      const { model } = this.ctx;
      const data = await model.Users.findAll();
      return data;
    }

    async find(id: number) {
      const { model } = this.ctx;
      const data = await model.Users.findOne({
        where: {
          id,
        },
      });
      return data;
    }

    async findByName(username: string) {
      const { model } = this.ctx;
      const data = await model.Users.findOne({
        where: {
          username,
        },
      });
      return data;
    }

    async create(params: any) {
      const { model } = this.ctx;
      const data = await model.Users.findOrCreate({
        where: {
          ...params,
        },
      });
      return data;
    }

    async update(params: any) {
      const { model } = this.ctx;
      const data = await model.Users.update(
        {...params},
        {
          where: {
            id: params.id,
          },
        },
      );
      return data;
    }

    async destroy(uid: number) {
      const { model } = this.ctx;
      const data = await model.Users.destroy({
        where: {
          id: uid,
        },
      });
      return data;
    }
  }
