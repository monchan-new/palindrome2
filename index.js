module.exports = Phrase;

// (Stringクラスのprototypeに)reverse()メソッドを追加してすべてのStringオブジェクトで使えるようにする。
String.prototype.reverse = function() {
  return Array.from(this).reverse().join("");
}
// function reverse(string) {
//   return Array.from(string).reverse().join("");
// }

// Phraseオブジェクトを定義する
function Phrase(content) {
  // プロパティ（コンストラクター変数でもある）
  this.content = content;

  // 文字列を小文字に変換するメソッド
  this.processor = (string) => string.toLowerCase();

  // パリンドロームのテスト用に、変換したcontentを返すメソッド
  this.processedContent = () => this.processor(this.letters());

  // コンテンツの文字だけを返す
  // 利用例: new Phrase("Hello, world!").letters() === "Helloworld"
  this.letters = () => (this.content.match(/[a-z]/gi) || []).join("") ;
  // matchでregExにglobalオプションを付けると該当の複数要素を直接配列にして返してくれる。
  // しかし、該当要素がない場合には空の配列ではなくNullを返してしまうため、Null=Falseであることを利用し、||(OR論理子)でその場合に空の配列[]を返すようにする。

  // もっとストレートな記述は下記の通り
  // this.letters = () => {
  //   const letterRegex = /[a-z]/i; // iフラグで大文字小文字を無視
  //   return Array.from(this.content).filter(c => c.match(letterRegex)).join("");
  // }
  // その省略形は下記の通り
  // this.letters = () => Array.from(this.content).filter(c => c.match(/[a-z]/i)).join("");


  // パリンドロームならtrueを、違うならfalseを返すメソッド
  this.palindrome = () => {
    if(this.processedContent()) { 
      return this.processedContent() === this.processedContent().reverse();
    } else {
    // 空文字の場合には必ずFalseを返す   
      return false;
    }
  }
    
}

// TranslatedPhraseオブジェクトを定義する
function TranslatedPhrase(content, translation) {
  // Phraseのコンストラクタを呼び出して継承
  Phrase.call(this, content);
  this.translation = translation;

  // (オーバライド)パリンドロームのテスト用に変換したtranslationを返すように変更
  this.processedContent = () => this.processor(this.translation);
}

// プロトタイプ継承
TranslatedPhrase.prototype = Object.create(Phrase.prototype);
// この行で TranslatedPhrase.prototype を「Phrase.prototypeを継承した新しいオブジェクト」に置き換える。

// しかし、その新しいオブジェクトの constructor プロパティ(instanceofと同様な元のクラスの型を示すもの)は デフォルトで Phrase を指すようになってしまう。
// constructorを修正
TranslatedPhrase.prototype.constructor = TranslatedPhrase;
// これで TranslatedPhrase.prototype.constructor を正しく「TranslatedPhrase自身」に戻せ、生成されたオブジェクトの型がTranslatedPhraseを示すようになる。

Array.prototype.last = function() {
  return this.slice(-1);
  // pop()だと元の配列を変更してしまうので不適切。
}
String.prototype.blank = function() {
  return this.match(/^\s*$/) !== null;
  // matchは該当する文字がある場合には各種情報を配列で返し、
  // なければNullを返す。
  // 's+'だと１文字以上なので空文字が対象外となってしまう。
}