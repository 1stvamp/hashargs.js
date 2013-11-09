hashargs.js
===========

`hashargs` is a simple decorator utility that allows any Node.js function to be called with a hash of named arguments.
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
```
