//> # Klondike Solitaire Card Game
//> - Automatically moves cards to foundation piles (aces).
//> - See [wikipedia](https://en.wikipedia.org/wiki/Klondike_(solitaire)) for naming conventions.

//>## Package setup
//>import Card, Deck, Pile from standard/games/Cards
import Card, Cards, Deck, Decks, Pile, Piles from "standard/games/Cards"

//>## Game setup
//>define type Klondike
export class Klondike {
//>	### Deck
//>	deck = new Deck
	@property({ type: Deck })
	deck = new Deck()

//>	score = 0
	@property({ type: Integer })
	score = 0


//>	### Start game on creation
	constructor(properties) {
		Object.assign(this, properties)
//>	after creation
//>		start game
		this.start_game()
	}


//>	### Game Play

//>	action start game
	@action("start game")
	start_game() {
//>		turn deck face down
		Cards.turn_face_down(this.deck)
//>		move deck to stock pile
		this.move_cards_to_pile(this.deck, this.stock_pile)
//>		shuffle deck
		Deck.shuffle(this.deck)
//>		deal cards
		this.deal_cards()
	}

//>	action deal cards
	@action("deal cards")
	deal_cards() {
//>		repeat with row as 1 to 7
		for (let row = 1; row <= 7; row++) {
//>			turn top card of stock_pile over
			Card.turn_over(Pile.top_card_of(this.stock_pile))
//>			repeat with column as row to 7
			for (let column = 1; column <= 7; column++) {
//>				move top card of stock_pile to item column of tableaus
				this.move_card_to_pile(Pile.top_card_of(this.stock_pile), List.item(this.tableaus, column))
//>		play from stock
		this.play_from_stock()
		return true
	}

//>	action move Card to Pile
	@action("move <Card> to <Pile>", { types: [ Card, Pile ] })
	move_card_to_pile(card, pile) {
//>		current pile = the pile of card
		let current_pile = card.pile
//>		if current pile is not empty
		if (!List.is_empty(current_pile))
//>			remove card from current pile
			List.remove(current_pile, card)

//>		add card to pile
		List.add(pile, card)
//>		set the pile of card to pile
		card.pile = pile

//>		// scoring
//>		if current pile is waste pile
		if (current_pile === this.waste_pile) {
//>			if pile is in tableaus
			if (List.is_in(this.tableaus, pile)) {
//>				add 5 to score
				this.score += 5
//>			else if pile is in foundations
			} else if (List.is_in(this.foundations, pile))
//>				add 10 to score
				this.score += 10
			}
		}

//>		else if current pile is in tableus
		} else if (List.is_in(this.tableaus, current_pile)) {
//>			if pile is in foundations
			if (List.is_in(this.foundations, pile)) {
//>				add 5 to score
				this.score += 5
			}

//>		else if current pile is in foundations
		} else if (List.is_in(this.foundations, current_pile))
//>			if pile is in tableaus
			if (List.is_in(this.tableaus, åpile)) {
//>				subtract 10 from score
				this.score -= 10
			}
		}
		return true
	}

//>	action move Cards to Pile
	@action("move <Cards> to <Pile>", { types: [ Cards, Pile ] })
	move_cards_to_pile(cards, pile) {
//>		for each card in Cards
		for (let card in cards) {
//>			move card to pile
			this.move_card_to_pile(card, pile)
		}
		return true
	}


//>	#### Click on card in tableau or waste_pile
//>	action attempt to play Card
	@action("attempt to play <Card>", { types: [ Card ] })
	attempt_to_play_card(card) {
//>		put back active pile
		this.put_back_active_pile()
//>		return no if can not pick up card
		if (!this.can_pick_up_card(card)) return false

//>		for each pile in tableaus
		for (let pile in this.tableaus) {
//>			if can play card on pile
			if (this.can_play_card_on_pile(card, pile)) {
//>				cards = items of pile starting with card
				let cards = List.items_starting_with(pile, card)
//>				move cards to pile
				this.move_cards_to_pile(cards, pile)
//>				return yes
				return true
			}
		}

//>		return no
		return false
	}


