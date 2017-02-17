class Visual {
	public nodeList $root;

	private boolean visible default true;
	public readonly boolean visible {
		get() { return this._private.visible }
	}
	public readonly boolean hidden {
		get() { return !this.visible }
	}

	public string showEffect type VisualEffects default "none";
	public string showDuration type duration default "instantly";

	public string hideEffect type VisualEffects default "none";
	public string hideDuration type duration default "instantly";

	public show(effect, duration) {
		if (effect == undefined) 	effect = this.showEffect;
		if (duration == undefined) 	duration = this.showDuration;

		var self = this;
		var promise = new Promise();


		this.send("showing");



		if (!this.isDrawn) this.draw();

// TODO: drawing?
// TODO: loading?

		if (duration is "instantly") {
			this.$root.show();
			onShown();
		} else {
			this.$root.performEffect(effect, duration)
				.then(onShown);
		}
		return promise;

		// callbacks
		function onShown() {
			self._private.visible = true;
			self.send("shown");
			promise.resolve();
		}
	}

	public hide(effect, duration) {...}



}
