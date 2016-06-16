/*! JSFuck 0.4.0 - http://jsfuck.com */

(function(self){

  var USE_CHAR_CODE = "USE_CHAR_CODE";

  var MIN = 32, MAX = 126;

  var SIMPLE = {
    'false':      '[[]==[]][+[]]',
    'true':       '[[]==+[]][+[]]',
    'undefined':  '[][[]]',
    'NaN':        '+[][[]]',
    'Infinity':   '+[+true+[true+[]][+[]][true+true+true]+[+true]+[+[]]+[+[]]+[+[]]]' // +"1e1000"
  };

  var CONSTRUCTORS = {
    'Array':    '[]',
    'Number':   '[0][0]',
    'String':   '[[]+[]][0]',
    'Boolean':  '[[]==[]][0]',
    'Function': '[]["fill"]',
    'RegExp':   'Function("return/"+false+"/")``'
  };

  var MAPPING = {
    'a':   '[false+""][0][1]',
    'b':   '[Number+[]][0][12]',
    'c':   '[[]["fill"]+""][0][3]',
    'd':   '[undefined+""][0][2]',
    'e':   '[true+""][0][3]',
    'f':   '[false+""][0][0]',
    'g':   '[false+[0]+String][0][20]',
    'h':   '[+[101]][0]["to"+String["name"]](21)[1]',
    'i':   '[[false]+undefined][0][10]',
    'j':   '[[]["entries"]``+[]][0][3]',
    'k':   '[+[20]][0]["to"+String["name"]](21)',
    'l':   '[false+""][0][2]',
    'm':   '[Number+""][0][11]',
    'n':   '[undefined+""][0][1]',
    'o':   '[true+[]["fill"]][0][10]',
    'p':   '[+[211]][0]["to"+String["name"]](31)[1]',
    'q':   '[+[212]][0]["to"+String["name"]](31)[1]',
    'r':   '[true+""][0][1]',
    's':   '[false+""][0][3]',
    't':   '[true+""][0][0]',
    'u':   '[undefined+""][0][0]',
    'v':   '[[]["fill"]+[]][0][23]',
    'w':   '[+[32]][0]["to"+String["name"]](33)',
    'x':   '[+[101]][0]["to"+String["name"]](34)[1]',
    'y':   '[NaN+[Infinity]][0][10]',
    'z':   '[+[35]][0]["to"+String["name"]](36)',

    'A':   '[+[]+Array][0][10]',
    'B':   '[+[]+Boolean][0][10]',
    'C':   'Function("return escape")``([""][0]["italics"]``)[2]',
    'D':   'Function("return escape")``([]["fill"])["slice"]("-1")',
    'E':   '[RegExp+""][0][12]',
    'F':   '[+[]+Function][0][10]',
    'G':   '[false+Function("return Date")````][0][30]',
    'H':   USE_CHAR_CODE,
    'I':   '[Infinity+""][0][0]',
    'J':   USE_CHAR_CODE,
    'K':   USE_CHAR_CODE,
    'L':   USE_CHAR_CODE,
    'M':   '[true+Function("return Date")````][0][30]',
    'N':   '[NaN+""][0][0]',
    'O':   '[NaN+Function("return{}")``][0][11]',
    'P':   USE_CHAR_CODE,
    'Q':   USE_CHAR_CODE,
    'R':   '[+[]+RegExp][0][10]',
    'S':   '[+[]+String][0][10]',
    'T':   '[NaN+Function("return Date")````][0][30]',
    'U':   '[NaN+Function("return{}")``["to"+String["name"]]["call"]()][0][11]',
    'V':   USE_CHAR_CODE,
    'W':   USE_CHAR_CODE,
    'X':   USE_CHAR_CODE,
    'Y':   USE_CHAR_CODE,
    'Z':   USE_CHAR_CODE,

    ' ':   '[NaN+[]["fill"]][0][11]',
    '!':   USE_CHAR_CODE,
    '"':   '[""][0]["fontcolor"]``[12]',
    '#':   USE_CHAR_CODE,
    '$':   USE_CHAR_CODE,
    '%':   'Function("return escape")``([]["fill"])[21]',
    '&':   '[""][0]["link"](0+")[10]',
    '\'':  USE_CHAR_CODE,
    '(':   '[undefined+[]["fill"]][0][22]',
    ')':   '[[0]+false+[]["fill"]][0][20]',
    '*':   USE_CHAR_CODE,
    '+':   '[+[+true+[true+[]][0][true+true+true]+[+true]+[0]+[0]]+[]][0][2]',
    ',':   '[[]["slice"]["call"](false+"")+""][0][1]',
    '-':   '[+[.+[0000000001]]+""][0][2]',
    '.':   '[+[+true+[+true]+[true+[]][0][true+true+true]+[true+true]+[0]]+[]][0][+true]',
    '/':   '[false+[0]][0]["italics"]``[10]',
    ':':   '[RegExp()+""][0][3]',
    ';':   '[""][0]["link"](")[14]',
    '<':   '[""][0]["italics"]``[0]',
    '=':   '[""][0]["fontcolor"]``[11]',
    '>':   '[""][0]["italics"]``[2]',
    '?':   '(RegExp()+"")[2]',
    '@':   USE_CHAR_CODE,
    '[':   '[[]["entries"]``+""][0][0]',
    '\\':  USE_CHAR_CODE,
    ']':   '[[]["entries"]``+""][0][22]',
    '^':   USE_CHAR_CODE,
    '_':   USE_CHAR_CODE,
    '`':   USE_CHAR_CODE,
    '{':   '[true+[]["fill"]][0][20]',
    '|':   USE_CHAR_CODE,
    '}':   '[true+[]["fill"]][0][36]',
    '~':   USE_CHAR_CODE
  };

  var GLOBAL = 'Function("return this")()';

  function fillMissingChars(){
    for (var key in MAPPING){
      if (MAPPING[key] === USE_CHAR_CODE){
        MAPPING[key] = 'Function("return unescape")()("%"'+ key.charCodeAt(0).toString(16).replace(/(\d+)/g, "+($1)+\"") + '")';
      }
    }
  }

  function fillMissingDigits(){
    var output, number, i;

    for (number = 0; number < 10; number++){

      output = "+[]";

      if (number > 0){ output = "+" + SIMPLE.true; }
      for (i = 1; i < number; i++){ output = "+" + SIMPLE.true + output; }
      if (number > 1){ output = output.substr(1); }

      MAPPING[number] = "[" + output + "]";
    }
  }

  function replaceMap(){
    var character = "", value, original, i, key;

    function replace(pattern, replacement){
      value = value.replace(
        new RegExp(pattern, "gi"),
        replacement
      );
    }

    function digitReplacer(_,x) { return MAPPING[x]; }

    function numberReplacer(_,y) {
      var values = y.split("");
      var head = +(values.shift());
      var output = "+[]";

      if (head > 0){ output = "+" + SIMPLE.true; }
      for (i = 1; i < head; i++){ output = "+" + SIMPLE.true + output; }
      if (head > 1){ output = output.substr(1); }

      return [output].concat(values).join("+").replace(/(\d)/g, digitReplacer);
    }

    for (i = MIN; i <= MAX; i++){
      character = String.fromCharCode(i);
      value = MAPPING[character];
      if(!value) {continue;}
      original = value;

      for (key in CONSTRUCTORS){
        replace("\\b" + key, CONSTRUCTORS[key] + '["constructor"]');
      }

      for (key in SIMPLE){
        replace(key, SIMPLE[key]);
      }

      replace('(\\d\\d+)', numberReplacer);
      replace('\\((\\d)\\)', digitReplacer);
      replace('\\[(\\d)\\]', digitReplacer);

      replace("GLOBAL", GLOBAL);
      replace('\\+""', "+[]");
      replace('""', "[]+[]");

      MAPPING[character] = value;
    }
  }

  function replaceStrings(){
    var regEx = /[^\[\]\(\)\+\`\=]{1}/g,
      all, value, missing,
      count = MAX - MIN;

    function findMissing(){
      var all, value, done = false;

      missing = {};

      for (all in MAPPING){

        value = MAPPING[all];

        if (value.match(regEx)){
          missing[all] = value;
          done = true;
        }
      }

      return done;
    }

    function mappingReplacer(a, b) {
      return b.split("").join("+");
    }

    function valueReplacer(c) {
      return missing[c] ? c : MAPPING[c];
    }

    for (all in MAPPING){
      MAPPING[all] = MAPPING[all].replace(/\"([^\"]+)\"/gi, mappingReplacer);
    }

    while (findMissing()){
      for (all in missing){
        value = MAPPING[all];
        value = value.replace(regEx, valueReplacer);

        MAPPING[all] = value;
        missing[all] = value;
      }

      if (count-- === 0){
        console.error("Could not compile the following chars:", missing);
      }
    }
  }

  function encode(input, wrapWithEval, runInParentScope){
    var output = [];

    if (!input){
      return "";
    }

    var r = "";
    for (var i in SIMPLE) {
      r += i + "|";
    }
    r+=".";

    input.replace(new RegExp(r, 'g'), function(c) {
      var replacement = SIMPLE[c];
      if (replacement) {
        output.push("[" + replacement + "]+[]");
      } else {
        replacement = MAPPING[c];
        if (replacement){
          output.push(replacement);
        } else {
          replacement =
            "([]+[])[" + encode("constructor") + "]" +
            "[" + encode("fromCharCode") + "]" +
            "(" + encode(c.charCodeAt(0) + "") + ")";

          output.push(replacement);
          MAPPING[c] = replacement;
        }
      }
    });

    output = output.join("+");

    if (/^\d$/.test(input)){
      output += "+[]";
    }

    if (wrapWithEval){
      if (runInParentScope){
        output = "[][" + encode("fill") + "]" +
          "[" + encode("constructor") + "]" +
          "(" + encode("return eval") +  ")()" +
          "(" + output + ")";
      } else {
        output = "[][" + encode("fill") + "]" +
          "[" + encode("constructor") + "]" +
          "(" + output + ")()";
      }
    }

    return output;
  }

  fillMissingDigits();
  fillMissingChars();
  replaceMap();
  replaceStrings();

  self.JSFuck = {
    encode: encode
  };
})(typeof(exports) === "undefined" ? window : exports);
