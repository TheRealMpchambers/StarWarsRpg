// Global Variables
var baseAttack = 0;
var player;
var defender;
var charArray = [];
var playerSelected = false;
var defenderSelected = false;

function Character (Name, HP, AP, Counter, Pic) {
    this.name = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = counter;
    this.pic = pic;
}

Character.prototype.increaseAttack = function() {
    this.attackPower += baseAttack;
    };