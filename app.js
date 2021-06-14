const colours = ["red", "blue", "black", "yellow"];
const numbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  12, 13,
];
const originalPouch = []; // Each tile is repeated, there are 2 duplicated sets
const playerRack = []; // true location
const ontherack = ""

const main = () => {
  // BUILDING POUCH

  class Tile {
    constructor(colour, number) {
      this.colour = colour;
      this.number = number;
      this.ontherack = true;
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
    for (let i = 0; i < playerMaxCards; i++) {
      if (playerRack.length < playerMaxCards) {
        playerRack.push(drawRandomCard(originalPouch)[0]);
         // returning the element
      }
    }
  };


  // PLAYER TO PUT CARDS OUT ON PLAYTABLE
  // creating the player rack on JQUERY
  const $body = $("body");
  const $nameInput = $("<textarea>").attr("id", "nameinput");
  const $tableFlexBox = $('<div>').attr("id","tableFlexBox")
  $('#playtable').append($tableFlexBox)
  const $rackFlexBox = $('<div>').attr("id","rackFlexBox")
  $('#rack').append($rackFlexBox)
 


  $body.prepend($nameInput);
  // PLAYER TO PUT CARDS OUT ON PLAYTABLE
  // append divs with unique id
  // PLAYER TO DRAW CARD IF NEEDED
  // PLAYER TO MAKE COMPLETE SETS ON TABLE AND CLICK BUTTON
  // logic and create button
  // COMPUTER TO CHECK, FOR EACH COMPLETE SET, PLAYER GETS POINTS FROM TOTAL SUM FROM COMPLETED SETS

//   const renderRack = () => {
//     for (let i = 0; i < playerRack.length; i++) {
//       ($("<div>").text(playerRack[i].number).addClass(playerRack[i].colour)).appendTo($(".rack"));
//     }
//   };

// need to add button
const renderRack = () => {
    for (let i = 0; i < playerRack.length; i++) {
      ($("<div>").text(playerRack[i].number).addClass(playerRack[i].colour).on('click', moveToTable)).appendTo($('#rackFlexBox'));
    }
  };


const moveToTable = (event) => {
    $('#tableFlexBox').append($(event.target));
    $(event.target).on('click', moveToTable)
    }
    
   



//   $playTable = $('.playtable1')
//   const $selectTile = $(".black");
//   $selectTile.on('click', () => {
//       console.log("works")
//     $playTable.append($selectTile)
//   })
 

  buildPouch();
  addTileToRack();
  renderRack();
 

  console.log("player rack is now", playerRack);
  console.log("player rack array length is now", playerRack.length);
  console.log("original rack is now", originalPouch);
  console.log("original pouch length is now", originalPouch.length,"the length should be 84");

};

$(main);
