function Toolbox(name) {
    this.name = name;
    this.tools = [];

    this.addTool=function(tool){
        this.tools.push(tool);
    }
    
    this.removeTool=function(toolName){
        for (i=0; i<this.tools.length;i++){
            if(this.tools[i]==toolName){
                this.tools.splice(i,1);
                break;
            }
        }
    }
}