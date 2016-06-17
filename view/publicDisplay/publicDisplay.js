var playerList=[];
var firstConnection = false;
var gameMode = false;

var GROUP_NAME = "coCreature";

var SERVER_ADDRESS = {host: "spaceify.net", port: 1979};
var WEBRTC_CONFIG = {"iceServers":[{url:"stun:kandela.tv"},{url :"turn:kandela.tv", username:"webrtcuser", credential:"jeejeejee"}]};

var ballReactionTime=0;

function TestScreen(){
    var self = this;
    var gameClient = new GameClient();
    var buttonPressCounter = 0;
    
    self.onButtonPressed = function(x, y, callerId, connectionId, callback){
        buttonPressCounter++;
        console.log("TestSreen::onButtonPressed() x: "+x+" y: "+y+" callerId: "+callerId+" connectionId: "+connectionId);
        document.getElementById("message").innerHTML = "Button pressed "+buttonPressCounter;
        
        callback(null, "Hello from screen "+ buttonPressCounter);
    };
	
	self.sendBallOut = function(x, y, callerId, connectionId, callback){
	    var date=new Date();
	    ballReactionTime=date.getTime();
		
		var id = playerList[Math.floor(Math.random()*playerList.length)];
		
		gameClient.callClientRpc(id, "onReceiveBall", [100,200], self, function(err, data) {
			//document.getElementById("reply").innerHTML= data;
		});
		
		//canvas = document.getElementById('myCanvas');
		//canvas.style.visibility = 'hidden';
		
		ballGame.movedownBall();
		
		console.log("ball sent");
	};
	
	//When receiving food
	self.onReceiveFood = function(title, callerId, connectionId, callback){
	    myCreature.feed(title);
	    myCreature.drawState("feed");
	    myWorld.draw();
	    myCreature.drawState("generalstate");
	    setTimeout(function(){myWorld.draw();},2000);
	}
	
	//When receiving the ball during a game
	self.onReceiveBall = function(playLevel, callerId, connectionId, callback){
		if (gameMode) {
		    var tDate=new Date();
		    var delay=tDate.getTime()-ballReactionTime;

		    myCreature.play(playLevel);
	    
		    if(delay>=3000 && delay<=4000)
		        myCreature.drawState("play",0);
		    else if (delay>=2000 && delay<3000)
		        myCreature.drawState("play",1);
		    else if (delay<2000)
		        myCreature.drawState("play",2);
	    
		    myWorld.draw();
	    
		    myCreature.drawState("generalstate");
		    setTimeout(function(){myWorld.draw();},2000);
		
			ballGame.tempScore += 1;
		
			document.getElementById("tempScoreScreen").innerHTML = ballGame.tempScore;
			//document.getElementById("hiScoreScreen").innerHTML = ballGame.hiScore;
			
			var canvas = document.getElementById('myCanvas');
			var pos = canvas.height + 70;
		
			console.log("pos:" + pos);
		
			ballGame.addBall(pos);
			ballGame.appearBallFromBottom();
		
			callback(null, "Hello from screen: ball received ");
		
			setTimeout(screen.sendBallOut, 2000);
		}
	    
	}
	
	/*self.onBallPressed = function(x, y, callerId, connectionId, callback){
		
		if (gameMode) {
			console.log("ball pressed");
			//canvas = document.getElementById('myCanvas');
			//canvas.style.visibility = 'visible';
		
			/*var canvas = document.getElementById('myCanvas');
			var pos = canvas.height + 70;
		
			console.log("pos:" + pos);
		
			ballGame.addBall(pos);
			ballGame.appearBallFromBottom();
		
			callback(null, "Hello from screen: ball received ");
		
			setTimeout(screen.sendBallOut, 1000);
		}
		
	};*/
	
	self.onGameButtonPressed = function(x, y, callerId, connectionId, callback){
		console.log("game button press received");
		
		if(playerList.length > 0 && gameMode != true){
			gameMode = true;
			
			ballGame.setupDisplayBall();
			ballGame.addBall(75);
			
			setTimeout(screen.sendBallOut, 3000);
			
			setTimeout(function(){
				//alert("gameover");
				
				if(ballGame.tempScore > ballGame.hiScore){
					ballGame.hiScore = ballGame.tempScore;
					document.getElementById("hiScoreScreen").innerHTML = ballGame.hiScore;
				}
			
				ballGame.tempScore = 0;
				
				gameMode = false;
				
                myCreature.drawState("playanimation", 4);
                console.log("myWorld.draw() - ");
                myWorld.draw();
                myCreature.drawState("generalstate");
                setTimeout(function(){myWorld.draw();},20000);
				
			}, 10000);
		}
	}
    
    self.onControllerConnected = function(id){
        playerList.push(id);
		
		if (firstConnection == false){
			firstConnection = true;
			//setTimeout(screen.sendBallOut, 3000);
		}
		
		//console.log("added. amount of controllers: " + controllerList.length);
	};
	
    self.onControllerDisconnected = function(id){
        for (i=0;i<playerList.length;i++){
            if(playerList[i]==id){
                playerList.splice(i,1);
                break;
            }
        }
		
		if(playerList.length < 1){
			gameMode = false;
			
			if(ballGame.tempScore > ballGame.hiScore){
				ballGame.hiScore = ballGame.tempScore;
				document.getElementById("hiScoreScreen").innerHTML = ballGame.hiScore;
			}
			
			ballGame.tempScore = 0;
		}
		
    };
	
    self.connect = function(){
        //gameClient.exposeRpcMethod( "onButtonPressed", self, self.onButtonPressed);
		
		//gameClient.exposeRpcMethod("onBallPressed", self, self.onBallPressed);
		gameClient.exposeRpcMethod("onReceiveFood", self, self.onReceiveFood);
		gameClient.exposeRpcMethod("onReceiveBall", self, self.onReceiveBall);
        gameClient.exposeRpcMethod("onGameButtonPressed", self, self.onGameButtonPressed);
		
        gameClient.setControllerConnectionListener(self, self.onControllerConnected);
        gameClient.setControllerDisconnectionListener(self, self.onControllerDisconnected);
        
        gameClient.connect(SERVER_ADDRESS.host, SERVER_ADDRESS.port, "screen", GROUP_NAME, function(){});
        
    };
}

