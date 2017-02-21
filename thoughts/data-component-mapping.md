Data <-> Component Mapping
--------------------------

- Treat actions on spell objects as implicit "events"
- Components can watch these events and perform actions
	- <Game game="klondike">
		on shuffle
			play sounds "shuffle-cards.wav"

		on move Card to Pile
			...how to do the animation... ???
