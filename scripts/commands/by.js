const fs = require("fs");

module.exports = {
  config: {
    name: "f11",
    version: "1.0.1",
    prefix: false,
    permission: 0, // Fixed typo in "permission"
    credits: "nayan",
    description: "Fun",
    category: "no prefix",
    usages: "by",
    cooldown: 5, // Changed "cooldowns" to "cooldown" for consistency
  },

  handleEvent: function({ api, event }) { // Removed unnecessary parameters
    const { threadID, messageID, body } = event; // Destructure event directly
    const lowerCaseBody = body.toLowerCase(); // Convert to lowercase once

    // Simplified condition using Array.some()
    if (["by","bye","By","Bye","good bye","Allah hafiz","allah hafiz",].some(keyword => lowerCaseBody.startsWith(keyword))) {
      const msg = {
        body: "আবার কথা হবে 🥰.\n\n~👉বাই তো বললে সোজা অফলাইনে যাও, মেয়ে হলে অন্য কারো ইনবক্সে যেও না। গেলে আমার বস্ 𒄬𓆩๛⃝সৌরভ‣᭄𓆪 এর ইনবক্সে যাও,😁🙈 .👉আর ছেলে হলে দূরে যাইয়া মর, 😼🥵- যেকোনো তথ্যের জন্য আমার id তে নক করতে পারেন 👇\nhttps://www.facebook.com/broken.shourov.ss?",
        attachment: fs.createReadStream(__dirname + `/cache/farhan1.mp4`)
      };

      api.sendMessage(msg, threadID, messageID);
      api.setMessageReaction("🥀", messageID, (err) => {}, true); // Fixed event.messageID to messageID
    }
  },

  start: function() { // Removed unnecessary parameters
    // No code here currently
  }
};
