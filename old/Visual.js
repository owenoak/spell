new Class("Visual",
//
// ## Instance properties
//
{
	// ### mixins:
	//	- Loadable:  	all Visuals can be loaded by default.
	//	- Noticable:	all Visuals send notices as their state changes.
	mixins : "Loadable,Noticable",

	// ##### `visual.$root` (nodeList)
	// > Top-level elements which define our Visual.
	// > Initialized in `draw()`, updated by various routines.
	$root : undefined,


	// ##### `visual.$parent` (nodeList)
	// > Parent element which contains our Visual.
	// > If `null`, we're not in the DOM anywhere.
	// > Initialized in `draw()` to the `<body>` element if not previously set.
	$parent : undefined,


	// ##### `visual.isVisible` (boolean)
	// > Is this visual actually visible the screen?
	// > Note: this will return `false` if we're contained in another Visual and it is not visible.
	// > Note: this does NOT take scrolling of parents into account!
	isVisible : Getter(function() {
		if (!this.$parent || this.$parent.length === 0) return false;
		if (!this.$parent.isVisible()) return false;
		return this.$root != null && this.$root.isVisible();
	}),



	// ##### `visual.isShowing` (boolean)
	// > Does this visual think it's showing to the user?
	// > Note: this DOES take drawing into account (we won't report as visible if we haven't been drawn).
	// > Note: this does NOT take parent containment into account, see `visual.isVisible`.
	isShowing : Property.Boolean(
		get : function() {
			if (!this.hasBeenDrawn) return false;
			return this._private.isShowing;
		},
		set : function(newValue) {
			newValue = !!newValue;
			if (!this.hasBeenDrawn) {
				this._private.isShowing = newValue;
			} else {
				if (newValue !== this._private.isShowing) this.toggle(newValue);
			}
		},
		// default value assigned to our _private prototype
		_private : true
	),

	// ##### `visual.showEffect` (VisualEffect)
	// > Default visual effect used to show the Visual.
	// > Can be overridden in `show()` call.
	showEffect : Property.VisualEffect({
		value	: {type: "show", duration: 0}
	}),

	// ##### `visual.hideEffect` (VisualEffect)
	// > Default visual effect used to hide the Visual.
	// > Can be overridden in `hide()` call.
	hideEffect : Property.VisualEffect({
		value	: {type: "hide", duration: 0}
	}),

	// Events...
	onShowing : Property.Event(),
	onShown : Property.Event(),
	onParentShowing : Property.Event(),

	onHiding : Property.Event(),
	onHidden : Property.Event(),

	onDrawing : Property.Event(),
	onDrawn : Property.Event(),

	onUpdating : Property.Event(),
	onUpdated : Property.Event(),

	onUpdatingLayout : Property.Event(),
	onUpdatedLayout : Property.Event(),

	toggle : function(shouldShow, options) {
		if (shouldShow == null) 	shouldShow = !this.isShowing;
		else						shouldShow = !!shouldShow;
		if (shouldShow) 	this.show(options);
		else				this.hide(options);
	},


	// ##### `visual.show({effect})` => `Promise`
	// > Show the Visual, possibly with a specific visual effect.
	// > Note: the visual will be loaded and drawn automatically if necessary.
	show : function(options) {
		if (!options) options = {};
		if (options.effect == null) options.effect = this.showEffect;

		if (this.loadError) return this.showLoadingErrorMessage();

		if (this.isLoaded) return this._loadedAndReadyToShow(options);

		this.showLoadingMessage();
		return this.load()
					.then(this.bind(this._loadedAndReadyToShow, options));
				});
	},



	// ##### `visual._loadedAndReadyToShow()` => `Promise`
	_loadedAndReadyToShow : Property.Private(function(options) {
		this._private.isShowing = true;

		if (!this.hasBeenDrawn) 	this.draw(options);
		else						this.update(options);

		this.notify("showing", options);
		this.notifyChildren("parentShowing", options);

		this._setUpEvents();

		return this.doEffect(options.effect)
				.then(function() {
					this.notify("shown", options);
					this.notifyChildren("parentShown");
					this.updateLayout(options);
					this._private.isShowing = true;
					return this;
				}.bind(this));
	}),


	hide : function(options) {
		if (!this.hasBeenDrawn) return new Promise().resolve(this);

		if (!options) options = {};
		if (options.effect == null) options.effect = this.hideEffect;

		this.notifyChildren("parentHiding", options);
		this.notify("hiding", options);

		this._tearDownEvents();

		this._private.isShowing = false;
		this.doEffect(options.effect)
			.then(function() {
				this.notifyChildren("parentHidden", options);
				this.notify("hidden", options);
				this._private.isShowing = false;
			}.bind(this));
	},





	// Perform some visual effect on our $root element or some other element.
	doEffect : function(effect, $element) {
		if (!effect) effect = {};
		if ($element == null) $element = this.$root;

		if ($element) {
			if (effect.type === "show") {
				this.$root.show();
			} else if (effect.type === "hide") {
				this.$root.hide();
			} else {
				// magic happens...
				console.warn(this,".doEffect(",effect,",",$element,"): effect not understood");
			}
		}
		return new Promise().resolve();
	},



