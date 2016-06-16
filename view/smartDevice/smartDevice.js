//Group name for development use
        
var GROUP_NAME = "coCreature";
        
var SERVER_ADDRESS = {host: "spaceify.net", port: 1979};
var WEBRTC_CONFIG = {"iceServers":[{url:"stun:kandela.tv"},{url :"turn:kandela.tv", username:"webrtcuser", credential:"jeejeejee"}]};

var screenId = null;
    
function TestController(){
    var self = this;
    var gameClient = null;
    
    self.connect = function(){
        gameClient = new GameClient();
		
		
		//expose function to receive ball
		gameClient.exposeRpcMethod("onReceiveBall", self, self.onBallReceived);
		
		
        gameClient.setScreenConnectionTypeListener(self, self.onScreenConnectionTypeUpdated);
        
        gameClient.setScreenConnectionListener(self, self.onScreenConnected);
        //Development connection
        gameClient.connect(SERVER_ADDRESS.host, SERVER_ADDRESS.port, "controller", GROUP_NAME, function(){});
        };
    
    self.sendButtonPress = function(){
        console.log("RpcController::sendButtonPress()");
        gameClient.callClientRpc(screenId, "onButtonPressed",[100,200], self, function(err, data){
            //document.getElementById("reply").innerHTML= data;
            });
        };
		
	self.sendBallPressed = function(){
		console.log("ball pressed");
			
		//canvas = document.getElementById('myCanvas');
		//canvas.style.visibility = 'hidden';
		
		gameClient.callClientRpc(screenId, "onBallPressed", [100,200], self, function(err, data){
			document.getElementById("reply").innerHTML = data;
		});		
			
		ballGame.moveupBall();
			
	};
		
	self.onBallReceived = function(){
		console.log("ball received");
		canvas = document.getElementById('myCanvas');
		//canvas.style.visibility = 'visible';
		
		var pos = 0 - 70;
		
		console.log("pos:" + pos);
		
		ballGame.addBall(pos);
		ballGame.appearBallFromTop();
		
		if ("vibrate" in navigator) {
			navigator.vibrate(500);
			//ballGame.sound.play(); //doesnt work.
		}
	};

        
    self.onScreenConnectionTypeUpdated = function(newConnectionType, screenId){
        console.log("RpcController::onScreenConnectionTypeUpdated() new connection type: " + newConnectionType);
        //document.getElementById("conntype").innerHTML = newConnectionType;
        };
    
    self.onScreenConnected = function(id){
        console.log("RpcController::onScreenConnected() screenId: " + id);
        screenId = id;
        };
    
    }