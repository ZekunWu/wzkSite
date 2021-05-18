const shell = require('shelljs');
const packageJson = require('./package.json');

new Promise((res, rej) => {
  /* 提示编译成功 */
  shell.echo('编译成功');

  /* 执行提交更新与推送 */
  if (!shell.which('git')) {
    rej(new Error('您当前的运行环境中缺少 Git'));
  } else if (
    !shell.exec(`git add . && git commit -m "build: ${packageJson.version} 版本" && git tag "${packageJson.version}"`)
      .code
  ) {
    if (!shell.exec(`git push && git push origin "${packageJson.version}"`).code) {
      shell.echo('成功发布版本');
      res();
    } else {
      rej(new Error('推送版本失败'));
    }
  } else {
    rej(new Error('提交改动文件失败'));
  }
}).catch((error) => {
  throw error;
});
