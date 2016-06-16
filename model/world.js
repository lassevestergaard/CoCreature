function World(name, trees, fertility, creature, drawDiv) {
    this.name = name;
    this.amountOfTrees = trees;
    
    //between 0 and 1
    this.fertilityLevel = fertility;
    this.creature=creature;
    this.drawingWindow=drawDiv;
    
    this.draw = function(){
        var temp=$("#"+this.drawingWindow);
        temp.empty();
        
        temp.append(this.creature.draw());
        
        var row=$("<div>",{class:"progressWrapper"});
        var cell1=$("<div>",{class:"col-lg-6"});
        var cell2=$("<div>",{class:"col-lg-6"});
        row.append(cell1);
        row.append(cell2);
        
        temp.append(row);
        
        
        //Happiness level
        var panel=$("<div>",{id:"happinessBar", class:"panel panel-default", style:"width:80%;"});
        var panelBody=$("<div>",{class:"panel-body"});
        
        var pText=$("<p>",{class:"text-left", text:"blab"});
        
        var progress=$("<div>",{class:"progress"});
        var progressBar=$("<div>",{style:"width:40%;", class:"progress-bar progress-bar-danger", role:"progressbar", "aria-valuenow":this.creature.generalState(), "aria-valuemin":0, "aria-valuemax":4});
        
        //panel.append(panelBody);
        //panelBody.append(progress);
        progress.append(progressBar);
        
        cell1.append(pText);
        cell1.append(progress);
        
        //cell1.append(panel);
        //temp.append(panel);
        
        
        //Hunger level
        var panel1=$("<div>",{id:"hungerBar", class:"panel panel-default pull-right", style:"width:80%;"});
        var panelBody1=$("<div>",{class:"panel-body"});
        var progress1=$("<div>",{class:"progress"});
        var progressBar1=$("<div>",{style:"width:40%;", class:"progress-bar progress-bar-danger", role:"progressbar", "aria-valuenow":this.creature.generalState(), "aria-valuemin":0, "aria-valuemax":4});
        
        panel1.append(panelBody1);
        panelBody1.append(progress1);
        progress1.append(progressBar1);
        
        cell2.append(panel1);
        //temp.append(panel1);
    }
}