//># "Standard" US/French playing card setup.
//>- You can set `ace high` and `include jokers` when creating deck.
//>- If you want to subset the cards, redefine `Deck.ranks` in subset or new instance.

import Type from standard/Type
import Thing from standard/Thing
import List from standard/List

//>## Card type
export class Card extends Thing {
	// Class reflection semantics
	@prototype()
	Type = Card
	static Types = [Card, Thing]
	static name = "card"
	static names = "cards"
	static Name = "Card"
	static Names = "Cards"

//>	### Card identification
//>	deck as Deck
	@property({ type: Deck })
	deck = undefined

//>	suit as string
	@property({ type: String })
	suit = undefined

//>	rank as string
	@property({ type: String })
	rank = undefined

//>	key as string
	@property({ type: String })
	key = undefined

//>	### Creation
	constructor(properties) {
		Object.assign(this, properties)
//>	after creation
//>		my key = "{rank}-{suit}"
		this.key = `{{this.rank}}-{{this.suit}}`
	}

//>	### Card orientation as "up" or "down"
//>	direction as one of ("up", "down") with default "down"
	@property({ type: String, values: ["up", "down"] })
	direction = "down"

//>	expression Card is face up: direction of card is "up"
	@expression("<Card> is face up", { inverse: "<Card> is not face up", types: [ Card ], returns: Boolean })
	static is_face_up(card) {
		if (!(card instanceof Card)) return false
		return card.direction === "up"
	}

//>	expression Card is face down: direction of card is "down"
	@expression("<Card> is face down", { inverse: "<Card> is not face down", types: [ Card ], returns: Boolean })
	static is_face_up(card) {
		if (!(card instanceof Card)) return false
		return card.direction === "down"
	}


//>	### global actions to switch card orientation
//> action turn Card face up
	@action("turn <Card> face up", { types: [ Card ] })
	static turn_face_up(card) {
		if (!(card instanceof Card)) return false
//> 	set direction of card to "up"
		card.direction = "up"
		return true
	}

//>	action turn Card face down
	@action("turn <Card> face down", { types: [ Card ] })
	static turn_face_down(card) {
		if (!(card instanceof Card)) return false
//>		set direction of card to "down"
		card.direction = "down"
		return true
	}

//>	action turn Card over
	@action("turn <Card> over", { types: [ Card ] })
	static turn_over(card) {
		if (!(card instanceof Card)) return false
//>		if direction of card is "up" then turn card face down
		if (card.direction === "up") Card.turn_face_down(card)
//>		else turn card face up
		else Card.turn_face_up(card)
		return true
	}
}


// Register `Cards` as array of `Card`s and give them the same sematics.
export class Cards extends List {
	// restrict to Cards only
	nonempty = true
	types = [ Card ]

	// Class reflection semantics
	Type = Cards
	static Types = [Cards, List]
	static name = "cards"
	static names = "cards"
	static Name = "Cards"
	static Names = "Cards"

	// Plural accessors for each card in the list.
	get suits() { return Type.getProperty(this, "suit") }
	get ranks() { return Type.getProperty(this, "rank") }
	get keys() { return Type.getProperty(this, "key") }
	get directions() { return Type.getProperty(this, "direction") }

	@expression("<Cards> are face up", { inverse: "<Cards> are not face up", types: [ Cards ], returns: Boolean })
	static are_face_up(cards) {
		if (!(cards instanceof Cards)) return false
		return Type.booleanForAll(cards, Card.is_face_up)
	}

	@expression("<Cards> are face down", { inverse: "<Cards> are not face down", types: [ Cards ], returns: Boolean })
	static are_face_down(cards) {
		if (!(cards instanceof Cards)) return false
		return Type.booleanForAll(cards, Card.is_face_down)
	}

	@action("turn <Cards> face up", { types: [ Cards ] })
	static turn_face_up(cards) {
		if (!(cards instanceof Cards)) return false
		return Action.for_each(cards, Card.turn_face_up)
	}

	@action("turn <Cards> face down", { types: [ Cards ] })
	static turn_face_down(cards) {
		if (!(cards instanceof Cards)) return false
		return Action.for_each(cards, Card.turn_face_down)
	}

