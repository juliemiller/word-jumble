var Timer= function($el, gameOverCallback) {
	this.gameOverCallback = gameOverCallback;
	this.seconds = 60;
	this.$el = $el;
	this.timing = false;

	this.display();
}

Timer.prototype.display = function() {
	startButton = "<button>Start Game</button>"
	if (this.seconds === 60) {
		var seconds = "1:00";
	}
	if (this.seconds < 60) {
		var seconds = "0:"+ this.seconds;
	} else if (this.seconds < 10) {
		var seconds = "0:0" + this.seconds;
	}
	timer = "<span> Time: " + seconds +"</span>"
	var $timer = $(timer).addClass("timer");
	var $button = $(startButton).addClass("startButton");
	this.$el.append($timer);
	this.$el.append($button);
}

Timer.prototype.start = function() {
	this.timing = true;
	this.interval = setInterval(this.tick.bind(this), 1000)
	$('.startButton').text("Reset Game")
}

Timer.prototype.stop = function() {
	this.timing = false;
	this.gameOverCallback();
	clearInterval(this.interval);
	$(".timer").removeClass("runningOutOfTime")
	this.seconds = 60;
	$('.startButton').text("Start Game")
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
	if (this.seconds === 60) {
		var seconds = "Time: 1:00";
	} else if (this.seconds < 60) {
		var seconds = "Time: 0:"+ this.seconds;
	} else if (this.seconds < 10) {
		var seconds = "Time: 0:0" + this.seconds;
	}
	$timer.text(seconds);
}

Timer.prototype.toggleButton = function() {
	if (this.timing) {
		this.stop();
	} else {
		this.start();
	}
}

Timer.prototype.decrementSeconds = function() {
	this.seconds -= 1;
}

module.exports = Timer;