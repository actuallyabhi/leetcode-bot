const { Telegraf } = require("telegraf")
const bot = new Telegraf(process.env.BOT_TOKEN)

// Common function to handle topic selection
function handleTopicSelection(ctx, topic) {
  console.log(`User selected ${topic}`);
  try {
    ctx.reply(`Great choice! You selected ${topic}. Thanks!`);
  } catch (e) {
    console.error(`Error in ${topic} handler:`, e);
  }
}

bot.start(ctx => {
  console.log("Received /start command");
  try {
    const welcomeMessage = "Welcome to Leetcode bot! Please select a topic:";
    const options = {
      reply_markup: {
        keyboard: [["Array", "Linked List"]],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    };
    return ctx.reply(welcomeMessage, options);
  } catch (e) {
    console.error("error in start action:", e);
    return ctx.reply("Error occurred");
  }
})

bot.hears(/.*/, ctx => {
  const selectedOption = ctx.message.text;
  handleTopicSelection(ctx, selectedOption);
});

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("error in handler:", e);
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" };
  }
}
