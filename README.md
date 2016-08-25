[![Node Version](https://img.shields.io/node/v/sketch-preview.svg?maxAge=60)](https://www.npmjs.com/package/sketch-preview) [![NPM Version](https://img.shields.io/npm/v/sketch-preview.svg?maxAge=60)](https://www.npmjs.com/package/sketch-preview) [![NPM License](https://img.shields.io/npm/l/sketch-preview.svg?maxAge=60)](https://www.npmjs.com/package/sketch-preview) 

[![Build Status](https://drone.stackdot.com/api/badges/stackdot/sketch-preview/status.svg?maxAge=60)](https://drone.stackdot.com/stackdot/sketch-preview) [![dependencies Status](https://img.shields.io/david/stackdot/sketch-preview.svg?maxAge=60)](https://david-dm.org/stackdot/sketch-preview)

Sketch Preview
===

Sketch UI Generator

Generates a static HTML website with your Sketch file.

Requirements:
---

- [NodeJS](https://nodejs.org/en/download/) ( Version 6+ )
- We recommend using [Node Version Manager](https://github.com/creationix/nvm)

To Get Started:
---

Install the package:
		
	npm install sketch-preview -g

Now you have a cli tool available, to use it:
	
	sketch-preview --input=mysketchfile.sketch --open

The `--open` at the end tells sketch-preview to open a browser tab to view your generated site. Otherwise it will simply build the static site in the `public` directory.


Running Dev:
---

Inside the directory run:

```bash
gulp
```

Be sure to run `npm update` to ensure all the NPM dependencies are up to date.




License
----

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

