/**-------------------------/// Dom select \\\---------------------------
 *
 * <b>function</b>
 * @version : 1.0
 * @since : 2008 02 18 0:19:35
 * 
 * @description :
 *
   * *                            any element                                                     Universal selector              2
   * E                            an element of type E                                            Type selector   1
 * E[foo]                       an E element with a "foo" attribute                             Attribute selectors             2
 * E[foo="bar"]                 an E element whose "foo" attribute value is exactly equal to "bar"                              Attribute selectors             2
 * E[foo~="bar"]                an E element whose "foo" attribute value is a list of space-separated values, one of which is exactly equal to "bar"            Attribute selectors             2
 * E[foo^="bar"]                an E element whose "foo" attribute value begins exactly with the string "bar"                   Attribute selectors             3
 * E[foo$="bar"]                an E element whose "foo" attribute value ends exactly with the string "bar"                     Attribute selectors             3
 * E[foo*="bar"]                an E element whose "foo" attribute value contains the substring "bar"                           Attribute selectors             3
 * E[hreflang|="en"]            an E element whose "hreflang" attribute has a hyphen-separated list of values beginning (from the left) with "en"               Attribute selectors             2
 * E:root                       an E element, root of the document                              Structural pseudo-classes       3
 * E:nth-child(n)               an E element, the n-th child of its parent                      Structural pseudo-classes       3
 * E:nth-last-child(n)          an E element, the n-th child of its parent, counting from the last one                          Structural pseudo-classes       3
 * E:nth-of-type(n)             an E element, the n-th sibling of its type                      Structural pseudo-classes       3
 * E:nth-last-of-type(n)        an E element, the n-th sibling of its type, counting from the last one                          Structural pseudo-classes       3
 * E:first-child                an E element, first child of its parent                                                         Structural pseudo-classes       2
 * E:last-child                 an E element, last child of its parent                          Structural pseudo-classes       3
 * E:first-of-type              an E element, first sibling of its type                                                         Structural pseudo-classes       3
 * E:last-of-type               an E element, last sibling of its type                          Structural pseudo-classes       3
 * E:only-child                 an E element, only child of its parent                          Structural pseudo-classes       3
 * E:only-of-type               an E element, only sibling of its type                          Structural pseudo-classes       3
 * E:empty                      an E element that has no children (including text nodes)        Structural pseudo-classes       3
 * E:focus                      an E element during certain user actions                        The user action pseudo-classes  1 and 2
 * E:target                     an E element being the target of the referring URI              The target pseudo-class                                         3
 * E:lang(fr)                   an element of type E in language "fr" (the document language specifies how language is determined)                              The :lang() pseudo-class        2
 * E:enabled
 * E:disabled                   a user interface element E which is enabled or disabled                                         The UI element states pseudo-classes                            3
 * E:checked                    a user interface element E which is checked (for instance a radio-button or checkbox)           The UI element states pseudo-classes                            3
 * E::first-line                the first formatted line of an E element                        The ::first-line pseudo-element                                 1
 * E::first-letter              the first formatted letter of an E element                      The ::first-letter pseudo-element                               1
 * E::selection                 the portion of an E element that is currently selected/highlighted by the user                  The UI element fragments pseudo-elements                        3
 * E::before                    generated content before an E element                           The ::before pseudo-element     2
 * E::after                     generated content after an E element                            The ::after pseudo-element      2
   * E.warning                    an E element whose class is "warning" (the document language specifies how class is determined).                                Class selectors                                                 1
 * E#myid                       an E element with ID equal to "myid".                           ID selectors                    1
 * E:not(s)                     an E element that does not match simple selector s              Negation pseudo-class           3
 * E F                          an F element descendant of an E element                         Descendant combinator           1
 * E > F                        an F element child of an E element                              Child combinator                2
 * E + F                        an F element immediately preceded by an E element               Adjacent sibling combinator     2
 * E ~ F                        an F element preceded by an E element                           General sibling combinator      3
 * 
 *   
 *
 *
 *
 *
 * @usage : 
 * 
 * @author : drdr.xp | drdr.xp@gmail.com
 *
 * @TODO : 
 * 
 *--------------------------\\\ Dom select ///---------------------------*/
