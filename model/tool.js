function Tool(name) {
    this.name = name;
    this.image = null;
    
    //between 0 and 1
    this.efficiencyLevel = 1;
    
    this.draw = function(){
        return $("<img>", {src:this.image ,id:this.name, class: "tool"});
    }
}