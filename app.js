const colours = ["red", "blue", "black", "yellow"];
const numbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  12, 13,
];
const originalPouch = []; // Each tile is repeated, there are 2 duplicated sets
const playerRack = [];

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
  buildPouch();

  // DRAWING RANDOM NUMBER - draws a random card and removes it from the original pouch of 104 tiles
  const drawRandomCard = () => {
    let randomIndex = Math.floor(Math.random() * originalPouch.length);
    return originalPouch.splice(randomIndex, 1);
  };

  // // PUSHING IT INTO THE PLAYER RACK, USER CLICKS THE BUTTON FOR THE NUMBER OF CARDS
  const addTileToRack = () => {
    const playerMaxCards = 20;
    for (let i = 0; i < playerMaxCards; i++) {
      if (playerRack.length < playerMaxCards) {
        playerRack.push(drawRandomCard(originalPouch)[0]); // returning the element
      }
    }
  };

  addTileToRack();

  // PLAYER TO PUT CARDS OUT ON PLAYTABLE
  // creating the player rack on JQUERY

  const $body = $("body");
  const $nameInput = $("<textarea>").attr("id", "nameinput");

  $body.prepend($nameInput);

  // create individual divs for each tile on the player rack
  // const $playerRack1 = $('<div>').text(playerRack[0].number).addClass(playerRack[0].colour)
  // $('.row1').append($playerRack1)
  // const $playerRack2 = $('<div>').text(playerRack[1].number).addClass(playerRack[1].colour)
  // $('.row1').append($playerRack2)

  // playerrack
  // [],[],[],[],[],[],[],[],[],[]
  //

  const startGame = () => {
    for (let i = 0; i < playerRack.length; i++) {
      ($("<div>").text(playerRack[i].number).addClass(playerRack[i].colour)).appendTo($(".rack"));
    }
  };
  startGame();

  console.log("player rack is now", playerRack);
  console.log("player rack array length is now", playerRack.length);
  console.log("original rack is now", originalPouch);
  console.log(
    "original pouch length is now",
    originalPouch.length,
    "the length should be 84"
  );

  // PLAYER TO PUT CARDS OUT ON PLAYTABLE
  // append divs with unique id
  // PLAYER TO DRAW CARD IF NEEDED
  // PLAYER TO MAKE COMPLETE SETS ON TABLE AND CLICK BUTTON
  // logic and create button
  // COMPUTER TO CHECK, FOR EACH COMPLETE SET, PLAYER GETS POINTS FROM TOTAL SUM FROM COMPLETED SETS
};

$(main);
