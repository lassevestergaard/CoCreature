var playerList=[];
var firstConnection = false;

var GROUP_NAME = "coCreature";
var SERVER_ADDRESS = {host: "spaceify.net", port: 1979};
var WEBRTC_CONFIG = {"iceServers":[{url:"stun:kandela.tv"},{url :"turn:kandela.tv", username:"webrtcuser", credential:"jeejeejee"}]};

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
		
		var id = playerList[Math.floor(Math.random()*playerList.length)];
		
		gameClient.callClientRpc(id, "onReceiveBall", [100,200], self, function(err, data) {
			//document.getElementById("reply").innerHTML= data;
		});
		
		//canvas = document.getElementById('myCanvas');
		//canvas.style.visibility = 'hidden';
		
		ballGame.movedownBall();
		
		console.log("ball sent");
	};
	
	
	self.onBallPressed = function(x, y, callerId, connectionId, callback){
		console.log("ball pressed");
		//canvas = document.getElementById('myCanvas');
		//canvas.style.visibility = 'visible';
		
		var canvas = document.getElementById('myCanvas');
		var pos = canvas.height + 70;
		
		console.log("pos:" + pos);
		
		addBall(pos);
		appearBall();
		
		callback(null, "Hello from screen: ball received ");
		
		
		setTimeout(screen.sendBallOut, 1500);
		
	};
    
    self.onControllerConnected = function(id){
        playerList.push(id);
		
		if (firstConnection == false){
			firstConnection = true;
			setTimeout(screen.sendBallOut, 3000);
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
    };
	
    self.connect = function(){
        //gameClient.exposeRpcMethod( "onButtonPressed", self, self.onButtonPressed);
		
		gameClient.exposeRpcMethod("onBallPressed", self, self.onBallPressed);
        
        gameClient.setControllerConnectionListener(self, self.onControllerConnected);
        gameClient.setControllerDisconnectionListener(self, self.onControllerDisconnected);
        
        gameClient.connect(SERVER_ADDRESS.host, SERVER_ADDRESS.port, "screen", GROUP_NAME, function(){});
        
    };
}

