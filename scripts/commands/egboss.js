const fs = require("fs");
module.exports = {
  config:{
  name: "farhan",
        version: "1.0.1",
        prefix: false,
  permssion: 0,
  credits: "nayan", 
  description: "Fun",
  category: "no prefix",
  usages: "farhan",
        cooldowns: 5, 
},

handleEvent: function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  const content = event.body ? event.body : '';
  const body = content.toLowerCase();
  if (body.indexOf("Farhan")==0 || body.indexOf("SHOUROV")==0 || body.indexOf("সৌরভ")==0 || body.indexOf("shourov")==0) {
    var msg = {
        body: " এ্ঁখ্ঁন্ঁ সৌরভ খু্ঁব্ঁ বি্ঁজি্ঁ 🥰❤️🥀",
        attachment: fs.createReadStream(__dirname + `//boss.`)
      }
      api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("🥰", event.messageID, (err) => {}, true)
    }
  },
  start: function({ nayan }) {

  }
} 
