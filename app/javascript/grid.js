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
    let myX = block.x;
    let myY = block.y;
    let myColor = block.colour;
    if (this.grid[myX-1][myY].colour == myColor){
      this.grid[myX-1][myY].selected = 1;
    }  //mark all the left neighbours of same color
    
    if (this.grid[myX+1][myY].colour == myColor){
      this.grid[myX+1][myY].selected = 1;
    }  //mark all the right neighbours of same color
    
    if (this.grid[myX][myY-1].colour == myColor){
      this.grid[myX][myY-1].selected = 1;
    }  //mark all the bottom neighbours of same color
    
    if (this.grid[myX][myY+1].colour == myColor){
      this.grid[myX][myY+1].selected = 1;
    }  //mark all the top neighbours of same color
    console.log(e, block,this.grid);
  }

}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
