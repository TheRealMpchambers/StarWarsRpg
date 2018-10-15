// Global Variables
var baseAttack = 0;
var player;
var defender;
var charArray = [];
var playerSelected = false;
var defenderSelected = false;


//Constructor
function Character (name, hp, ap, counter, pic) {
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
Character.prototype.attack = function (Obj) {
    Obj.healthPoints -= this.attackPower;
    $("#msg").html("You attacked " + 
        Obj.name + "for " + this.attackPower + " damage points.");
    this.increaseAttack();
};

//Does Counter Attack
Character.prototype.counterAttack = function (Obj) {
    Obj.healthPoints -= this.counterAttackPower;
    $("#msg").append("<br>" + this.name + " counter attacked you for " + this.counterAttackPower + " damage points.");
};


//Character Select Options
function initCharacters() {
    var lionel = new Character("Lionel", 100, 10, 5, "./assets/images/lionel.jpg");
    var tygra = new Character("Tygra", 200, 50, 30, "./assets/images/tygra.jpg");
    var cheetara = new Character("Cheetara", 150, 15, 2, "./assets/images/cheetara.jpg");
    var mummra = new Character("Mumm Ra", 180, 30, 12, "./assets/images/mummra.jpg");
    charArray.push(lionel, tygra, cheetara, mummra);
}

//Saves Original Attack Value
function setBaseAttack(obj) {
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

//Create Character Onscreen
function characterCards(divID) {
    $(divID).children().remove();
    for (var i = 0; i < charArray.length; i++) {
        $(divID).append("<div />");
        $(divID + " div:last-child").addClass("card");
        $(divID + " div:last-child").append("<img />");
        $(divID + " img:last-child").attr("id", charArray[i].name);
        $(divID + " img:last-child").attr("class", "card-img-top");
        $(divID + " img:last-child").attr("src", charArray[i].pic);
        $(divID + " img:last-child").attr("width", 150);
        $(divID + " img:last-child").addClass("img-thumbnail");
        $(divID + " div:last-child").append(charArray[i].name + "<br>");
        $(divID + " div:last-child").append("HP " + charArray[i].healthPoints);
        $(divID + " div:last-child").append();

    }
}

//Update the character pictures location
function updatePics(fromdDivID, toDivID) {
    $(fromdDivID).children().remove();
    for (var i = 0; i < charArray.length; i++) {
        $(toDivID).append("<img />");
        $(toDivID + " img:last-child").attr("id", charArray[i].name);
        $(toDivID + " img:last-child").attr("src", charArray[i].pic);
        $(toDivID + " img:last-child").attr("width", 150);
        $(toDivID + " img:last-child").addClass("img-thumbnail");
    }
}

//plays audio file
function playAudio() {
    var audio = new Audio("./assets/media/themeSongSmall.mp3");
    audio.play();
}


//Changes view from 1st to 2nd
function changeView() {
    $("#firstscreen").empty();
    $("#secondScreen").show();
}


$(document).on("click", "img", function () {
    //Stores Defender Remove from CharArray
    if (playerSelected && !defenderSelected && (this.id != player.name)) {
        for (var j = 0; j < charArray.length; j ++) {
            if (charArray[j].name == (this).id){
                defender = charArray[j];
                charArray.splice(j, 1);
                defenderSelected = true;
                $("msg").html("Click the button to attack!");
            }
        }
        $("#defenderDiv").append(this);
        $("#defenderDiv").addClass("animated zoomInRight");
        $("#defenderDiv").append("<br>" + defender.name);
        $("defenderHealthDiv").append("HP: " +defender.healthPoints);
        $("defenderHealthDiv").addClass("animated zoomInRight");
    }
    //Stores Character Selected Remove from CharArray
    if(!playerSelected) {
        for (var i = 0; i < charArray.length; i++) {
            if (charArray[i].name == (this).id) {
                player = charArray[i];
                playAudio();
                $("body").css ({
                    "background-image": "url('./assets/images/" + this.id[0] + ".jpg')"
                });
                setBaseAttack(player);
                charArray.splice(i, 1);
                playerSelected = true;
                changeView();
                $("#msg").html("Pick an enemy to fight");
            }
        }
        updatePics("#game", "#defendersLeftDiv");
        $("#playerDiv").append(this);
        $("#playerDiv").addClass("animated zoomIn");
        $("#playerDiv").append(player.name);
        $("#playerHealthDiv").append("HP: " + player.healthPoints);
        $("#playerHealthDiv").addClass("animated zoomIn");
    }

})

// The attack button functionality
$(document).on("click", "#attackBtn", function () {
    if (playerSelected && defenderSelected) {
        if (isAlive(player) && isAlive(defender)) {
            player.attack(defender);
            defender.counterAttack(player);
            $("#playerHealthDiv").html("HP: " + player.healthPoints);
            $("#defenderHealthDiv").html("HP: " + defender.healthPoints);
            if (!isAlive(defender)) {
                $("#defenderHealthDiv").html("DEFETED!");
                $("#playerHealthDiv").html("Enemy defeated!");
                $("#msg").html("Pick another enemy to battle...");
            }
            if (!isAlive(player)) {
                $("#playerHealthDiv").html("YOU LOST!");
                $("#msg").html("Try again...");
                $("#attackBtn").html("Restart Game");
                $(document).on("click", "#attackBtn", function () { // restarts game
                    location.reload();
                });
            }
        }
        if (!isAlive(defender)) {
            $("#defenderDiv").removeClass("animated zoomInRight");
            $("#defenderHealthDiv").removeClass("animated zoomInRight");
            $("#defenderDiv").children().remove();
            $("#defenderDiv").html("");
            $("#defenderHealthDiv").html("");
            defenderSelected = false;
            if (isWinner()) {
                $("#secondScreen").hide();
                $("#globalMsg").show();
            }
        }
    }
});

// EXECUTE
$(document).ready(function () {
    $("#secondScreen").hide();
    $("#globalMsg").hide();
    initCharacters();
    characterCards("#game");
});