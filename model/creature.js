function Creature(name, gender) {
    this.name = name;
    this.gender = gender;
    this.images=[];
    
    //between 0 and 100
    this.happinessLevel = 50;
    this.starvationLevel=50;

    this.feed = function(name){
        var happi=0;
        var starv=0;
    
        if(name.toLowerCase()=="broccoli"){
            happi=-5;
            starv=10
        }else if(name.toLowerCase()=="cake"){
            happi=5;
            starv=5
        }else if(name.toLowerCase()=="fish"){
            happi=5;
            starv=20
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
        console.log("!!!!!!!!!!!!!!");
        console.log(this.happinessLevel);
        console.log("!!!!!!!!!!!!!!");
        console.log(this.starvationLevel);
        console.log("!!!!!!!!!!!!!!");
        console.log(Math.floor((this.happinessLevel+this.starvationLevel)/50));
        console.log("!!!!!!!!!!!!!!");
        console.log(this.images[Math.floor((this.happinessLevel+this.starvationLevel)/50)]);
        console.log("!!!!!!!!!!!!!!");
    
        return $("<img>", {src: this.images[Math.floor((this.happinessLevel+this.starvationLevel)/50)], class: "center-block creature"});
    }
}