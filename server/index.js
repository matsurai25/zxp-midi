'use strict'

const app    = require('http').createServer();
const io     = require('socket.io')(app);
const moment = require('moment');
const Korg   = require('./korg.js');
const korg   = new Korg();

// サーバー化
console.log("listen... http://localhost:39393");
app.listen(39393);
io.on('connection', function(socket) {
  // 接続された
  logger('connection established');
});


let timer;
// 全イベントを聴く
korg.on('*', function(event, value) {
  // フェーダーのイベントが送られ過ぎないように、setTimeoutで
  // イベント後一定期間内に再度イベントがった場合はそのイベントを無視するようにしている。
  if (timer !== false) {
      clearTimeout(timer); // setTimeoutを解除
  }
  timer = setTimeout(function() {
    logger(`${event}::${value}`)
    // webSocketでイベントを送信
    io.emit('midi-event', {
      time:moment().format('HH:mm:ss'),
      type:event.split(':')[0],
      channel:event.split(':')[1],
      value:value
    });
  }, 50);
})

 // ログを見やすく
var logger = function(str) {
  // momentを使うと日時処理がしやすい
  let time = moment().format('YYYY-MM-DD HH:mm:ss');
  let logline = `${time} - ${str}`;
  console.log(logline);
};
