import { Service } from 'egg';

export default class SysLogService extends Service {
    async fetch() {
      const { model } = this.ctx;
      const data = await model.Syslog.findAll();
      return data;
    }

    async find(id: number) {
      const { model } = this.ctx;
      const data = await model.Syslog.findOne({
        where: {
          id,
        },
      });
      return data;
    }

    async create(params: any) {
      const { model } = this.ctx;
      const data = await model.Syslog.findOrCreate({
        where: {
          ...params,
        },
      });
      return data;
    }
  }
