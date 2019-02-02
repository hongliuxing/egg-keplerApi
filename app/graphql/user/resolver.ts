import { Context } from 'egg';
export default {
    Query: {
      user(_:any, { id }: any, ctx: Context) {
        return ctx.connector.user.fetchById(id)
      },
    }
  }
  