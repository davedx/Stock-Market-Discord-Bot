const tool = require('../util/tools.js');
const smarket = require('../util/stockmarket.js');
const mysql = require('../util/mysql.js');

exports.run = async (client, msg) => {
	const msgBot = await msg.channel.send(tool.createEmbedMessage(msg, 'FF8400', 'Pinging...'));
	const timeBOT = msg.client.ws.ping;

	let start = Date.now();
	await smarket.getStockData(['AAPL']);
	const timeAPI = Date.now() - start;

	start = Date.now();
	await mysql.isAccountCreated(msg.author.id, false, msg);
	const timeSQL = Date.now() - start;

	console.log(`Bot: ${timeBOT}ms, API: ${timeAPI}ms, MySQL: ${timeSQL}ms`);

	msgBot.edit(tool.createEmbedMessage(msg, '008CFF', 'Pong!', [
		{
			name: 'Results:',
			value: `Bot: **${timeBOT}ms**\nStock Market - API: **${timeAPI}ms**\nDatabase: **${timeSQL}ms**`,
		},
	]));
};

exports.config = {
	name: 'Ping!',
	category: 'Basics',
	usage: 'ping',
	aliases: ['pong'],
	description: 'To see the latency between the bot, you, the API and the database',
};
