function Creature(name, gender) {
    this.name = name;
    this.gender = gender;
    this.stateImages=[];
    this.playImages=[];
    this.feedings=[];
    this.gameAnimations=[];
    this.currentFoodGif=-1;
    this.imgSrc="";
    
    //between 0 and 100
    this.happinessLevel = 50;
    this.starvationLevel=50;

    this.feed = function(name){
        var happi=0;
        var starv=0;
    
        if(name.toLowerCase()=="broccoli"){
            happi=-5;
            starv=10;
            this.currentFoodGif=this.starvationLevel == 100 ? 2 : 0;
        }else if(name.toLowerCase()=="cake"){
            happi=5;
            starv=5;
            this.currentFoodGif=this.starvationLevel == 100 ? 2 : 1;
        }else if(name.toLowerCase()=="fish"){
            happi=5;
            starv=20;
            this.currentFoodGif=this.starvationLevel == 100 ? 2 : 1;
        }
        
        this.starvationLevel += starv;
        if(this.starvationLevel > 100)
            this.starvationLevel=100;
        else if (this.starvationLevel < 0)
            this.starvationLevel=0;
        
        this.happinessLevel += happi;
        if(this.happinessLevel > 100)
            this.happinessLevel=100;
        else if (this.happinessLevel < 0)
            this.happinessLevel=0;
    }
    
    this.play = function(playLevel){
        this.happinessLevel += (this.happinessLevel + playLevel) > 100 ? 0 : playLevel;
        this.starvationLevel -= (this.starvationLevel - playLevel/3) < 0 ? 0 : playLevel/3;
    }
    
    this.draw = function(){
        if(this.imgSrc=="")
            this.drawState("generalstate");
        return $("<img>", {src: this.imgSrc, class: "center-block creature"});
    }
    
    this.drawState = function(type, value=null){
        if(type.toLowerCase()=="generalstate")
            this.imgSrc=this.stateImages[Math.floor((this.happinessLevel+this.starvationLevel)/50)];
        else if(type.toLowerCase()=="play")
            this.imgSrc=this.playImages[value];
        else if(type.toLowerCase()=="playanimation")
            this.imgSrc=this.gameAnimations[value];
        else if(type.toLowerCase()=="feed"){
            this.imgSrc=this.feedings[this.currentFoodGif];
        }
    }
}