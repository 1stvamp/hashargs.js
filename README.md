hashargs.js
===========

`hashargs` is a simple decorator utility that allows any JavaScript function to be called with a hash of named arguments.
Any argument that isn't named in the hash is still passed through as `undefined` as if it was set positionally.

Installation
------------

```
npm install hashargs
```

Usage
-----

```
> hashify = require('hashargs');
[Function]

> function test(foo, bar, baz, blah) { console.log(arguments); }

> var t = hashify(test);

> t({bar: 'hello world'})
{ '0': undefined,
'1': 'hello world',
'2': undefined,
'3': undefined }

> t({bar: 'hello world', blah: 1234})
{ '0': undefined, '1': 'hello world', '2': undefined, '3': 1234 }

> t = t.__orig_func;

> t({bar: 'hello world'})
{ '0': { bar: 'hello world' },
'1': undefined,
'2': undefined,
'3': undefined }
```
