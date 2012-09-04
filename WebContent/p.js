function get(url, params, callback) {
	$.getJSON('proxy.jsp', {
		url: url
		, method: 'GET'
		, params: $.param(params)
	}, callback);
}

function post(url, params, callback) {
	$.getJSON('proxy.jsp', {
		url: url
		, method: 'POST'
		, params: $.param(params)
	}, callback);
}

function put(url, params, callback) {
	params._method = "PUT";
	$.getJSON('proxy.jsp', {
		url: url
		, method: 'POST'
		, params: $.param(params)
	}, callback);
}

function del(url, params, callback) {
	params._method = "DELETE";
	$.getJSON('proxy.jsp', {
		url: url
		, method: 'POST'
		, params: $.param(params)
	}, callback);
}