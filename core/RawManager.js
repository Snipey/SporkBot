'use strict';

const { CommandoClient } = require('discord.js-commando');
const Discord = require('discord.js');


module.exports = class RawManager {

	constructor(client) {
		this.client = client;

		if (!this.client || !(this.client instanceof CommandoClient)) {
			throw new Error('Discord Client is required');
		}

	}

	async handleRawEvent(event) {
		const events = {
			MESSAGE_REACTION_ADD: 'messageReactionAdd',
			MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
		};
		if (!events.hasOwnProperty(event.t)) return;

		const { d: data } = event;
		const user = this.client.users.get(data.user_id);
		const channel = this.client.channels.get(data.channel_id) || await user.createDM();

		if (channel.messages.has(data.message_id)) return;

		const message = await channel.fetchMessage(data.message_id);
		const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
		let reaction = message.reactions.get(emojiKey);

		if (!reaction) {
			const emoji = new Discord.Emoji(this.client.guilds.get(data.guild_id), data.emoji);
			reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === this.client.user.id);
		}

		this.client.emit(events[event.t], reaction, user);
	}
};
