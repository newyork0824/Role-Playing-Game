let isWaiting = false
let monstersArray=["Orc","Demon", "Goblin"]

function getNewMonster() {
   const nextMonsterData  =characterData[monstersArray.shift()]
  return nextMonsterData ? new Character(nextMonsterData): {}
}

function getDiceRollArray(diceCount){
  return new Array(diceCount).fill(0).map(() =>{
    return (Math.floor(Math.random() * 6) + 1)
  })

}

const characterData = {
  hero: {
  name :"Wizard",
  avatar :  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGMTBGXFdceYOOnI5RlaAOG4n73glatPB85Vw_yBdfqW7i_JgAXz9LcWzHC4F0W0PKLcw:https://sagegamers.com/ezoimgfmt/149658804.v2.pressablecdn.com/wp-content/uploads/2021/03/dnd-wizbuild-coverimg.jpg%3Fezimgfmt%3Dng%253Awebp%252Fngcb1%252Frs%253Adevice%252Frscb1-2&usqp=CAU",
  health : 60,
  diceCount: 3,
  currentDiceScore: [],
  isDead: false  
 },

 Orc: {
  name : "Orc",
  avatar: "https://assets.3dtotal.com/orc-warrior-final-water-mark.ef5qrq.expanded.igq.jpg",
  health:30,
  diceCount: 1,
  currentDiceScore: [],
   isDead: false
},
  Demon: {
   name: "Demon",
   avatar: "https://cdn5.vectorstock.com/i/1000x1000/63/09/cartoon-demon-vector-2806309.jpg",
   health:25,
    diceCount: 2,
    currentDiceScore: [],
    isDead: false
   },
  Goblin: {
  name: "Goblin",
  avatar: "https://nypost.com/wp-content/uploads/sites/2/2021/12/best-comic-supervillains-osborn-04.jpg?quality=90&strip=all",
  health: 20,
    diceCount: 3,
  currentDiceScore: [],
  isDead: false
}
  

}


function getDicePlaceHolderHtml (diceCount) {
   return new Array(diceCount).fill(0).map((num) => 
    `<div class="placeholder-dice">-</div>`).join("")
}


  const getPercentage = (remainingHealth, maxHealth) => 
 (100*remainingHealth)/ maxHealth

  

class Character{
  constructor(data) {
Object.assign(this,data)
this.maxHealth = this.health
this.diceHtml = getDicePlaceHolderHtml(this.diceCount)
  }
  
 takeDamage = (attackScoreArray,health)=>{
    this.isDead = false
    const totalAttackPower = attackScoreArray.reduce((total,current) =>
      total + current)
   this.health =this.health - totalAttackPower
   render()

    if(this.health <=0) {
      this.health = 0
      this.isDead = true
      
    }
  
    } 
  setDiceHtml= () => {
   this.currentDiceScore = getDiceRollArray(this.diceCount)
   this.diceHtml= this.currentDiceScore.map((num)=>
     `<div class="dice">${num}</div>`
   ).join("")
  
   }   
  
  getHealthBarHtml = function(){
    const percent = getPercentage(this.health,this.maxHealth)
    return `<div class="health-bar-outer">
             <div class="health-bar-inner ${percent < 26 ? "danger" : "" }" style="width:${percent}%">
  </div>
        </div>`
        
  
  }  
  getCharacterHtml = function(){
const{id,name,avatar,health,diceCount,diceHtml, isDead} = this
const healthBar = this.getHealthBarHtml()
 return `
         
        <h1 id="${name}-header"> ${name} </h1>
          <img id="${name}-img" src="${avatar}">
          <h2 id="${name}-health-el"> health:${health}</h2>
          <h2> ${healthBar} </h2>
       
        <div class="dice-area">
          ${diceHtml} 
`

}
}  

 


 const heroWizzard = new Character(characterData.hero)
  let monster = getNewMonster()

  
  function attack(){
    if(!isWaiting) {
 heroWizzard.setDiceHtml(this.diceCount)
 monster.setDiceHtml(this.diceCount)
 heroWizzard.takeDamage(monster.currentDiceScore,heroWizzard.health)
 monster.takeDamage(heroWizzard.currentDiceScore,monster.health)
render()
    if(heroWizzard.isDead) {
      gameOver()
    }else if(monster.isDead) {
      isWaiting = true
       if(monstersArray.length > 0) {
       setTimeout(()=>{
         monster = getNewMonster()
         render()
         isWaiting = false
       }, 2000)
        }else{
         gameOver()
      }
    }
   } 
 }
    
 
  

function render() {
document.getElementById("hero-card").innerHTML = heroWizzard.getCharacterHtml()
document.getElementById("monster-card").innerHTML = monster.getCharacterHtml()

}

render()

document.getElementById("attack-btn").addEventListener("click",attack)

function gameOver(){
    document.getElementById("attack-btn").style.display = "none"
  const endMessage = heroWizzard.health > 0  ? "The Wizzard Has Won" 
  : monster.health > 0 ? "The Monster Has Won" 
  : "Both are Dead"
  
  const endSymbol = monster.isDead && heroWizzard.isDead === false  ? ":>" : heroWizzard.isDead && monster=== false ? ":<" : ":><" 
  
  document.querySelector(".container").style.display="none"
  setTimeout(() =>document.getElementById("endgame-msg").innerHTML = `
  <h2> Game Over </h2>
  <h3> ${endMessage}</h3>
  <h4> ${endSymbol} </h4>
   
  
  
  `, 1500)
  
console.log(endMessage)
}



 

