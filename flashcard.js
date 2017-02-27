var inquirer = require("inquirer");
var trivia = ["What type of restaurant will you find Wasabi", "What does the restaurant KFC stand for", "Pho is a soup from what country", "What country invented the Chinese Takeout Box", "Where did Chimchurri Sauce originate", "What is the traditional fermented side dish from Korea called"];
var correct = ["Japanese", "Kentucky Fried Chicken", "Vietnam", "The United States", "Argentina", "Kimchi"];
var partial=[" is the restaurant where you can eat Wasabi. ", " is what the KFC restaurant stands for. ", " is the country where Pho is from. ", " is where the chinese takeout box is from. ", " is where Chimchurri sauce originates. " ," is the traditional fermented dish from Korea. "]
var wins = 0;
var losses = 0;
var count = 0;

// constructor function used to create Basic objects
function Basic(front, back) {
    this.front = front;
    this.back = back;
}
Basic.prototype.showfront = function () {
    return this.front;
}

Basic.prototype.showback = function () {
    return this.back;
}

//constructor used to create cloze objects
function Cloze(front, back) {
    this.frontpartial = front;
    this.back = back;
    }
Cloze.prototype.showfront = function () {
    return this.frontpartial;
}

Cloze.prototype.showback = function () {
    return this.back;
}

function playBasic() {
    // runs inquirer and asks the user a series of questions whose replies are
    // stored within the variable answers inside of the .then statement
    var basic = new Basic(trivia[count], correct[count]);
    inquirer.prompt([{
        name: "response",
        message: trivia[count] + "?"
    }]).then(function (answers) {
        if (answers.response.toLowerCase() == basic.back.toLowerCase()) {
            console.log("You are Correct");
            console.log(basic.showfront());
            console.log("____________________________");
            wins++;
            
        } else {
            console.log("Sorry! Wrong Answer");
            console.log(basic.showback());
            console.log("____________________________");
            losses++;
        };
        count++;
        if (count < trivia.length-1) {

            playBasic();
        } else {
            playagain();
        }

    });
}


function playagain() {

    console.log("Game over")
    console.log("You have " + wins + " wins and " +losses + " losses.");
    inquirer.prompt([{
        type: "confirm",
        name: "yes",
        message: "Do you want to play again?"
    }]).then(function (answers) {
        if (answers.yes) {
            wins = 0;
            losses=0;
            count=0;
            begin();
        }

    });
}

function begin() {
    inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "Which would you like to play?",
        choices: [
            "Basic",
            "Cloze"
        ]
    }]).then(function (resp) {
        if (resp.choice === "Basic") {
            playBasic();
        } else {
            playCloze();
        }

    });

}

    function playCloze() {
    // runs inquirer and asks the user a series of questions whose replies are
    // stored within the variable answers inside of the .then statement
    var cloze = new Cloze(partial[count], correct[count]);
    inquirer.prompt([{
        name: "response",
        message: "....." + partial[count] 
    }]).then(function (answers) {
        if (answers.response.toLowerCase() == cloze.back.toLowerCase()) {
            console.log("You are Correct");
            console.log(cloze.showback()+ cloze.showfront());
            console.log("____________________________");
            wins++;
            
        } else {
            console.log("Sorry! Wrong Answer");
           console.log(cloze.showback()+ cloze.showfront());
            console.log("____________________________");
            losses++;
        };
        count++;
        if (count < trivia.length-1) {

            playCloze();
        } else {
            playagain();
        }

    });
}


begin();