/** @format */

module.exports = {
	async search(ctx) {
		let entities;
		if (ctx.query_q) {
			entities = await strapi.query('user', 'users-permissions').search(ctx.query);
		} else {
			entities = await strapi.query('user', 'users-permissions').find(ctx.query);
		}
		return entities;
	},
};
