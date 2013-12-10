var introspect = require('introspect');

var cache = {},
    cache_keys = [],
    eoma_cache = {},
    eoma_cache_keys = [];

var hashify = function(fn, error_on_multi_args) {
    if (error_on_multi_args) {
	var _cache_keys = eoma_cache_keys,
	    _cache = eoma_cache_keys;
    } else {
	var _cache_keys = cache_keys,
	    _cache = cache_keys;
    }

    var wrapper,
	arg_keys = {},
	default_args = [],
	args = introspect(fn),
	cache_key = _cache_keys.indexOf(fn);

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
		var name = fn.toString().substr(9);
		name = name.substr(0, name.indexOf('('));
		throw new Error('Multiple arguments passed to ' + name + ' but only expected a single hash.');
	    } else {
		call_args = arguments;
	    }

	    return fn.apply(fn, call_args);
	};
	wrapper.__orig_func = fn;

	_cache_keys.push(fn);
	_cache[(_cache_keys.length - 1)] = wrapper;
    } else {
	wrapper = _cache[cache_key];
    }

    return wrapper;
};

module.exports = hashify;
