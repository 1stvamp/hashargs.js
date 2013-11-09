var introspect = require('introspect');

var cache = {},
    cache_keys = [];

var hashify = function(fn) {
    var wrapper = null,
	args = introspect(fn),
	cache_key = cache_keys.indexOf(fn);

    if (cache_key == -1) {
	wrapper = function(hash) {
	    var call_args = [];
	    for (var i = 0; i < args.length; ++i) {
		var arg = args[i];
		call_args.push(hash[arg]);
	    }

	    return fn.apply(fn, call_args);
	};

	cache_keys.push(fn);
	cache[(cache_keys.length - 1)] = wrapper;
    } else {
	wrapper = cache[cache_key];
    }

    return wrapper;
};

module.exports = hashify;
