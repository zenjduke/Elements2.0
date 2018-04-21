$(document).ready(function() {
    

   
    var game = $("#game");
    var submitBtn = $("#check");
    var guesses = $("#guessesLeft");
    var guessedLetters = $("#guessedLetters");
    var alert = $("#alert");

    // Declaring and initializing my array of answers.

    // Array of possible answers to game. 
    var wordbank = ["FAITH\x0bHILL", "JOE", "VERTICAL\x0bHORIZON", "DESTINYS\x0bCHILD", "SAVAGE' 'GARDEN" , "SANTANA", "MATCHBOX\x0bTWENTY", "AALIYAH", "PINK", "JANET' 'JACKSON", "NSYNC", "SISQO", "MISSY\x0bELLIOTT", "THIRD\x0bEYE\x0bBLIND"]

    var answer = wordbank[Math.floor(Math.random()*wordbank.length)];
    var myLength = answer.length;

    var display =[myLength];

    var win = myLength; 

    var letters = answer.split("");

    var attemptsLeft = 15;

    var output ="";
    var userGuess="";

    var setup = function()  //NEED TO CHECK FOR "space" and SHOW AUTOMATICALLY at Setup.
    {
        for (var i=0; i < answer.length; i++)
        {
            display[i] = "_ ";
            output = output + display[i];
        }
        game.html(output);
        guesses.html("You have " + attemptsLeft + " guesses left.")
    }

    window. onload = function()
    {
        setup();
    }

    submitBtn.click(function() {

        attemptsLeft--;
        console.log(letters);
        userGuess = $('#letter').val();
        userGuess = userGuess.toUpperCase();

    
         // Documents letters guessed. 
        var pastGuesses = "";
            
        pastGuesses = userGuess + pastGuesses;

        guessedLetters.append(" " + pastGuesses);

        // Checks to see if player letter guess is included in answer.    
        if (jQuery.inArray(userGuess, letters)!='-1') 
        {
            alert.html("Great job!");
        } 
        else 
        {
            alert.html("Try again!");
        }

         //Tracks # of guesses left.
        if (letters == answer)
        {
            guesses.html("YOU WIN!"); 
        }
        else if (attemptsLeft < 1)
        {
            guesses.html("YOU LOSE! Check console for answer.");
        }
        else
        {
            guesses.html("You have " + attemptsLeft + " guesses left.");
        }

        for (var c=0; c<answer.length; c++)
        {
            if (userGuess == letters[c])
            {
                display[c] = userGuess;
            }

            output = output + display[c] + " ";
        }

        game.html(output);
        output ="";
        attemptsLeft--;

    });
});




        

        
  
   

       

