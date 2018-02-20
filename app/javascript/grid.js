export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

export class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    this.selected = 0;
  }
}

export class BlockGrid {
  constructor() {
    this.grid = [];
    for (let x = 0; x < MAX_X; x++) {
      let col = [];

      for (let y = 0; y < MAX_Y; y++) {
        col.push(new Block(x, y));
      }
      this.grid.push(col);
    }

    return this;
  }

  render(el = document.querySelector('#gridEl')) {
    for (let x = 0; x < MAX_X; x++) {
      let id = 'col_' + x;
      let colEl = document.createElement('div');
      colEl.className = 'col';
      colEl.id = id;
      el.appendChild(colEl);

      for (let y = MAX_Y - 1; y >= 0; y--) {
        let block = this.grid[x][y],
          id = `block_${x}x${y}`,
          blockEl = document.createElement('div');

        blockEl.id = id;
        blockEl.className = 'block';
        blockEl.style.background = block.colour;
        blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
        colEl.appendChild(blockEl);
      }
    }

    return this;
  }

  blockClicked(e, block) {
    let targetColour = block.colour; //get color of the clicked block
    block.colour = 'grey'; // mark selected block
    changeColor(block,'grey'); // change the color visibly
    let grid = this.grid; 
    markAllNeigh(grid,block); // make all neighbors grey

      // shift all the grey blocks up
     for (let y = 0; y < MAX_Y; y++) {  // not a big fan of having that many nested for loops
        for (let x = 0; x < MAX_X; x++) {
             swapWithGreyBelow(grid[x][y], grid); 
         }
       }

    function swapWithGreyBelow(block, grid){
      var x = block.x;
      var y = block.y;
      var myCol = block.colour;
      if (y != 0 && myCol != 'grey' && grid[x][y-1].colour == 'grey'){
        changeColor(grid[x][y-1],myCol);
        grid[x][y-1].colour = myCol;
        changeColor(block,'grey');
        block.colour = 'grey';
        swapWithGreyBelow(grid[x][y-1],grid); 
      } else{

      }
    }
    
    function changeColor(block, color){ //makes the block grey visually
      let x = block.x;
      let y = block.y;
      let id = 'block_'+x+'x'+y;
      var toBeReplaced = document.getElementById(id);
      toBeReplaced.style.background = color;}
    
    function markAllNeigh(grid, block){ //mark the left neighbours of same color recursively
      markLeftNeigh(grid,block);
      markRightNeigh(grid,block);
      markBottomNeigh(grid,block);
      markTopNeigh(grid,block);
    }

    function markLeftNeigh(grid, block){ //mark the left neighbours of same color recursively
      var myX = block.x; 
      var myY = block.y; 
      while (myX > 0 && grid[myX-1][myY].colour == targetColour && grid[myX-1][myY].colour != 'grey' ){ // only check for left neighbor if the block isn't the left most block
          grid[myX-1][myY].colour = 'grey';
          changeColor(grid[myX-1][myY], 'grey');
          block = grid[myX-1][myY]; //move on to the left block
          var myX = block.x; 
          var myY = block.y;
          markTopNeigh(grid,block); //move on to the top block
          markBottomNeigh(grid,block); //move on to the bottom block
      }  
    } 
    function markRightNeigh(grid, block){ //mark the right neighbours of same color recursively
      var myX = block.x; 
      var myY = block.y;
      while (myX < MAX_X-1 && grid[myX+1][myY].colour == targetColour && grid[myX+1][myY].colour != 'grey'){ // only check for right neighbor if the block isn't the right most block
          grid[myX+1][myY].colour = 'grey';
          changeColor(grid[myX+1][myY], 'grey');
          block = grid[myX+1][myY]; //move on to the right block
          var myX = block.x; 
          var myY = block.y;
          markTopNeigh(grid,block); //move on to the top block
          markBottomNeigh(grid,block); //move on to the bottom block
      } 
    } 
    function markTopNeigh(grid, block){ //mark the top neighbours of same color recursively
      var myX = block.x; 
      var myY = block.y;
      while (myY < MAX_Y-1 && grid[myX][myY+1].colour == targetColour && grid[myX][myY+1].colour != 'grey'){ // only check for top neighbor if the block isn't at the very top
          grid[myX][myY+1].selected = 1;
          changeColor(grid[myX][myY+1],'grey');
          block = grid[myX][myY+1]; //move on to the top block
          var myX = block.x; 
          var myY = block.y;
          markLeftNeigh(grid,block); //move on to the left block
          markRightNeigh(grid,block); //move on to the right block
      } 
    } 
    function markBottomNeigh(grid, block){ //mark the bottom neighbours of same color recursively
      var myX = block.x; 
      var myY = block.y;
      while (myY > 0 && grid[myX][myY-1].colour == targetColour && grid[myX][myY-1].colour != 'grey'){ // only check for botto, neighbor if the block isn't at the very bottom
          grid[myX][myY-1].colour = 'grey';
          changeColor(grid[myX][myY-1],'grey');
          block = grid[myX][myY-1]; //move on to the bottom block
          var myX = block.x; 
          var myY = block.y;
          markRightNeigh(grid,block); //move on to the right  block
          markLeftNeigh(grid,block); //move on to the left block
       } 
    } 
    console.log(e,block);  //add , this.grid for testing
  }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
