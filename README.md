# rmbgjs

Remove background in javascript.

This module wrapped [transparent-background](https://github.com/plemeri/transparent-background) module.

## Usage

```js
import rmbg from 'rmbgjs'; // esm

const mode = "fast"; // fast, base, base-nightly
const input = "test/1.jpg";
const output = "test/"; // directory path
const res = rmbg(mode, input, output);
// test/1.png
```

## Credits

- [transparent-background](https://github.com/plemeri/transparent-background)
- [InSPyReNet](https://github.com/plemeri/InSPyReNet)