let assert = require("assert");
let Phrase = require("../index.js");
const { isTypedArray } = require("util/types");

describe("Phrase", function() {
  describe("#palindrome", function() {

    it("should return false for a non-palindrome", function() {
      let nonPalindrome = new Phrase("apple");
      assert(!nonPalindrome.palindrome());
    });

    it("should return true for a simple palindrome", function() {
      let plainPalindrome = new Phrase("Racecar");
      assert(plainPalindrome.palindrome());
    });

    it("パリンドロームが大文字小文字混じりでもtrueを返す", function() {
      let mixedCase = new Phrase("RaceCar");
      assert(mixedCase.palindrome());
    });

    it("パリンドロームに句読点があってもtrueを返す", function() {
      let punctuatedPalindrome = new Phrase("Madam, I'm Adam.");
      assert(punctuatedPalindrome.palindrome());
    });

    it("空文字の場合にはfalseを返す", () => {
      let emptyPhrase = new Phrase("");
      assert(!emptyPhrase.palindrome());
    });
  });

  describe("#letters", function() {
    it("文字だけを返す", function() {
      let punctuatedPalindrome = new Phrase("Madam I'm Adam.");
      assert.strictEqual(punctuatedPalindrome.letters(), "MadamImAdam");
    });

    // it("マッチしない場合は空文字列を返す", function() {
    //   let noLetters = new Phrase("1234.56");
    //   assert.strictEqual(noLetters.letters(), "");
    // });
    it("マッチしない場合は空文字列を返す", () => {
      let noLetters = new Phrase("1234.56");
      assert.strictEqual(noLetters.letters(), "");
    });
  })
});