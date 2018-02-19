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
// add block methods here
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
    block.selected = 1; // mark selected block
    let grid = this.grid; 
    markLeftNeigh(grid,block);
     markRightNeigh(this.grid,block);
    markBottomNeigh(this.grid,block);
    markTopNeigh(this.grid,block);
    
    function markLeftNeigh(grid, block){ //mark the left neighbours of same color recursively
      let myX = block.x; 
      let myY = block.y;
      let myColor = block.colour;
      if (myX > 0 && grid[myX-1][myY].colour == myColor){ // only check for left neighbor if the block isn't the left most block
          grid[myX-1][myY].selected = 1;
          block = grid[myX-1][myY];
          markLeftNeigh(grid, block);
          markTopNeigh(grid,block);
          markBottomNeigh(grid,block);
      } else {
      } 
    } 
    function markRightNeigh(grid, block){ //mark the right neighbours of same color recursively
      let myX = block.x; 
      let myY = block.y;
      let myColor = block.colour;
      if (myX < 9 && grid[myX+1][myY].colour == myColor){ // only check for right neighbor if the block isn't the right most block
          grid[myX+1][myY].selected = 1;
          block = grid[myX+1][myY];
          markRightNeigh(grid, block);
          markTopNeigh(grid,block);
          markBottomNeigh(grid,block);

      } else {
      } 
    } 
    function markTopNeigh(grid, block){ //mark the top neighbours of same color recursively
      let myX = block.x; 
      let myY = block.y;
      let myColor = block.colour;
      if (myY < 9 && grid[myX][myY+1].colour == myColor){ // only check for top neighbor if the block isn't at the very top
          grid[myX][myY+1].selected = 1;
          block = grid[myX][myY+1];
          markTopNeigh(grid, block);
          markLeftNeigh(grid,block);
          markRightNeigh(grid,block);
      } else {
      } 
    } 
    function markBottomNeigh(grid, block){ //mark the bottom neighbours of same color recursively
      let myX = block.x; 
      let myY = block.y;
      let myColor = block.colour;
      if (myY > 0 && grid[myX][myY-1].colour == myColor){ // only check for botto, neighbor if the block isn't at the very bottom
          grid[myX][myY-1].selected = 1;
          block = grid[myX][myY-1];
          markBottomNeigh(grid, block);
          markRightNeigh(grid,block);
          markLeftNeigh(grid,block);
       } 
       else {
       } 
    } 
    console.log(e, block,this.grid);
  }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
