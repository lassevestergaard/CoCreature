function Creature(name, gender) {
    this.name = name;
    this.gender = gender;
    this.images=[];
    
    //between 0 and 1
    this.healthLevel = 1;
    
    //between 0 and 1
    this.knowledgeLevel = 0;
    
    //between 0 and 1
    this.empathyLevel = 0.5;
    
    //between 0 and 1
    this.happinessLevel = 0.5;
    
    //between 0 and 1
    this.starvationLevel=0.5;
    
    this.stateGranularity=5;
    this.maxState=2;
    
    this.feed = function(creature, tool){
        creature.starvationLevel += tool.efficiencyLevel;
    }
    
    this.pet = function(petLevel){
        this.happinessLevel += petLevel;
        this.empathyLevel += petLevel*0.5;
        this.healthLevel += petLevel*0.25;
    }
    
    this.slap = function(slapLevel){
        this.happinessLevel -= this.happinessLevel - slapLevel <0 ? 0 : slapLevel;
        this.empathyLevel -= this.empathyLevel - slapLevel*0.5 <0 ? 0 : slapLevel*0.5;
        this.healthLevel -= this.healthLevel - slapLevel*0.25 < 0 ? 0 : slapLevel*0.25;
    }
    
    this.play = function(playLevel){
        this.happinessLevel += playLevel;
        this.empathyLevel += playLevel*0.5;
        this.healthLevel += playLevel*0.25;
        this.knowledgeLevel += playLevel*0.1;
    }
    
    this.generalState = function(){
        var temp=Math.floor(this.happinessLevel+this.starvationLevel/(this.maxState/this.stateGranularity));
        return temp > 4 ? 4 : temp;
    }
    
    this.draw = function(){
        return $("<img>", {src: this.images[this.generalState()], class: "center-block creature"});
    }
}