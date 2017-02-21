Non-linear Parsing Strategies
-----------------------------

- Break down into lines / sentences
- Do keyword / preposition / operator matching to break each sentence up
- Series of smaller parser/recognizers rather than one monolithic one
- Use knowledge of what's in the world to guide recognition

- Keep intermediate output of parsing/scoping process as (JSON?) data to aid further parsing



Type file parsing strategies
----------------------------
- add imported types to class scope

- break into class definitions
	- add types to class scope

- for each class
	- extract methods & event handlers
		- add function signatures to class scope
		- update imports as necessary

	- extract out property definitions
		- add property signatures to class scope
		- update imports as necessary

- for each class
	- parse property initializers and add to prototype / constructor
	- parse free code and add to constructor

	- parse method definitions
		- create method scope which inherits from class scope
		- add variables to method scope
			- ???  `var` vs `let` vs `const` semantics?
			- NOTE: "it" and "the result" will change type frequently in method scope
			- figure out types
		- break into lines
		- break apart by keywords / prepositions / operators
			- match pieces individually, referring to method scope


What does a scope look like?
----------------------------
	{
		variables: { name => { type, source } },
		methods: { name => { types, returns, source } }
	}

- variables and methods both inherit from parent, eg
	- global scope is initialized w/ classes from "package file"	(save intermediate)
	- file scope is global scope + everything in the file			(save intermediate)
	- class scope is file scope + everything in the class			(save intermediate)
	- method scope is class scope + variables in the method			(not saved)

- when looking up variable or method
	- look to closest scope
	- if scope vars are untyped, use that
	- if scope vars are typed and type matches local type, use that
	- otherwise go up
	- when in doubt, ask


Visualization
-------------
- Need some way to visualize the scope so we can ask questions about it
