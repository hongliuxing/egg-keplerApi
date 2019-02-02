import { Controller } from 'egg';
import fs = require('fs');
import path = require('path');
import awaitWriteStream from 'await-stream-ready';
import sendToWormhole = require('stream-wormhole');
import md5 = require('js-md5');
export default class UploadController extends Controller {
  public async fetch() {
    const { ctx } = this;
    const params = await this.service.upload.fetch();
    ctx.status = 200;
    const data = {
      code: ctx.status,
      data: params,
    };
    ctx.body = data;
  }
  public async create() {
    const { ctx } = this;
    const parts = await this.ctx.multipart({ autoFields: true });
    const stream: any = parts;
    while ( stream != null ) {
      const prefixName = stream.filename.split('.')[0];
      const suffixName = stream.filename.split('.')[1];
      const prefixMd5 = md5(prefixName);
      const filename = stream.filename.toLowerCase();
      const target = path.join(this.config.baseDir, '/uploads', prefixMd5 + '.' + suffixName);
      const writeStream = fs.createWriteStream(target);
      try {
        await awaitWriteStream.write(stream.pipe(writeStream));
      } catch (err) {
        await sendToWormhole(stream);
        throw err;
      }
      const states = fs.statSync(target).size;
      const data = {
        name: filename,
        hash: prefixMd5,
        ext: suffixName,
        mime: stream.mime,
        size: states,
        url: '/uploads/' + prefixMd5 + '.' + suffixName,
        provider: ctx.session.user.username,
      };
      await this.service.upload.create(data);
      ctx.status = 200;
      ctx.body = {
        code: ctx.status,
        data,
      };
    }
  }
  public async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    const upload = await this.service.upload.destroy(id);
    let data: any;
    if (upload) {
      data = {
        code: 200,
        msg: '删除成功!',
      };
    } else {
      data = {
        code: 404,
        msg: '此文件不存在!',
      };
    }
    ctx.body = data;
  }
}