//>	#### Drag and dop events
//>	action pick up Card
	@action("pick up <Card>", { types: [ Card ] })
	pick_up(card) {
//>		put back active pile
		this.put_back_active_pile()
//>		return no if can not pick up card
		if (!this.can_pick_up_card(card)) return false

//>		pile = pile of card
		let pile = card.pile
//>		cards = items of pile starting with card
		let cards = List.items_starting_with(pile, card)
//>		move cards to active pile
		this.move_card_to_pile(this.active_pile)
//>		set active source to pile
		this.active_source = pile
//>		return yes
		return true
	}


//>	action drop active cards on Pile
	@action("drop active cards on <Pile>", { types: [ Pile ] })
	drop_active_cards_on(pile) {
//>		return no if active pile is empty
		if (List.is_empty(this.active_pile)) return false
//>		return no if length of active pile > 1 and pile is in foundations
		if (List.length_of(this.active_pile) > 1 && List.is_in(foundations, pile)) return false

//>		card = bottom card of active pile
		card = Pile.bottom_card_of(this.active_pile)
//>		return no if can not play card on pile
		if (!this.can_play_card_on_pile(card, pile)) return false

//>		move active pile to pile
		this.move_cards_to_pile(this.active_pile, pile)
//>		return yes
		return true
	}


//>	#### Legal moves
//>	can pick up Card
	@expression("can pick up <Card>", { inverse: "can not pick up <Card>", types: [ Card ], returns: Boolean })
	can_pick_up_card(card) {
//>		pile = pile of card
		let pile = card.pile
//>		return no if pile is stock_pile
		if (pile === this.stock_pile) return false
//>		return no if appearance of pile is "stacked" and card is not top card of pile
		if (pile.appearance === "stacked" && card !== Pile.top_card_of(pile)) return false
//>		return no if card is face down
		if (Card.is_face_down(card)) return false
//>		return yes
		return true
	}

	@expression("can play <Card> on <Pile>", { inverse: "can not play <Card> on <Pile>", types: [ Card, Pile ], returns: Boolean })
//>	can play Card on Pile
	can_play_card_on_pile(card, pile) {
//>		top card = top card of pile
		let top_card = Pile.top_card_of(pile)
//>		pile value = value of top card if pile is not empty otherwise 0
		let pile_value = !List.is_empty(pile) ? Deck.value_of_card(top_card) : 0
//>		pile color = color of top card if pile is not empty otherwise undefined
		let pile_color = !List.is_empty(pile) ? Deck.color_of_card(top_card) : undefined

//>		if pile is in foundations
		if (List.is_in(this.foundations, pile)) {
//>			return yes if ¬
//>				suit of card is name of pile and
//>				value of card is pile value + 1
			if (card.suit === pile.name && Deck.value_of_card(card) === pile_value + 1) return true
		}

//>		if pile is in tableaus
		if (List.is_in(this.tableaus, pile)) {
//>			return yes if ¬
//>				pile is empty and ¬
//>				card is a king
			if (List.is_empty(pile) && Deck.card_is_a_king(card)) return true

//>			return yes if ¬
//>				pile color is not color of card and ¬
//>				value of card is pile value + 1
			if (pile_color !== Deck.color_of_card(card) && Deck.value_of_card(card) === pile_value + 1) return true
		}
//>		return no
		return false
	}



//>	### Auto Play
//>	auto play to foundations = yes
	@property({ type: Boolean })
	auto_play_to_foundations = true

//>	auto play piles = (waste_pile) + tableaus
	@property({ type: Piles })
	auto_play_piles = [ this.waste_pile ].concat(this.tableaus)

