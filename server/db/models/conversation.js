const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {});

// when the userConversation.js is created then we don't need to find user1Id, user2Id anymore.

module.exports = Conversation;
