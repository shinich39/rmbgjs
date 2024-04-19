# rmbgjs

Remove background in javascript.

This module wrapped [transparent-background](https://github.com/plemeri/transparent-background) module.

<img src="https://raw.githubusercontent.com/shinich39/rmbgjs/main/test/1.jpg" height="200px" />
<img src="https://raw.githubusercontent.com/shinich39/rmbgjs/main/test/2.png" height="200px" />

## Usage

```js
import rmbg from 'rmbgjs'; // esm

const mode = "fast"; // fast, base, base-nightly
const input = fs.readFileSync("./test/1.jpg"); // buffer
const output = await rmbg.exec(input, mode);
// <Buffer 89 50 4e 47 0d 0a ... more bytes>

// save image file
fs.writeFileSync("./test/2.png", output);
```

## Credits

- [transparent-background](https://github.com/plemeri/transparent-background)
- [InSPyReNet](https://github.com/plemeri/InSPyReNet)