$(document).ready(function () {
    $(".gameboard").hide();
 });

var hangmanGame = {
// Array of possible answers to game. 
    wordbank: {
        aluminum: {
          hint: "assets/images/gifs/al.gif",
          abbrv: "Al",
          picture: "Al.jpeg"
        },
        arsenic: {
          hint: "assets/images/gifs/as.gif",
          abbrv: "As",
          picture: "As.jpeg"
        },
        boron: {
          hint: "assets/images/gifs/b.gif",
          abbrv: "B",
          picture: "B.jpeg"
        },
        calcium: {
          hint: "assets/images/gifs/ca.gif",
          abbrv: "Ca",
          picture: "Ca.jpeg"
        },
        francium: {
          hint: "assets/images/gifs/fr.gif",
          abbrv: "Fr",
          picture: "Fr.jpeg"
        },
        helium: {
          hint: "assets/images/gifs/he.gif",
          abbrv: "He",
          picture: "He.jpeg"
        },
        hydrogen: {
            hint: "assets/images/gifs/h.gif",
            abbrv: "H",
            picture: "H.png"
        },
        iron: {
          hint: "assets/images/gifs/fe.gif",
          abbrv: "Fe",
          picture: "Fe.jpeg"
        },
        krypton: {
          hint: "assets/images/gifs/kr.gif",
          abbrv: "Kr",
          picture: "Kr.jpeg"
        },
        lithium: {
            hint: "assets/images/gifs/li.gif",
            abbrv: "Li",
            picture: "Li.jpeg"
        },
        lead: {
          hint: "assets/images/gifs/pb.gif",
          abbrv: "Pb",
          picture: "Pb.jpeg"
      },
        neon: {
          hint: "assets/images/gifs/ne.gif",
          abbrv: "Ne",
          picture: "Ne.jpeg"
        },
        palladium: {
          hint: "assets/images/gifs/pd.gif",
          abbrv: "Pd",
          picture: "Pd.jpeg"
        },
        potassium: {
            hint: "assets/images/gifs/k.gif",
            abbrv: "K",
            picture: "K.jpeg"
        },        
        silver: {
          hint: "assets/images/gifs/ag.gif",
          abbrv: "Ag",
          picture: "Ag.jpeg"
        },
        sodium: {
          hint: "assets/images/gifs/na.gif",
          abbrv: "Na",
          picture: "Na.jpeg"
        },
        sulfur: {
          hint: "assets/images/gifs/s.gif",
          abbrv: "S",
          picture: "S.jpeg"
        },
        xenon: {
          hint: "assets/images/gifs/xe.gif",
          abbrv: "Xe",
          picture: "Xe.jpeg"
        },
        // zirconium: {
        //   hint: "assets/images/gifs/zr.gif",
        //   abbrv: "Zr",
        //   picture: "Zr.jpeg"
        // },
    },

    // Variables that set the initial state of our wordGuess game.
    wordInPlay: null,
    lettersOfTheWord: [],
    matchedLetters: [],
    guessedLetters: [],
    guessesLeft: 0,
    totalGuesses: 0,
    letterGuessed: null,
    wins: 0,

   // The setup method is called when the page first loads.
  setup: function() {
    // Here we pick a random word.
    $(".gameboard").show();
    var objKeys = Object.keys(this.wordbank);
    console.log(objKeys);
    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

    console.log(this.wordInPlay);

    const hint = $("<img>").attr("src", this.wordbank[this.wordInPlay].hint).attr("id", "hint-img");
    
    // $("<p>").addClass("w3-text-blue-grey").text(this.wordbank[this.wordInPlay].hint);
    $(".hint-view").append(hint);

    const br = $("<hr class='w3-border-grey' style='margin:auto;width:40%>'");

    $(".title").empty();
    $(".title").text("Press any key to get started!").append(br);

    const word = $("<div>").addClass("w3-xlarge currentword");
    const currentword = $("<h2>").addClass("w3-text-blue-grey").text("Name this element:");
  
    const gameshow = $("<i>").attr("id", "current-word");

    word.append(currentword).append(br).append(gameshow);
    $(".title").append(word);

    // Split the chosen word up into its individual letters.
    this.lettersOfTheWord = this.wordInPlay.split("");
    // Builds the representation of the word we are trying to guess and displays it on the page.
    // At the start it will be all underscores since we haven't guessed any letters ("_ _ _ _").
    this.rebuildGameboard();
    // This function sets the number of guesses the user gets, and renders it to the HTML.
    this.processUpdateTotalGuesses();
  },

  // Function that "restarts" the game by resetting all of the variables.
  restart: function() {
    this.wordInPlay = null;
    this.lettersOfTheWord = [];
    this.matchedLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterGuessed = null;

    document.querySelector("#guessed-letters").innerHTML = "";
    hangmanGame.setup();
    hangmanGame.rebuildGameboard();
  },

   // This function builds the display of the word that is currently being guessed.
  // For example, if we are trying to guess "blondie", it might display "bl_ndi_".
  rebuildGameboard: function() {
    // We start with an empty string.
    var gameboard = "";

    $(".title").text("Press any key to get started!");

    const word = $("<div>").addClass("w3-xlarge currentword");
    const currentword = $("<h2>").addClass("w3-text-blue-grey").text("Name this element:");
  
    const gameshow = $("<i>").attr("id", "current-word");

    word.append(currentword).append(gameshow);
    $(".title").append(word);

    // Loop through the letters of the word we are trying to guess..
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      // If the current letter has been guessed, display that letter.
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
        gameboard += this.lettersOfTheWord[i];
      }
      // If it hasn't been guessed, display a "_" instead.
      else {
        gameboard += "&nbsp;_&nbsp;";
      }
    }

    // Update the page with the new string we built.
    document.querySelector("#current-word").innerHTML = gameboard;
  },

  // This function sets the initial guesses the user gets.
  processUpdateTotalGuesses: function() {
    // The user will get more guesses the longer the word is.
    this.totalGuesses = this.lettersOfTheWord.length + 5;
    this.guessesLeft = this.totalGuesses;

    // Render the guesses left to the page.
    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  },

  // This function is run whenever the user guesses a letter..
  updatePage: function(letter) {

    word = this.wordInPlay;
    answer = word.charAt(0).toUpperCase()+ word.slice(1);
    img = this.wordInPlay;
    console.log(this.guessesLeft);
    // If the user has no guesses left, restart the game.
    if (this.guessesLeft === 0) {
      const response = "Try again.";
      this.displayAnswer(response);
    }
    // Otherwise...
    else {
      // Check for and handle incorrect guesses.
      this.updateGuesses(letter);
     
      // Check for and handle correct guesses.
      this.updateMatchedLetters(letter);

      // Rebuild the view of the word. Guessed letters are revealed, non-guessed letters have a "_".
      this.rebuildGameboard();

      // If the user wins, restart the game.
      if (this.updateWins() === true) {

        const response = "Genius! You got it.";

        this.displayAnswer(response);
      }
    }

  },

  // This function governs what happens when the user makes an incorrect guess (that they haven't guessed before).
  updateGuesses: function(letter) {
    // If the letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array..
    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {

      // Add the letter to the guessedLetters array.
      this.guessedLetters.push(letter);

      // Decrease guesses by one.
      this.guessesLeft--;
      $(".tagline").text("Not quite.");

      // Update guesses remaining and guesses letters on the page.
      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML = (" ")+
      this.guessedLetters.join(", ");
    }
  },

  // This function governs what happens if the user makes a successful guess.
  updateMatchedLetters: function(letter) {
    // Loop through the letters of the "solution".
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      // If the guessed letter is in the solution, and we haven't guessed it already..
      if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
        // Push the newly guessed letter into the matchedLetters array.
        $(".tagline").text("Nice job.");
        this.matchedLetters.push(letter);
      }
    }
  },
  // Function that checks to see if the user has won.
  updateWins: function() {
    var win;

    // this won't work for words with double or triple letters
    // var lettersOfTheWordClone = this.lettersOfTheWord.slice(); //clones the array
    // this.matchedLetters.sort().join('') == lettersOfTheWordClone.sort().join('')

    // If you haven't correctly guessed a letter in the word yet, we set win to false.
    if (this.matchedLetters.length === 0) {
      win = false;
    }
    // Otherwise, we set win to true.
    else {
      win = true;
    }

    // If a letter appears in the lettersOfTheWord array, but not in the matchedLetters array, set win to false.
    // In English, if you haven't yet guessed all the letters in the word, you don't win yet.
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
        win = false;
      }
    }

    // If win is true...
    if (win) {

      // Increment wins.
      this.wins = this.wins + 1;

      // Update wins on the page.
      document.querySelector("#wins").innerHTML = ("Wins: ")+this.wins;
      // return true, which will trigger the restart of our game in the updatePage function.
      return true;
    }
    // If win is false, return false to the updatePage function. The game goes on!
    return false;
  },

  displayAnswer: function(response) {
    $(".gameboard").hide();
    this.lettersOfTheWord = [];
    this.matchedLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterGuessed = null;
    $(".hint-view").empty();

    document.querySelector("#guessed-letters").innerHTML = "";
    
    img = $("<img>").attr("src", "assets/images/elements_images/"+
        this.wordbank[this.wordInPlay].picture).addClass("wordImage w3-image");
        winner = $("<p>").text(response);
        $(".title").empty();
        $(".title").append(img).append(winner);

      setTimeout(function() {   
        hangmanGame.setup();
        }
        , 3000);
  },

};

$("#play").on("click", function(event) {
    event.preventDefault();
    $("#play").hide();
    hangmanGame.setup();
});

// When a key is pressed..
document.onkeyup = function(event) {
    // Capture pressed key and make it lowercase.
    hangmanGame.letterGuessed = String.fromCharCode(event.which).toLowerCase();
    // Pass the guessed letter into our updatePage function to run the game logic.
    hangmanGame.updatePage(hangmanGame.letterGuessed);
  };





    

    



    

