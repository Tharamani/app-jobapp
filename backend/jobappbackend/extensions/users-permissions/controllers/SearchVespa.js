/** @format */
const axios = require('axios');

module.exports = {
	async searchVespa(ctx) {
		console.log('from vespa search ctx', ctx.query_q);
		const {data} = await axios.get('http://localhost:8080/search/?yql=select * from users where true');
		console.log('from vespa search data', data);
		return data;
	},
};
