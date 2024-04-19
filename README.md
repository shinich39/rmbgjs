# rmbgjs

Remove background in javascript.

This module wrapped [transparent-background](https://github.com/plemeri/transparent-background) module.

## Usage

```js
import rmbg from 'rmbgjs'; // esm

const mode = "fast"; // fast, base, base-nightly
const input = "./test/1.jpg";
const buffer = rmbg(input, mode);
// <Buffer 89 50 4e 47 0d 0a ... more bytes>

// save image file
fs.writeFileSync("./test/2.png", buffer);
```

## Credits

- [transparent-background](https://github.com/plemeri/transparent-background)
- [InSPyReNet](https://github.com/plemeri/InSPyReNet)