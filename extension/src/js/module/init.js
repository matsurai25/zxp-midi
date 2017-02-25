const Vue = require('vue/dist/vue.common.js'); // Vue
const io = require('socket.io-client/dist/socket.io.js');

module.exports = () => {
  const socket = io('http://localhost:39393');
  var app = new Vue({
    el: '#app',
    data: {
      messages: []
    },
    created: function() {
      socket.on('midi-event', (data) => {
        console.log(data);
        this.$data.messages.unshift(data);
        let script = `
          function getComp() {
            for (var i = 1; i <= app.project.items.length; i++) {
              if (app.project.items[i].name == '_slider') {
                return app.project.items[i];
              }
            }
            return false;
          }
          getComp().layer('slider').effect("${data.type}:${data.channel}")(1).setValue(${data.value * 100})
        `;
        CSInterface.evalScript(script);
      });
    },
    methods: {
    }
  });


};
