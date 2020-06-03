/**
 * code        是否的成功http code
 * successInfo 成功的提示消息
 * errorInfo   错误的提示消息
 */
export function alertMessage(code, successInfo, errorInfo) {
  if (code == 200) {
    alert(successInfo);
  } else {
    alert(errorInfo);
  }
}

// export default {
//   alertMessage
// }