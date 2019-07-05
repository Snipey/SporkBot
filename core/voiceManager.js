// Main Requires
require('dotenv').config();
const log = require('../util/logger');
const bot = require('../bot');
const joined = bot.Collection();
const User = require('../models').User;
Reflect.defineProperty(joined, 'add', {
	value: async function add(id, date) {
		return joined.set(id, date);
	},
});

const handleChannelJoin = function(member, newChannel) {
	if (newChannel !== undefined) {
		// Add Xp for being in a voice channel
		const join = new Date().getTime();
		joined.add(member.user.id, join);
	}
};
const handleChannelLeave = function() {
	// User leaves a voice channel
	const startDate = joined.get(member.user.id);
	const endDate = new Date();
	const seconds = Math.round((endDate.getTime() - startDate) / 1000);
	const minutes = seconds / 60;
	const percMin = Math.round(minutes / 0.85);
	const xp = levels.genXp((minutes - percMin), minutes);
	const xpToAdd = Math.round(xp * 1.13);
	User.findOrCreate({
		where: {
			user_id: oldMember.user.id,
			server_id: oldMember.guild.id,
		},
		defaults: {
			xp: xpToAdd,
		},
	}).spread((user, created) => {
		if(!created) {
			return user.increment('xp', { by: xpToAdd })
				.then(() => {
					joined.remove(oldMember.user.id);
				});
		}
	}).catch(err => log.error(err));
};
const handleChannelSwitch = function() {

};
const handleVoiceUpdate = function() {

};

module.exports = {
	handleChannelJoin: handleChannelJoin,
	handleChannelLeave: handleChannelLeave,
	handleChannelSwitch: handleChannelSwitch,
	handleVoiceUpdate: handleVoiceUpdate,
};