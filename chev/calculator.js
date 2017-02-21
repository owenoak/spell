import { Parser, Lexer }  from "chevrotain";

const {
    allTokens,
    WhiteSpace,
    Plus, Minus, Multi, Div,
    LParen, RParen,
    NumberLiteral,
    AdditionOperator, MultiplicationOperator
} = require("./tokens");

const CalculatorLexer = new Lexer(allTokens);

// ----------------- parser -----------------
class Calculator extends Parser {
	constructor(input) {
		console.time("parser construction");
		super(input, allTokens);

		var $ = this;

		$.RULE("expression", function() {
			return $.SUBRULE($.additionExpression)
		});

		//  lowest precedence thus it is first in the rule chain
		// The precedence of binary expressions is determined by how far down the Parse Tree
		// The binary expression appears.
		$.RULE("additionExpression", function() {
			var value, op, rhsVal;

			// parsing part
			value = $.SUBRULE($.multiplicationExpression);
			$.MANY(function() {
				// consuming 'AdditionOperator' will consume either Plus or Minus as they are subclasses of AdditionOperator
				op = $.CONSUME(AdditionOperator);
				//  the index "2" in SUBRULE2 is needed to identify the unique position in the grammar during runtime
				rhsVal = $.SUBRULE2($.multiplicationExpression);

				// interpreter part
				if (op instanceof Plus) {
					value += rhsVal
				} else { // op instanceof Minus
					value -= rhsVal
				}
			});

			return value
		});


		$.RULE("multiplicationExpression", function() {
			var value, op, rhsVal;

			// parsing part
			value = $.SUBRULE($.atomicExpression);
			$.MANY(function() {
				op = $.CONSUME(MultiplicationOperator);
				//  the index "2" in SUBRULE2 is needed to identify the unique position in the grammar during runtime
				rhsVal = $.SUBRULE2($.atomicExpression);

				// interpreter part
				if (op instanceof Multi) {
					value *= rhsVal
				} else { // op instanceof Div
					value /= rhsVal
				}
			});

			return value
		});


		$.RULE("atomicExpression", function() {
			// @formatter:off
				return $.OR([
					// parenthesisExpression has the highest precedence and thus it appears
					// in the "lowest" leaf in the expression ParseTree.
					{ALT: function(){ return $.SUBRULE($.parenthesisExpression)}},
					{ALT: function(){ return parseInt($.CONSUME(NumberLiteral).image, 10)}}
				], "a number or parenthesis expression");
				// @formatter:on
		});

		$.RULE("parenthesisExpression", function() {
			var expValue;

			$.CONSUME(LParen);
			expValue = $.SUBRULE($.expression);
			$.CONSUME(RParen);

			return expValue
		});

		// very important to call this after all the rules have been defined.
		// otherwise the parser may not work correctly as it will lack information
		// derived during the self analysis phase.
		Parser.performSelfAnalysis(this);
		console.timeEnd("parser construction");
	}

	// avoids inserting number literals as these can have multiple(and infinite) semantic values, thus it is unlikely
	// we can choose the correct number value to insert.
	canTokenTypeBeInsertedInRecovery(tokClass) {
		return tokClass !== NumberLiteral
	};
}


// wrapping it all togater
// reuse the same parser instance.
var parser = new Calculator([]);


export default function calculator(text) {
	console.group("Parsing: '"+ text + "'");

	// Tokenize input text
    var lex = CalculatorLexer.tokenize(text);

	// Report lexer errors or success
    if (lex.errors.length) {
    	console.group("Lexer errors");
    	for (let error of lex.errors) {
    		console.error(error);
    	}
    	console.groupEnd();
    }
    else {
    	console.info("Lexer passed with tokens:", lex.tokens);
    }

    // Setting a new input will RESET the parser instance's state.
    parser.input = lex.tokens;

    // Parse the text.
    // Note that any top level rule may be used as an entry point.
    var value = parser.expression();

	// Report parser errors or success
    if (parser.errors.length) {
    	console.group("Parser errors");
    	for (let error of parser.errors) {
    		console.error(error.name + ": " + error.message + "\n", error);
    	}
    	console.groupEnd();
    }
	else {
		console.info("Parser returned value:", value);
	}

	console.groupEnd();

	return { value, lex, errors: parser.errors };
};

// DEBUG
window.lexer = CalculatorLexer;
window.calculator = calculator;
window.parser = parser;
