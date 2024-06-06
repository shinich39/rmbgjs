# rmbgjs

Remove background in javascript.

This module wrap [transparent-background](https://github.com/plemeri/transparent-background) module to js.

<img src="https://raw.githubusercontent.com/shinich39/rmbgjs/main/test/1.jpg" height="200px" /> <img src="https://raw.githubusercontent.com/shinich39/rmbgjs/main/test/2.png" height="200px" />

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

- Batch process

Copy and paste image files to "/rmbgjs/input" directory.

Save processed images to "/rmbgjs/output" directory after processing.

```console
npm start
```

## References

- [transparent-background](https://github.com/plemeri/transparent-background)
- [InSPyReNet](https://github.com/plemeri/InSPyReNet)