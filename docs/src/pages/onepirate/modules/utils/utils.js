var util = {};

util.axios_url = function(){
	var axios_url = '';
	if(window.location.href.indexOf('localhost') || window.location.href.indexOf('127.0.0.1')){
		axios_url = 'http://localhost:8080';
	}
	return axios_url;
};


module.exports = util;