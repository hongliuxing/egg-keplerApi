import { Application } from 'egg';

export default (app: Application) => {
  // 自动根据 model 定义自动生成数据表
  if (app.config.env === 'local') {
    // app.beforeStart(async () => {
    //   await app.model.sync({ force: false });
    // });
  }
};