//
//	drawing
//

	rootTemplate : Property.Template("<div id='{{id}}' class='{{classes}}'></div>"),

	hasBeenDrawn : Property.Getter(function() {
		return this._private.hasBeenDrawn === true;
	}),

	// > Initial draw of your DOM elements.
	// > Will be called exactly once, to change things after drawing use `update()`.
	// > By default, we'll instatitate your `rootTemplate` if defined.
	draw : function(options) {
		// bail if we've already been drawn
		if (this.hasBeenDrawn) return;

		// if no root or we're to replace our root, create
		var $root, $parent;
		if (!this.$root || this.$root.booleanAttr("replace")) {
			$root = $(this.rootTemplate.expand(this));
		}

		// place us underneath our parent if necessary
		if (this.$root) {
			this.$root.replaceWith($root);
		} else {
			if (!this.$parent) this.$parent = $("body");
			this.$parent.append($root);
		}
		this.$root = $root;

		// perform initial draw of any of our children
		this.drawChildren(options);

		// note that we've finished drawing
		this._private.hasBeenDrawn = true;
	},

	// Perform initial draw of any children.
	// You'll override this to add custom widgets not specified in your HTML.
	drawChildren : function(options) {},


	update : function(options) {

	},

	updateChildren : function(options) {

	},

	updateLayout : function(options) {

	},

	// Clear our widget and its contents.
	// This will hide us if necessary, and remove our $root.
	// Use `clearChildren()` to clear any childen if you've created any.
	// Returns a promise which will be resolved when we're all gone.
	clear : function(options) {
		this.notify("clearing");
		return this.hide(options)
				   .then(function() {
				   		this.clearChildren(options);
						this.$root.remove();
						delete this.$root;
						this._private.hasBeenDrawn = false;
						this.notify("cleared");
				   }.bind(this));
	},

	clearChildren : function(options) {},

	// TODO: difference beetween clear() and destroy() ?
	destroy : function() {
		this.notify("destroying");
		this.clear()
			.then(function() {
				this.notify("destroyed");
				this.clearNotifiers();
			}.bind(this));
	},


//
//	notification
//
	observers : Property.InstanceMap(),

	observe : function(message, scope, handler) {
		if (!this.observers[message]) this.observers[message] = [];
		if (!handler) handler = "on" + message.capitalize();
		this.observers[message].add({scope:scope, handler:handler});
	},

	ignore : function(message, scope, handler) {
		if (!scope && !handler) {
			delete this.observers[message];
		} else {
			var observers = this.observers[message];
			if (!observers || observers.length === 0) return;
			observers.removeWhere(function(observer) {
				if (scope !== observer.scope) return false
				if (handler && observer.handler !== handler) return false;
				return true;
			});
			if (observers.length === 0) delete this.observers[message];
		}
	},

	notify : function(message, options) {
		var observers = this.observers[message];
		if (observers == null || observers.length === 0) return;
		observers.forEach(function(observer) {
			var handler = observer.handler;
			if (typeof handler === "string") handler = observer.scope[observer.handler];
			if (typeof handler !== "function") return;
			handler.apply(observer.scope, [this, options]);
		}, this);
	},

	notifyChildren : function(message, options) {
		this.children.forEach(function(child) {
			$(child).trigger(message, options);
		}.bind(this)),
	},

//
//	children
//
	children : Property.InstanceIndexedList({
		keyProperty : "id"
	}),

	addChild : function(child, index) {
		if (index == null) index = this.children.length;
		this.children.splice(child, 0, index);
		if (this.hasBeenDrawn) {
			if (!child.$parent) child.$parent = this.$body || this.$root;
			child.draw();observer
		}
	},

	removeChild : function(child) {

	},




//
//	loading semantics
//

	// Automatically show a message while loading our contents.
	loadingMessage : Property.Message(""),
	loadingMessageTemplate : Property.Template("<div id='{{id}}LoadingMessage' class='loadMessage'>{{loadingMessage}}</div>"),
	showLoadingMessage : function() {
		if (this.loadingMessage) {
			this.$loadingMessage = $(this.loadingMessageTemplate.expand(this));
			this.$root.parent().append(this.$loadingMessage);
		}
	},
	hideLoadingMessage : function() {
		if (this.$loadingMessage) {
			this.$loadingMessage.remove();
			delete this.$loadingMessage;
		}
	},


	// Automatically show a loading error message when there's an error loading our contents.
	loadingErrorMessage : Property.Message(""),
	loadingErrorMessageTemplate : Property.Template("<div id='{{id}}LoadingError' class='loadError'>{{loadingErrorMessage}}</div>"),
	showLoadingErrorMessage : function() {
		if (this.loadingErrorMessage) {
			this.$loadingErrorMessage = $(this.loadingErrorMessageTemplate.expand(this));
			this.$root.parent().append(this.$loadingErrorMessage);
		}
	},
	hideLoadingErrorMessage : function() {
		if (this.$loadingErrorMessage) {
			this.$loadingErrorMessage.remove();
			delete this.$loadingErrorMessage;
		}
	},


},
//
// ## Class properties
//
{

});	// end new Class("Visual")
