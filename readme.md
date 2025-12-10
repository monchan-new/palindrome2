Phrase object (with palindrome detector)
This is a sample NPM module created in Learn Enough JavaScript to Be Dangerous by Michael Hartl.

The module can be used as follows:
$ npm install --global mochan-palindrome
$ vim test.js

let Phrase = require("monchan-palindrome");
let napoleonsLament = new Phrase("Able was I, ere I saw Elba.");
console.log(napoleonsLament.palindrome());

$ node test.js
true