new Module("net.xp.dom.select.$", [
  ], function ($t, $n, $p, $g, $r, $c) {
    /* private */

    var has_or = /[^\\]\|/;

    function _any(str){ return "(?:"+str+")*"; }
    function _1more(str){ return "(?:"+str+")+"; }
    function _01(str){ return "(?:"+str+")?"; }
    function _or() {
      var r = [];
      for (var i= 0; i < arguments.length; ++i){
	var e = arguments[i];
	if (has_or.test(e))
	  r.push("(?:" + e + ")");
	else 
	  r.push(e);
      }

      return r.join("|");
    }

    /* primitive */

    var w       = "\\s*";
    var string1 = "\"[^\"]*\"";
    var string2 = "\'[^']*'";
    /* var string  = _or(string1, string2); */
    var string  = string1;
    /* var num     = "\\d+(\\.\\d+)?"; */
    var num     = "\\d+";
    var nmstart = "[a-z_]";
    var nmchar  = "[\\w-]";
    var name    = nmchar + "+";
    var ident   = nmstart + nmchar + "*";

    /* const */
    var S = "\\s";

    var INCLUDES 	= "~=";
    var DASHMATCH 	= "\\|=";
    var PREFIXMATCH 	= "\\^=";
    var SUFFIXMATCH     = "\\$=";        
    var SUBSTRINGMATCH  = "\\*=";        
    var IDENT           = ident;
    var STRING          = string;
    var FUNCTION        = ident + "\\(";  
    var NUMBER          = num;
    var HASH            = "#" + name;   
    var PLUS            = w + "\\+";
    var GREATER         = w + ">";
    var COMMA           = w + ",";
    var TILDE           = w + "~";
    var NOT             = ":not\\(";     
    var DIMENSION       = num + ident;
    

    /* lang */

    var _anyS = S + "*";

    var type_selector = IDENT;
    var universal = "\\*";

    var CLASS = "\\." + IDENT;
    var functional_pseudo = FUNCTION + _anyS + expression + "\\)";
    /* var _matches = _or(PREFIXMATCH, SUFFIXMATCH, SUBSTRINGMATCH, "=", INCLUDES, DASHMATCH); */
    var _matches = "[~|^$*]*=";
    var attrib = "\\[" + 
      _01(_anyS + IDENT + _anyS + _matches + _anyS + _or(IDENT, STRING) + _anyS) + "\\]";
    var pseudo = ":" + _or(IDENT, functional_pseudo);

    var negation_arg = _or(type_selector, universal, HASH, CLASS, attrib, pseudo);

    var negation = NOT + "(?:" + _anyS + negation_arg + _anyS + ")\\)";

    var expression = _1more(_or(PLUS, "-", DIMENSION, NUMBER, IDENT) + _anyS);

    var simple_select_condition = _or(HASH, CLASS, attrib, pseudo, negation);

    var simple_selector_sequence = _or((type_selector + universal), _01(type_selector + universal) + _1more(simple_select_condition));


    /* var comb = _or(PLUS + S + "*",  */
      /* GREATER + S + "*",  */
      /* TILDE + S + "*",  */
      /* S); */
    var comb = "\\s*[+>~\\s]\\s*";

    var sel = _any("(?:" + simple_selector_sequence + ")" + comb);

    /* var sel_grp = sel + _any("," + _anyS + sel); */


    function tst(r, s){
      console.log(r.length, r);
      var reg = new RegExp(r, "g");
      console.log(s.match(reg));
    }

    tst(simple_selector_sequence, " .clz");
    



    /* console.log(sel); */
    /* var reg = new RegExp(sel); */

    return {
      $initialize : function (){ },

      /* TODO create default constructor */
      $constructor : function (){

      }, 

      $ : function (id, doc){
        return this.$Doc(doc).getElementById(id);
      },

      $n : function (name, doc){
        return this.$Doc(doc).getElementsByTagName(name);
      },

      /**
       * create Element
       * @param {Object} name
       * @param {Object} doc
       * @param {Object} io
       */
      $ce : function (name, doc, io){
        name = name || "div";
        doc = this.$Doc(doc);
        io = io || {};
        var e = doc.createElement(name);

        for (var i in io)
        if (io.constructor.prototype[i] == null)
        e[i] = io[i];
      return e;
    }
  }});
