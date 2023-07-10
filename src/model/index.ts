import type { Block } from '@/types';
import { Config } from '@/config';
import { EMPTY_BLOCK, blockList1, blockList8 } from '@/consts/blocks';

export class GameBoard {
  currentRow: number;
  currentCol: number;
  currentBlockIndex: number;
  nextBlockIndex: number;
  board: Block[][];

  constructor(
    currentRow: number,
    currentCol: number,
    currentBlockIndex: number,
    nextBlockIndex: number,
  ) {
    this.currentRow = currentRow;
    this.currentCol = currentCol;
    this.currentBlockIndex = currentBlockIndex;
    this.nextBlockIndex = nextBlockIndex;
    this.board = [
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
      [EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK, EMPTY_BLOCK],
    ];
  }

  isGameOver(): boolean {
    console.log(this.board);

    return this.board[0][this.currentCol].num !== 0 && this.board[1][this.currentCol].num !== 0;
  }

  isBottom(): boolean {
    return (
      this.currentRow === Config.board.size.col - 1 ||
      this.board[this.currentRow + 1][this.currentCol].num !== 0
    );
  }

  updateBoard(preCol: number): void {
    const cloneBoard = structuredClone(this.board);

    console.log(preCol);
    cloneBoard[this.currentRow][this.currentCol] = blockList1[this.currentBlockIndex];

    if (this.currentRow - 1 >= 0) {
      if (preCol !== this.currentCol) {
        for (let row = this.currentRow - 1; row >= 0; row--) {
          cloneBoard[row][preCol] = EMPTY_BLOCK;
        }
        console.log(this.currentRow - 1, this.currentCol);
      }
      cloneBoard[this.currentRow - 1][this.currentCol] = EMPTY_BLOCK;
      console.log(preCol, this.currentCol);
    }

    console.log(cloneBoard);
    this.board = cloneBoard;
  }

  // ブロックがマージされた結果、空洞ができたかどうか調べて天井のrowIndexを返す。
  // 天井がなければ-1を返す。
  searchRowIndexOfCap(row: number, col: number): number {
    let rowIndex = row;

    if (this.board[row][col].num === 0) {
      while (rowIndex - 1 >= 0) {
        rowIndex--;
        if (this.board[rowIndex][col].num !== 0) {
          return rowIndex;
        }
      }
    }

    return -1;
  }

  isTheSameNumber(row: number, col: number, targetRow: number, targetCol: number): boolean {
    return this.board[row][col].num === this.board[targetRow][targetCol].num;
  }

  fillHole(row: number, col: number, rowOfCap: number): void {
    const capBlock = structuredClone(this.board[rowOfCap][col]);

    this.board[row][col] = capBlock;
    this.board[rowOfCap][col] = EMPTY_BLOCK;
  }

  calculateIndex(num: number): number {
    let power = 0;

    while (num > 2) {
      num = num / 2;
      power++;
    }

    return power;
  }

  mergeBlocks(row: number, col: number, mergedRow: number, mergedCol: number): void {
    const mergedNumber = this.board[row][col].num * 2;
    const newBlock = blockList8[this.calculateIndex(mergedNumber)];

    this.board[mergedRow][mergedCol] = EMPTY_BLOCK;
    newBlock.isMerged = true;
    this.board[row][col] = newBlock;

    console.log('Merge!');
  }

  doubleMerge(mergedBlocks: string, row: number, col: number): number {
    const mergedNumber = this.board[row][col].num * 4;
    const newBlock = blockList8[this.calculateIndex(mergedNumber)];

    switch (mergedBlocks) {
      case 'RIGHT_BOTTOM':
        this.board[row][col + 1] = EMPTY_BLOCK;
        this.board[row][col] = EMPTY_BLOCK;
        newBlock.isMerged = true;
        this.board[row + 1][col] = newBlock;
        row++;
        break;
      case 'LEFT_BOTTOM':
        this.board[row][col - 1] = EMPTY_BLOCK;
        this.board[row][col] = EMPTY_BLOCK;
        newBlock.isMerged = true;
        this.board[row + 1][col] = newBlock;
        row++;
        break;
      default:
        this.board[row][col - 1] = EMPTY_BLOCK;
        this.board[row][col + 1] = EMPTY_BLOCK;
        newBlock.isMerged = true;
        this.board[row][col] = newBlock;
        break;
    }
    console.log('Double Merge!');

    return row;
  }

  tripleMerge(row: number, col: number): number {
    const mergedNumber = this.board[row][col].num * 8;
    const newBlock = blockList8[this.calculateIndex(mergedNumber)];

    this.board[row][col - 1] = EMPTY_BLOCK;
    this.board[row][col + 1] = EMPTY_BLOCK;
    this.board[row][col] = EMPTY_BLOCK;
    newBlock.isMerged = true;
    this.board[row + 1][col] = newBlock;
    row++;
    console.log('Triple Merge!');

    return row;
  }
}
