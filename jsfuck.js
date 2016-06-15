/*! JSFuck 0.4.0 - http://jsfuck.com */

(function(self){
  var USE_CHAR_CODE = "USE_CHAR_CODE";

  var MIN = 32, MAX = 126;

  var SIMPLE = {
    'false':      '![]',
    'true':       '!![]',
    'undefined':  '[][[]]',
    'NaN':        '+[![]]',
    'Infinity':   '+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]]+[+[]])' // +"1e1000"
  };

  var CONSTRUCTORS = {
    'Array':    '[]',
    'Number':   '(+[])',
    'String':   '([]+[])',
    'Boolean':  '(![])',
    'Function': '[]["fill"]',
    'RegExp':   'Function("return/"+false+"/")()'
  };

  var MAPPING = {
    'a':   '(false+"")[1]',
    'b':   '([]["entries"]()+"")[2]',
    'c':   '([]["fill"]+"")[3]',
    'd':   '(undefined+"")[2]',
    'e':   '(true+"")[3]',
    'f':   '(false+"")[0]',
    'g':   '(false+[0]+String)[20]',
    'h':   'Function("return atob")()("a"+[NaN])[0]',
    'i':   '([false]+undefined)[10]',
    'j':   '([]["entries"]()+"")[3]',
    'k':   'Function("return btoa")()(undefined+"")[3]',
    'l':   '(false+"")[2]',
    'm':   '(Number+"")[11]',
    'n':   '(undefined+"")[1]',
    'o':   '(true+[]["fill"])[10]',
    'p':   '(NaN+Function("return btoa")()(undefined+""))[10]',
    'q':   'Function("return atob")()("cf")[0]',
    'r':   '(true+"")[1]',
    's':   '(false+"")[3]',
    't':   '(true+"")[0]',
    'u':   '(undefined+"")[0]',
    'v':   'Function("return atob")()("dn")[0]',
    'w':   'Function("return atob")()(undefined+[false])[1]',
    'x':   'Function("return btoa")()(101)[3]',
    'y':   '(NaN+[Infinity])[10]',
    'z':   'Function("return atob")()("en")[0]',

    'A':   '(+[]+Array)[10]',
    'B':   '(+[]+Boolean)[10]',
    'C':   'Function("return atob")()(20+"N")[1]',
    'D':   'Function("return btoa")()([00])[1]',
    'E':   'Function("return btoa")()(11)[2]',
    'F':   '(+[]+Function)[10]',
    'G':   'Function("return atob")()([00]+"c")[1]',
    'H':   'Function("return btoa")()(true)[1]',
    'I':   '(Infinity+"")[0]',
    'J':   'Function("return btoa")()(true)[2]',
    'K':   'Function("return atob")()(30+"s")[1]',
    'L':   'Function("return btoa")()(".")[0]',
    'M':   'Function("return btoa")()("0")[0]',
    'N':   '(NaN+"")[0]',
    'O':   'Function("return btoa")()(NaN)[3]',
    'P':   'Function("return btoa")()(("")["italics"]())[0]',
    'Q':   'Function("return btoa")()("1")[1]',
    'R':   'Function("return btoa")()([]["fill"])[6]',
    'S':   '(+[]+String)[10]',
    'T':   'Function("return btoa")()(NaN)[0]',
    'U':   '(true+Function("return btoa")()(false))[10]',
    'V':   'Function("return btoa")()(undefined+"")[10]',
    'W':   'Function("return btoa")()(undefined+"")[1]',
    'X':   'Function("return btoa")()(Array)[13]',
    'Y':   'Function("return btoa")()([]["fill"])[4]',
    'Z':   'Function("return btoa")()(false)[0]',

    ' ':   '(NaN+[]["fill"])[11]',
    '!':   'Function("return atob")()("If"+0)[0]',
    '"':   '("")["fontcolor"]()[12]',
    '#':   'Function("return atob")()("I"+[00])[0]',
    '$':   'Function("return atob")()("aiQ")[1]',
    '%':   'Function("return escape")()([]["fill"])[21]',
    '&':   '("")["link"](0+")[10]',
    '\'':  'Function("return atob")()(0+"ic")[1]',
    '(':   '(undefined+[]["fill"])[22]',
    ')':   '([0]+false+[]["fill"])[20]',
    '*':   'Function("return atob")()(0+"io")[1]',
    '+':   '(+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]])+[])[2]',
    ',':   '([]["slice"]["call"](false+"")+"")[1]',
    '-':   '(+(.+[0000000001])+"")[2]',
    '.':   '(+(+!+[]+[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+[!+[]+!+[]]+[+[]])+[])[+!+[]]',
    '/':   '(false+[0])["italics"]()[10]',
    ':':   '(RegExp()+"")[3]',
    ';':   '("")["link"](")[14]',
    '<':   '("")["italics"]()[0]',
    '=':   '("")["fontcolor"]()[11]',
    '>':   '("")["italics"]()[2]',
    '?':   '(RegExp()+"")[2]',
    '@':   'Function("return atob")()(30+"A")[1]',
    '[':   '([]["entries"]()+"")[0]',
    '\\':  'Function("return atob")()(11+"w")[1]',
    ']':   '([]["entries"]()+"")[22]',
    '^':   'Function("return atob")()(114)[1]',
    '_':   'Function("return atob")()(118)[1]',
    '`':   'Function("return atob")()("l2A")[1]',
    '{':   '(true+[]["fill"])[20]',
    '|':   'Function("return atob")()("fNc")[0]',
    '}':   '([]["fill"]+"")["slice"]("-1")',
    '~':   'Function("return atob")()("fu")[0]'
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

      if (number > 0){ output = "+!" + output; }
      for (i = 1; i < number; i++){ output = "+!+[]" + output; }
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

      if (head > 0){ output = "+!" + output; }
      for (i = 1; i < head; i++){ output = "+!+[]" + output; }
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
    var regEx = /[^\[\]\(\)\!\+]{1}/g,
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
