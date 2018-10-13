// Global Variables
var baseAttack = 0;
var player;
var defender;
var charArray = [];
var playerSelected = false;
var defenderSelected = false;

//Constructor
function Character (Name, HP, AP, Counter, Pic) {
    this.name = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = counter;
    this.pic = pic;

}

//Increases Attack Power
Character.prototype.increaseAttack = function() {
    this.attackPower += baseAttack;

};

//Does Attack
Character.prototype.attack = function (obj) {
    Object.healthPoints -= this.attackPower;
    $("#msg").html("You attacked" + 
        Obj.name + "for" + this.attackPower + "damage points.");
    this.increaseAttack();

};

//Does Counter Attack
Character.prototype.counterAttack = function (Obj) {
    Obj.healthPoints -= this.counterAttackPower;
    $("#msg").append("<br>" + this.name + "counter attacked you for" + this.counterAttackPower + " damage points.");

};

//Character Select Options
function initCharacters() {
    var luke = new Character("Luke Skywalker", 100, 10, 5, "./assets/images/luke.jpg");
    var vader = new Character("Darth Vader", 200, 50, 30, "./assets/images/vader.jpg");
    var obi = new Character("Obi-Wan Kenobi", 150, 15, 2, "./assets/images/obi.jpg");
    var chew = new Character("Chewbacca", 180, 30, 12, "./assets/images/chew.jpg");
    charArray.push(luke, vader, obi, chew);

}

//Saves Original Attack Value
function setBaseAttack(Obj) {
    baseAttack = obj.attackPower;

}

//Checks if Character is alive
function isAlive(Obj) {
    if (Obj.healthPoints > 0) {
        return true;
    }
    return false;

}

//Checks if player has won
function isWinner() {
    if (charArray.length == 0 && player.healthPoints > 0)
        return true;
    else return false;

}




