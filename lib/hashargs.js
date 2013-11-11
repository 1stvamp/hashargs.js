var introspect = require('introspect');

var cache = {},
    cache_keys = [];

var hashify = function(fn, error_on_multi_args) {
    var wrapper,
	arg_keys = {},
	default_args = [],
	args = introspect(fn),
	cache_key = cache_keys.indexOf(fn);

    for (var i = 0; i < args.length; ++i) {
	arg_keys[args[i]] = i;
	default_args.push(undefined);
    }

    if (cache_key == -1) {
	wrapper = function(hash) {
	    var call_args;

	    if (arguments.length == 1) {
		call_args = default_args;

		for (var arg_name in hash) {
		    call_args[arg_keys[arg_name]] = hash[arg_name];
		}
	    } else if (error_on_multi_args) {
		throw new Error('Multiple arguments passed to ' + fn + ' but only expected a single hash.');
	    } else {
		call_args = arguments;
	    }

	    return fn.apply(fn, call_args);
	};
	wrapper.__orig_func = fn;

	cache_keys.push(fn);
	cache[(cache_keys.length - 1)] = wrapper;
    } else {
	wrapper = cache[cache_key];
    }

    return wrapper;
};

module.exports = hashify;
