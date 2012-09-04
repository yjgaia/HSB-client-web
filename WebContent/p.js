function get(url, params, callback) {
	$.get('proxy.jsp', {
		url: url
		, method: 'GET'
		, params: $.param(params)
	}, callback);
}

function post(url, params, callback) {
	$.get('proxy.jsp', {
		url: url
		, method: 'POST'
		, params: $.param(params)
	}, callback);
}

function put(url, params, callback) {
	params._method = "PUT";
	$.get('proxy.jsp', {
		url: url
		, method: 'POST'
		, params: $.param(params)
	}, callback);
}

function del(url, params, callback) {
	params._method = "DELETE";
	$.get('proxy.jsp', {
		url: url
		, method: 'POST'
		, params: $.param(params)
	}, callback);
}