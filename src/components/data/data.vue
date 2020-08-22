<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">文件上传</el-breadcrumb-item>
      <el-breadcrumb-item>测试</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :before-upload="handleBeforeUpload"
        :on-progress="handleUploading"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :on-change="handleChange"
        :on-preview="handlePreview"
        :before-remove="beforeRemove"
        :on-remove="handleRemove"
        multiple
        :limit="5"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    };
  },
  methods: {
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传
    handleBeforeUpload(file) {
      console.log('BeforeUpload---' + JSON.stringify(file));
    },
    // 文件上传时的钩子
    handleUploading(event, file, fileList) {
      console.log('Uploading---' + file);
      const fileNameList = fileList.reduce((acc, cur) => {
        acc.push(cur.name);
        return acc;
      }, []);
      fileNameList.pop();
      if (fileNameList.indexOf(file.name) !== -1) {
        return this.$message({
          message: `当前上传的 ${file.name}文件已上传，请重新选择`,
          type: 'warning',
          duration: 2000,
          onClose: () => {
            fileList.pop();
          }
        });
      }
    },
    // 文件上传成功时的钩子
    handleUploadSuccess(response, file, fileList) {
      console.log('UploadSuccess---' + file);
    },
    // 文件上传失败时的钩子
    handleUploadError(err, file, fileList) {
      console.log('UploadError---' + file);
      console.log(err);
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      console.log('Change---' + JSON.stringify(file));
      //   const fileNameList = fileList.reduce((acc, cur) => {
      //     acc.push(cur.name);
      //     return acc;
      //   }, []);
      //   fileNameList.pop();
      //   console.log('Change file---' + JSON.stringify(fileNameList));
      //   if (fileNameList.indexOf(file.name) !== -1) {
      //     return this.$message({
      //       message: `当前上传的 ${file.name}文件已上传，请重新选择`,
      //       type: 'warning',
      //       duration: 2000,
      //       onClose: () => {
      //         fileList.pop();
      //       }
      //     });
      //   }
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      console.log('Preview---' + file);
    },
    // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除
    beforeRemove(file, fileList) {
      return this.$msgbox.confirm(`确定移除 ${file.name}？`, '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      });
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}
</style>
