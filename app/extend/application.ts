import * as bcryptjs from 'bcryptjs';

const extendApplication = {
  /**
   * bcryptjs 加密
   *
   * @param {string} value 需要加密的值
   * @param {number} salt 加密的强度 0 - 12
   * @returns string
   */
  createBcrypt (value: string, salt: number = 10) {
    return bcryptjs.hashSync(value, bcryptjs.genSaltSync(salt));
  },

  /**
   * 比对输入值与已加密值是否一致
   *
   * @param {string} value 输入值
   * @param {string} hash 已加密的 hash 值
   * @returns boolean
   */
  verifyBcrypt (value: string, hash: string) {
    return bcryptjs.compareSync(value, hash);
  },
};

export default extendApplication;