	@action("turn <Cards> over", { types: [ Cards ] })
	static turn_over(cards) {
		if (!(cards instanceof Cards)) return false
		return Action.for_each(cards, Card.turn_over)
	}
}




//> ## Pile
//> define type Pile as Cards
export class Pile extends Cards {
	// Class reflection semantics
	@prototype()
	Type = Pile
	static Types = [Pile, Cards, List]
	static name = "pile"
	static names = "piles"
	static Name = "Pile"
	static Names = "Piles"

//> name as text
	@property({ type: String })
	name: string

//> appearance as one of ("stacked", "staggered", "fanned") with default "stacked"
	@property({ type: String, values: ["stacked", "staggered", "fanned"] })
	appearance: string = "stacked"


//>	### Pile expressions
//> expression bottom card of Pile: the first item of pile
	@expression("bottom card of <Pile>", { types: [ Pile ], returns: Card })
	static bottom_card_of(pile: Pile): Card {
		if (!(pile instanceof Pile)) return undefined
		return List.first_item_of(pile);
	}

//> expression top card of Pile: the last item of pile
	@expression("top card of <Pile>", { types: [ Pile ], returns: Card })
	static top_card_of(pile: Pile): Card {
		if (!(pile instanceof Pile)) return undefined
		return List.last_item_of(pile);
	}

//>	### Pile expressions
//>	action shuffle Pile
	@action("shuffle <Pile>", { types: [ Pile ] })
	static shuffle(pile: Pile) {
		if (!(pile instanceof Pile)) return false
//>		turn pile face down
		Cards.turn_face_down(cards)
//>		randomize pile
		List.randomize(pile);
		return true
	}

//>	action flip Pile
	@action("flip <Pile>", { types: [ Pile ] })
	static flip(pile: Pile) {
		if (!(pile instanceof Pile)) return false
//>		turn pile face down
		Cards.turn_face_down(pile)
//>		reverse pile
		List.reverse(pile)
	}
}


//> ## Deck
//> - US standard card deck with optional jokers.
export class Deck as Pile {
	// Class reflection semantics
	@prototype()
	Type = Deck
	static Types = [Deck, Pile, Cards, List]
	static name = "deck"
	static names = "decks"
	static Name = "Deck"
	static Names = "Decks"

//>	### Ranks and suits
//>	ace high = no
	@property({ type: Boolean })
	ace_high = false

//>	ranks = ("ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king")
	@property({ type: Strings })
	ranks = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]

//>	suits = ("clubs", "diamonds", "hearts", "spades")
	@property({ type: Strings })
	suits = ["clubs", "diamonds", "hearts", "spades"]

//>	### Joker setup
//>	include jokers = no
	@property({ type: Boolean })
	include_jokers = false

//>	joker ranks = ("joker")
	@property({ type: Strings })
	joker_ranks = ["joker"]

//>	joker suits = ("red", "black")
	@property({ type: Strings })
	joker_suits = ["red", "black"]


//>	### When creating deck, create all cards
	constructor(properties) {
		Object.assign(this, properties)
//>	after creation
//>		make cards
		this.make_cards()
	}

//> ### Deck actions
//>	action make cards
//	NOTE: Implictly assigned to / called on deck since there is no qualifying variable.
	@action("make cards")
	make_cards() {
//>		if ace high then move "ace" to end of ranks
		if (this.ace_high) List.move_to_end(this.ranks, "ace")
//>		for each suit in suits
		for (let suit in this.suits) {
//>			for each rank in ranks
			for (let rank in this.ranks) {
//>				make card for this with suit and rank
				Deck.make_card_with_suit_and_rank(this, suit, rank)
			}
		}

//>		if include jokers
		if (this.include_jokers) {
//>			add joker ranks to ranks
			List.add(this.ranks, this._joker_ranks)
//>			add joker suits to suits
			List.add(this.suits, this._joker_suits)

//>			for each suit in joker suits
			for (let suit in this.joker_suits) {
//>				for each rank in joker ranks
				for (let rank in this.joker_ranks) {
//>					make card for this with suit and rank
					Deck.make_card_with_suit_and_rank(this, suit, rank)
				}
			}
		}
		return true
	}

