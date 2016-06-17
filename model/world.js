function World(name, trees, fertility, creature, drawDiv) {
    this.name = name;
    this.amountOfTrees = trees;
    
    //between 0 and 1
    this.fertilityLevel = fertility;
    this.creature=creature;
    this.drawingWindow=drawDiv;
    
    this.draw = function(){
        var worldWindow=$("#"+this.drawingWindow);
        worldWindow.empty();
        
        var row=$("<div>",{class:"progressWrapper"});
        var cell1=$("<div>",{class:"col-lg-6"});
        var cell2=$("<div>",{class:"col-lg-6"});
        row.append(cell1);
        row.append(cell2);
        worldWindow.append(row);
        
        //Happiness level
        var pText=$("<h5>",{class:"text-left", text:"HAPPINESS"});
        cell1.append(pText);
        
        var progress=$("<div>",{class:"progress"});
        var progressBar=$("<div>",{style:"width:"+this.creature.happinessLevel+"%;", class:"progress-bar progress-bar-info", role:"progressbar", "aria-valuenow":this.creature.happinessLevel, "aria-valuemin":0, "aria-valuemax":100});
        progress.append(progressBar);
        cell1.append(progress);
        
        //Hunger level
        var pText1=$("<h5>",{class:"text-left", text:"ENERGY"});
        cell2.append(pText1);
        
        var progress1=$("<div>",{class:"progress"});
        var progressBar1=$("<div>",{style:"width:"+this.creature.starvationLevel+"%;", class:"progress-bar progress-bar-warning", role:"progressbar", "aria-valuenow":this.creature.starvationLevel, "aria-valuemin":0, "aria-valuemax":100});
        progress1.append(progressBar1);
        cell2.append(progress1);
        
        var speechBubble=$("<div>",{class:"speechBubble", text:this.creature.message});
        worldWindow.append(speechBubble);
        
        //Adding creature
        worldWindow.append(this.creature.draw());
    }
}