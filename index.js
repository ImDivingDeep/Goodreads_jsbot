// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');
const BookService = require('./bookservice.js')

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages], partials: [Partials.Channel] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.Debug, info => {
	console.log(`${info}`);
});

client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;

    if (message.content.includes("https://www.goodreads.com/book"))
    {
        let found = message.content.match(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/);
        var book = await BookService.getBookFromUrl(found[0]);
        
        const bookEmbed = new EmbedBuilder()
            .setTitle(book.title)
            .setDescription(book.description)
            .setImage(book.imageUrl)

        message.channel.send({ embeds: [bookEmbed] })
    }
});

// Log in to Discord with your client's token
client.login(token);