//>	action make card for Deck with suit and rank
	@action("make card for <Deck> with <suit> and <rank>", { types: [ Deck, undefined, undefined ] })
	static make_card_with_suit_and_rank(deck, suit, rank) {
		if (!(deck instanceof Deck)) return undefined
//>		card = new Card with properties (deck, suit, rank)
		let card = new Card({ deck, suit, rank })
//>		add card to deck
		List.add(deck, card)
		return true
	}


//>	### Syntactic sugar for identifying cards
//>	- eg:  `card is a club` or `top card of pile is not a face card`
//>	expression Card is a club: suit of card is "clubs"
	@expression("<Card> is a club", { inverse: "<Card> is not a club", types: [ Card ], returns: Boolean })
	static is_a_club(card) {
		return card instanceof Card && card.suit === "clubs"
	}
	@expression("<Cards> are clubs", { inverse: "<Cards> are not clubs", types: [ Cards ], returns: Boolean })
	static are_clubs(cards) {
		if (!(cards instanceof Cards)) return false
		return List.every(cards, Deck.is_a_club)
	}


//>	expression Card is a diamond: suit of card is "diamonds"
	@expression("<Card> is a diamond", { inverse: "<Card> is not a diamond", types: [ Card ], returns: Boolean })
	static is_a_diamond(card) {
		return card instanceof Card && card.suit === "diamonds"
	}
	@expression("<Cards> are diamonds", { inverse: "<Cards> are not diamonds", types: [ Cards ], returns: Boolean })
	static are_diamonds(cards) {
		if (!(cards instanceof Cards)) return false
		return List.every(cards, Deck.is_a_diamond)
	}


//>	expression Card is a heart: suit of card is "hearts"
	@expression("<Card> is a heart", { inverse: "<Card> is not a heart", types: [ Card ], returns: Boolean })
	static is_a_heart(card) {
		return card instanceof Card && card.suit === "hearts"
	}
	@expression("<Cards> are hearts", { inverse: "<Cards> are not hearts", types: [ Cards ], returns: Boolean })
	static are_hearts(cards) {
		if (!(cards instanceof Cards)) return false
		return List.every(cards, Deck.is_a_heart)
	}


//>	expression Card is a spade: suit of card is "spades"
	@expression("<Card> is a spade", { inverse: "<Card> is not a spade", types: [ Card ], returns: Boolean })
	static is_a_spade(card) {
		return card instanceof Card && card.suit === "spades"
	}
	@expression("<Cards> are spades", { inverse: "<Cards> are not spades", types: [ Cards ], returns: Boolean })
	static are_spades(cards) {
		if (!(cards instanceof Cards)) return false
		return List.every(cards, Deck.is_a_spade)
	}

//>	expression Card is an ace: rank of card is "ace"
	@expression("<Card> is an ace", { inverse: "<Card> is not a ace", types: [ Card ], returns: Boolean })
	static is_an_ace(card) {
		return card instanceof Card && card.rank === "ace"
	}
	@expression("<Cards> are aces", { inverse: "<Cards> are not aces", types: [ Cards ], returns: Boolean })
	static are_aces(cards) {
		if (!(cards instanceof Cards)) return false
		return List.every(cards, Deck.is_a_ace)
	}

//>	expression Card is a jack: rank of card is "jack"
	@expression("<Card> is a jack", { inverse: "<Card> is not a jack", types: [ Card ], returns: Boolean })
	static is_a_jack(card) {
		return card instanceof Card && card.rank === "jack"
	}
	@expression("<Cards> are jacks", { inverse: "<Cards> are not jacks", types: [ Cards ], returns: Boolean })
	static are_jacks(cards) {
		if (!(cards instanceof Cards)) return false
		return List.every(cards, Deck.is_a_jack)
	}

//>	expression Card is a queen: rank of card is "queen"
	@expression("<Card> is a queen", { inverse: "<Card> is not a queen", types: [ Card ], returns: Boolean })
	static is_a_queen(card) {
		return card instanceof Card && card.rank === "queen"
	}
	@expression("<Cards> are queens", { inverse: "<Cards> are not queens", types: [ Cards ], returns: Boolean })
	static are_queens(cards) {
		if (!(cards instanceof Cards)) return false
		return List.every(cards, Deck.is_a_queen)
	}

