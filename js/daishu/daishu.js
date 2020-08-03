let TAG = "袋鼠下载"
let obj = JSON.parse($response.body);

(function () {
  // 判断json结构是否已经改变
  if (!obj.user_info || !obj.user_info.userUuid) {
    $notify(TAG, "脚本有错误", "任务列表的json结构不合，可能需要适配");
    return
  }
  console.log(`${TAG} 原始金币数量：${obj.user_info.lastPoints}`);
  obj.user_info.lastPoints = 800000;
})();

$done({body: JSON.stringify(obj)});