/**
 # bilibili
 > 代码已同时兼容 Surge & QuanX, 使用同一份签到脚本即可
 > https://github.com/chavyleung/scripts
 ## 配置 (QuanX)
 ```properties
 [mitm]
 hostname = api.bilibili.com
 [rewrite_local]
 ^https:\/\/api.bilibili.com\/pgc\/player\/api\/playurl url script-response-body bilibili.unblock.playurl.min.js
 ^https:\/\/api.bilibili.com\/pgc\/view\/app\/season url script-response-body bilibili.unblock.season.min.js
 ```
 ## 配置 (Surge)
 ```properties
 [MITM]
 hostname = api.bilibili.com
 [Script]
 http-response https://api.bilibili.com/pgc/player/api/playurl requires-body=1,max-size=0,script-path=bilibili.unblock.playurl.min.js
 http-response https://api.bilibili.com/pgc/view/app/season requires-body=1,max-size=0,script-path=bilibili.unblock.season.min.js
 ## 感谢
 [@onewayticket255](https://github.com/onewayticket255)
 ```
 */
function init() {
  return isSurge = (() => void 0 !== this.$httpClient), isQuanX = (() => void 0 !== this.$task), isJSON = (e => "object" == typeof JSON.parse(e)), getdata = (e => isSurge() ? $persistentStore.read(e) : isQuanX() ? $prefs.valueForKey(e) : void 0), setdata = ((e, t) => isSurge() ? $persistentStore.write(e, t) : isQuanX() ? $prefs.setValueForKey(e, t) : void 0), msg = ((e, t, i) => {
    isSurge() && $notification.post(e, t, i), isQuanX() && $notify(e, t, i)
  }), log = (e => console.log(e)), get = ((e, t) => {
    isSurge() && $httpClient.get(e, t), isQuanX() && (e.method = "GET", $task.fetch(e).then(e => t(null, {}, e.body)))
  }), post = ((e, t) => {
    isSurge() && $httpClient.post(e, t), isQuanX() && (e.method = "POST", $task.fetch(e).then(e => t(null, {}, e.body)))
  }), done = ((e = {}) => {
    $done(e)
  }), {
    isSurge: isSurge,
    isQuanX: isQuanX,
    isJSON: isJSON,
    msg: log, // 不弹出通知
    log: log,
    getdata: getdata,
    setdata: setdata,
    get: get,
    post: post,
    done: done
  }
}

const chavy = init(), querystr = $request.url.split("?")[1], queryparams = {};
if (querystr) for (queryparam of querystr.split("&")) queryparams[queryparam.split("=")[0]] = queryparam.split("=")[1];
const cid = queryparams.cid ? queryparams.cid : "", ep_id = queryparams.ep_id ? queryparams.ep_id : "",
  url = `https://bilibili.mlyx.workers.dev/?cid=${cid}&ep_id=${ep_id}`;
chavy.get({url: url}, (e, t, i) => {
  try {
    let e = JSON.parse(i);
    0 === e.code ? (chavy.msg("bilibili", "\u64ad\u653e\u65b9\u5f0f: \u5927\u4f1a\u5458", "\u8bf4\u660e: \u83b7\u53d6\u8fde\u63a5\u4fe1\u606f"), chavy.done({body: i})) : (chavy.msg("bilibili", "\u64ad\u653e\u65b9\u5f0f: \u666e\u901a\u4f1a\u5458", "\u8bf4\u660e: \u83b7\u53d6\u8fde\u63a5\u4fe1\u606f"), chavy.done())
  } catch (e) {
    chavy.done()
  }
});