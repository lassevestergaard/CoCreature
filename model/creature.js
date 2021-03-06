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
    this.happinessLevel = 10;
    this.starvationLevel=20;
    this.message="Hi! I am the fox of UBISS. I am sad and hungry. Play with me and feed me!";

    this.feed = function(name){
        var happi=0;
        var starv=0;
    
        if(name.toLowerCase()=="broccoli"){
            happi=-5;
            starv=5;
            this.currentFoodGif=this.starvationLevel == 100 ? 2 : 0;
            this.message="I hate broccoli! Give me something real to eat..";
        }else if(name.toLowerCase()=="cake"){
            happi=5;
            starv=15;
            this.currentFoodGif=this.starvationLevel == 100 ? 2 : 1;
            this.message="Noms!";
        }else if(name.toLowerCase()=="fish"){
            happi=5;
            starv=15;
            this.currentFoodGif=this.starvationLevel == 100 ? 2 : 1;
            this.message="Noms!";
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
        this.starvationLevel -= (this.starvationLevel - playLevel/5) < 0 ? 0 : playLevel/5;
    }
    
    this.draw = function(){
        if(this.imgSrc=="")
            this.drawState("generalstate");
        return $("<img>", {src: this.imgSrc, class: "center-block creature"});
    }
    
    this.drawState = function(type, value=null){
        if(type.toLowerCase()=="generalstate"){
            this.imgSrc=this.stateImages[Math.floor((this.happinessLevel+this.starvationLevel)/50)];
        }else if(type.toLowerCase()=="play"){
            this.imgSrc=this.playImages[value];
            if(value==0)
                this.message="This is boring! Try to be faster";
            else if(value==1)
                this.message="This is so boring! Try to be faster!";
            else if(value==2)
                this.message="Whee! This is fun!!";
            else if(value==3)
                this.message="Whee! This game is fun!!";
        }else if(type.toLowerCase()=="playanimation"){
            this.imgSrc=this.gameAnimations[value];
            if(value==0)
                this.message="Let's play!!";
            else if(value==1)
                this.message="Getting hungry!";
            else if(value==2)
                this.message="You should practice more!";
            else if(value==3)
                this.message="GAME OVER! This was fun!";
            else if(value==4)
                this.message="GAME OVER! This was fun!";
        }else if(type.toLowerCase()=="feed"){
            this.imgSrc=this.feedings[this.currentFoodGif];
             if(value==0)
                this.message="Let's play!!";
            else if(value==1)
                this.message="Getting hungry!";
            else if(value==2)
                this.message="You should practice more!";
        }
    }
}





