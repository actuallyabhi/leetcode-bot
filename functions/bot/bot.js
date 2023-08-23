const { Telegraf } = require("telegraf")
const bot = new Telegraf(process.env.BOT_TOKEN)

// Common function to handle topic selection
function handleTopicSelection(ctx, message) {
    try {
        const options = {
            reply_markup: {
                "keyboard": [
                    ['Array', 'String' ],
                    ['Linked List', 'Doubly-Linked List'],
                    ['Stack', 'Queue'],
                    ['Tree', 'Graph'],
                    ['Greedy', 'Hash Function'],
                    ['Hash Table', 'Heap (Priority Queue)'],
                    ['Backtracking', 'Binary Search'],
                    ['Binary Search Tree', 'Binary Tree'],
                    ['Dynamic Programming', 'Breadth-First Search']
                ],
                "resize_keyboard": true,
                "one_time_keyboard": true
            }
        }
            return ctx.reply(message, options);
            
        } catch (e) {
            console.error("error in start action:", e);
            return ctx.reply("Error occurred");
        }
}

bot.start(ctx => handleTopicSelection(ctx, "Welcome"));
// bot handle reply for the topic in a single function
bot.hears(/Array|String|Linked List|Doubly-Linked List|Stack|Queue|Tree|Graph|Greedy|Hash Function|Hash Table|Heap \(Priority Queue\)|Backtracking|Binary Search|Binary Search Tree|Binary Tree|Dynamic Programming|Breadth-First Search/, ctx => {
    const topic = ctx.message.text;
    try {
        // do something with the topic
        console.log(topic)
    } catch (e) {   
        console.error("error in topic selection:", e);
        return ctx.reply("Error occurred");
    }
    return ctx.reply("You have selected " + topic);
});

// handle /change command
bot.command('change', ctx => handleTopicSelection(ctx, "Select a topic"));



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
