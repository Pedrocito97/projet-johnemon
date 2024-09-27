const readline = require('readline');
const JohnemonMaster = require('./JohnemonMaster'); // Replace 'your_classes_filename' with the actual filename
const Johnemon = require('./Johnemon')
const JohnemonWorld = require ('./JohnemonWorld')
const fs = require('fs');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const filePath = './save.json';


const LoadTasksFromFile = () => {
  if(fs.existsSync(filePath)){
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }else{
    console.log("The file doesn't exist");
    return {};
  }
}

function saveGameState(modif){
  fs.writeFileSync(filePath, JSON.stringify(modif, null, 2));
  console.log("game saved !");
}

const dateToSave = new Date().toISOString();

LoadTasksFromFile();

function askForName() {
  return new Promise((resolve) => {
    rl.question("What is your name ? : ", ((userName) => {
    resolve(new JohnemonMaster(userName));})   
  )
})}
  
  

function proposeFirstJohnemon(master){
  const johnemon1 = new Johnemon;
  const johnemon2 = new Johnemon;
  const johnemon3 = new Johnemon;

  return new Promise ((resolve) => {rl.question(`Whitch of those 3 johnemon do you want to start your adventure ? : 
    1) ${johnemon1.toString()}, 2) ${johnemon2.toString()}, 3) ${johnemon3.toString()} ? (Choose a number) : `,
  ((answer) => {answerInt = parseInt(answer);
    if (answerInt < 1 || answerInt > 3) {
      console.log("Answer between 1, 2 or 3");
      return proposeFirstJohnemon();
// je vais devoir rajouter une sécu pour pas que le user rentre une lettre
  } else {
    switch (answerInt) {
      case 1:
        console.log(`Great choice ! you picked ${johnemon1} !`);
        resolve(master.addJohnemon(johnemon1));
        break;
      case 2:
        console.log(`Great choice ! you picked ${johnemon2} !`);
        resolve(master.addJohnemon(johnemon2));
        break;
      case 3:
        console.log(`Great choice ! you picked ${johnemon3} !`);
        resolve(master.addJohnemon(johnemon3));   
        break;    
      default:
        break;
    }
  }
  
}))})
}

async function startGame(){
  try{
    // je charge une partie existante
    const savedGame = LoadTasksFromFile();
    let newWorld, newMaster;

    if (savedGame){
    // je demande à l'utilisateur si il veut charger la partie
    const loadGame = await new Promise((resolve) => {
      rl.question("A saved game was found, Do you want to load it ? (yes/no): ",(answer) => {
        resolve(answer.trim().toLowerCase() === 'yes');
      });
    });

    if (loadGame){
      //je charge les données sauvegardées
      newMaster = Object.assign(new JohnemonMaster(), savedGame.newMaster);
      newWorld = Object.assign(new JohnemonWorld(), savedGame.newWorld);
      console.log(`Welcome back, ${newMaster.name}`);
    }
    else{
      //je commence une nouvelle partie

      newWorld = new JohnemonWorld;
      newMaster = await askForName();
      await proposeFirstJohnemon(newMaster);
    }
    }
  
  saveGameState({dateToSave, newMaster, newWorld});
  rl.close();
  } catch (error){
    console.error(error);
    rl.close();
  }
}

startGame();


