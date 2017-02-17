# Klondike Solitaire Card Game
- Automatically moves cards to foundation piles (aces).
- See [wikipedia](https://en.wikipedia.org/wiki/Klondike_(solitaire)) for naming conventions.

## Package setup
```
import Card, Deck, Pile from standard/games/Cards
```


## Game setup
```
define type Klondike
	### Deck
	deck = new Deck
	score = 0

	### Start game on creation
	after creation
		start game

	### Game Play

	to start game
		turn deck face down
		move deck to stock pile
		shuffle deck
		deal cards

	to deal cards
		repeat with row as 1 to 7
			turn top card of stock pile over
			repeat with column as row to 7
				move top card of stock pile to item column of tableaus
		play from stock

	to move Card to Pile
		current pile = the pile of card
		if current pile is not empty
			remove card from current pile

		add card to pile
		set the pile of card to pile

		// scoring
		if current pile is waste pile
			if pile is in tableaus
				add 5 to score
			else if pile is in foundations
				add 10 to score

		else if current pile is in tableus
			if pile is in foundations
				add 5 to score

		else if current pile is in foundations
			if pile is in tableaus
				subtract 10 from score


	to move Cards to Pile
		for each card in cards
			move card to pile


	#### Click on card in tableau or waste pile
	to attempt to play Card
		put back active pile
		return no if can not pick up card

		for each pile in tableaus
			if can play card on pile
				cards = items of pile starting with card
				move cards to pile
				return yes

		return no


	#### Drag and dop events
	to pick up Card
		put back active pile
		return no if can not pick up card

		pile = pile of card
		cards = items of pile starting with card
		move cards to active pile
		set active source to pile
		return yes

	to drop active cards on Pile
		return no if active pile is empty
		return no if length of active pile > 1 and pile is in foundations

		card = bottom card of active pile
		return no if can not play card on pile

		move active pile to pile
		return yes


	#### Legal moves
	expression can pick up Card
		pile = pile of card
		return no if pile is not in tableaus or pile is not waste pile
		return no if appearance of pile is "stacked" and card is not top card of pile
		return no if card is face down
		return yes

	expression can play Card on Pile
		top card = top card of pile
		pile value = value of top card if pile is not empty otherwise 0
		pile color = color of top card if pile is not empty otherwise undefined

		if pile is in foundations
			return yes if ¬
				suit of card is name of pile and
				value of card is pile value + 1

		if pile is in tableaus
			return yes if ¬
				pile is empty and ¬
				card is a king

			return yes if ¬
				pile color is not color of card and ¬
				value of card is pile value + 1

		return no



	### Auto Play
	auto play to foundations = yes
	auto play piles = (waste pile) + tableaus

	#### Move to aces and turn over face down cards automatically
	to auto play cards
		for each pile in auto play piles
			if auto play top card of pile
				// recurse on success
				auto play cards
				return

	to auto play Card
		if card is face down
			turn card face up
			return yes

		if auto play to foundations
			foundation = first item in foundations where name of pile is suit of card
			if can play card on foundation
				move card to foundation
				return yes

		return no


	#### Winning
	expression they won
		for each pile in foundations
			if size of pile is less than 13 return no
		return yes


	### Create piles for the game

	#### Create stock pile (unplayed cards) and waste pile (new cards in play)
	stock pile = new Pile with name "stock"
	waste pile = new Pile with name "waste"

	to play from stock
		return no if stock pile is empty
		repeat 3 times
			if stock pile is not empty
				turn over top card of stock pile
				move top card of stock pile to waste pile
		auto play cards
		return yes

	to reset stock
		flip waste pile
		move waste pile to stock pile


	#### Create tableau piles (where you play cards)
	tableaus = new Piles
	repeat with index from 1 to 7
		get new Pile with name "Tableau{index}" and appearance "staggered"
		add it to tableaus


	#### Create foundation piles (aces)
	foundations = (
		new Pile with name "clubs",
		new Pile with name "diamonds",
		new Pile with name "hearts",
		new Pile with name "spades"
	)


	##### Create `active pile` (what we move)
	active pile = new Pile with name "active"
	##### Create `active source` (where cards in active pile CAME from)
	active source as Pile

	to put back active pile
		if active pile is not empty
			move active pile to active source
```
