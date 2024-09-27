const JohnemonArena = require('./JohnemonArena')
const Johnemon = require('./Johnemon')
const event = require('./randomEvent.json')


class JohnemonWorld {
  constructor() {
   this.day = 1;
   this.logs = [];
  }

  async oneDayPasses(master){

    console.log(`this is a new day in Johnemon Town, this is ${this.day} day`);

    // je demande au joueur de choisir une action
    await this.playerChoice(master);

    const randomEvent = this.randomizeEvent();

    




    this.day += 1;

  }

  async playerChoice(master){
    const actions = ["Heal Johnemon", "Revive Johnemon", "Release Johnemon", "Rename Johnemon"]
    const actionChoice = await this.askQuestion("Choose a Johnemon (enter a number => 1: Heal johnemon, 2: Revive johnemon, 3: Release johnemon, 4: Rename johnemon): ");
    const choiceIndex = parseInt(actionChoice) - 1;

    if (choiceIndex >= actionChoice.length || choiceIndex < 0){
      console.log("Invalid choice, choose a valid action");
      return this.playerChoice(master);
    }

    const selectedJohnemon = await this.chooseJohnemon(master);

    switch (choiceIndex) {
      case 1:
        master.healJohnemon(selectedJohnemon);
        break;

      case 2:
        master.reviveJohnemon(selectedJohnemon)   ;     
        break;

      case 3:
        master.releaseJohnemon(selectedJohnemon)
        break;

      case 4:
        await master.renameJohnemon(selectedJohnemon)
        break;
    
      default:
        break;
    }
  }

  //Je sélectionne le Johnemon

  async chooseJohnemon(master){
    const johnemons = master.collection;
    johnemons.forEach((johnemon, index) =>{
      console.log(`${index} : ${johnemon.name}`);
    });

    const choice = await this.askQuestion("Choose a johnemon (enter a number)");
    const choiceIndex = parseInt(choice) - 1;

    if(choiceIndex < 0 || choiceIndex >= johnemons.length){
      console.log("Invalid number, choose a valid action")
      return this.chooseJohnemon(master);
    }
    else{
      return johnemons[choiceIndex];
    }
  }


  askQuestion(strQuestion){
    return new Promise (resolve => rl.question(strQuestion, resolve));
  }

  async renamejohnemonQuestion(master, johnemon){
    const newName = await this.askQuestion(`Enter a new name for ${johnemon.name}`);
    master.renameJohnemon(johnemon.name, newName);
    console.log(`the new name of ${johnemon.name} is ${newName}`);
  }

  
  randomizeEvent() {
     let indexEvent = Math.floor(Math.random() * event.length);
     const event = randomEvent[indexEvent];
     console.log(event);
     if(event === "Nothing happens today, the day passes."){
      return this.randomizeEvent();
     }
  }

  addLog(newLog){
    this.logs.push(`Day ${this.day}: ${newLog}`);
  }
}


module.exports = JohnemonWorld