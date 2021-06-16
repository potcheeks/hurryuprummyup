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
  // BUILDING POUCH
  const $body = $("body");
  const $tableFlexBox = $("<div>").attr("id", "tableFlexBox");
  $("#playtable").append($tableFlexBox);
  const $rackFlexBox = $("<div>").attr("id", "rackFlexBox");
  $("#rack").append($rackFlexBox);
  const $scoreBoard = $("<div>").text(currentScore).addClass("scoreboard");
  $("#controlpanel").append($scoreBoard)


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
    .attr("id", "#submitbutton")
    .appendTo($("#playtable"));

  const $drawButton = $("<button>")
    .text("DRAW A CARD, OR TWO, OR THREE")
    .attr("id", "drawcardbutton")
    .appendTo($("#rack"));

    const $timerButton = $('#start-button')
    const timeLeftDisplay = $('#time-left')
    timeLeft = 60

    // const countDown = () => {
    //     setInterval();
    //     if(timeLeft<=0) {
    //         clearInterval(timeLeft = 0)
    //     }
    //     timeLeftDisplay.innerHTML = timeLeft,
    //     timeLeft -=1,
    //     1000
    // },
        
    

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


// const moveToTable = (event) => {
//     usedTiles.push(event.target)
//     removingTile();
//   };
 //////////////////////// REMOVING TILE ////////////////////
 const removingTile = () => {
    playerTable.push(playerRack.splice("#id",1))
  }


  const removeTilesWhenSuccessful = () => {
      for (let i =0; i<playerTable.length; i++) {
            playerTable.splice(i,playerTable.length) 
            usedTiles.splice(i,usedTiles.length)}
      }
    
    const removeTileWhenFail = () => {
       $('#tableFlexBox').children().appendTo($('#rackFlexBox'))
       renderRack();

       }
     // not working need to tweak data
    
         
  ///////////////////////////////////// CALLING THE LOGICS /////////////////////////////////

 



  ////////////////////////////////
  ////////// SAME COLOUR /////////
  const checkSameColour = () => {
    let countSame = 0;
    for (let i = 0; i < usedTiles.length; i++) {
      className = usedTiles[0].attr("class"); // colour
      if (usedTiles[i].attr("class") === className) {
        // check for same colour
        countSame++;
      } else {
        return false;
      }
      if (countSame === usedTiles.length) {
        return true;
      }
    }
  };

  ///////////////////////////////////
  ////////// RUNNING NUMBER /////////
  const checkRunningNumber = () => {
    let countSame = 0;
    for (let i = 0; i < usedTiles.length; i++) {
      idOne = parseInt(usedTiles[0].attr("number"));
      if (parseInt(usedTiles[i].attr("number")) === idOne + i) {
        countSame++;
      } else {
        console.log("false");
        return false;
      }
      if (countSame === usedTiles.length) {
        return true;
      }
    }
  };

  ///////////////////////////////////
  ////////// SAME NUMBER ////////////
  const checkSameNumber = () => {
    let countSame = 0;
    for (let i = 0; i < usedTiles.length; i++) {
      idOne = parseInt(usedTiles[0].attr("number"));
      if (parseInt(usedTiles[i].attr("number")) === idOne) {
        countSame++;
      }
      if (countSame === usedTiles.length) {
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
    if (usedTiles.length < 3) {
    window.alert("You need more than 2 tiles!")
    removeTileWhenFail();
      
      
    } else if (checkSameColour() === true && checkRunningNumber() === true) {
        addScore();
        $tableFlexBox.empty();
        // removeTilesWhenSuccessful();
      

    } else if (checkSameColour() === false && checkSameNumber() === true) {
        addScore()
        $tableFlexBox.empty();
        // removeTilesWhenSuccessful();
      

    } else {
     window.alert("neh")
    //  removeTileWhenFail();
      
    }
  };

  $submitButton.on("click", runGame);
  $drawButton.on("click", addTileToRack);
//   $timerButton.on("click", countDown);

  buildPouch();
  addTileToRack();
};

$(main);
