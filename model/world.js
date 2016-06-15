function World(name, trees, fertility, creature, toolbox) {
    this.name = name;
    this.amountOfTrees = trees;
    
    //between 0 and 1
    this.fertilityLevel = fertility;
    this.creature=creature;
    this.toolbox=toolbox;
}