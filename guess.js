
$(document).ready(function(){
    $.ajax({
        url: "guessbase.php",
        type: "GET",
        success: function(response){
        }
    });

    $.ajax({
        url: "fetch.php",
        type: "GET",
        success: function(response){
            // Save the response in the client buffer
            for(let i =0; i<5;i++){
                localStorage.setItem(i, response[i]);
            }
        }
    });
    
    window.addEventListener('keydown',checkLetter, true);
});


// Define the word to be guessed
var n = 0;
var word = localStorage.getItem(n);
var reach =0;
var points =0;
var playAgain;
// Define an array to store the current state of the word
var currentState = [];

// Define an array to store the letters already guessed
var guessedLetters = [];

// Define a variable to store the number of incorrect guesses
var incorrectGuesses = 5;

// Initialize the array with hyphens for each letter in the word
for (var i = 0; i < word.length; i++) {
    currentState.push("-");
}
document.getElementById("word-state").innerHTML = currentState.join(" ");


// Define a function to check if a letter is in the word
function checkLetter(e) {
    let letter = String.fromCharCode(e.keyCode).toLowerCase();
    // Check if the letter has already been guessed
    if (guessedLetters.includes(letter)) {
        alert("You have already guessed that letter.");
        return;
    }

    var found = false;
    for (var i = 0; i < word.length; i++) {
        if (word.charAt(i) == letter) {
            found = true;
            guessedLetters.push(letter);
            reach++;
            currentState[i] = letter;
        }
        
    }
    if (found) {
        document.getElementById("word-state").innerHTML = currentState.join(" ");
        if(reach==word.length){
            
            document.getElementById("word-state").setAttribute("style","color:green;");
            // playAgain = confirm("Bravo! \""+word+"\" is correct.\nYou got a point.\nTry Next Word?");
            // nextWord(playAgain);
            var message = "Bravo! \""+word+"\" is correct.\n<button onclick=\"nextWord(true)\">\nNext Word</button>";
            document.getElementById("message").innerHTML = message;
            points++;
            document.getElementById("points").innerHTML = points;
        }
    } else {
        incorrectGuesses--;
        if (incorrectGuesses <= 0) {
            // Game over
            playAgain = confirm("You have lost the game.\n Would you like to play again?");
            nextWord(playAgain);
        } else {
            alert("Incorrect guess: " + letter);
            guessedLetters.push(letter);
            document.getElementById("incorrect-guesses").innerHTML = incorrectGuesses;
        }
    }
}

function nextWord(playAgain){
    document.getElementById("word-state").setAttribute("style","color:black;");
    document.getElementById("message").innerHTML = null;
    if (playAgain) {
        // Reset the game
        localStorage.removeItem(n);
        n++;
        currentState = [];
        guessedLetters = [];
        incorrectGuesses = 5;
        reach=0;
        word = localStorage.getItem(n);
        document.getElementById("incorrect-guesses").innerHTML = incorrectGuesses;

        for (var i = 0; i < word.length; i++) {
            currentState.push("-");
        }
        document.getElementById("word-state").innerHTML = currentState.join(" ");
        if(n>=4){
            n=0;
            $.ajax({
                url: "fetch.php",
                type: "GET",
                success: function(response){
                    // Save the response in the client buffer
                    for(let i =0; i<5;i++){
                        localStorage.setItem(i, response[i]);
                    }
                }
            });
        }
    } else {
        // Redirect to another page or show a message
        alert("Thanks for playing!");
    }
}
