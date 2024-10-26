// file created by Mohammad Nayan 
// Don't change credit

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { tikdown } = require("nayan-media-downloader");

module.exports = {
  config: {
    name: "tik",
    version: "2.0.1",
    permission: 0,
    credits: "Nayan",
    description: "Download video from tiktok",
    prefix: true,
    category: "user",
    usages: "link",
    cooldowns: 5,
    dependencies: {
      'nayan-server': '',
    }
  },

  start: async function ({ nayan, events, args }) {
    const { messageID, threadID } = events;
    
    nayan.setMessageReaction("😘", messageID, () => {}, true);
    nayan.sendTypingIndicator(threadID, true);

    const content = args.join(" ");
    if (!content) {
      return nayan.reply("[ ! ] Please provide a link.", threadID, messageID);
    }

    nayan.reply(`𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐈𝐍𝐆 𝐕𝐈𝐃𝐄𝐎 𝐅𝐎𝐑 𝐘𝐎𝐔\n\n𝐏𝐋𝐄𝐀𝐒𝐄 𝐖𝐀𝐈𝐓...`, threadID, (err, info) => {
      setTimeout(() => { nayan.unsendMessage(info.messageID); }, 20000);
    });

    try {
      const res = await tikdown(content);
      const { video, images, title } = res.data;
      const displayTitle = title || "No Title";

      const imgData = [];
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const imgPath = path.join(__dirname, `/cache/image_${i + 1}.jpg`);
          const imgBuffer = (await axios.get(images[i], { responseType: 'arraybuffer' })).data;
          fs.writeFileSync(imgPath, Buffer.from(imgBuffer, 'utf-8'));
          imgData.push(fs.createReadStream(imgPath));
        }

        await nayan.reply({
          body: `TITLE: ${displayTitle}`,
          attachment: imgData
        }, threadID, messageID);
        for (let ii = 1; ii < parseInt(images.length); ii++) {
          fs.unlinkSync(__dirname + `/cache/${ii}.jpg`);
        }
      } else if (video) {
        const videoStream = (await axios.get(video, { responseType: "stream" })).data;
        await nayan.reply({
          body: `TITLE: ${displayTitle}`,
          attachment: videoStream
        }, threadID, messageID);
      }

    } catch (err) {
      console.error("Error:", err);
      nayan.reply("Error processing your request. Please try again.", threadID, messageID);
    }
  }
};
