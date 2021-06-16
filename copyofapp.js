const colours = ["red", "blue", "black", "yellow"];
const numbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  12, 13,
];
const originalPouch = []; // Each tile is repeated, there are 2 duplicated sets
const playerRack = [];
const usedTiles = [];
const playerTable = [];
let currentScore = 0;

const main = () => {
  
  const $body = $("body");
  const $tableFlexBox = $("<div>").attr("id", "tableFlexBox");
  $("#playtable").append($tableFlexBox);
  const $rackFlexBox = $("<div>").attr("id", "rackFlexBox");
  $("#rack").append($rackFlexBox);
  const $scoreBoard = $("<div>").text(currentScore).addClass("scoreboard");
  $("#controlpanel").append($scoreBoard)
 

// BUILDING POUCH

  class Tile {
    constructor(colour, number) {
      this.colour = colour;
      this.number = number;
    }
  }

  const buildPouch = () => {
    for (let i = 0; i < colours.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        const allTiles = new Tile(colours[i], numbers[j]);
        originalPouch.push(allTiles);
      }
    }
  };

  // DRAWING RANDOM NUMBER - draws a random card and removes it from the original pouch of 104 tiles
  const drawRandomCard = () => {
    let randomIndex = Math.floor(Math.random() * originalPouch.length);
    return originalPouch.splice(randomIndex, 1);
  };

  // // PUSHING IT INTO THE PLAYER RACK, USER CLICKS THE BUTTON FOR THE NUMBER OF CARDS
  const addTileToRack = () => {
    const playerMaxCards = 20;
    let drawCardToRack = playerMaxCards - playerRack.length
    for (let i = 0; i < drawCardToRack; i++) {
      playerRack.push(drawRandomCard(originalPouch)[0]);
      // returning the element
    }
    renderRack();
    
  };

  


  //////////////////////////////BUTTONS////////////////////////////
  const $submitButton = $("<button>")
    .text("BEAM ME UP SCOTTAYEEEE!")
    .attr("id", "submitbutton")
    .appendTo($("#playtable"));

  const $drawButton = $("<button>")
    .text("DRAW A CARD, OR TWO, OR THREE")
    .attr("id", "drawcardbutton")
    .appendTo($("#rack"));

    ////////////////////// TIMER  /////////////////////////////
    const startTimer = (duration, display) => {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.text(minutes + ":" + seconds);
    
            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }
       
    jQuery(function ($) {
        var oneMinutes = 60,
            display = $('#time');
        startTimer(oneMinutes, display);
    });

    /////////////////////////// RACK ////////////////////////////
  const renderRack = () => {
    $("#rackFlexBox").empty();
    for (let i = 0; i < playerRack.length; i++) {
      $("<div>")
        .text(playerRack[i].number)
        .addClass(playerRack[i].colour)
        .attr("number", (playerRack[i].number))
        .attr("id", `${i}`)
        .on("click", moveToTable)
        .appendTo($("#rackFlexBox"));
    }
  };

  const renderTable = () => {
    $("#tableFlexBox").empty();
    for (let i = 0; i < playerTable.length; i++) {
        $("<div>")
        .text(playerTable[i].number)
        .addClass(playerTable[i].colour)
        .attr("number", (playerTable[i].number))
        .attr('id', `${i}`)
        .appendTo($('#tableFlexBox'))
    }
  }

/////////////////////// PLAYTABLE ///////////////////////////////
const moveToTable = (event) => {
    let pos = event.target.id
    playerTable.push(playerRack.splice(pos,1)[0])
    renderTable()
    renderRack();
}


  const removeTilesWhenSuccessful = () => {
      for (let i =0; i<playerTable.length; i++) {
            playerTable.splice(i,playerTable.length) 
      }
    }
    
    const removeTileWhenFail = () => {
       for (let i=0; i<playerTable.length; i++) {
           playerRack.push(playerTable.splice(i,playerTable.length)[0])
       }
       renderRack();
       renderTable();

       }
    
    
         
  ///////////////////////////////////// CALLING THE LOGICS /////////////////////////////////

 



  ////////////////////////////////
  ////////// SAME COLOUR /////////
  const checkSameColour = () => {
    let countSame = 0;
    for (let i = 0; i < playerTable.length; i++) {
      className = playerTable[0].colour; // colour
      if (playerTable[i].colour === className) {
        // check for same colour
        countSame++;
      } else {
        return false;
      }
      if (countSame === playerTable.length) {
        return true;
      }
    }
  };

  const checkForSDuplicates = () => {
    for (let i=0; i<playerTable.length-1; i++) {
        let col1 = playerTable[i].colour 
        for (let j=i+1; j<playerTable.length; j++) {
            let col2 = playerTable[j].colour
         if(col1 === col2) 
            return true
        } 
        
    } 
    return false
  }

  
  ///////////////////////////////////
  ////////// RUNNING NUMBER /////////
  const checkRunningNumber = () => {
    let countSame = 0;
    playerTable.sort( (tile1,tile2) => tile1.number - tile2.number)
    console.log("playerTable", playerTable[0].number,playerTable[1].number, playerTable[2].number)
    for (let i = 0; i < playerTable.length; i++) {
      idOne = playerTable[0].number;
      if (playerTable[i].number === idOne + i) {
        countSame++;
      } else {
        return false;
      }
      if (countSame === playerTable.length) {
        return true;
      }
    }
  };

  ///////////////////////////////////
  ////////// SAME NUMBER ////////////
  const checkSameNumber = () => {
    let countSame = 0;
    for (let i = 0; i < playerTable.length; i++) {
      idOne = playerTable[0].number;
      if (playerTable[i].number === idOne) {
        countSame++;
      }
      if (countSame === playerTable.length) {
        return true;
      }
    }
  };

  addScore = () => {
      currentScore = currentScore +1
      $(".scoreboard").text(currentScore);
      return currentScore
  }
  ///////////////////////////////
  /// RUNNING THE GAME /////////
  const runGame = () => {
    if (playerTable.length < 3) {
    window.alert("You need more than 2 tiles!")
    removeTileWhenFail();
    return false
      
    } else if (checkSameColour() === true && checkRunningNumber() === true) {
        addScore();
        $tableFlexBox.empty();
        removeTilesWhenSuccessful();
      

    } else if (checkSameColour() === false && checkSameNumber() === true && checkForSDuplicates() === false) {
        addScore()
        $tableFlexBox.empty();
        removeTilesWhenSuccessful();
      

    } else {
     window.alert("neh")
     removeTileWhenFail();
      
    }

    
  };

  $submitButton.on("click", runGame);
  $drawButton.on("click", addTileToRack);
//   $timerButton.on("click", countDown);

buildPouch();
addTileToRack();

};

$(main);
