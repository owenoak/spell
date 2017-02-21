Thoughts on scoping and ambiguity
---------------------------------

- We're using the mental model that we're structuring a world of objects
	- defining types and collections
	- creating named instances of the above in relation to each other
	- placing them in nested contexts

- Scoping is one of the hardest things in modern programming to understand.  It's very easy for humans to extrapolate the use of some word into a larger context, but traditional languages are very bad at this.

- Traditional parsers don't have any concept of where the code is being executed -- every bit of the (small) language must be able to work in any sitution.

- With Spell, we're trying to do something different -- allow for a very rich, extendable language that feels natural to use.  We'll use the context of where code is defined to help interpret it.

- Assume that "types" in a project are all known.
- Assume that code expresses these types (often implicitly).
- Assume that in any given file, we can know what types are used in that file.
- We can construct a "mini-language" for each file / context using only those types.
- Concepts defined in the file will "win" over the same concept defined elsewhere.

- Concept of nested scopes
	- global (project) scope
	- file (imports) scope
	- class scope
	- method scope

- When we run across an identifier, we can look up the scope tree to see what they mean, with the lowest/closest one "winning"

	`pile = the pile of the card`
	`set the location of the pile to the mouse location`	<- `the pile` refers to the global


	`the first player`		<= references `players` as a list of People defined in global scope





