let memory_array = ["apple.jpg", "barbossa.jpeg", "coin.jpg", "davy.jpeg", "duo.jpeg",  "elizabeth.jpeg",  "gibbs.jpeg",  "monkey.jpeg",  "norrington.jpg",  "sparrow.jpeg",  "tia.jpeg",  "will.jpeg",  "apple.jpg",  "barbossa.jpeg",  "coin.jpg",  "davy.jpeg",  "duo.jpeg",  "elizabeth.jpeg",  "gibbs.jpeg",  "monkey.jpeg",  "norrington.jpg",  "sparrow.jpeg",  "tia.jpeg",  "will.jpeg",
];
let memory_values = [];
let memory_tile_ids = [];
let tiles_flipped = 0;
let turnCount = 0;
let player1Score = 1;
let player2Score = 1;
let playerID = null;

Array.prototype.memory_tile_shuffle = function () {
  let i = this.length,
    j,
    temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
};



function newBoard() {
  tiles_flipped = 0;
  let output = "";
  memory_array.memory_tile_shuffle();
  for (let i = 0; i < memory_array.length; i++) {
    output +=
      '<div class="tile col-md-6 col-md-offset-2 " id="tile_' +
      i +
      '" onclick="memoryFlipTile(this,\'' +
      memory_array[i] +
      "')\"></div>";
  }
  document.getElementById("gameboard").innerHTML = output;
}

function memoryFlipTile(tile, val) {
  if (tile.innerHTML === "" && memory_values.length < 2) {
    tile.style.background = "none";
    tile.innerHTML = 
      '<img  src="assets/' + val + '" height="100%" width="100%"/>';
      

    if (memory_values.length === 0) {
      memory_values.push(val);
      memory_tile_ids.push(tile.id);
    } else if (memory_values.length === 1) {
      memory_values.push(val);
      memory_tile_ids.push(tile.id);


      if (memory_values[0] === memory_values[1]) {
        tiles_flipped += 2;

        memory_values = [];
        memory_tile_ids = [];

        setTimeout(currentPlayer, 500);

        if (playerID === 1) {
          $("#player1Score").html(player1Score++);
        } else {
          $("#player2Score").html(player2Score++);
        }
        

        if (tiles_flipped === memory_array.length) {
          if (player1Score > player2Score) {
            alert("Player 1 wins! Rematch?");
          } else if (player2Score > player1Score) {
            alert("Player 2 wins! Rematch?");
          } else {
            alert("... There can only be one...");
          }

          document.getElementById("gameboard").innerHTML = "";
          turnCount = 0;
          newBoard();
        }
      } else {
        function flip2Back() {
          let tile_1 = document.getElementById(memory_tile_ids[0]);
          let tile_2 = document.getElementById(memory_tile_ids[1]);
          tile_1.style.background =
            "url(assets/background.jpg) no-repeat center";
          tile_1.style.backgroundSize = "cover";
          tile_1.innerHTML = "";
          tile_2.style.background =
            "url(assets/background.jpg) no-repeat center";
          tile_2.style.backgroundSize = "cover";
          tile_2.innerHTML = "";
          memory_values = [];
          memory_tile_ids = [];
        }
        setTimeout(flip2Back, 500);

        turnCount++;
        setTimeout(currentPlayer, 500);
      }
    }
  }
}

let currentPlayer = function () {
  if (turnCount % 2 === 0) {
    playerID = 1;

    $("#player1Div").css({ textShadow: "3px 2px #44EBCA" });
    $("#player2Div").css({ textShadow: "" });
  } else {
    playerID = 2;

    $("#player2Div").css({ textShadow: "3px 2px #44EBCA" });
    $("#player1Div").css({ textShadow: "" });
    console.log(playerID);
  }
};

$("#resetButton").on("click", function () {
  turnCount = 0;
  $("#player1Score").html("&nbsp;");
  $("#player2Score").html("&nbsp");
  $("#player1P").html("&nbsp");
  $("#player2P").html("&nbsp");
  player1Score = 1;
  player2Score = 1;
  $("#launchModalButton").show();
  $("#gameboard").html(null);
  $("#headerTitle").show();
});



$("#playButton").on("click", function () {
  let player1Text = $("#player1Name").val();
  let player2Text = $("#player2Name").val();

  if (!player1Text) {
    $("#player1P").html("Player 1");
  } else {
    $("#player1P").html(player1Text);
  }

  if (!player2Text) {
    $("#player2P").html("Player 2");
  } else {
    $("#player2P").html(player2Text);
  }

  $("#player1Name").val("");
  $("#player2Name").val("");

  $("#launchModalButton").hide();
  $("#headerTitle").hide();

  $("#player1Div").css({ textShadow: "3px 2px #44EBCA" });

  newBoard();
});
