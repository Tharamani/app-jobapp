/** @format */

const {sanitizeEntity} = require('strapi-utils');

module.exports = {
	/**
	 * Retrieve a record.
	 *
	 * @return {Object}
	 */

	async findOne(ctx) {
		const {username} = ctx.params;

		const entity = await strapi.services.contractrequests.user.findOne({username});
		return sanitizeEntity(entity, {model: strapi.models.contractrequests.user});
	},
};