//>	expression Card is a king: rank of card is "king"
	@expression("<Card> is a king", { inverse: "<Card> is not a king", types: [ Card ], returns: Boolean })
	static is_a_king(card) {
		return card instanceof Card && card.rank === "king"
	}
	@expression("<Cards> are kings", { inverse: "<Cards> are not kings", types: [ Cards ], returns: Boolean })
	static are_kings(cards) {
		if (!(cards instanceof Cards)) return false
		return List.every(cards, Deck.is_a_king)
	}

//>	expression Card is a joker: rank of card is "joker"
	@expression("<Card> is a joker", { inverse: "<Card> is not a joker", types: [ Card ], returns: Boolean })
	static is_a_joker(card) {
		return card instanceof Card && card.rank === "joker"
	}
	@expression("<Cards> are jokers", { inverse: "<Cards> are not jokers", types: [ Cards ], returns: Boolean })
	static are_jokers(cards) {
		if (!(cards instanceof Cards)) return false
		return List.every(cards, Deck.is_a_joker)
	}

//>	expression Card is a face card: rank of card is in ("jack", "queen", "king")
	@expression("<Card> is a face card", { inverse: "<Card> is not a face card", types: [ Card ], returns: Boolean })
	static is_a_face_card(card) {
		return card instanceof Card && ["jack", "queen", "king"].includes(card.rank)
	}
	@expression("<Cards> are face cards", { inverse: "<Cards> are not face cards", types: [ Cards ], returns: Boolean })
	static are_face_cards(cards) {
		if (!(cards instanceof Cards)) return false
		return List.every(cards, Deck.is_a_face_card)
	}

//>	expression Card is a number card: card is not a face card
	@expression("<Card> is a number card", { inverse: "<Card> is not a number card", types: [ Card ], returns: Boolean })
	static is_a_number_card(card) {
		return card instanceof Card && !Deck.is_not_a_face_card(card)
	}
	@expression("<Cards> are number cards", { inverse: "<Cards> are not nunber cards", types: [ Cards ], returns: Boolean })
	static are_number_cards(cards) {
		if (!(cards instanceof Cards)) return false
		return List.every(cards, Deck.is_a_number_card)
	}


//TODO: hoist to Card/Cards?
//>	expression color of Card
	@expression("color of <Card>", { types: [ Cards ], returns: String })
	static color_of_card(card): string {
		if (!(card instanceof Card)) return undefined;
//>		return "black" if suit of card is in ("clubs", "spades", "black")
		if (["clubs", "spades", "black"].includes(card.suit)) return "black'
//>		return "red"
		return "red"
	}
	@expression("colors of <Cards>", { types: [ Cards ], returns: Strings })
	static colors_of_cards(cards) {
		if (!(cards instanceof Cards)) return undefined
		return List.for_each(cards, Deck.color_of_card)
	}


//>	expression value of Card
	@expression("value of <Card>", { types: [ Card ], returns: Integer })
	static value_of_card(card): integer {
		if (!(card instanceof Card)) return undefined;
//>		ranks = ranks of deck of card
		let ranks = card.deck && card.deck.ranks
//>		return position of rank of card in ranks
		return List.position_of(ranks, card.rank);
	}
	@expression("values of <Cards>", { types: [ Cards ], returns: Integers })
	static values_of_cards(cards) {
		if (cards instanceof Cards) return List.for_each(cards, Deck.value_of_card)
	}

//>	expression name of Card
	@expression("name of <Card>")
	static name_of_card(card): string {
		if (!(card instanceof Card)) return undefined;
//>		suit = capitalize suit of card
		let suit = String.capitalize(card.suit)
//>		rank = capitalize rank of card
		let rank = String.capitalize(card.rank)
//>		if rank is "Joker" return "{suit} {rank}"
		if rank is "Joker" return `{{suit}} {{rank}}`
//>		return "{rank} of {suit}"
		return `{{rank}} of {{suit}}`
	}
	@expression("names of <Cards>", { types: [ Cards ], returns: Strings })
	static names_of_cards(cards) {
		if (cards instanceof Cards) return List.for_each(cards, Deck.name_of_card)
	}


}

