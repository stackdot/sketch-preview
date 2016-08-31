[![Node Version](https://img.shields.io/node/v/sketch-preview.svg)](https://www.npmjs.com/package/sketch-preview) [![NPM Version](https://img.shields.io/npm/v/sketch-preview.svg)](https://www.npmjs.com/package/sketch-preview) [![NPM License](https://img.shields.io/npm/l/sketch-preview.svg)](https://www.npmjs.com/package/sketch-preview) 

[![Build Status](https://drone.stackdot.com/api/badges/stackdot/sketch-preview/status.svg)](https://drone.stackdot.com/stackdot/sketch-preview) [![dependencies Status](https://img.shields.io/david/stackdot/sketch-preview.svg)](https://david-dm.org/stackdot/sketch-preview) [![Code Climate](https://codeclimate.com/github/stackdot/sketch-preview/badges/gpa.svg)](https://codeclimate.com/github/stackdot/sketch-preview) [![downloads monthly](https://img.shields.io/npm/dm/sketch-preview.svg)](https://www.npmjs.com/package/sketch-preview)


![alt text](screens/logo.png "Sketch Preview")
===

Sketch UI Generator

[Live GitHub Pages Demo](https://stackdot.github.io/sketch-preview/#/pages/4648C1B2-BFC9-40DE-A196-BBEF0C2E3165)

Generates a Interactable HTML website with your Sketch file.

## Generated in Browser:
![alt text](screens/generated.png "Generated Preview")

## Actual Sketch App
![alt text](screens/sketch.png "Sketch App")


Sketch file credits: [Sketch File](http://www.sketchappsources.com/free-source/1985-social-app-sketch-freebie-resource.html)






Requirements:
---

- Must be on Mac OSX ( You do *not* need Sketch App installed )
- [NodeJS](https://nodejs.org/en/download/) ( Version 6+ )
 - We recommend using [Node Version Manager](https://github.com/creationix/nvm)






To Get Started:
---

Install the package:
		
	npm install sketch-preview -g

Now you have a cli tool available, to use it:
	
	sketch-preview --input=mysketchfile.sketch --open

The `--open` at the end tells sketch-preview to open a browser tab to view your generated site. Otherwise it will simply build the static site in the `public` directory.







Including in your Gulp
---

You can also include this library in your gulp process, firstly make sure you install the package:

	npm install sketch-preview --save

Then inside of your gulpfile.js:

```javascript
// You must pass in your gulp variable for us to extend:
const preview = require('sketch-preview')({
	input: './sketch/TST.sketch',
}, gulp)

// Generate sketch preview files:
gulp.task('export', preview)
```







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

