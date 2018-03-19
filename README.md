# Blocky Puzzle

## This test is incomplete. Will be complete in a week. when a free weekend appears.

## To get started

```sh
npm i
# or yarn
npm start
# or yarn start
```

`http://localhost:9100/` will open automatically on the blocky app, live-reloading as you develop.

`yarn test` & `yarn test:watch` to run the unit tests on the terminal.

## Task

Implement `blockClicked` to remove (or hide) all blocks of the same colour that are connected to the target element, then allow the blocks above the removed to "fall down" (similar to Tetris but you should click a block to have connected blocks removed).

E.g.,

Given:

![Initial state](https://trottski.s3.amazonaws.com/snaps/initial.jpg)

After clicking one of the bottom right blue boxes it should then look
like this:

![state 2](https://trottski.s3.amazonaws.com/snaps/stage2.jpg)
