# MOVIE SCENARIO:  make a game

- "make a new game..."
	- creates a green blank field in slightly isometric perspective
- "... called 'Solitaire'"
	- "called" brings up a data entry field with "Untitled Game"
	- fill in with "Solitaire"
- "ok"

- "a card is..."
	- "new type 'Card'" dialog appears on the screen
- "...a flat rectangular object..."
	- link from new type dialog to new object, floating above the board
	- reach in with fingers, sizing it to the right dimensions
- "...with rounded corners."
	- reach in an adjust rounding on corners
- "ok"

- "a deck is..."
	- new type 'Deck' dialog
- "...a set of cards..."
	- show a hazy pile of cards
- "...with suits 'clubs', 'diamonds', 'hearts', 'spades'..."
	- add 'suits' slot to deck info dialog
	- when first suit is announced
		- add a breakout table of suits
	- as each suit is announced:
		- add <suit> to breakout table
		- add a new hazy pile of cards with link back to suit in breakout table
- "...and ranks 'ace', '2', ...., 'jack', 'queen', 'king'"
	- add 'ranks' slot & breakout table
	- as each '<rank>' is announced
		- add entry to breakout table
		- add new cards in a grid (going down)
		- link from breakout table entry to row (underneath all cards in the row)
- "ok"


- "the label of a card..."
	- show "card type' dialog with 'suit' and 'rank'
	- add 'label' entry dialog
- "...is (air quotes) the rank of the card (/air quites) <dash> (air quotes) the card's suit (/air quotes)"
	- add above to dialog
	- while speaking, add label text to each card
- "ok"


- "the color of a card..."
	- show card type dialog with new entry 'color'
- "...is 'black' if the suit of the card"...
	- pull cards into piles by suit
- "...is "clubs" or "spades"..."
	- lines connect 'color.black' to 'clubs' pile and 'spades' pile (maybe highlight?)
- "...and is 'red' if the suit is 'diamonds' or 'hearts'"
	- lines connect 'color.red' to 'diamonds' pile and 'hearts' pile
- "ok"

- "the back of each card..."
	- zoom deck together
	- flip all cards over
	- zoom one card into focus
- "...shows a pattern"
	- bring up pattern dialog, page through to find a good one and assign
- "ok"
	- zoom back into pile

///TODO
- "the front of each card..."
	- flip over cards while spreading into grid
- "...shows images from folder ..."
	- bring up image dialog, page to /games/cards/ace
- "...with the label of the card..."
	- add image to each card in sequence
- "ok"
	- pull cards back into deck


// TODO: turn face up, turn face down, turn over


### Define pile type
- "a pile is..."
	- new type dialog "pile"
- "...a stack of cards..."
	- show hazy set of cards
- "ok"

- "to flip a pile over..."
	- "turn each card in pile face down"
	- "reverse cards in pile"


### Create foundations
- "for each suit in the deck..."
- "...create a (air quotes) foundation (/air quotes) pile..."
- "...with the suit"

- "the foundation of a card...
	- zoom in on one card
- "...is the pile with the same suit"
	- link from card to its foundation
- "ok"

- "add rule..."
- "...a card can move to its foundation..."
- "...if the foundation is empty and the card is an ace..."
- "...or if the rank of the card is one more than the rank of the top card of the foundation"

#### Auto-play to foundations
- "add rule..."
- "...if a card can move to its foundation..."
- "...move the card to its foundation"


### Create tableaus
- "create seven (air quotes) tableau (/air quotes) piles"
- move piles into place

- "add rule..."
- "...a card can play to a tableau pile.."
- "...if the pile is empty and the card is of rank "king"..."
- "...or if the color of the card is not the color of the top card of the pile..."
- "...and the rank of the card is one more than the rank of the top card of the pile"


// TODO: this is just the initial deck, right?
### Create stock pile
- "create a (air quotes) stock (/air quotes) pile"

// TODO: need a better name!
### Create waste pile
- "create a (air quotes) waste (/air quotes) pile"

### stock / waste actions
- "to reset the stock pile:"
	- "flip the waste pile over'
	- "add the waste pile to the stock pile"

	- "watch me"
		- right-click on waste pile "flip over"
		- move to stock pile

- "to play from the stock pile"
	- repeat three times"
		- "if the stock pile is not empty"
			- "turn over the top card of the stock pile"
			- "move the top card of the stock pile to the waste pile"
	- "watch me"
		- right-click on stock, "flip over"
		- move to waste pile
		- right-click on stock, "flip over"
		- move to waste pile
		- right-click on stock, "flip over"
		- move to waste pile



