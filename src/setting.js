// 根据环境修改标题
if (ENV == 'dev') {
  document.title += '-dev';
} else {
  document.title += '-prod';
}


// 设置草稿的localStore
if (!localStorage.getItem("RTU_DRAFT")) {
  localStorage.setItem("RTU_DRAFT", "{}");
}