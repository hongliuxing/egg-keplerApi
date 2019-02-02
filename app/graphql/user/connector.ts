import { Context } from 'egg';
const DataLoader = require('dataloader')

export default class UserConnector {
    private loader: any;
    private ctx: any;

    constructor(ctx: Context) {
        this.ctx = ctx
        this.loader = new DataLoader(this.fetch.bind(this))
    }

    fetch(ids: number) {
        const users = this.ctx.app.model.users.findAll({
            where: {
                id: {
                    $in: ids
                }
            }
        }).then((us: any) => us.map((u: any) => u.toJSON()))
        return users
    }

    fetchByIds(ids: number) {
        return this.loader.loadMany(ids)
    }

    fetchById(id: number) {
        return this.loader.load(id)
    }
}
