import { Service } from 'egg';

export default class UploadService extends Service {
    async fetch() {
      const { model } = this.ctx;
      const data = await model.Upload.findAll();
      return data;
    }
    async find(name: string) {
      const { model } = this.ctx;
      const data = await model.Upload.findOne({
        where: {
          name,
        },
      });
      return data;
    }
    async create(params: any) {
      const { model } = this.ctx;
      const data = await model.Upload.findOrCreate({
        where: {
          ...params,
        },
      });

      return data;
    }
    async destroy(id: number) {
      const { model } = this.ctx;
      const data = await model.Upload.destroy({
        where: {
          id,
        },
      });
      return data;
    }
  }
