function Ballgame(ballRadius, speed){
	
	this.radius = ballRadius;
	this.speed = speed;
	
	this.setupDisplayBall = function() {
		canvas = document.getElementById('myCanvas');
		context = canvas.getContext('2d');
		centerX = canvas.width / 2;
		centerY = canvas.height / 2;
		radius = this.radius;
	}
	
	this.setupControllerBall = function() {
		canvas = document.getElementById('myCanvas');
		context = canvas.getContext('2d');
		centerX = canvas.width / 2;
		centerY = -this.radius;
		radius = this.radius;
	}
	
	this.addBall = function(centerY) {
		
		console.log("in addBall: " + centerY);
		
		context.beginPath();
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		context.fillStyle = 'pink';
		context.fill();
		context.lineWidth = 4;
		context.strokeStyle = '#003300';
		context.stroke();
	};
	
	//addBall(centerY);
	
	this.movedownBall = function() {
		
		//console.log("centerY: " + centerY);
		
		if (centerY < canvas.height + 100) {
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			context.beginPath();
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			context.fillStyle = 'pink';
			context.fill();
			context.lineWidth = 4;
			context.strokeStyle = '#003300';
			context.stroke();

			centerY += 10;
			//context.fillStyle = "rgba(34,45,23,0.4)";
			//context.fillRect(0, 0, canvas.width, canvas.height);
			requestAnimationFrame(this.movedownBall.bind(this));
			//context.clearRect(0, 0, canvas.width, canvas.height);
		} else {
			context.clearRect(0, 0, canvas.width, canvas.height);
		}
	};
	
	this.appearBallFromBottom = function() {
		
		//console.log("centerY: " + centerY);
		
		if (centerY >= (canvas.height/2)) {
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			context.beginPath();
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			context.fillStyle = 'pink';
			context.fill();
			context.lineWidth = 4;
			context.strokeStyle = '#003300';
			context.stroke();

			centerY -= 10;
			requestAnimationFrame(this.appearBallFromBottom.bind(this));
			//context.clearRect(0, 0, canvas.width, canvas.height);
		}
	};
	
	this.moveupBall = function() {
		
		console.log("moveupBall: centerY: " + centerY);
		
		if (centerY > (0-radius)) {
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			context.beginPath();
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			context.fillStyle = 'pink';
			context.fill();
			context.lineWidth = 4;
			context.strokeStyle = '#003300';
			context.stroke();

			centerY -= 10;
			//context.fillStyle = "rgba(34,45,23,0.4)";
			//context.fillRect(0, 0, canvas.width, canvas.height);
			requestAnimationFrame(this.moveupBall.bind(this));
			//context.clearRect(0, 0, canvas.width, canvas.height);
		} else {
			context.clearRect(0, 0, canvas.width, canvas.height);
		}
		
	};
	
	// ball comes in/down from top:
	this.appearBallFromTop = function() {
		
		console.log("appearBall: centerY: " + centerY);
		
		if (centerY < (canvas.height/2)) {
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			context.beginPath();
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			context.fillStyle = 'pink';
			context.fill();
			context.lineWidth = 4;
			context.strokeStyle = '#003300';
			context.stroke();

			centerY += 10;
			requestAnimationFrame(this.appearBallFromTop.bind(this));
			//context.clearRect(0, 0, canvas.width, canvas.height);
		} else {
			//setTimeout(function(){alert("game over");}, 4000);
		}
	};
	
	/*
	this.sound = function() {

	    sound = document.createElement("audio");
	    sound.src = "../audio/Bow_Fire_Arrow.mp3";
	    sound.setAttribute("preload", "auto");
	    sound.setAttribute("controls", "none");
	    sound.style.display = "none";
		
	    document.body.appendChild(sound);
		
	    play = function(){
	        sound.play();
	    }
	    stop = function(){
	        sound.pause();
	    }
	}*/
}