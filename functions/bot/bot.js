const { Telegraf, Markup } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

// Track selected options for each user
const selectedOptions = {};

bot.start(ctx => {
    console.log("Received /start command");
    try {
        const welcomeMessage = "Welcome to Leetcode bot! Please select topics:";
        const options = ['Array', 'String', 'Linked List', 'Doubly-Linked List',
            'Dynamic Programming',
            'Stack',
            'Queue',
            'Tree',
            'Graph',
            'Greedy',
            'Hash Function',
            'Hash Table',
            'Heap (Priority Queue)',
            'Backtracking',
            'Binary Search',
            'Binary Search Tree',
            'Binary Tree',
            'Breadth-First Search',
            'Bucket Sort',
            'Combinatorics',
            'Concurrency',
            'Counting',
            'Counting Sort',
            'Data Stream',
            'Database',
            'Depth-First Search',
        ]

        const keyboard = Markup.inlineKeyboard(
            options.map(option => Markup.button.callback(option, `select:${option}`))
          );

        return ctx.reply(welcomeMessage, keyboard);
    } catch (e) {
        console.error("error in start action:", e);
        return ctx.reply("Error occurred");
    }
});

bot.action(/select:(.*)/, ctx => {
    const userId = ctx.from.id;
    const selectedOption = ctx.match[1];

    if (!selectedOptions[userId]) {
        selectedOptions[userId] = [];
    }

    if (selectedOptions[userId].includes(selectedOption)) {
        // Deselect the option
        selectedOptions[userId] = selectedOptions[userId].filter(
            option => option !== selectedOption
        );
    } else {
        // Select the option
        selectedOptions[userId].push(selectedOption);
    }

    const selectedText =
        selectedOptions[userId].length === 0
            ? "No topics selected"
            : `Selected topics: ${selectedOptions[userId].join(", ")}`;

    return ctx.editMessageText(selectedText);
});

// AWS event handler syntax
exports.handler = async event => {
    try {
        await bot.handleUpdate(JSON.parse(event.body));
        return { statusCode: 200, body: "" };
    } catch (e) {
        console.error("error in handler:", e);
        return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" };
    }
};