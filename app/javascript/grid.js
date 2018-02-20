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
    let taggedMFs = new Uint8Array(MAX_X); //keep track of #selected blocks by column
    block.selected = 1; // mark selected block
    let myX = block.x;
    taggedMFs[myX] += 1;
    let grid = this.grid;
    markAllNeigh(grid,block);
    //console.log(taggedMFs);
    for (let x = 0; x < MAX_X; x++) {
       for (let y = 0; y < MAX_Y; y++) {
          if (grid[x][y].selected == 1){
            changeColor(grid[x][y],'grey');
            grid[x][y].colour = 'grey';
          }
        }
       }
     for (let y = 1; y < MAX_Y; y++) {
        for (let x = 0; x < MAX_X; x++) {
             swapWithGreyBelow(grid[x][y], grid);
         }
       }

    function swapWithGreyBelow(block, grid){
      var x = block.x;
      var y = block.y;
      var myCol = block.colour;
      console.log(block);
      if (myCol != 'grey' && grid[x][y-1].colour == 'grey'){
        changeColor(grid[x][y-1],myCol);
        grid[x][y-1].colour = myCol;
        changeColor(block,'grey');
        block.colour = 'grey';
        swapWithGreyBelow(grid[x][y-1],grid); 
      } else{

      }
    }
    
    function changeColor(block, color){
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
      var myColor = block.colour;    
      while (myX > 0 && grid[myX-1][myY].colour == myColor && grid[myX-1][myY].selected != 1 ){ // only check for left neighbor if the block isn't the left most block
          grid[myX-1][myY].selected = 1;
          taggedMFs[myX-1] += 1;
          block = grid[myX-1][myY];
          var myX = block.x; 
          var myY = block.y;
          var myColor = block.colour;
          markTopNeigh(grid,block);
          markBottomNeigh(grid,block);
      }  
    } 
    function markRightNeigh(grid, block){ //mark the right neighbours of same color recursively
      var myX = block.x; 
      var myY = block.y;
      var myColor = block.colour;
      while (myX < MAX_X-1 && grid[myX+1][myY].colour == myColor && grid[myX+1][myY].selected != 1){ // only check for right neighbor if the block isn't the right most block
          grid[myX+1][myY].selected = 1;
          taggedMFs[myX+1] += 1;
          block = grid[myX+1][myY];
          var myX = block.x; 
          var myY = block.y;
          var myColor = block.colour;
          markTopNeigh(grid,block);
          markBottomNeigh(grid,block);
      } 
    } 
    function markTopNeigh(grid, block){ //mark the top neighbours of same color recursively
      var myX = block.x; 
      var myY = block.y;
      var myColor = block.colour;
      while (myY < MAX_Y-1 && grid[myX][myY+1].colour == myColor && grid[myX][myY+1].selected != 1){ // only check for top neighbor if the block isn't at the very top
          grid[myX][myY+1].selected = 1;
          taggedMFs[myX] += 1;
          block = grid[myX][myY+1];
          var myX = block.x; 
          var myY = block.y;
          var myColor = block.colour;
          markLeftNeigh(grid,block);
          markRightNeigh(grid,block);
      } 
    } 
    function markBottomNeigh(grid, block){ //mark the bottom neighbours of same color recursively
      var myX = block.x; 
      var myY = block.y;
      var myColor = block.colour;
      while (myY > 0 && grid[myX][myY-1].colour == myColor && grid[myX][myY-1].selected != 1){ // only check for botto, neighbor if the block isn't at the very bottom
          grid[myX][myY-1].selected = 1;
          taggedMFs[myX] += 1;
          block = grid[myX][myY-1];
          var myX = block.x; 
          var myY = block.y;
          var myColor = block.colour;
          markRightNeigh(grid,block);
          markLeftNeigh(grid,block);
       } 
    } 
    console.log(e,block);  //add , this.grid for testing
  }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