//>	#### Move to aces and turn over face down cards automatically
//>	action auto play cards
	@action("auto play cards")
	auto_play_cards() {
//>		for each pile in auto play piles
		for (let pile in this.auto_play_piles) {
//>			if auto play top card of pile
			if (this.auto_play_card(Pile.top_card_of(pile)) {
//>				// recurse on success
//>				auto play cards
				this.auto_play_cards()
//>				return
				return
			}
		}
	}

//>	action auto play Card
	@action("auto play <Card>", types: [ Card ])
	auto_play_card(card) {
//>		if card is face down
		if (Card.is_face_down(card)) {
//>			turn card face up
			Card.turn_face_up(card)
//>			return yes
			return true
		}

//>		if auto play to foundations
		if (this.auto_play_to_foundations) {
//>			foundation = first item in foundations where name of pile is suit of card
			let foundation = List.first_item_of(List.items_where(this.foundations, (pile) => pile.name === card.suit))
//>			if can play card on foundation
			if (this.can_play_card_on_pile(card, foundation) {
//>				move card to foundation
				this.move_card_to_pile(card, foundation)
//>				return yes
				return true
			}
		}

//>		return no
		return false
	}


//>	#### Winning
//>	expression they won
	@expression("they won")
	they_won() {
//>		for each pile in foundations
		for (let pile in this.foundations) {
//>			if size of pile is less than 13 return no
			if (List.length_of(pile) < 13) return false
//>		return yes
		return true
	}

//>	### Create piles for the game

//>	#### Create stock pile (unplayed cards) and waste pile (new cards in play)
	stock_pile = new Pile({ name: "stock" })
	waste_pile = new Pile({ name: "waste" })

//>	action play from stock
//	NOTE: Implictly assigned to / called on Klondike since there is no qualifying variable.
	@action("play from stock")
	play_from_stock() {
//>		return no if stock pile is empty
		if (List.is_empty(this.stock_pile)) return false
//>		repeat 3 times
		for (let i = 0; i < 3; i++) {
//>			if stock pile is not empty
			if (stock_pile is not empty) {
//>				turn over top card of stock pile
				Card.turn_over(Pile.top_card_of(this.stock_pile))
//>				move top card of stock pile to waste pile
				this.move_card_to_pile(Pile.top_card_of(this.stock_pile), this.waste_pile)
			}
		}
//>		auto play cards
		this.auto_play_cards()
//>		return yes
		return true
	}

//>	action reset stock
	@action("reset_stock")
	reset_stock() {
//>		flip waste pile
		Pile.flip(this.waste_pile)
//>		move waste pile to stock pile
		this.move_cards_to_pile(this.waste_pile, this.stock_pile)
	}


//>	#### Create tableau piles (where you play cards)
//>	tableaus = new Piles
	@property({ type: Piles })
	tableaus = new Piles()
//TODO: the following must move to constructor to be legal javascript
//>	repeat with index from 1 to 7
	for (let index = 1; index <= 7; index++) {
//>		get new Pile with name "Tableau{index}" and appearance "staggered"
		let it = new Pile({ name: `Tableau{{index}}`, appearance: "staggered" })
//>		add it to tableaus
		tableaus.add(it)
	}

//>	#### Create foundation piles (aces)
//>	foundations = (
	@property({ type: Piles })
	foundations = new Piles({ items: [
//>		new Pile with name "clubs",
		new Pile({ name: "clubs" }),
//>		new Pile with name "diamonds",
		new Pile({ name: "diamonds" }),
//>		new Pile with name "hearts",
		new Pile({ name: "hearts" }),
//>		new Pile with name "spades"
		new Pile({ name: "spades" })
//>	)
	]})


//>	##### Create `active pile` (what we move)
//>	active pile = new Pile with name "active"
	@property({ type: Pile })
	active_pile : Pile = new Pile({ name: "active" })
//>	##### Create `active source` (where cards in active pile CAME from)
//>	active source as Pile
	@property({ type: Pile })
	active_source: Pile

//> 	action put back active pile
	@action("put back active pile")
	put_back_active_pile() {
//>		if active pile is not empty
		if (!List.is_empty(this.active_pile)) {
//>			move active pile to active source
			this.move_cards_to_pile(cards, this.active_source)
		}
	}

}
