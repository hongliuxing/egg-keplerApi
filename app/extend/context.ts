const extendContext = {
    /**
    * 抛出自定义异常
    *
    * @param {number} code 错误状态码
    * @param {string} message 错误提示
    * @throws {Error}
    */
    abort(code: number, message: string = 'error') {
        const error: any = new Error(message);
        error.status = code;
        error.name = 'AppFlowException';

        throw error;
    },
};

export default extendContext;
