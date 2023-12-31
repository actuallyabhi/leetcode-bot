const { Telegraf, } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN) 
const url = "https://script.google.com/macros/s/AKfycbw584DxzF9SghwdqrlI8rF6MfGZnwY2wLWGJp1p_BZAp7fhLh0QwvRBbBmawSZV06-O/exec"

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
            ctx.reply(message, options);
            
        } catch (e) {
            console.error("error in start action:", e);
            return ctx.reply("Error occurred");
        }
}

// Common function to handle difficulty selection
function handleDifficultySelection(ctx, message) {
    try {
        const options = {
            reply_markup: {
                "keyboard": [
                    ['Easy', 'Medium' ],
                    ['Hard', 'All']
                ],
                "resize_keyboard": true,
                "one_time_keyboard": true
            }
        }
            return ctx.reply(message, options);

        } catch (e) {
            console.error("error in start action:", e);
            return ctx.reply("Error occurred while selecting difficulty");
        }
}

//handle time selection
function handleTimeSelection(ctx, message) {
    try {
        const options = {
            reply_markup: {
                "keyboard": [
                    ['6:00 AM', '9:00 AM' ],
                    ['12:00 PM', '3:00 PM'],
                    ['6:00 PM', '9:00 PM']
                ],
                "resize_keyboard": true,
                "one_time_keyboard": true
            }
        }
            return ctx.reply(message, options);
    } catch (e) {
        console.error("error in start action:", e);
        return ctx.reply("Error occurred while selecting time");
    }
}

// handle number selection
function handleNumberSelection(ctx, message) {
    try {
        const options = {
            reply_markup: {
                "keyboard": [
                    ['1', '2' ],
                    ['3', '4'],
                    ['5']
                ],
                "resize_keyboard": true,
                "one_time_keyboard": true
            }
        }
        return ctx.reply(message, options);
    } catch (e) {
        console.error("error in start action:", e);
        return ctx.reply("Error occurred while selecting number");
    }
}

bot.start(ctx => {
    return handleTopicSelection(ctx, "Welcome to the Leetcode Bot. \n \n Here you can receive a new problem to solve at a time of your choice. \n \n To get started, select a topic from the list below.")
});

bot.help(ctx => {
    const commandsList = [
        '/start - Start the bot',
        '/help - Show available commands',
        '/change_topic - Change the topic about which you want to solve problems',
        '/change_difficulty - Change the difficulty of the problems you want to solve',
        '/change_time - Change the time after which you want to receive a new problem',
        '/change_number - Change the number of problems you want to receive',
    ];
    ctx.reply('Available commands:\n\n' + commandsList.join('\n'));
});

// bot handle reply for the topic in a single function
bot.hears(/Array|String|Linked List|Doubly-Linked List|Stack|Queue|Tree|Graph|Greedy|Hash Function|Hash Table|Heap \(Priority Queue\)|Backtracking|Binary Search|Binary Search Tree|Binary Tree|Dynamic Programming|Breadth-First Search/, ctx => {
    const topic = ctx.message.text;
    const username = ctx.message.from.username;
    try {
        fetch("https://script.google.com/macros/s/AKfycbw584DxzF9SghwdqrlI8rF6MfGZnwY2wLWGJp1p_BZAp7fhLh0QwvRBbBmawSZV06-O/exec"+ "?username=" + username + "&topic=" + topic, {
            method: 'POST'
        })
    } catch (e) {   
        console.error("error in topic selection:", e);
        return ctx.reply("Error occurred");
    }
    ctx.replyWithHTML("You have selected <b>" + topic + "</b> as the topic to receive problems")
    return ctx.replyWithHTML("Topic: <b>/change_topic</b> \n \n Difficulty: <b>/change_difficulty</b> \n \n Time: <b>/change_time</b> \n \n Number of Problems <b>/change_number</b>")
});

// bot handle reply for the difficulty in a single function
bot.hears(/Easy|Medium|Hard|All/, ctx => {
    const difficulty = ctx.message.text;
    const username = ctx.message.from.username;
    try {
        fetch("https://script.google.com/macros/s/AKfycbw584DxzF9SghwdqrlI8rF6MfGZnwY2wLWGJp1p_BZAp7fhLh0QwvRBbBmawSZV06-O/exec"+ "?username=" + username + "&difficulty=" + difficulty, {
            method: 'POST'
        })
    } catch (e) {
        console.error("error in difficulty selection:", e);
        return ctx.reply("Error occurred");
    }
    return ctx.replyWithHTML("You have selected <b>" + difficulty + "</b> as the difficulty of the problems to receive")
});

// bot handle reply for the time in a single function
bot.hears(/6:00 AM|9:00 AM|12:00 PM|3:00 PM|6:00 PM|9:00 PM/, ctx => {
    const time = ctx.message.text;
    const username = ctx.message.from.username;
    try {
        fetch("https://script.google.com/macros/s/AKfycbw584DxzF9SghwdqrlI8rF6MfGZnwY2wLWGJp1p_BZAp7fhLh0QwvRBbBmawSZV06-O/exec"+ "?username=" + username + "&time=" + time, {
            method: 'POST'
        })
    } catch (e) {
        console.error("error in time selection:", e);
        return ctx.reply("Error occurred");
    }
    return ctx.replyWithHTML("You have selected <b>" + time + "</b> as the time to receive a new problem")
});

// handle any other message
bot.on('message', ctx => {
    return ctx.reply("Greetings! \n \n To get list of available commands, /help")
});

// bot handle reply for the number in a single function
bot.hears(/1|2|3|4|5/, ctx => {
    const number = ctx.message.text;
    const username = ctx.message.from.username;
    try {
        fetch("https://script.google.com/macros/s/AKfycbw584DxzF9SghwdqrlI8rF6MfGZnwY2wLWGJp1p_BZAp7fhLh0QwvRBbBmawSZV06-O/exec"+ "?username=" + username + "&numProblems=" + number, {
            method: 'POST'
        })
    } catch (e) {
        console.error("error in number selection:", e);
        return ctx.reply("Error occurred");
    }
    ctx.replyWithHTML("You have selected <b>" + number + "</b> as the number of problems to receive")
    return ctx.reply("You have successfully set up your preferences. You will receive a new problem at the selected time");
});



// handle /change commands
bot.command('change_topic', ctx => handleTopicSelection(ctx, "Select a topic"));
bot.command('change_difficulty', ctx => handleDifficultySelection(ctx, "Select a difficulty"));
bot.command('change_time', ctx => handleTimeSelection(ctx, "Select a time"));
bot.command('change_number', ctx => handleNumberSelection(ctx, "Select a number"));



exports.handler = async event => {
    try {
        await bot.handleUpdate(JSON.parse(event.body));
        return { statusCode: 200, body: "" };
    } catch (e) {
        console.error("error in handler:", e);
        return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" };
    }
}
