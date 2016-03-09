var Timer= function($el, gameOverCallback) {
	this.gameOverCallback = gameOverCallback;
	this.seconds = 10;
	this.$el = $el;
	this.timing = false;

	this.display();
}

Timer.prototype.display = function() {
	startButton = "<button>Start</button>"
	timer = "<span>" + this.seconds +"</span>"
	var $timer = $(timer).addClass("timer");
	var $button = $(startButton).addClass("startButton");
	this.$el.append($timer);
	this.$el.append($button);
}

Timer.prototype.start = function() {
	this.timing = true;
	this.interval = setInterval(this.tick.bind(this), 1000)
	$('.startButton').text("Reset")
}

Timer.prototype.stop = function() {
	this.timing = false;
	this.gameOverCallback();
	clearInterval(this.interval);
	$(".timer").removeClass("runningOutOfTime")
	this.seconds = 10;
	$('.startButton').text("Start")
	this.updateTimer();
}

Timer.prototype.tick = function() {
	this.decrementSeconds();
	if (this.seconds === 10) {
		$(".timer").addClass("runningOutOfTime")
	} else if (this.seconds === 0) {
		this.stop();
	}
	this.updateTimer();
}

Timer.prototype.updateTimer = function() {
	var $timer = $(".timer");
	$timer.text(this.seconds);
}

Timer.prototype.toggleButton = function() {
	if (this.timing) {
		this.stop();
	} else {
		console.log("TIMING");
		this.start();
	}
}

Timer.prototype.decrementSeconds = function() {
	this.seconds -= 1;
}

module.exports = Timer;