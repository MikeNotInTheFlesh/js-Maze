var cols, rows;
var w = 40; //cell size
var grid = [];
var current;
var stack = [];


function createGrid(width = 200, height = 200) {
  cols = Math.floor(width / w);
  rows = Math.floor(height / w);
  for (var j = 0; j < rows; j++) {
    for(var i =0; i < cols; i++){
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0]; // Where the maze starts
}


function makeGrid() {
  while (true) {
    if (current.visited == true && current.i == 0 && current.j == 0) {
      break;
    }
  current.visited = true;
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;

  } else if (stack.length > 0) {
    current = stack.pop();
  }
  }
  return grid;
}


function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1){
    return -1;
  }
  return i + j * cols;
}


function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkNeighbors = function() {
    var neighbors = [];
    var top = grid[index(i, j - 1)];
    var right = grid[index(i + 1, j)];
    var down = grid[index(i, j + 1)];
    var left =  grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (down && !down.visited) {
      neighbors.push(down);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = Math.floor(Math.random() * neighbors.length);
      return neighbors[r];
    } else {
      return undefined;
    }
  }
  this.show = function() {
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }
  }
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
  }

var Size;
var gridSize = prompt("Would you like to play a Small, Medium, or Large maze? ('s', 'm', 'l')", "s")
if (gridSize == 's') {
  Size = 200;
} else if (gridSize == 'm') {
  Size = 400;
} else if (gridSize == 'l') {
  Size = 600;
} else {
  location.reload();
}

createGrid(Size, Size)
H = makeGrid()
/*
console.log(H);
for (x in H) {
  console.log('index: '+ x +' (' + H[x].i + ', ' + H[x].j + ') ' + H[x].walls)
}
*/

/*
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(100);
  for (var i = 0; i < H.length; i++) {
    H[i].show();
  }
}
*/
