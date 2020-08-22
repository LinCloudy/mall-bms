// 处理请求
export const httpMixin = {
  methods: {
    showErrorMessage(msg) {
      this.$message({
        showClose: true,
        type: 'error',
        message: msg,
        duration: 0
      });
    },
    showSuccessMessage(msg) {
      this.$message({
        type: 'success',
        message: msg,
        duration: 2000
      });
    },
    handleResponse(res, callback) {
      if (res.meta.status === 200 || res.meta.status === 201) {
        this.$message({
          message: res.meta.msg ? res.meta.msg : '操作成功',
          type: 'success',
          duration: 2000,
          onClose: () => {
            if (callback && typeof callback === 'function') {
              callback();
            }
          }
        });
      } else {
        if (res.meta.msg) {
          this.showErrorMessage(res.meta.msg);
        } else {
          this.showErrorMessage('操作失败');
        }
      }
    }
  }
};
