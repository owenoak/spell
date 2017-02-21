import { Token, Lexer } from "chevrotain";

// using the NA pattern marks this Token class as 'irrelevant' for the Lexer.
// AdditionOperator defines a Tokens hierarchy but only the leafs in this hierarchy define
// actual Tokens that can appear in the text
export class AdditionOperator extends Token {
	static PATTERN = Lexer.NA;
}
export class Plus extends AdditionOperator {
	static PATTERN = /\+/;
}
export class Minus extends AdditionOperator {
	static PATTERN = /-/;
}

export class MultiplicationOperator extends Token {
	static PATTERN = Lexer.NA
}
export class Multi extends MultiplicationOperator {
	static PATTERN = /\*/;
}
export class Div extends MultiplicationOperator {
	static PATTERN = /\//;
}

export class LParen extends Token {
	static PATTERN = /\(/;
}
export class RParen extends Token {
	static PATTERN = /\)/;
}
export class NumberLiteral extends Token {
	static PATTERN = /\d*(?:\.\d+)?/;
}
// marking WhiteSpace as 'SKIPPED' makes the lexer skip it.
export class WhiteSpace extends Token {
	static PATTERN = /\s+/;
	static GROUP = Lexer.SKIPPED;
}

export const allTokens = [WhiteSpace, // whitespace is normally very common so it should be placed first to speed up the lexer's performance
    Plus, Minus, Multi, Div, LParen, RParen, NumberLiteral, AdditionOperator, MultiplicationOperator];
