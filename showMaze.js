var won = false;
var position = 0;
var see = [];
var beenThere = [];


function setup() {
  createCanvas(Math.sqrt(grid.length) * 40, Math.sqrt(grid.length) * 40);
}

function draw() {
  background(100);
  var x = grid[grid.length-1].i * w;
  var y = grid[grid.length-1].j * w;
  noStroke();
  fill(0, 0, 255, 255);
  rect(x, y, w, w);

  for (var i = 0; i < H.length; i++) {
    if (see.includes(i)){
      H[i].show();
    }

  }
  if (won == true){
    alert("CONGRATULATIONS: You Won!!!");
    if (confirm("Play again?") == true) {
    location.reload();
  } else {hmm}
  }
  player();
}



function player() {
  vision(position);
  if (!beenThere.includes(position)){
    beenThere.push(position);
  }
  if (position == grid.length-1) {
    won = true;
  }

  var x = grid[position].i * w + w/2;
  var y = grid[position].j * w + w/2;
  noStroke();
  fill(255, 000, 000, 200);
  ellipse(x, y, w*2/3, w*2/3);
  addEventListener("keydown", move, false);
}


function vision(position){
  if (!see.includes(position)){
    see.push(position);
  }
  prospect = index(grid[position].i - 1, grid[position].j);
  if (grid[position].walls[3] == false && prospect >= 0 && !see.includes(prospect)) {
    see.push(prospect);
  }
  prospect = index(grid[position].i, grid[position].j - 1);
  if (grid[position].walls[0] == false && prospect >= 0 && !see.includes(prospect)) {
    see.push(prospect);
  }
  prospect = index(grid[position].i + 1, grid[position].j);
  if (grid[position].walls[1] == false && prospect >= 0 && !see.includes(prospect)) {
    see.push(prospect);
  }
  prospect = index(grid[position].i, grid[position].j + 1);
  if (grid[position].walls[2] == false && prospect >= 0 && !see.includes(prospect)) {
    see.push(prospect);
  }
  while (see.length > 15) {
    see.shift(1);
  }
}


function move(e) {
  var prospect;
  switch(e.keyCode) {
    case 37:  //left
    prospect = index(grid[position].i - 1, grid[position].j);
    if (grid[position].walls[3] == false && prospect >= 0) {
    position = prospect;
    }
      break;
    case 38:  //up
      prospect = index(grid[position].i, grid[position].j - 1);
      if (grid[position].walls[0] == false && prospect >= 0) {
      position = prospect;
    }
      break;
    case 39:  //right
    prospect = index(grid[position].i + 1, grid[position].j);
    if (grid[position].walls[1] == false && prospect >= 0) {
    position = prospect;
    }
      break;
    case 40:  //down
    prospect = index(grid[position].i, grid[position].j + 1);
    if (grid[position].walls[2] == false && prospect >= 0) {
    position = prospect;
      break;
    }
}
}
