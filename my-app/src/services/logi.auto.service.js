
import ApiService from './api.service';

const baseUrl = 'auto/';

const AutoFeature = {
	// /**
	//  * Get user info
	//  * @param {Params} params
	//  * @returns {Response} response
	//  */
	// async getUserInfo(params) {
	// 	return await axios.get(`/${baseUrl}username/${params}`);
	// },

	/**
	 * Singup
	 * @param {Params} params
	 * @returns {Response} response
	 */
	async loginAuto(params) {
		return ApiService.post(baseUrl + 'loginAuto', params);
	},
	async likeAuto(params) {
		return ApiService.post(baseUrl + 'likeAuto', params);
	},

};

export default AutoFeature;
