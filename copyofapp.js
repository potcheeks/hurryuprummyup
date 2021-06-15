const colours = ["red", "blue", "black", "yellow"];
const numbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  12, 13,
];
const originalPouch = []; // Each tile is repeated, there are 2 duplicated sets
const playerRack = [];
const usedTiles = [];
const playerTable = [];
const currentScore = "";

const main = () => {
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

  
  const $body = $("body");
  const $nameInput = $("<textarea>").attr("id", "nameinput");
  $body.prepend($nameInput);
  const $tableFlexBox = $("<div>").attr("id", "tableFlexBox");
  $("#playtable").append($tableFlexBox);
  const $rackFlexBox = $("<div>").attr("id", "rackFlexBox");
  $("#rack").append($rackFlexBox);

  //////////////////////////////BUTTONS////////////////////////////
  const $submitButton = $("<button>")
    .text("BEAM ME UP SCOTTAYEEEE!")
    .attr("id", "#submitbutton")
    .appendTo($("#playtable"));

  const $drawButton = $("<button>")
    .text("DRAW A CARD, OR TWO, OR THREE")
    .attr("id", "drawcardbutton")
    .appendTo($("#rack"));

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
/////////////////////// PLAYTABLE ///////////////////////////////
  const moveToTable = (event) => {
    $("#tableFlexBox").append($(event.target));
    usedTiles.push($(event.target))
    removingTile();
  };
 //////////////////////// REMOVING TILE ////////////////////
 const removingTile = () => {
    playerTable.push(playerRack.splice("#id",1))
  }

  const returnToPlayerRack = () => {

  }
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

  ///////////////////////////////
  /// RUNNING THE GAME /////////
  const runGame = () => {
    if (usedTiles.length < 3) {
    window.alert("You need more than 2 tiles!")
      console.log("You need more than 2 tiles!");

      return false;
    } else if (checkSameColour() === true && checkRunningNumber() === true) {
        window.alert("yeah running when you're sober")
        console.log("yeah running numbers and same colour");
      return true;
    } else if (checkSameColour() === false && checkSameNumber() === true) {
        window.alert("yeh same numbers on acid")
        console.log("yeah same numbers different colour!");
      return true;
    } else {
     window.alert("neh")
      console.log("neh")
      return false;
    }
  };

  $submitButton.on("click", runGame);
  $drawButton.on("click", addTileToRack);

  buildPouch();
  addTileToRack();
};

$(main);
