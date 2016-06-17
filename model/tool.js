function Tool(name, img) {
    this.name = name;
    this.image = img;
    
    //between 0 and 1
    this.efficiencyLevel = 1;
    
    this.draw = function(){
        var tempImg = $("<img>", {src:this.image ,id:this.name, class: "tool"});
        tempImg.click(function(){
            controller.sendFood(tempImg.attr("id"));
            tempImg.addClass("hidden");
        });
        
        return tempImg;
    }
}