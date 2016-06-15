var myToolbox = new Toolbox("Tools of the world");
myToolbox.addTool(new Tool("pedding"));
myToolbox.addTool(new Tool("water"));
myToolbox.addTool(new Tool("bread"));
myToolbox.addTool(new Tool("axe"));

var myCreature = new Creature("Hans", 0);
var myWorld = new World("The new world", 10, 1, myCreature, myToolbox);

var playerList=[];


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
				
			self.connect = function(){
				gameClient.exposeRpcMethod( "onButtonPressed", self, self.onButtonPressed);
				
				gameClient.setControllerConnectionListener(self, self.onControllerConnected);
				gameClient.setControllerDisconnectionListener(self, self.onControllerDisconnected);
				
				gameClient.connect(SERVER_ADDRESS.host, SERVER_ADDRESS.port, "screen", GROUP_NAME, function(){});
				
			};
			
			self.onControllerConnected = function(id){
			    playerList.push(id);
            };
            
            self.onControllerDisconnected = function(id){
                for (i=0;i<playerList.length;i++){
                    if(playerList[i]==id){
                        playerList.plice(i,1);
                        break;
                    }
                }
            }
			
		}