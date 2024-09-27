const Johnemon = require("./Johnemon");

class JohnemonMaster {
  constructor(name) {
    this.name = name;
    this.johnemonCollection = [];
    this.healingItems = 5; // Initial number of healing items
    this.reviveItems = 3; // Initial number of revive items
    this.JOHNEBALLS = 10; // Initial number of JOHNEBALLS
  }


   renameJohnemon(oldName, newName) {
    for(let index = 0; i < this.johnemonCollection.length; index++){
      if (oldName === this.johnemonCollection[index].name){
        this.johnemonCollection[index].name = newName;
   }}

  healJohnemon(johnemon) {
    if (this.healingItems = 0) {
      console.log("You don't have healing kit");
    }
    else if (johnemon.healthPool === Johnemon.healthPool){
      console.log(`Your johnemon "${johnemon.name}" has full PV`);
    }
    else {
      johnemon.healthPool = Johnemon.healthPool;
      console.log(`Your Johnemon "${johnemon.name}" got back his PV`);
      this.healingItems -= 1;
    }
  }

  reviveJohnemon(johnemon) {
    if(johnemon.healthPool === 0){
      johnemon.healthPool = Johnemon.healthPool;
      console.log(`Your johnemon "${johnemon.name}" is reborn`);
      this.reviveItems -= 1;
    }
    else{
      console.log(`Your johnemon "${johnemon.name}" is alive, no need to use this potion`);
    }
  }

  catchJohnemon(){
    this.johnemonCollection.push(new Johnemon);
  }

  addJohnemon(johnemon){
    this.johnemonCollection.push(johnemon);
  }

  releaseJohnemon(johnemon) {
    if (this.johnemonCollection === ""){
      console.log("There are no johnemons to free up");
    }
    else{
      this.johnemonCollection.remove(johnemon);
      console.log(`The johnemon ${johnemon.name} has been released`)
    }
  }

  showCollection() {
    console.log(this.johnemonCollection);
  }
}

module.exports = JohnemonMaster
